import React, { FC, useState } from "react";
import Styles from "./Comment.module.scss";
import { Card, InfiniteScroll, Toast, Grid } from "antd-mobile";
import Image from "next/image";

interface Props {
  id: Number;
}
// 用户评论数据
const dataFock = [
  {
    id: 1,
    user: {
      id: 1,
      name: "张三",
      title: ["美食家", "吃货"],
      avatar: "https://avatars.githubusercontent.com/u/20411997?v=4",
    },
    score: 5,
    content: "味道不错，口味也不错，服务态度也不错，环境也不错，价格也不错，总体来说还是不错的，下次还会来的",
    time: "2021-08-01 12:00:00",
    like: 0,
    reply: 0,
    pictures: [
      "https://dimg04.c-ctrip.com/images/0101012000axydoyu1EB7_D_405_450_Q80.gif",
      "https://dimg04.c-ctrip.com/images/0104w12000axydp73BED3_D_405_450_Q80.gif",
      "https://dimg04.c-ctrip.com/images/0100q12000axydcco4595_D_405_450_Q80.jpg?proc=autoorient",
      // "https://dimg04.c-ctrip.com/images/0104a12000axydsvyBDA8_D_405_450_Q80.jpg?proc=autoorient",
    ],
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "李四",
      title: ["美食家", "吃货"],
      avatar: "https://avatars.githubusercontent.com/u/20411997?v=4",
    },
    score: 4.5,
    content: "环境条件好，食物品质好",
    time: "2021-08-01 12:00:00",
    like: 0,
    reply: 0,
    pictures: [
      "https://dimg04.c-ctrip.com/images/0101012000axydoyu1EB7_D_405_450_Q80.gif",
      "https://dimg04.c-ctrip.com/images/0104w12000axydp73BED3_D_405_450_Q80.gif",
      "https://dimg04.c-ctrip.com/images/0100q12000axydcco4595_D_405_450_Q80.jpg?proc=autoorient",
      // "https://dimg04.c-ctrip.com/images/0104a12000axydsvyBDA8_D_405_450_Q80.jpg?proc=autoorient",
    ],
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "王五",
      title: ["美食家", "吃货"],
      avatar: "https://avatars.githubusercontent.com/u/20411997?v=4",
    },
    score: 4,
    content: "这是一条评论",
    time: "2021-08-01 12:00:00",
    like: 0,
    reply: 0,
    // pictures: [
    //   "https://dimg04.c-ctrip.com/images/0101012000axydoyu1EB7_D_405_450_Q80.gif",
    //   "https://dimg04.c-ctrip.com/images/0104w12000axydp73BED3_D_405_450_Q80.gif",
    //   "https://dimg04.c-ctrip.com/images/0100q12000axydcco4595_D_405_450_Q80.jpg?proc=autoorient",
    //   "https://dimg04.c-ctrip.com/images/0104a12000axydsvyBDA8_D_405_450_Q80.jpg?proc=autoorient",
    // ],
  },
];
const Comment: FC<Props> = (id) => {
  const [commentList, setCommentList] = useState(dataFock);

  return (
    <div>
      {commentList.map((item) => (
        <div className={Styles.commentItem} key={item.id}>
          <div className={Styles.titleNav}>
            <Image className={Styles.imageView} src={item.user.avatar} width={40} height={40} alt={""} />
            <span className={Styles.userName}>{item.user.name}</span>
            {item.user.title && <span className={Styles.userLable}>{item.user.title}</span>}
            <Image className={Styles.commentImage} src="https://pic.616pic.com/ys_img/00/90/78/xp73boLGWs.jpg" width={12} height={12} alt="" />
            <span className={Styles.commentScore}>{item.score}分</span>
          </div>

          <div className={Styles.commertContainter}>
            <span className={Styles.commentText}>{item.content}</span>
            {item.pictures&& <div className={Styles.commentImageContainer}>
              {item.pictures.map((item) => (
                <Image className={Styles.commentImage} src={item} width={80} height={80} alt="" />
              ))}
            </div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
