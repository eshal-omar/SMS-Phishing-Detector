import re
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
from scipy.sparse import hstack

def preprocess_sms_phishing(text):
    words = text.split()
    processed_words = []
    for word in words:
        if word.isupper() and len(word) > 2:
            processed_words.append(word.lower() + ' CAPS_TOKEN')
        else:
            processed_words.append(word)
    text = ' '.join(processed_words)

    text = text.lower()
    
    text = re.sub(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', ' URL_TOKEN ', text)
    text = re.sub(r'www\.(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', ' URL_TOKEN ', text)
    
    text = re.sub(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', ' PHONE_TOKEN ', text)
    text = re.sub(r'\b\d{10,}\b', ' PHONE_TOKEN ', text)

    text = re.sub(r'[$£€]\d+(?:,\d{3})*(?:\.\d{2})?', ' MONEY_TOKEN ', text)
    text = re.sub(r'\b\d+(?:,\d{3})*(?:\.\d{2})?\s*(?:dollars?|pounds?|euros?)\b', ' MONEY_TOKEN ', text)

    text = re.sub(r'[!]{2,}', ' EXCLAIM_MULTIPLE ', text)
    text = re.sub(r'[?]{2,}', ' QUESTION_MULTIPLE ', text)
    text = re.sub(r'\.{3,}', ' DOTS_MULTIPLE ', text)

    text = re.sub(r'\s+', ' ', text).strip()

    return text

def extract_phishing_features(text):
    features = {}
    features['has_url'] = 1 if re.search(r'http[s]?://|www\.', text.lower()) else 0
    features['url_count'] = len(re.findall(r'http[s]?://|www\.', text.lower()))
    features['has_phone'] = 1 if re.search(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b|\b\d{10,}\b', text) else 0
    features['has_money'] = 1 if re.search(r'[$£€]\d+|prize|win|won|free|cash', text.lower()) else 0
    urgency_words = ['urgent', 'immediate', 'expires', 'limited', 'act now', 'hurry']
    features['urgency_score'] = sum(1 for word in urgency_words if word in text.lower())
    features['exclamation_count'] = text.count('!')
    features['caps_ratio'] = sum(1 for c in text if c.isupper()) / len(text) if text else 0
    return features

