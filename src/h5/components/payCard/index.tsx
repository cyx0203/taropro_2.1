import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { View, Text, Image, Radio, Button } from "@tarojs/components";
import { Root } from "../../core/root";
export default function index(props) {
  const handleDetail = props.handleDetail;
  const handleCheckedData = props.handleCheckedData;
  const changeCheck = () => {
    props.data.checked = !props.data.checked;
    handleCheckedData(props.data, index);
  };
  const detailBtn = (item, index) => {
    handleDetail(item, index);
  };
  return (
    <Root hashData={styles}>
      <View className={styles.payment_info}>
        <View className={styles.uppart}>
          <View className={styles.pay_type}>{props.data.title}</View>
          <View className={styles.pay_date}>{props.data.date}</View>
        </View>
        <View className={styles.middle}>
          <View className={styles.middle_left}>
            {props.data && props.data.info
              ? props.data.info.map((item, index) => {
                  return (
                    <View className={styles.info_item} key={index}>
                      <View className={styles.info_label}>{item.label}</View>
                      <View className={styles.info_value}>{item.value}</View>
                    </View>
                  );
                })
              : ""}
          </View>
          <View className={styles.middle_right}>
            <Image src={props.data.img} className={styles.middle_right_img} />
          </View>
        </View>
        <View className={styles.next}>
          {props.data.hasOwnProperty("arrearage") ? (
            <View
              className={styles.next_left}
              onClick={!props.radioDisabled && changeCheck}
              style={{
                display: props.data.hasOwnProperty("arrearage") ? "" : "none"
              }}
            >
              <Radio
                className={styles.radio_btn}
                checked={props.data.checked}
                disabled={props.radioDisabled}
              ></Radio>
              <Text>待缴费：{props.data.arrearage}元</Text>
            </View>
          ) : (
            <View className={styles.next_left}>
              <Text>金额：{props.data.money}元</Text>
            </View>
          )}

          <View className={styles.next_right}>
            {props?.btns ? (
              props.btns.length > 0 ? (
                props.btns.map((item,index) => {
                  return <Button className={styles.btn} 
                  onClick={() => detailBtn(props.data, index)}>{item.txt}</Button>;
                })
              ) : null
            ) : (
              <Button
                className={styles.btn}
                onClick={() => detailBtn(props.data,0)}
              >
                详情
              </Button>
            )}
          </View>
        </View>
      </View>
    </Root>
  );
}
