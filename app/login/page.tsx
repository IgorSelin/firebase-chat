'use client';

import Paths from '@/constants/path';
import { auth, signInWithGoogle } from '@/my-firebase';
import { Button, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './styles.module.scss';

const LoginPage = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push(Paths.MAIN_CHAT);
  }, [user]);

  return loading ? (
    <Spin />
  ) : (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <Button onClick={signInWithGoogle}>Login with Google</Button>
      </div>
    </div>
  );
};

export default LoginPage;
