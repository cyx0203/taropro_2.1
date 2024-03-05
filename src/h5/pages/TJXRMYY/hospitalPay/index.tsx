import React, { useEffect, useState } from "react";
import { AtButton, AtInput, AtToast } from "taro-ui";
import { View } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "../../../core/root";
import { Comp_Menu, Comp_Nav, Comp_UserInforCard } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_hospitalPay_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.patientInfo],
        () => {
          setPatientInfo(nda.patientInfo);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.footerBtn],
        () => {
          setFooterBtn(nda.footerBtn);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [patientInfo, setPatientInfo] = useState(GPage.Data.patientInfo);
  const [footerBtn, setFooterBtn] = useState(GPage.Data.footerBtn);
  const [payment, setPayment] = useState("");
  const [tipOpen, setTipOpen] = useState(false);
  const changePayment = value => {
    setPayment(value);
  };
  useEffect(() => {
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  return (
    <Root hashData={styles}>
      <View className={styles.hospitalPay}>
        <View className={styles.upper}>
          <View className={styles.title}>个人信息</View>
          <View className={styles.patientInfo}>
            {GPage.Map(
              patientInfo,
              (item: any, index: any) => {
                return (
                  <View className={styles.infoItem}>
                    <View className={styles.infoLabel}>{item.label}：</View>
                    <View className={styles.infoValue}>{item.value}</View>
                  </View>
                );
              },
              ""
            )}
          </View>
        </View>
        <View className={styles.payment}>
          <View className={styles.title}>请输入充值金额</View>
          <View className={styles.payNumber}>
            <AtInput
              name="payment"
              type="number"
              title="充值金额："
              value={payment}
              onChange={value => {
                changePayment(value);
              }}
            />
          </View>
        </View>
        <AtButton
          onClick={() => {
            if (payment === "") {
              setTipOpen(true);
              return 0;
            }
            GPage.DoWXCall("paymentClick", payment);
          }}
        >
          {footerBtn}
        </AtButton>
        <AtToast
          isOpened={tipOpen}
          text="请输入充值金额"
          icon="close-circle"
          duration={1500}
          onClose={() => setTipOpen(false)}
        ></AtToast>
      </View>
    </Root>
  );
}
