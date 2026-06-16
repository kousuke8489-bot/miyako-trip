import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// --- authDomain について ---
// iOS Safari は ITP によりサードパーティ(firebaseapp.com)のストレージをブロックするため、
// signInWithRedirect が機能しない。対策として next.config.js で /__/auth/* と /__/firebase/*
// を firebaseapp.com にリバースプロキシし、本番(vercel.app)では authDomain を自ドメインに
// 合わせることで認証フローを完全な同一オリジンにして ITP を回避する。
// ローカル開発 / SSR 時は環境変数の値にフォールバックする。
const authDomain =
  typeof window !== 'undefined' && window.location.hostname.endsWith('.vercel.app')
    ? window.location.host
    : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
