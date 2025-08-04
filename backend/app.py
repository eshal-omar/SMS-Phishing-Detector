from flask import Flask, request, jsonify
import joblib
import pandas as pd
from scipy.sparse import hstack
from utils import preprocess_sms_phishing, extract_phishing_features
from flask_cors import CORS
import time
# Load model and transformers
model = joblib.load("svm_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")
scaler = joblib.load("feature_scaler.pkl")

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}}, supports_credentials=True)

@app.route("/predict", methods=["POST"])
def predict():
    start_time = time.time()
    data = request.get_json()
    sms_text = data.get("message", "")
    print("Received message:", sms_text)
    
    if not sms_text:
        return jsonify({"error": "No message provided"}), 400

    
    preprocessed = preprocess_sms_phishing(sms_text)
    tfidf_vector = vectorizer.transform([preprocessed])
    
    features = pd.DataFrame([extract_phishing_features(sms_text)])
    scaled_features = scaler.transform(features)
    
    final_features = hstack([tfidf_vector, scaled_features])
    prediction = model.predict(final_features)[0]
    end_time = time.time()
    duration = end_time - start_time
    print(f"🧠 Model Prediction Time: {duration:.4f} seconds")
    label = "Phishing" if prediction == 1 else "Legitimate"
    
    return jsonify({
        "smsMessage": sms_text,
        "verdict": label
    })

if __name__ == "__main__":
    app.run(debug=True)
