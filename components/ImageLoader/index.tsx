"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import BasicLoader from "../BasicLoader";

interface TProps {
  src?: string;
}
const ImageLoader = ({ src }: TProps) => {
  const [loading, setLoading] = useState<boolean>(!!src);

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loader}>
          <BasicLoader />
        </div>
      )}
      {src && (
        <img
          src={src}
          alt="upload"
          style={loading ? { display: "none" } : {}}
          onLoad={() => setLoading(false)}
        />
      )}
    </div>
  );
};

export default ImageLoader;
