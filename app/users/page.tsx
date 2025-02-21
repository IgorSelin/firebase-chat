'use client';

import { ECollections, chatPath } from '@/constants/firebase';
import Paths from '@/constants/path';
import { auth, db, app } from '@/my-firebase';
import { Avatar, Card, Spin } from 'antd';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import styles from './styles.module.scss';

const AllUsers = () => {
  const [user] = useAuthState(auth);
  const [users, loading] = useCollectionData(collection(getFirestore(app) as any, ECollections.Users));
  const [relations] = useCollectionData(collection(getFirestore(app) as any, ECollections.Relations));
  const router = useRouter();
  const addRelHandler = async (value: string) => {
    try {
      const candidate = relations?.find(({ pair }) => pair.includes(value) && pair.includes(user?.uid));
      if (candidate) {
        router.push(chatPath(candidate.path));
      } else {
        const id = window.crypto.randomUUID();
        await addDoc(collection(db as any, ECollections.Relations), {
          pair: [user?.uid, value],
          path: id,
        });
        router.push(chatPath(id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) router.push(Paths.LOGIN);
  }, [user]);

  return loading ? (
    <Spin />
  ) : (
    <div className={styles.container}>
      <div className={styles.title}>Users:</div>
      <div className={styles.usersContainer}>
        {users
          ?.filter(({ uid }) => uid !== user?.uid)
          .map(({ uid: id, name, photo }) => (
            <Card style={{ cursor: 'pointer' }} title={name} key={id} onClick={() => addRelHandler(id)}>
              <Avatar size={64} icon={<img className={styles.avatar} src={photo} />} />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default AllUsers;
