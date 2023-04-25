import React, { useRef } from "react";
import { ActionSheet } from "antd-mobile";
import type { Action, ActionSheetShowHandler } from "antd-mobile/es/components/action-sheet";
import { PhoneFill } from "antd-mobile-icons";
import Styles from "./Action.module.scss";

interface Props {
  phoneNumber: number[];
}
const Imperative: React.FC<Props> = ({ phoneNumber }) => {
  const handler = useRef<ActionSheetShowHandler>();

  const actions: Action[] = phoneNumber.length
    ? phoneNumber.map((number) => ({
        text: number.toString(),
        key: number.toString(),
      }))
    : [
        {
          text: "商家未提供电话",
          key: "empty",
        },
      ];

  actions.push({
    text: "取消",
    key: "cancel",
    onClick: () => {
      handler.current?.close();
    },
  });

  return (
    <PhoneFill
      style={{ cursor: "pointer" }}
      onClick={() => {
        handler.current = ActionSheet.show({ actions });
      }}
    />
  );
};

export default Imperative;
