'use client';

import { BasicLoader } from '@/components';
import { ECollections } from '@/constants/firebase';
import { auth, db, app } from '@/my-firebase';
import { IMessage } from '@/types/chat.types';
import { Spin } from 'antd';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Messages, Sender } from './components';
import styles from './styles.module.scss';

const ChatPage = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [photoLoading, setPhotoLoading] = useState(false);
  const [messages, loading] = useCollectionData(collection(getFirestore(app) as any, id as string));

  const sendMessage = async (text: string) => {
    try {
      const basePayload = {
        name: user?.displayName,
        text,
        time: new Date().toISOString(),
        photo: user?.photoURL,
        uid: crypto.randomUUID(),
      };
      await addDoc(collection(db as any, id as string), basePayload);

      await addDoc(collection(db as any, ECollections.lastMessages), {
        ...basePayload,
        to: id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const uploadPhoto = async (value: File) => {
    try {
      setPhotoLoading(true);
      const storage = getStorage();
      const storageRef = ref(storage, value.name);
      const snapshot = await uploadBytes(storageRef, value);
      const url = await getDownloadURL(snapshot.ref);
      addDoc(collection(db as any, id as string), {
        name: user?.displayName,
        time: new Date().toISOString(),
        file: url,
        photo: user?.photoURL,
        uid: user?.uid,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setPhotoLoading(false);
    }
  };

  return loading ? (
    <div className={styles.mainLoader}>
      <Spin />
    </div>
  ) : (
    <div className={styles.container}>
      {photoLoading && (
        <div className={styles.loaderContainer}>
          <BasicLoader />
        </div>
      )}
      <Messages messages={messages as IMessage[]} user={user} />
      <Sender sendMessage={sendMessage} getPhoto={uploadPhoto} photoLoading={photoLoading} />
    </div>
  );
};

export default ChatPage;
