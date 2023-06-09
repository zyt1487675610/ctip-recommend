import React, { FC, useState } from "react";
import Styles from "./Comment.module.scss";
import { Card, InfiniteScroll, Toast, Grid } from "antd-mobile";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  id: Number;
}
// 用户评论数据
const dataFock = [
  {
    id: 1,
    user: {
      id: 1,
      name: "吃饭就别叫我了",
      title: ["美食家"],
      avatar: "https://dimg04.c-ctrip.com/images/0Z83o120008wz7cfq16D7_C_180_180.jpg",
    },
    score: 5,
    content: "味道不错，口味也不错，服务态度也不错，环境也不错，价格也不错，总体来说还是不错的，下次还会来的",
    time: "2021-08-01 12:00:00",
    like: 0,
    reply: 0,
    pictures: [
      "https://youimg1.c-ctrip.com/target/01010120009gx37hwEC66_D_750_562_Q90.jpg?proc=autoorient",
      "https://youimg1.c-ctrip.com/target/100o0q000000gh7ph7DC8_D_750_562_Q90.jpg?proc=autoorient",
      "https://youimg1.c-ctrip.com/target/100c11000000qzw2nE0AB_D_750_562_Q90.jpg?proc=autoorient",
    ],
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "干饭达人",
      title: ["点评家"],
      avatar: "https://dimg04.c-ctrip.com/images/0Z839120008uebqbjF0B1_C_180_180.jpg",
    },
    score: 4.5,
    content:
      "来吃美味的特色料理大餐啦!太划算了秘制牛五花: 有三种秘制的酱汁，在包裹着生菜，吃起来非常清爽还可以搭配着米饭一起吃辣脊骨土豆汤饭:有点重口味，上面是酸菜干，底下是酸酸辣辣牛大骨和士豆参鸡汤饭:料很足，很适合养生的吃货，也可以泡饭吃热腾腾的石锅牛肉粉丝里面有蘑菇、猪肉、粉丝很爽口再来一杯果味烧酒，瞬间就解腻了 #景观餐厅",
    time: "2021-08-01 12:00:00",
    like: 0,
    reply: 0,
    pictures: [
      "https://youimg1.c-ctrip.com/target/01001120009ik577v0C0B_D_750_562_Q90.jpg?proc=autoorient",
      "https://dimg04.c-ctrip.com/images/0104w12000axydp73BED3_D_405_450_Q80.gif",
      "https://dimg04.c-ctrip.com/images/0104a12000axydsvyBDA8_D_405_450_Q80.jpg?proc=autoorient",
      "https://youimg1.c-ctrip.com/target/0101i120008dmomsf4319_D_750_562_Q90.jpg?proc=autoorient",
    ],
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "而后和法国",
      title: ["美食家"],
      avatar: "https://dimg04.c-ctrip.com/images/Z80j1f000001gptsj6828_C_180_180.jpg",
    },
    score: 4,
    content: "秘制牛五花：有三种秘制的酱汁，在包裹着生菜，吃起来非常清爽",
    time: "2021-08-01 12:00:00",
    like: 0,
    reply: 0,
  },
];
const Comment: FC<Props> = (id) => {
  const [commentList, setCommentList] = useState(dataFock);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/commentList`);
  };
  return (
    <div>
      {commentList.map((item) => (
        <div className={Styles.commentItem} key={item.id} onClick={handleClick}>
          <div className={Styles.titleNav}>
            <Image className={Styles.imageView} src={item.user.avatar} width={40} height={40} alt={""} />
            <span className={Styles.userName}>{item.user.name}</span>
            {item.user.title && <span className={Styles.userLable}>{item.user.title}</span>}
            <Image
              className={Styles.commentIcon}
              src="https://pic.616pic.com/ys_img/00/90/78/xp73boLGWs.jpg"
              width={12}
              height={12}
              alt=""
            />
            <span className={Styles.commentScore}>{item.score}分</span>
          </div>

          <div className={Styles.commertContainter}>
            <span className={Styles.commentText}>{item.content}</span>
            {item.pictures && (
              <div className={Styles.commentImageContainer}>
                {item.pictures.map((item, i) => (
                  <Image className={Styles.commentImage} key={i} src={item} width={80} height={80} alt="高清图" />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
