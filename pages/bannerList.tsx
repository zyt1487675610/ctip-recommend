import React, { useState, useRef } from "react";
import { Card, InfiniteScroll,NavBar } from "antd-mobile";
import Styles from "../styles/recommendList.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import FilterBar from "../components/FilterBar";

export type RecommendProps = {
  restaurantId: number;
  height: number;
  restaurantName: string;
  imageUrls: string[];
  commentScore?: number;
  cuisine?: string;
  recommendType?: number;
  averagePrice?: number;
  feature?: string;
  // [key: string]: any;
};

interface recommendListProps {
  PageIndex: number;
  PageSize: number;
}

const RecommendList: React.FC = () => {
  const [recommendList, setRecommendList] = useState<RecommendProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [PageProp, setPageProp] = useState({ PageSize: 10, PageIndex: 0 });

  // 点击推荐卡片跳转到详情页
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/restaurantDetails?id=${id}`);
  };

  // 请求推荐列表数据
  async function fetchRecommendList(payload: recommendListProps) {
    const response = await fetch("/api/getRecommendList", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }

  /**
   * 获取图片的宽高比
   * @param imageUrl  图片地址
   * @returns  图片的宽高比
   * 注意：这里使用了Promise，因为获取图片的宽高比是异步的，需要等待图片加载完成后才能获取到图片的宽高比
   * 此函数功能原本是为了实现两列瀑布流布局中各个Card中图片的高度不一致,然而根据爬取的数据发现
   * 餐厅图片（recommendType=2）的图片的宽高比全是固定的1.2，所以页面中的餐厅图片的高度都是一样的
   * 后续如果爬取更多recommendType类型的数据，会使得图片的高度不一致
   */
  function getImageAspectRatio(imageUrl: string) {
    const img = document.createElement("img");
    img.src = imageUrl;
    return new Promise((resolve, reject) => {
      img.onload = function () {
        const aspectRatio = img.width / img.height;
        resolve(aspectRatio);
      };
      img.onerror = function () {
        reject(new Error("加载图片失败"));
      };
    });
  }

  // 无限加载，当用户页面滚动到底部 threshold (默认为 250px)时调用。
  async function loadMore() {
    setPageProp((val) => ({ ...val, PageIndex: val.PageIndex + 1 }));

    const res = await fetchRecommendList(PageProp);
    res.items.forEach(async (item: RecommendProps, i: number) => {
      const aspectRatio: any = await getImageAspectRatio(item.imageUrls[0]);
      // 给res中的每一项添加height属性，用于设置图片的高度.180px是图片的宽度
      res.items[i].height = 180 / aspectRatio;
    });

    setRecommendList((val) => {
      const filteredItems = res.items.filter(
        (item: RecommendProps) => !val.some((v: RecommendProps) => v.restaurantId === item.restaurantId)
      );
      return [...val, ...filteredItems];
    });
    setHasMore(res.items.length > 0);
  }

  // 瀑布流，通过设置grid-row-end属性实现
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const handleSetGridRowEnd = (index: number) => {
    const cardRef = cardRefs.current[index];
    if (!cardRef) return;
    const height = cardRef.offsetHeight;
    // grid-row-end: <line> | <span>;设置元素在网格布局中结束的位置
    cardRef.style.gridRowEnd = `span ${Math.ceil(height)}`;
  };

  return (
    <>
      <NavBar
        className={Styles.title}
        onBack={() => {
          router.back();
        }}
      >
        相关推荐
      </NavBar>
      {/* <div className={Styles.title}>相关推荐</div> */}
      <FilterBar />
      <div className={Styles.container}>
        {recommendList &&
          recommendList.map((item, i) => (
            <div key={item.restaurantId} ref={(ref) => (cardRefs.current[i] = ref)}>
              <Card
                onClick={() => handleClick(item.restaurantId)}
                className={Styles.recommendCard}
                bodyStyle={{ padding: "0" }}
                key={item.restaurantId}
              >
                <Image
                  src={item.imageUrls[0]}
                  className={Styles.restImg}
                  alt={"餐厅图片"}
                  width={180}
                  height={item.height || 150}
                  onLoad={() => handleSetGridRowEnd(i)}
                />
                <div className={Styles.infoBox}>
                  <h3>{item.restaurantName}</h3>
                  <span className={Styles.score}>{item.commentScore}</span>
                  <span className={Styles.price}>{item.averagePrice}</span>
                  <span className={Styles.cuisine}>{item.cuisine}</span>
                  <div className={Styles.feature}>{item.feature}</div>
                </div>
              </Card>
            </div>
          ))}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </>
  );
};

export default RecommendList;
