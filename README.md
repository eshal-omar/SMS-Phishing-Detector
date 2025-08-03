Safe SMS
An SMS Phishing Detection Application backed my a Machine Learning model. It classifies input text message as "Legitimate" or "Phishing". Ideal for low tech users who can't detect phishing scams themselves as phishing attacks evolve and get harder to detect with time.

Key features include:
•	A preprocessing pipeline that cleans the input and standardizes it.
•	Feature extraction pipeline that generates semantic (TF-IDF) and behavioral features (presence of URLs, urgency words, exclamation marks etc)
•	ML model, trained on thousands of labeled SMS messages, to classify new input SMS messages.
•	Frontend UI built with React for seamless user interface and usability.
•	Flask backend that exposes an endpoint ( /predict) for handling requests


Frameworks
•	Scikit-learn for ML model training and evaluation
•	Regex (re) for text cleaning and token handling
•	TF-IDF Vectorizer to quantify the importance of words and phrases across the dataset
•	Flask REST API to handle requests
•	React frontend for a fast, and user-friendly interface
•	joblib for saving/loading trained models
•	StandardScaler and hstack for combining numerical and semantic features
•	Matplotlib / Seaborn for visualizing evaluation metrics and model performance



Setup Instructions
Open command prompt 
CD into the directory you wish to store the applications folder. Command would be cd path to folder (eg cd  C:\Users\)
then run this command : git clone https://github.com/eshal-omar/SMS-Phishing-Detector.git
Open vscode 
Open two terminals in vscode (one for frontend , one for backend)
In one terminal (frontend terminal) run the following commands: cd frontend , npm install , npm install react@18.2.0 react-dom@18.2.0
In second (backend) terminal run the following commands: cd backend , python -m venv venv , venv\Scripts\activate, pip install flask joblib pandas scipy flask-cors, pip install numpy pandas scikit-learn scipy.
This will install all needed packages. Finally run the following commands to start the application : npm run start (run this in frontend terminal) and python app.py (run this in backend terminal).
This will open the app on local browser (localhost:3000)
