import React, { useState, useRef, useEffect } from "react";
import { ActionSheet, Button, Dialog, Space, Toast } from "antd-mobile";
// import { DemoBlock } from 'demos'
import type { Action, ActionSheetShowHandler } from "antd-mobile/es/components/action-sheet";
import { PhoneFill } from "antd-mobile-icons";
import Styles from "./Action.module.scss";
import { useRouter } from "next/router";
import { RestaurantProps } from "./RestaurantList";
// import Styles from "../styles/restaurantDetails.module.scss";

interface Props {
  phoneNumber: number;
}
const Imperative: React.FC<Props> = ({phoneNumber}) => {
  const handler = useRef<ActionSheetShowHandler>();
  const actions: Action[] = [
    {
      text: phoneNumber,
      key: "copy",
    },
    {
      text: "取消",
      key: "cancel",
      onClick: () => {
        handler.current?.close();
      },
    },
  ];
  return (
    <PhoneFill
      style={{ cursor: 'pointer' }}
      onClick={() => {
        handler.current = ActionSheet.show({
          actions,
          onClose: () => {
            // Toast.show("动作面板关闭");
          },
        });
      }}
    />
  );
};

export default Imperative;
