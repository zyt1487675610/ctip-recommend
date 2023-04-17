import React, { useEffect, useState } from "react";
import { NavBar, Swiper, Toast, Card } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";

import { useRouter } from "next/router";
import { RestaurantProps } from "../components/RestaurantList";
import Styles from "../styles/restaurantDetails.module.scss";

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
  }, [id]);

  const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];

  const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
      <div
        className={Styles.imgSwiper}
        style={{
          background: color,
        }}
        onClick={() => {
          Toast.show(`你点击了卡片 ${index + 1}`);
        }}
      >
        {index + 1}
      </div>
    </Swiper.Item>
  ));

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
            {items}
          </Swiper>
          <Card>
            <h2>{restaurant.Name}</h2>
            <span>评分 {restaurant.CommentScore}</span>
            <span>人均： {restaurant.CommentScore}</span>
            <div>
              <span>
                地址： {restaurant.Address}
                <RightOutline />
              </span>
            </div>
          </Card>

          <div>
            <p>Rate: {restaurant.rate}</p>
            <p>Distance: {restaurant.distance}</p>
            <p>Address: {restaurant.address}</p>
            <p>Cuisine: {restaurant.cuisine}</p>
            <p>Comment Count: {restaurant.commentCount}</p>
            <p>Average Price: {restaurant.averagePrice}</p>
            <p>Business Hours: {restaurant.businessHours}</p>
            <p>Phone: {restaurant.phone}</p>
            <p>Introduction: {restaurant.introduction}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetails;
