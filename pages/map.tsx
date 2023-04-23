import React from "react";
import { NavBar, Card } from "antd-mobile";
import { useRouter } from "next/router";
import Styles from "../styles/businessInfo.module.scss";
import MapContainer from "../components/MapContainer";

const businessInfo: React.FC = () => {
  const router = useRouter();
  const { name, lat, lng, address } = router.query;
  const data = {
    name: name as string,
    lat: parseFloat(lat as string),
    lng: parseFloat(lng as string),
    address: address as string,
  };

  return (
    <div className={Styles.container}>
      <NavBar
        style={{ backgroundColor: "#fff" }}
        onBack={() => {
          router.back();
        }}
      >
        {name}
      </NavBar>
      <MapContainer data={data} />
    </div>
  );
};

export default businessInfo;
