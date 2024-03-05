import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtButton, AtSegmentedControl } from "taro-ui";
//原生组件
import { View,Image } from "@tarojs/components";
//自定义组件
// import { * } from "@/GGCompLib";
import { QRCode } from "taro-code";

//模板主体
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_patientInfo_index",
    //用于接收外部发送的更新数据的事件
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
        [nda.btns],
        () => {
          setbtns(nda.btns);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });

  const [patientInfo, setPatientInfo] = useState(GPage.Data.patientInfo);
  const [btns, setbtns] = useState(GPage.Data.btns);
  const tabList = GPage.Data.tabList || [];
  const [tabCurrent, setTabCurrent] = useState(0);
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
      <View className={styles.patientInfo}>
        <View className={styles.content_main}>
          {tabList && (
            <View style={{ textAlign: "center" }}>
              <AtSegmentedControl
                className={styles.topTab}
                values={tabList}
                onClick={e => {
                  setTabCurrent(e);
                }}
                current={tabCurrent}
              />
            </View>
          )}
          <View className={styles.uppart}>
            {tabCurrent === 0 ? (
              <View>
                <QRCode
                  size={150}
                  text={patientInfo.qrCode}
                  scale={4}
                  errorCorrectLevel="M"
                  typeNumber={2}
                />
              </View>
            ) : null}
            {
              tabCurrent === 1 ? <View className={styles.QRCode}>
                <QRCode
                  size={150}
                  text={patientInfo.EqrCode}
                  scale={4}
                  errorCorrectLevel="M"
                  typeNumber={2}
                />
                <Image src={patientInfo.EqrCodeIconUrl}  className={styles.qrcodeIcon}/>
              </View> : null 
            }
            <View className={styles.tips}>{patientInfo.tipText}</View>
          </View>
          <View className={styles.info}>
            {GPage.Map(
              patientInfo.info,
              (item: any, index: any) => {
                return (
                  <View className={styles.item}>
                    <View className={styles.label}>{item.label}</View>
                    <View className={styles.value}>{item.value}</View>
                  </View>
                );
              },
              ""
            )}
          </View>
        </View>
        <View className={styles.btnArea}>
          <AtButton
            customStyle={{
              display:
                btns && btns.hasOwnProperty("btn1") && btns.btn1 != ""
                  ? ""
                  : "none"
            }}
            type="primary"
            className={styles.btn1}
            onClick={() => {
              GPage.DoWXCall("onClickOne");
            }}
          >
            {btns.btn1}
          </AtButton>
          <AtButton
            customStyle={{
              display:
                btns && btns.hasOwnProperty("btn2") && btns.btn2 != ""
                  ? ""
                  : "none"
            }}
            type="primary"
            className={styles.btn2}
            onClick={() => {
              GPage.DoWXCall("onClickTwo");
            }}
          >
            {btns.btn2}
          </AtButton>
          <AtButton
            customStyle={{
              display:
                btns && btns.hasOwnProperty("btn3") && btns.btn3 != ""
                  ? ""
                  : "none"
            }}
            type="primary"
            className={styles.btn3}
            onClick={() => {
              GPage.DoWXCall("onClickThree");
            }}
          >
            {btns.btn3}
          </AtButton>
        </View>
      </View>
    </Root>
  );
}
