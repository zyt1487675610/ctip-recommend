import React, { useEffect, useState } from "react";
import { NavBar, Swiper, Toast, Card } from "antd-mobile";
import { RightOutline, AntOutline } from "antd-mobile-icons";
import { useRouter } from "next/router";
import { RestaurantProps } from "../components/RestaurantList";
import Imperative from "../components/Imperative";
import RecommendList from "../components/RecommendList";
import Styles from "../styles/restaurantDetails.module.scss";
import Comment from "../components/Comment";

const RestaurantDetails: React.FC = () => {
  const [restaurant, setRestaurant] = useState<RestaurantProps | undefined>(undefined);
  const router = useRouter();
  const id = parseInt(router.query.id as string);

  // 获取餐厅详情数据
  const fetchRestaurantDetails = async (id: number) => {
    try {
      const params = new URLSearchParams({
        id: id?.toString(),
      });
      const response = await fetch(`/api/restaurant?${params.toString()}`);
      const data = await response.json();
      console.log("data", data);
      console.log("RestaurantInfo", data.RestaurantInfo);
      setRestaurant(data.RestaurantInfo);
    } catch (error) {
      Toast.show("Failed to fetch restaurant details.");
    }
  };

  useEffect(() => {
    id && fetchRestaurantDetails(id);
  }, [id]);

  function pageToInfo() {
    router.push({
      pathname: "/businessInfo",
      query: {
        name: restaurant?.Name,
        openStatus: restaurant?.DisplayOpenStatus,
        openTime: restaurant?.OpenTime,
        address: restaurant?.Address,
      },
    });
  }

  function pageToMap() {
    router.push({
      pathname: "/map",
      query: {
        name: restaurant?.Name,
        lat: restaurant?.GGCoord.Lat,
        lng: restaurant?.GGCoord.Lng,
        address: restaurant?.Address,
      },
    });
  }

  return (
    <div className={Styles.container}>
      <div className="navbar">
        <NavBar
          onBack={() => {
            router.back();
          }}
          // style={{ backgroundColor: "#fff", position: "fixed", top: 0, left: 0, width: "100%" }}
        >
          餐厅详情
        </NavBar>
      </div>
      {restaurant && (
        <>
          <Swiper
            autoplay
            loop
            indicatorProps={{
              color: "white",
              style: {
                marginBottom: "10px",
              },
            }}
          >
            {restaurant.CoverImageUrls?.map((item: string, index: number) => (
              <Swiper.Item key={index}>
                <img src={item} alt={`餐厅图片 ${index}`} className={Styles.imgSwiper} />
              </Swiper.Item>
            ))}
          </Swiper>

          <Card className={Styles.headbox}>
            <h2>{restaurant.Name}</h2>

            {/* 评分,点评数,人均价格 */}
            <div className={Styles.restLableAndPrice}>
              <div className={Styles.restaurantcountbox}>
                <div className={Styles.restScore}>{restaurant.CommentScore}分</div>
                {/* 点评数*/}
                <div className={Styles.restCommentCount}>
                  <span>{restaurant.CommentCount}条点评</span>
                  <RightOutline />
                </div>
              </div>
              <span>人均：¥{restaurant.AveragePrice}</span>
            </div>

            {/* 营业时间,电话 */}
            <div className={Styles.businessTime} onClick={pageToInfo}>
              <div className={Styles.leftBox}>
                {restaurant.DisplayOpenStatus?.includes("营业中") ? (
                  <p>{restaurant.DisplayOpenStatus}</p>
                ) : (
                  <p>
                    <b> 营业时间：</b>
                    {restaurant.OpenTime}
                  </p>
                )}
              </div>
              <div className={Styles.rightBox}>
                <RightOutline />
                <div className={Styles.line}></div>
                <div className={Styles.iconBox}>
                  <span className={Styles.iconRight}></span>
                  <React.Fragment>
                    <Imperative phoneNumber={restaurant.BookTelList} />
                  </React.Fragment>
                  <p className={Styles.iconTex}>电话</p>
                </div>
              </div>
            </div>

            {/* 地址 */}
            <div className={Styles.mapLine} onClick={pageToMap}>
              <div className={Styles.leftBox}>
                <p className={Styles.Address}>{restaurant.Address}</p>
                {/* <p className={Styles.routePlanning}>{RoutePlanning}</p> */}
              </div>
              <RightOutline className={Styles.rightBox} />
            </div>
          </Card>

          {/* 点评模块 */}
          <div className={Styles.commentBox}>
            <div className={Styles.commentTitle}>
              <div className={Styles.titleLeft}>
                <span>用户点评</span>
                <span className={Styles.titleCount}>({restaurant.CommentCount})</span>
              </div>
              <div className={Styles.titleRight}>
                <span className={Styles.titleRange}>查看全部</span>
                <span className={Styles.iconRight}>
                  <RightOutline />
                </span>
              </div>
            </div>

            <Comment id={id} />
            <div className={Styles.commentItem}>
              <div className={Styles.itemTitle}>
                <div className={Styles.userHeader}>
                  <img
                    className={Styles.heaDefault}
                    src="https://dimg04.c-ctrip.com/images/0Z83q120008ofvlvc8174_C_180_180.jpg"
                  />
                </div>
                <div className={Styles.nameMsg}>
                  <div className={Styles.titleName}>
                    <p className={Styles.name}>神奇小飞侠</p>
                  </div>
                </div>
              </div>
              <div>
                <span className={Styles.itemDes}>环境条件好，食物品质好</span>
              </div>
            </div>
            <div className={Styles.commentItem}>
              <div className={Styles.itemTitle}>
                <div className={Styles.userHeader}>
                  <img
                    className={Styles.heaDefault}
                    src="https://dimg04.c-ctrip.com/images/fd/headphoto/g6/M01/1B/02/CggYtFcMRYKAc-lEAAEA2k_9xjc964_C_180_180.jpg"
                  />
                </div>
                <div className={Styles.nameMsg}>
                  <div className={Styles.titleName}>
                    <p className={Styles.name}>阿瑟风控能力</p>
                  </div>
                </div>
              </div>
              <div>
                <span className={Styles.itemDes}>
                  味道不错，口味也不错，服务态度也不错，环境也不错，价格也不错，总体来说还是不错的，下次还会来的
                </span>
              </div>
            </div>
          </div>

          {/* 更多推荐 */}
          <RecommendList />
        </>
      )}
    </div>
  );
};

export default RestaurantDetails;
