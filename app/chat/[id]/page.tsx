"use client";

import { useState } from "react";
import { Messages, Sender } from "./components";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import styles from "./styles.module.scss";
import { BasicLoader } from "@/components";
import { ECollections } from "@/constants/firebase";
import { IMessage } from "@/types/chat.types";
import { useParams, useRouter } from "next/navigation";
import { auth, db, app } from "@/my-firebase";
import { Spin } from "antd";

const ChatPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id } = useParams();
  const [photoLoading, setPhotoLoading] = useState(false);
  const [messages, loading] = useCollectionData(
    collection(getFirestore(app) as any, id as string),
  );

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

  const uploadPhoto = (value: File) => {
    setPhotoLoading(true);
    const storage = getStorage();
    const storageRef = ref(storage, value.name);
    uploadBytes(storageRef, value).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDoc(collection(db as any, id as string), {
          name: user?.displayName,
          time: new Date().toISOString(),
          file: url,
          photo: user?.photoURL,
          uid: user?.uid,
        }).then(() => setPhotoLoading(false));
      });
    });
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
      <Sender
        sendMessage={sendMessage}
        getPhoto={uploadPhoto}
        photoLoading={photoLoading}
      />
    </div>
  );
};

export default ChatPage;
