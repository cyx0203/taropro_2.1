import React, { useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import QRCode from "qrcode-react";
import {
  Comp_Menu,
  Comp_MenuTab,
  Comp_UserInforCard,
  Comp_Indexes,
  Comp_Nav,
  Comp_BtnList,
  Comp_UserECard
} from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import "./style/index.scss";
import { Root } from "../../../core/root";
import { AtButton } from "taro-ui";

//模板主体
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_SCWJYY_patientInfo_index",
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
        [nda.Btns],
        () => {
          setBtns(nda.Btns);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });

  const [patientInfo, setPatientInfo] = useState(GPage.Data.patientInfo);
  const [Btns, setBtns] = useState(GPage.Data.Btns);
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
    <Root>
      <View className="patientInfo">
        <View className="content_main">
          <View className="uppart">
            <View className="QRCode">
              <QRCode
                size={150}
                value={patientInfo.QRCode}
                logo={patientInfo.QRCode}
                logoWidth={30}
                logoHeight={30}
              />
            </View>
            <View className="tips">{patientInfo.tipText}</View>
          </View>
          <View className="info">
            {GPage.Map(
              patientInfo.info,
              (item: any, index: any) => {
                return (
                  <View className="item">
                    <View className="label">{item.label}</View>
                    <View className="value">{item.value}</View>
                  </View>
                );
              },
              ""
            )}
          </View>
        </View>
        <View className="btnArea">
          <AtButton
            customStyle={{ display: Btns.hasOwnProperty("btn1") ? "" : "none" }}
            type="primary"
            className="btn1"
            onClick={() => {
              GPage.DoWXCall("onClickOne");
            }}
          >
            {Btns.btn1}
          </AtButton>
          <AtButton
            customStyle={{ display: Btns.hasOwnProperty("btn2") ? "" : "none" }}
            type="primary"
            className="btn2"
            onClick={() => {
              GPage.DoWXCall("onClickTwo");
            }}
          >
            {Btns.btn2}
          </AtButton>
        </View>
      </View>
    </Root>
  );
}
