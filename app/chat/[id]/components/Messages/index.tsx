'use client';

import { IMessage } from '@/types/chat.types';
import { User } from 'firebase/auth';
import { useRef, useEffect } from 'react';
import MessageItem from './components/MessageItem';
import styles from './styles.module.scss';

interface IMessages {
  messages: IMessage[];
  user: User | null | undefined;
}

const Messages = ({ messages, user }: IMessages) => {
  const container = useRef<HTMLDivElement>(null);
  const last = useRef<HTMLDivElement>(null);

  const getFocus = () => {
    setTimeout(() => {
      if (last.current) {
        last.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
  };

  useEffect(getFocus, [messages]);

  const sorted = messages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return (
    <div className={styles.messages} ref={container}>
      {sorted.map((item, i) => (
        <MessageItem
          key={item.uid}
          info={item}
          user={user}
          ref={sorted[sorted.length - 1] === sorted[i] ? last : null}
        />
      ))}
    </div>
  );
};

export default Messages;
