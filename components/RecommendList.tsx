import React, { useState, useEffect, use } from "react";
import { Card, InfiniteScroll, Toast, Grid } from "antd-mobile";
import Styles from "../styles/recommendList.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";

export type RecommendProps = {
  poiId: number;
  restaurantName: string;
  commentScore?: number;
  cuisine?: string;
  recommendType?: number;
  averagePrice?: number;
  imageUrls: string[];
  [key: string]: any;
};

const recommendData: RecommendProps[] = [
  {
    poiId: 1,
    restaurantName: "麦当劳",
    commentScore: 4.5,
    cuisine: "快餐",
    recommendType: 1,
    averagePrice: 20,
    imageUrls: [
      "https://dimg04.c-ctrip.com/images/0101012000axydoyu1EB7_D_405_450_Q80.gif",
      "https://dimg04.c-ctrip.com/images/0104w12000axydp73BED3_D_405_450_Q80.gif",
      "https://dimg04.c-ctrip.com/images/0100q12000axydcco4595_D_405_450_Q80.jpg?proc=autoorient",
      "https://dimg04.c-ctrip.com/images/0104a12000axydsvyBDA8_D_405_450_Q80.jpg?proc=autoorient",
      "https://dimg04.c-ctrip.com/images/0102h12000axydjwr3286_D_405_450_Q80.jpg?proc=autoorient",
    ],
  },
  {
    poiId: 2,
    restaurantName: "麦当劳",
    commentScore: 4.5,
    cuisine: "快餐",
    recommendType: 1,
    averagePrice: 20,
    imageUrls: [
      "https://dimg04.c-ctrip.com/images/0101012000axydoyu1EB7_D_405_450_Q80.gif",
      "https://dimg04.c-ctrip.com/images/0104w12000axydp73BED3_D_405_450_Q80.gif",
      "https://dimg04.c-ctrip.com/images/0100q12000axydcco4595_D_405_450_Q80.jpg?proc=autoorient",
      "https://dimg04.c-ctrip.com/images/0104a12000axydsvyBDA8_D_405_450_Q80.jpg?proc=autoorient",
      "https://dimg04.c-ctrip.com/images/0102h12000axydjwr3286_D_405_450_Q80.jpg?proc=autoorient",
    ],
  },
];

const RecommendList: React.FC = () => {
  const [recommendList, setRecommendList] = useState<RecommendProps[]>(recommendData);
  const [hasMore, setHasMore] = useState(true);
  const [PageIndex, setPageIndex] = useState(0);

  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/recommendDetails?id=${id}`);
  };

  const fetchRecommendList = async (filterPayload: any) => {
    try {
      const payload = { ...filterPayload };
      const response = await fetch(`/api/getRecommendList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const res = await response.json();
      return res;
    } catch (error) {
      Toast.show("加载餐厅列表失败，请重试");
    }
  };

  // 注意React18 在开发环境中除了必要的挂载之外，还 "额外"模拟执行了一次组件的卸载和挂载。
  // 这是为了确保在开发环境中，组件的状态始终与生产环境中的状态保持一致。
  // useEffect(() => {
  //   fetchRecommendList(filterItems);
  // }, [filterItems]);

  /**
   * 瀑布屏，当用户页面滚动到底部 threshold (默认为 250px)时调用。
   * PageIndex：第几次加载
   * PageSize：每次加载的数量
   * 针对RecommendId去重，防止重复
   */
  // async function loadMore() {
  //   console.log("loadMore");
  //   setPageIndex((val) => val + 1);
  //   const res = await fetchRecommendList({ ...filterItems, PageIndex: PageIndex });
  //   setRecommendList((val) => {
  //     const filteredItems = res.items.filter(
  //       (item: any) => !val.some((v: any) => v.RecommendId === item.RecommendId)
  //     );
  //     return [...val, ...filteredItems];
  //   });
  //   setHasMore(res.items.length > 0);
  // }

  function getImageAspectRatio(imageUrl: string) {
    const img = document.createElement("img");
    img.src = imageUrl;
    console.log(imageUrl);

    return new Promise((resolve, reject) => {
      img.onload = function () {
        const aspectRatio = img.width / img.height;
        resolve(Math.round(80 / aspectRatio));
      };

      img.onerror = function () {
        reject(new Error("Failed to load image"));
      };
    });
  }

  const [flag, setFlag] = useState(false);
  // 根据recommendList中每一项的.imageUrls[0]获取图片的宽高，并设置为recommendList中每一项的height
  useEffect(() => {
    recommendList.forEach(async (item, i) => {
      const aspectRatio: any = await getImageAspectRatio(item.imageUrls[0]);
      recommendList[i].height = aspectRatio;
      setRecommendList([...recommendList]);
    });
  }, []);

  return (
    <div>
      {recommendList &&
        recommendList.map((item) => (
          <Card
            // onClick={() => handleClick(item.RecommendId)}
            className={Styles.card}
            key={item.poiId}
            title={item.Name}
            extra={
              <div>
                <span>评分：{item.CommentScore}</span>
              </div>
            }
          >
            {item.height && <Image src={item.imageUrls[0]} className={Styles.restImg} alt={"餐厅图片"} width={80} height={item.height} />}
            {/* <div>地址：{item.ZoneName}</div>
            <div>菜系：{item.CuisineName}</div>
            <div>评价数量：{item.CommentCount}</div>
            <div>人均消费：{item.AveragePrice}</div>{" "} */}
          </Card>
        ))}
      {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
    </div>
  );
};

export default RecommendList;
