"use client";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import { auth, signInWithGoogle } from "@/my-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Paths from "@/constants/path";
import { Button, Spin } from "antd";

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
