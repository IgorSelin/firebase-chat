"use client";
import React, { forwardRef, useState } from "react";
import { User } from "firebase/auth";
import styles from "./styles.module.scss";
import { ImageLoader } from "@/components";
import { IMessage } from "@/types/chat.types";
import { dateFormatter } from "@/utils/dateFormatter";
import cn from "classnames";

interface IMessageItem {
  info: IMessage;
  user?: User | null | undefined;
  ref?: HTMLDivElement | null;
}

const MessageItem = forwardRef(({ info, user }: IMessageItem, ref) => {
  const { name, text, time, photo, file, uid: messageID } = info;
  const [selectedPhoto, setFullSize] = useState<string | null>(null);
  const isOwner = info.uid === user?.uid;

  const photoSection = () => (
    <div onClick={() => setFullSize((prev) => (prev ? null : messageID))}>
      <div className={styles.photoContainer}>
        <ImageLoader src={info.file} />
      </div>
      {selectedPhoto === info.uid && (
        <div className={styles.fullSize}>
          <img src={info.file} />
        </div>
      )}
    </div>
  );

  return isOwner ? (
    <div
      className={cn(styles.messageItem, styles.owner)}
      ref={ref as React.ForwardedRef<HTMLDivElement>}
    >
      {file && photoSection()}
      <div className={cn(styles.dateContainer, styles.ownerDate)}>
        <div className={styles.text}>{text}</div>
        <div className={styles.date}>{dateFormatter(time)}</div>
      </div>
    </div>
  ) : (
    <div
      className={styles.messageItem}
      ref={ref as React.ForwardedRef<HTMLDivElement>}
    >
      <div
        className={styles.leftSection}
        style={{ flexDirection: file ? "column" : "row" }}
      >
        <img src={photo} alt="avatar" className={styles.avatar} />
        <div>
          <div>{name}</div>
          <div className={styles.text}>{text}</div>
        </div>
        {file && photoSection()}
      </div>
      <div className={styles.dateContainer}>
        <div className={styles.date}>{dateFormatter(time)}</div>
      </div>
    </div>
  );
});

export default MessageItem;
