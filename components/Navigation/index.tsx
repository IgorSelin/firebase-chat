"use client";
import Paths from "@/constants/path";
import { auth, logout } from "@/my-firebase";
import { Flex } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export const Navigation = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push(Paths.LOGIN);
  }

  return user ? (
    <>
      <Flex>
        <Link href={Paths.USERS}>All users</Link>
        <Link href={Paths.MAIN_CHAT}>Main chat</Link>
        <Link href={Paths.EDIT}>Profile</Link>
      </Flex>
      <Link href="" onClick={handleLogout}>
        Logout
      </Link>
    </>
  ) : (
    <Link href={Paths.LOGIN}>Login</Link>
  );
};
