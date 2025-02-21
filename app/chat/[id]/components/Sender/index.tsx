import { PictureOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

interface ISender {
  sendMessage(value: string): void;
  getPhoto(file: any): void;
  photoLoading: boolean;
}

const Sender = ({ sendMessage, getPhoto, photoLoading }: ISender) => {
  const [message, setMessage] = useState('');
  const [imageAsFile, setImageAsFile] = useState('');

  const handleImageAsFile = (e: any) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const submitMessageHandler = () => {
    if (!message.length) {
      return;
    }
    sendMessage(message);
    setMessage('');
  };

  useEffect(() => {
    if (imageAsFile) {
      getPhoto(imageAsFile);
    }
  }, [imageAsFile]);

  return (
    <form className={styles.sendContainer}>
      <TextArea onChange={({ target }) => setMessage(target.value)} value={message} />
      <Button disabled={photoLoading} onClick={submitMessageHandler}>
        Send
      </Button>
      <label htmlFor='upload-photo'>
        <PictureOutlined className={styles.galleryIcon} />
      </label>
      <input
        name='photo'
        id='upload-photo'
        accept='image/png, image/gif, image/jpeg'
        className={styles.uploadPhoto}
        onChange={handleImageAsFile}
        type='file'
      />
    </form>
  );
};

export default Sender;
