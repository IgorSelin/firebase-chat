import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';

export const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

export const auth = getAuth(app);
export const db = getFirestore(app);

export const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
    const q = query(collection(db as any, 'users'), where('uid', '==', user.uid));
    const { docs } = await getDocs(q);
    if (docs.length === 0) {
      await addDoc(collection(db as any, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
        photo: user.photoURL,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => signOut(auth);

export const updateProfileImage = async (photo: string) => {
  await updateProfile(auth.currentUser!, {
    photoURL: photo,
  });
};
