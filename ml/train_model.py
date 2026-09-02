"""
PaySphere ML Engine — Machine Learning Model Trainer
---------------------------------------------------
This script generates a synthetic dataset of transaction feature vectors:
  1. Transaction Amount ($ USD)
  2. Transaction Velocity (Count of transfers in 60s)
  3. Geo-Location Distance (Distance in km from usual IP location)

It trains an IsolationForest model (an unsupervised anomaly detection algorithm)
to classify transactions as Normal (0) or Anomalous/Fraudulent (1).
The trained model and scaler features are saved for production serving in FastAPI.
"""

import sys
import os
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib

# Reconfigure stdout for UTF-8 on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

def train_fraud_detection_model():
    print("[PaySphere ML] Generating synthetic transaction telemetry data...")
    np.random.seed(42)

    # 1. Normal Transactions (95% of data)
    n_normal = 1900
    normal_amount = np.random.exponential(scale=45, size=n_normal) + 5
    normal_velocity = np.random.poisson(lam=1.2, size=n_normal) + 1
    normal_geo_dist = np.random.exponential(scale=15, size=n_normal)

    # 2. Fraudulent/Anomalous Transactions (5% of data)
    n_fraud = 100
    fraud_amount = np.random.uniform(low=800, high=5000, size=n_fraud)
    fraud_velocity = np.random.randint(low=5, high=12, size=n_fraud)
    fraud_geo_dist = np.random.uniform(low=200, high=2500, size=n_fraud)

    # Combine Data
    amounts = np.hstack([normal_amount, fraud_amount])
    velocities = np.hstack([normal_velocity, fraud_velocity])
    geo_dists = np.hstack([normal_geo_dist, fraud_geo_dist])

    df = pd.DataFrame({
        'amount': amounts,
        'velocity': velocities,
        'geo_distance': geo_dists
    })

    print(f"[PaySphere ML] Dataset prepared: {len(df)} transactions ({n_normal} normal, {n_fraud} anomalies)")

    # Feature Scaling
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(df)

    # Train Isolation Forest Model
    print("[PaySphere ML] Training Isolation Forest Anomaly Detection Classifier...")
    model = IsolationForest(
        n_estimators=100,
        contamination=0.05,
        random_state=42
    )
    model.fit(scaled_features)

    # Output directory
    output_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(output_dir, 'fraud_model.joblib')
    scaler_path = os.path.join(output_dir, 'scaler.joblib')

    # Save artifacts
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)

    print(f"[PaySphere ML] ML Model successfully trained and saved to:\n  - {model_path}\n  - {scaler_path}")

if __name__ == '__main__':
    train_fraud_detection_model()
