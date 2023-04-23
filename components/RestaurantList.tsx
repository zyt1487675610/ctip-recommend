import React, { useState, useEffect, use } from "react";
import { Card, InfiniteScroll, Toast, Grid } from "antd-mobile";
import Styles from "../styles/restaurantList.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";

export type RestaurantProps = {
  // id: number;
  // name: string;
  // rate: number;
  // distance: number;
  // address: string;
  // cuisine: string;
  // commentCount: number;
  // averagePrice: number;
  // businessHours: string;
  // phone: string;
  // introduction: string;
  [key: string]: any;
};
// 筛选条件
type Props = {
  //   data: RestaurantProps[];
  filterItems: {
    PageIndex: number;
    PageSize: number;
  };
};

const RestaurantList: React.FC<Props> = ({ filterItems }) => {
  const [restaurantList, setRestaurantList] = useState<RestaurantProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [PageIndex, setPageIndex] = useState(0);

  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/restaurantDetails?id=${id}`);
  };

  const fetchRestaurantList = async (filterPayload: any) => {
    try {
      const payload = { ...filterPayload };
      const response = await fetch(`/api/getRestaurantList`, {
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
  //   fetchRestaurantList(filterItems);
  // }, [filterItems]);

  /**
   * 无限滚动，当用户页面滚动到底部 threshold (默认为 250px)时调用。
   * PageIndex：第几次加载
   * PageSize：每次加载的数量
   * 针对RestaurantId去重，防止重复
   */
  async function loadMore() {
    console.log("loadMore");
    setPageIndex((val) => val + 1);
    const res = await fetchRestaurantList({ ...filterItems, PageIndex: PageIndex });
    setRestaurantList((val) => {
      const filteredItems = res.items.filter((item: any) => !val.some((v: any) => v.RestaurantId === item.RestaurantId));
      return [...val, ...filteredItems];
    });
    setHasMore(res.items.length > 0);
  }

  return (
    <div>
      {restaurantList &&
        restaurantList.map((item) => (
          <Card className={Styles.card} onClick={() => handleClick(item.RestaurantId)}>
            <Grid columns={3} gap={8}>
              <Grid.Item span={1} className={Styles.gridImg}>
                {/* 如果暂停营业，要加上遮罩层 */}
                <Image src={item.ImageUrl} className={Styles.restImg} alt={"餐厅图片"} width={85} height={85} />
              </Grid.Item>
              <Grid.Item span={2}>
                <div className={Styles.restaurantName}>{item.Name}</div>
                <div className={Styles.restaurantCommentContainer}>
                  {item.CommentScore ? (
                    <div className={Styles.restaurantScore}>
                      {item.CommentScore}分<span className={Styles.restaurantNameIcon}>|</span>
                      <span className={Styles.restaurantCommentCount}>{item.CommentCount}条点评</span>
                      <span className={Styles.restaurantNameIcon}>|</span>
                      <span className={Styles.averagePrice}>￥{item.AveragePrice}/人</span>
                    </div>
                  ) : (
                    <div className={Styles.restaurantNoScore}>暂无评分</div>
                  )}
                </div>

                <div className={Styles.cuisinelocation}>
                  {item.CuisineName}
                  <span> {item.ZoneName}</span>
                </div>
                {/* <div className={Styles.restaurantAddress}>{item.Address}</div> */}
              </Grid.Item>
            </Grid>
          </Card>
        ))}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
};

export default RestaurantList;
