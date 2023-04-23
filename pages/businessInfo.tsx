import React from "react";
import { NavBar, Card } from "antd-mobile";
import { useRouter } from "next/router";
import Styles from "../styles/businessInfo.module.scss";

const businessInfo: React.FC = () => {
  const router = useRouter();
  const { name, openStatus, openTime, address } = router.query;

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
      <Card className={Styles.card}>
        <h2>基本信息</h2>
        <div className={Styles.info}>
          <p className={Styles.label}>营业状态：</p>
          <p className={Styles.value}>{openStatus?.includes("休息中") ? "休息中" : openStatus}</p>
        </div>

        <div className={Styles.info}>
          <p className={Styles.label}>营业时间：</p>
          <p className={Styles.value}>{openTime}</p>
        </div>

        <div className={Styles.separator} />
        <div className={Styles.info}>
          <p className={Styles.label}>地址：</p>
          <p className={Styles.value}>{address}</p>
        </div>
      </Card>
    </div>
  );
};

export default businessInfo;
