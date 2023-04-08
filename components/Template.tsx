import React from "react";
import styles from "./template.module.scss";
import Image from "next/image";

type Props = {};

function Template({}: Props) {
  return (
    <div>
      <div style={{ backgroundColor: "red" }}>template</div>

      <a href="https://www.nextjs.cn/docs" target="_blank" rel="noopener noreferrer">
        <p className={styles.classTemplate}>点击图片跳转到next文档</p>

        <Image
          src="https://www.nextjs.cn/static/images/nextjs-logo.png"
          alt="next Logo"
          width={100}
          height={100}
          priority
        />
      </a>
    </div>
  );
}

export default Template;
