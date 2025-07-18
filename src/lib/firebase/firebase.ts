// import { getApps, getApp, FirebaseOptions, FirebaseApp, initializeApp } from 'firebase/app'

// export const config: FirebaseOptions = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// }

// export const getFirebaseApp = (): FirebaseApp => {
//   // サーバー／クライアント問わず初期化（重複回避）
//   if (getApps().length === 0) {
//     return initializeApp(config)
//   }
//   return getApp()
// }

import { initializeApp, FirebaseOptions, FirebaseApp, getApps, getApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

export const config: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
}

export const getFirebaseApp = getApps().length === 0 ? initializeApp(config) : getApp()

// Realtime Databaseのインスタンスを取得
const database = getDatabase(getFirebaseApp)

export { database } // 他のコンポーネントで利用できるようにエクスポート
