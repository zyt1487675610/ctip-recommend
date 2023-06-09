import { useState, useEffect } from "react";
import Head from "next/head";
import { Card, Toast, Button } from "antd-mobile";
import Banner, { Image } from "../components/Banner";
import RestaurantList from "../components/RestaurantList";
// import { mockRestaurantData } from "./api/mock";
import FilterBar from "../components/FilterBar";
import { useRouter } from "next/router";

export default function Home() {
  let imagesList: Image[] = [
    { id: "1", url: "/images/1.jpg", alt: "banner1", name: "十大正宗本帮菜" },
    { id: "2", url: "/images/2.jpg", alt: "banner2", name: "外滩风情餐厅" },
    { id: "3", url: "/images/3.jpg", alt: "banner3", name: "特色风味小吃" },
    { id: "4", url: "/images/5.jpg", alt: "banner5", name: "日式特色美食" },
  ];
  const onClick = () => {
    Toast.show("点击了卡片");
  };
  const filterItems = {
    PageIndex: 1,
    PageSize: 10,
  };
  const [selectedFilters, setSelectedFilters] = useState([]);
  const router = useRouter();
  const handleClick = () => {

    router.push(`/bannerList`);
  };

  return (
    <>
      <Head>
        <title>美食林</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Card style={{ width: "100%", height: "220px" }} onClick={handleClick}>
          <Banner images={imagesList} />
        </Card>
        {/* 实现一个下拉菜单组件,用于选择筛选参数,包括位置\菜系\筛选\只能排序 */}
        <FilterBar />
        <RestaurantList filterItems={filterItems} />
      </div>
    </>
  );
}
