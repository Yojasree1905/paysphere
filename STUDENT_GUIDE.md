# 🎓 PaySphere — Student Study & Project Guide

Welcome to **PaySphere**! This guide is specially designed for students, researchers, and developers who want to understand how full-stack fintech applications, machine learning fraud detection systems, and AI assistants work together.

---

## 📚 1. Key Concepts Made Simple

### A. What is a Double-Entry Ledger?
In traditional banking, money is never created or destroyed out of thin air. Every transaction requires **two entries**:
1. **Debit**: Subtracting money from the sender's account.
2. **Credit**: Adding money to the recipient's account.

*Why it matters:* This prevents "ghost money" bugs or double-spending in digital wallets.

### B. How Does Machine Learning Fraud Detection Work?
Instead of hardcoding hundreds of `if/else` rules, PaySphere uses an **Unsupervised Anomaly Detection algorithm** called **Isolation Forest** (`scikit-learn`).

1. **Feature Vector**: Each transaction has 3 numeric features:
   - **Amount ($ USD)**: How big is the transaction?
   - **Velocity**: How many transactions were made in the last 60 seconds?
   - **Geo-Distance (km)**: How far is the current request location from the user's primary IP?
2. **Anomaly Score**: The Isolation Forest algorithm isolates outliers. High amounts + high velocity + huge distance = **High Fraud Risk (Flagged)**.

### C. What is FastAPI?
**FastAPI** is a high-performance Python framework for building REST APIs. It uses Python type hints (`Pydantic`) to automatically validate incoming JSON data and generate interactive documentation at `http://localhost:8000/docs`.

---

## 🏗️ 2. Project Architecture Diagram

```
+-------------------------------------------------------+
|                React 18 Frontend UI                   |
|  - Wallet Dashboard  - Interactive ML Risk Slider     |
|  - AI Assistant Chat - Thermal Invoice PDF Generator  |
+--------------------------+----------------------------+
                           | HTTP REST API
                           v
+-------------------------------------------------------+
|             FastAPI Backend (server.py)               |
|  - Validates JSON payload using Pydantic              |
|  - Loads trained Scikit-Learn IsolationForest Model   |
+--------------------------+----------------------------+
                           | Model Inference
                           v
+-------------------------------------------------------+
|       ML Engine (ml/fraud_model.joblib)               |
|  - Pretrained on 2,000 synthetic transaction vectors  |
|  - Returns Risk Score (0-100) in < 20 milliseconds    |
+-------------------------------------------------------+
```

---

## ⚡ 3. How to Run This Project (Step-by-Step)

### Prerequisites
- Install **Python 3.9+** on your computer.
- A modern browser (Chrome, Edge, Firefox, or Safari).

### Step 1: Install Python Dependencies
Open your terminal/command prompt in the `paysphere` folder and run:
```bash
pip install -r requirements.txt
```

### Step 2: Train the Machine Learning Model
Run the ML trainer script to generate `fraud_model.joblib`:
```bash
python ml/train_model.py
```

### Step 3: Start the Backend Server
Run the FastAPI backend server:
```bash
python server.py
```
*(You will see a message: `[PaySphere API] Loaded scikit-learn IsolationForest ML model into memory.`)*

### Step 4: Launch the Frontend UI
Simply double-click `index.html` to open it in your web browser!

---

## 💡 4. Top Viva / College Project Questions & Answers

**Q1: Why did you choose Isolation Forest for Fraud Detection?**  
*Answer:* Fraudulent transactions are rare (usually < 1% of all traffic) and look distinctly different from normal spending patterns. Isolation Forest works by randomly partitioning feature space to isolate anomalies quickly, making it ideal for low-latency (<30ms) scoring without requiring manually labeled fraud datasets.

**Q2: How does the system handle backend connection offline state?**  
*Answer:* The React frontend includes intelligent fallback logic. If the Python API server is offline, the client seamlessly performs in-browser risk calculation so the demo never breaks during a live presentation.

**Q3: How is the thermal receipt/invoice generated?**  
*Answer:* The UI uses dynamic state binding and standard CSS `@media print` rules paired with browser native `window.print()` rendering, allowing users to instantly download or print itemized transaction receipts.

---

## 🏆 5. Tips for Academic Presentations & Demos

1. **Start with the Wallet Tab**: Make a \$50 peer-to-peer transfer to show how real-time balances update.
2. **Show the Invoice**: Click *"View Invoice"* on any transaction to demonstrate receipt generation.
3. **Demo the ML Evaluator**: Switch to the *ML Fraud Detection Engine* tab, drag the amount to \$4,000 and velocity to 8, and watch the risk index jump to **HIGH RISK (AUTOBAN)**.
4. **Demonstrate AI Assistant**: Open the *AI Financial Advisor* tab and ask *"Why was my transaction flagged?"*.
