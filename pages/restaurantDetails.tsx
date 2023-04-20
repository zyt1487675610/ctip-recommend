import React, { useEffect, useState } from "react";
import { NavBar, Swiper, Toast, Card } from "antd-mobile";
import { RightOutline, AntOutline } from "antd-mobile-icons";
import { useRouter } from "next/router";
import { RestaurantProps } from "../components/RestaurantList";
import Styles from "../styles/restaurantDetails.module.scss";
import Imperative from "../components/Imperative";
import RecommendList from "../components/RecommendList";

const RestaurantDetails: React.FC = () => {
  const [restaurant, setRestaurant] = useState<RestaurantProps | undefined>(undefined);
  const router = useRouter();
  const id = parseInt(router.query.id as string);

  const fetchRestaurantDetails = async (id: number) => {
    try {
      const params = new URLSearchParams({
        id: id?.toString(),
      });
      const response = await fetch(`/api/restaurant?${params.toString()}`);
      const data = await response.json();
      console.log("data", data);
      setRestaurant(data.RestaurantInfo);
    } catch (error) {
      Toast.show("Failed to fetch restaurant details.");
    }
  };

  useEffect(() => {
    id && fetchRestaurantDetails(id);
    console.log("restaurant.FacilityNames", restaurant?.FacilityNames);
  }, [id]);

  return (
    <div>
      <NavBar
        onBack={() => {
          router.back();
        }}
      >
        餐厅详情
      </NavBar>
      {restaurant && (
        <>
          <Swiper autoplay loop>
            {restaurant.CoverImageUrls?.map((item: string, index: number) => (
              <Swiper.Item key={index}>
                <img
                  style={{ width: "375px", height: "235px" }}
                  src={item}
                  alt={`Image for ${index}`}
                  className={Styles.imgSwiper}
                  onClick={() => {
                    Toast.show(`You clicked on image for ${index}`);
                  }}
                />
              </Swiper.Item>
            ))}
          </Swiper>
          <Card className={Styles.headbox}>
            <div className={Styles.resName} style={{ marginBottom: "15px" }}>
              <h2>{restaurant.Name}</h2>
            </div>
            <div className={Styles.restLableAndPrice} style={{ alignItems: "center" }}>
              <div className={Styles.restaurantcountbox} style={{ marginBottom: "0px" }}>
                {/* 评分 */}
                <div className={Styles.restScore}>
                  <span className={Styles.restNum}>{restaurant.CommentScore}</span>
                  <span className={Styles.restText}>分</span>
                </div>
                {/* 点评数*/}
                <div className={Styles.restCommentCount}>
                  <span>{restaurant.CommentCount}条点评</span>
                  <span className={Styles.iconRight}>
                    <RightOutline />
                  </span>
                </div>
              </div>
              <span className={Styles.averagePrice}>人均：{restaurant.AveragePrice}</span>
              <span className={Styles.line} style={{ marginTop: "0px" }}></span>

              <span>{restaurant.Cuisine.Name}</span>
            </div>

            {/* 营业时间 */}
            <div className={Styles.businessTime}>
              <div className={Styles.leftBox}>
                <p>
                  {restaurant.OpenStatus}
                  营业时间： {restaurant.OpenTime}
                </p>
                {restaurant.FacilityName && (
                  <p className={Styles.facilityNameList}>
                    <span className={Styles.facilityName}>{restaurant.FacilityName}</span>
                  </p>
                )}
              </div>
              <div className={Styles.rightBox}>
                <span>
                  <RightOutline />
                </span>
                <div className={Styles.line}></div>
                <div className={Styles.iconBox}>
                  <span className={Styles.iconRight}></span>
                  {restaurant.BookTelList ? (
                    <React.Fragment>
                      {/* <Imperative phoneNumber={restaurant.BookTelList?restaurant.BookTelList:123} /> */}
                      <Imperative phoneNumber={restaurant.BookTelList || 123} />
                    </React.Fragment>
                  ) : (
                    <span>抱歉商家暂未上传电话</span>
                  )}
                  <p className={Styles.iconTex}>电话</p>
                </div>
              </div>
            </div>
            {/* 地址 */}
            <div className={Styles.phoneAndMap}>
              <div className={Styles.leftBox}>
                <p className={Styles.adress}>{restaurant.Address}</p>
                <p className={Styles.routePlanning}>{restaurant.RoutePlanning}</p>
              </div>
              <div className={Styles.rightBox} style={{ width: "12px" }}>
                <span className={Styles.iconRight}>
                  <RightOutline />
                </span>
                <div className={Styles.line}></div>
              </div>
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
            <div className={Styles.hotTags}>
              <div className={Styles.item}>最新</div>
              <div className={Styles.item}>好评{restaurant.CommentCount}</div>
              <div className={Styles.item}>差评{restaurant.CommentCount}</div>
            </div>
            {/* 点评项 */}
            <div className={Styles.commentItem}>
              <div className={Styles.itemTitle}>
                <div className={Styles.userHeader}>
                  <img className={Styles.heaDefault} src="https://dimg04.c-ctrip.com/images/fd/headphoto/g6/M01/1B/02/CggYtFcMRYKAc-lEAAEA2k_9xjc964_C_180_180.jpg" />
                </div>
                <div className={Styles.nameMsg}>
                  <div className={Styles.titleName}>
                    <p className={Styles.name}>阿瑟风控能力</p>
                  </div>
                </div>
              </div>
              <div>
                <span className={Styles.itemDes}>味道不错，口味也不错，服务态度也不错，环境也不错，价格也不错，总体来说还是不错的，下次还会来的</span>
              </div>
            </div>
            <div className={Styles.commentItem}>
              <div className={Styles.itemTitle}>
                <div className={Styles.userHeader}>
                  <img className={Styles.heaDefault} src="https://dimg04.c-ctrip.com/images/0Z83q120008ofvlvc8174_C_180_180.jpg" />
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
                  <img className={Styles.heaDefault} src="https://dimg04.c-ctrip.com/images/fd/headphoto/g6/M01/1B/02/CggYtFcMRYKAc-lEAAEA2k_9xjc964_C_180_180.jpg" />
                </div>
                <div className={Styles.nameMsg}>
                  <div className={Styles.titleName}>
                    <p className={Styles.name}>阿瑟风控能力</p>
                  </div>
                </div>
              </div>
              <div>
                <span className={Styles.itemDes}>味道不错，口味也不错，服务态度也不错，环境也不错，价格也不错，总体来说还是不错的，下次还会来的</span>
              </div>
            </div>
          </div>

          {/* 更多推荐 */}
          {/* <div className={Styles.recommandBox}>
            <div className={Styles.wfContentTitle}>更过推荐</div>
            <div className={Styles.wfList}>
              <ul className={Styles.container}>
                <div className={Styles.wfItem}>
                  <div className={Styles.imageView}>
                    <div className={Styles.itemImage}>
                      <img src="https://dimg04.c-ctrip.com/images/0102e12000a4pstwrD754.png" alt="1" />
                    </div>
                  </div>
                  <div className={Styles.distanceDesc}>
                    <p>2022美食林精选榜</p>
                    <p>美食打卡世界</p>
                    <img src="https://pages.ctrip.com/you/foods/crn/detail/detail_page_finalists_bg_icon.png" alt="2" />
                  </div>
                </div>
                <div className={Styles.wfItem}>
                  <div className={Styles.imageView}>
                    <div className={Styles.itemImage}>
                      <img src="https://youimg1.c-ctrip.com/target/10070q000000h3nzk0D75_D_600_500_Q80.jpg?proc=autoorient" alt="1" />
                    </div>
                  </div>
                  <div className={Styles.distanceDesc}>
                    <p>2022美食林精选榜</p>
                    <p>美食打卡世界</p>
                    <img src="https://pages.ctrip.com/you/foods/crn/detail/detail_page_finalists_bg_icon.png" alt="2" />
                  </div>
                </div>
              </ul>
            </div>
          </div> */}
          <RecommendList />
        </>
      )}
    </div>
  );
};

export default RestaurantDetails;
