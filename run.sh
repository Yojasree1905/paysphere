#!/bin/bash

echo "========================================================"
echo "  💳 PaySphere — Fintech & ML Fraud Analytics Platform"
echo "========================================================"
echo ""

echo "[1/3] Checking Python dependencies..."
python3 -m pip install -r requirements.txt

echo ""
echo "[2/3] Training Scikit-Learn IsolationForest ML Model..."
python3 ml/train_model.py

echo ""
echo "[3/3] Starting FastAPI REST API Server on http://localhost:8000..."
echo "(Press Ctrl+C to stop the server)"
echo ""
python3 server.py
