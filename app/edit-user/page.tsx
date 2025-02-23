'use client';

import { auth, updateProfileImage } from '@/my-firebase';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Avatar, Upload } from 'antd';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './styles.module.scss';

const { Dragger } = Upload;

const EditUser = () => {
  const [user] = useAuthState(auth);

  const props: UploadProps = {
    name: 'file',
    showUploadList: false,
    onChange(info) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, info.file.name);
        uploadBytes(storageRef, info.file.originFileObj as any).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            updateProfileImage(url);
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
  };

  return (
    <div className={styles.container}>
      <h2>Current image:</h2>
      {user?.photoURL && <Avatar src={user?.photoURL!} className={styles.avatar} />}
      <Dragger {...props}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
        <p className='ant-upload-hint'>
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
        </p>
      </Dragger>
    </div>
  );
};

export default EditUser;
