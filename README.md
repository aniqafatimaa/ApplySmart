# ApplySmart 🎯

An AI-powered job application tracker that helps you organize your job search and discover what's actually working.

## Features

- **Application Tracking** — Add, edit, and delete job applications with status updates
- **Live Dashboard** — See your total applications, reply rate, interviews, and rejections at a glance
- **AI Insights** — Gemini AI analyzes your application data and gives personalized feedback on your job search patterns
- **Authentication** — Secure signup and login with Firebase Auth
- **Protected Routes** — Your data is private and only accessible when logged in

## Tech Stack

- **Frontend:** React, Vite, React Router
- **Authentication:** Firebase Authentication
- **Database:** Firebase Firestore
- **AI:** Google Gemini 2.5 Flash API
- **Deployment:** Netlify

## Screenshots

> Dashboard, AI Insights, and Landing Page

## Getting Started

### Prerequisites
- Node.js installed
- Firebase project set up
- Gemini API key from Google AI Studio

### Installation

1. Clone the repo
\```bash
git clone https://github.com/aniqafatimaa/applysmart.git
cd applysmart/client
\```

2. Install dependencies
\```bash
npm install
\```

3. Create a `.env` file inside the `client/` folder
\```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
\```

4. Create a `firebase.js` file inside `client/src/` with your Firebase config
\```js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
\```

5. Start the development server
\```bash
npm run dev
\```

## Live Demo

> apply-smart-aniqa.netlify.app

## Author

**Aniqa Fatima**  
Frontend Developer | BS Information Technology @ GCUF  
[GitHub](https://github.com/aniqafatimaa) · [LinkedIn](https://linkedin.com/in/aniqa-fatima-bb8698335)
