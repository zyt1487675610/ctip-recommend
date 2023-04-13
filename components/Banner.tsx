import React, { FC } from "react";
import styles from "./Banner.module.scss";
import Image from "next/image";
export interface Image {
  id: string;
  url: string;
  alt: string;
  name: string;
}
interface Props {
  images: Image[];
}

const Banner: FC<Props> = (props) => {
  const { images } = props;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        携程美食林
        <span className={styles.title_span}>旅行上的舌尖 美食打卡世界</span>
      </h2>
      <ul className={styles.imgListContainer}>
        {images.map((image) => (
          <div key={image.id} className={styles.imgContainer}>
            <div className={styles.blurBox}>
              <div className={styles.text}>{image.name}</div>
            </div>
            <Image
              src={image.url}
              alt={image.alt}
              width={100}
              height={150}
              className={styles.img}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Banner;
