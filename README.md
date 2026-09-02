# 💳 PaySphere — Distributed Digital Wallet & Real-Time ML Fraud Analytics Platform

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg?logo=react&logoColor=white)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-v10.8.0-FFCA28.svg?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg?logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**PaySphere** is a high-performance, full-stack digital wallet and real-time transaction fraud analytics platform. Built with **React 18**, **Firebase Authentication**, **Cloud Firestore Database**, and **FastAPI**, it integrates **strict per-user account & transaction isolation**, an **automated high-risk security subcollection**, an **AI-driven financial advisor**, and a **smart multi-tier fraud risk engine**.

---

## 📁 Project Structure

```
paysphere/
├── ml/
│   ├── train_model.py       # ML script to generate synthetic dataset & train IsolationForest model
│   ├── fraud_model.joblib   # Trained Scikit-Learn IsolationForest model artifact
│   └── scaler.joblib        # Pretrained StandardScaler feature normalization artifact
├── index.html               # React 18 single-page application with TailwindCSS & Lucide icons
├── firebase-config.js       # Firebase SDK configuration (Auth, Firestore, Realtime Database)
├── server.py                # FastAPI REST API serving wallet transfers & static files
├── requirements.txt         # Production Python package dependencies
├── run.bat                  # One-click Windows startup script
├── run.sh                   # One-click Linux/macOS startup script
├── LICENSE                  # MIT open-source software license
└── README.md                # Project documentation & architecture
```

---

## 🗄️ Database & Account Architecture

PaySphere enforces strict multi-tenant isolation across Cloud Firestore:

```
Cloud Firestore
├── users/
│   └── {user_doc_id}/                 # Unique sanitized User Document (e.g. yoju1907_gmail_com)
│       ├── balance: 448300.00          # Dynamic Per-User Wallet Balance
│       ├── email: "yoju1907@gmail.com"
│       ├── uid: "USER-12345"
│       │
│       ├── transactions/               # Isolated Subcollection: User's Transactions Only
│       │   └── TXN-87711               # Itemized Transaction Document
│       │
│       └── high_risk_transactions/     # Dedicated Subcollection: Per-User High Risk Audit Log
│           ├── __meta__                # Initialization Anchor Document
│           └── TXN-90417               # High-Risk / Flagged Transaction Document
│
└── transactions/                       # Global System Audit Collection
    └── TXN-87711                       # System-Wide Master Audit Document
```

---

## 🛡️ Smart Multi-Tier Risk & Fraud Engine

Transactions are evaluated in real time using velocity counts, transfer amounts, recipient history, and cumulative 1-hour transaction volume:

| Risk Tier | Conditions | Action |
| :--- | :--- | :--- |
| **`✅ Low Risk (Instant Micro-Pay)`** | Transfers < ₹1,000 (Micro-payments) | Instant Execution (No 2FA modal) |
| **`✅ Low Risk (Verified)`** | Transfers < ₹50,000 (1st or 2nd transfer in 1 hr) | Instant Execution |
| **`🔒 Medium Risk (2FA Verified)`** | Single transfer $\ge$ ₹50,000 OR Bank Wire OR 3rd/4th repeat transfer OR Cumulative $\ge$ ₹100,000 | Mandatory 2FA OTP Verification |
| **`⚠️ High Risk (Flagged Alert)`** | High velocity (5+ rapid transfers in 1 hr) OR Cumulative $\ge$ ₹500,000 OR Single transfer $\ge$ ₹50 Lakhs | High Alert Warning + 2FA Modal + Saved to `high_risk_transactions` |

---

## ✨ Core Features

### 1. 🔑 Firebase Authentication & Per-User Isolation
- **Dual Auth Modes**: Email/Password Sign Up & Sign In, plus Google Account OAuth.
- **Strict Data Isolation**: Each user account maintains an independent balance and an isolated Firestore transaction history.

### 2. 🚨 Automated Per-User `high_risk_transactions` Subcollection
- Every registered user in Cloud Firestore features a dedicated `high_risk_transactions` subcollection.
- High-risk or flagged transactions are automatically added to this subcollection **only if that specific user performed them**.

### 3. 🕒 Chronological IST Sorting
- All transactions are parsed using exact UNIX epoch millisecond timestamps and rendered in clean Indian Standard Time (`YYYY-MM-DD HH:mm IST`), guaranteeing newly created payments always rank **#1 at the top of the ledger**.

### 4. 💵 Wallet Top-Up & Financial Telemetry
- **Add Money Tab**: Top up funds instantly; synced to Cloud Firestore.
- **Smart Insights**: GenAI AI financial advisor for spending summaries.
- **AI Risk Simulator**: Interactive range sliders for money amount, transfer velocity, and geolocation distance.

---

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Start Backend Server**:
   ```bash
   python server.py
   ```

3. **Launch Application**:
   Open **[`http://localhost:8000`](http://localhost:8000)** in any browser.

---

## 📄 License & Author

Authored by **Yojasree Vankireddi**  
- **GitHub**: [@Yojasree1905](https://github.com/Yojasree1905)  
- **Email**: yojasreevankireddis@gmail.com  
- **Institution**: Vellore Institute of Technology (VIT), Vellore  

Licensed under the [MIT License](LICENSE).
