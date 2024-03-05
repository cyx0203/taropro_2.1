import React, { useEffect, useState } from "react";
import { AtModal, AtModalContent } from "taro-ui";
import { View, Image, Text } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "../../../core/root";
import { Comp_Menu, Comp_Nav, Comp_UserInforCard } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import QRCode from "qrcode-react";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_personalCenter_index",
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
        [nda.menuList],
        () => {
          setMenuList(nda.menuList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [patientInfo, setPatientInfo] = useState(GPage.Data.patientInfo);
  const [menuList, setMenuList] = useState(GPage.Data.menuList);
  const [modelShow, setModelShow] = useState(false);
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
      <View className={styles.personalCenter}>
        <Image
          src={GPage.Data.bgImg}
          style={{ height: "190px", width: "100%" }}
        />
        <View className={styles.content}>
          <View className={styles.personInfo}>
            <View
              className={styles.upper}
              onClick={() => {
                GPage.DoWXCall("QRClick");
                setModelShow(true);
              }}
            >
              <Image src={patientInfo.icon} className={styles.img} />
              <Text className={styles.name}>{patientInfo.name}</Text>
              <Image src={patientInfo.qricon} className={styles.qrCodeimg} />
            </View>
            <View className={styles.middle}>
              {patientInfo.hasOwnProperty("type") ? (
                <View className={styles.type}>{patientInfo.type}</View>
              ) : (
                <View></View>
              )}
              <View
                className={styles.changeBtn}
                onClick={() => {
                  GPage.DoWXCall("changePatient");
                }}
              >
                <Image src={patientInfo.btnIcon} className={styles.changeImg} />
                <Text className={styles.changeText}>{patientInfo.btn}</Text>
              </View>
            </View>
            <View className={styles.next}>
              {GPage.Map(
                patientInfo.info,
                (item: any, index: any) => {
                  return (
                    <View className={styles.item}>
                      <View className={styles.label}>{item.label}:</View>
                      <View className={styles.value}>{item.value}</View>
                    </View>
                  );
                },
                ""
              )}
            </View>
          </View>
          <View className={styles.funcBtnList}>
            <View className={styles.title}>
              <View className={styles.line}></View>
              <Text className={styles.text}>就诊功能</Text>
            </View>
            <View className={styles.btnArea}>
              {GPage.Map(
                menuList,
                (item: any, index: any) => {
                  return (
                    <View
                      className={styles.item}
                      onClick={() => {
                        GPage.DoWXCall("menuClick", item, index);
                      }}
                    >
                      <Image src={item.icon} className={styles.btnImg} />
                      <View className={styles.btnText}>{item.title}</View>
                    </View>
                  );
                },
                ""
              )}
            </View>
          </View>
        </View>
        <AtModal isOpened={modelShow} onClose={() => setModelShow(false)}>
          <AtModalContent>
            <View className="qrText">{patientInfo.qrTitle}</View>
            {patientInfo.qrData ? (
              <QRCode
                size={200}
                value={patientInfo.qrData}
                logoWidth={30}
                logoHeight={30}
              />
            ) : (
              ""
            )}
          </AtModalContent>
        </AtModal>
      </View>
    </Root>
  );
}
