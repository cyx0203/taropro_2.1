import React, { useEffect, useRef, useState } from "react";
import {
  AtTabs,
  AtTabsPane,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton,
  AtIcon,
  AtInput,
  AtImagePicker
} from "taro-ui";
import { View, Image, Swiper, SwiperItem, Radio } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "@/GGPageRoot";
import { Comp_Menu, Comp_Nav } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_ESZXYY_IDInfo_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.stepTxt],
        () => {
          setStepTxt(nda.stepTxt);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.cardInfo],
        () => {
          setCardInfo(nda.cardInfo);
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
      GPage.SetState(
        [nda.navData],
        () => {
          setNavData({
            list: nda.navData,
            onClick: GPage.WXCall.navOnClick
          });
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const head = useRef(null);
  const [cardInfo, setCardInfo] = useState(GPage.Data.cardInfo);
  const [stepTxt, setStepTxt] = useState(GPage.Data.stepTxt);
  const [footerBtn, setFooterBtn] = useState(GPage.Data.footerBtn);
  const [navData, setNavData] = useState({
    list: GPage.Data.navData,
    onClick: GPage.WXCall.navOnClick
  });
  const [date, setDate] = useState(new Date());
  // 判断日期是否是个位数
  const getDateRestult = str => {
    if (str < 10) {
      return `0${str}`;
    }
    return str;
  };
  // 获得日期
  const getDate = (str: any) => {
    if (str != null) {
      const time = new Date(parseInt(Date.parse(str)));
      const year = getDateRestult(time.getFullYear());
      const month = getDateRestult(time.getMonth() + 1);
      const day = getDateRestult(time.getDate());
      const hours = getDateRestult(time.getHours());
      const Minutes = getDateRestult(time.getMinutes());
      const resultTime = `${year}-${month}-${day} ${hours}:${Minutes}`;

      return resultTime;
    }
  };
  useEffect(() => {
    const dater = () => setDate(new Date());
    const timer = setTimeout(dater, 1000);
    return () => clearTimeout(timer);
  }, [date]);
  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});
  return (
    <Root hashData={styles}>
      <View className={styles.IDInfo}>
        {/* 顶部步骤导向 */}
        <View
          className={styles.headerArea}
          style={{
            backgroundImage: `url(${stepTxt.bgImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }}
        >
          <View className={styles.title}>{stepTxt.title}</View>
          {stepTxt?.subtitle ? (
            <View className={styles.subtitle}>
              <Image className={styles.tipsIcon} src={stepTxt.subIcon} />
              {stepTxt.subtitle}
            </View>
          ) : (
            ""
          )}
        </View>
        <View className={styles.contentArea}>
          <View className={styles.cardArea}>
            <View
              className={styles.card}
              style={{
                backgroundImage: `url(${cardInfo.bgImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%"
              }}
            >
              <Image
                onError={() => {
                  console.log(head.current)
                  head.current.src = GPage.Data.defaultHead;
                }}
                ref={head}
                className={styles.personPic}
                src={
                  cardInfo.personPic
                    ? cardInfo.personPic
                    : GPage.Data.defaultHead
                }
              />
              <View className={styles.right}>
                <View className={styles.title}>{cardInfo.title}</View>
                <View className={styles.subtitle}>{cardInfo.subtitle}</View>
                <View className={styles.time}>当前时间：{getDate(date)}</View>
              </View>
            </View>
            <View className={styles.status}>{cardInfo.status}</View>
          </View>
          <View className={styles.infoArea}>
            <View className={styles.title}>基本信息</View>
            {cardInfo.infoList.map((item, index) => {
              return (
                <View key={index} className={styles.infoItem}>
                  <View className={styles.infoLable}>{item.label}：</View>
                  <View className={styles.infoValue}>{item.value}</View>
                </View>
              );
            })}
          </View>
        </View>
        {footerBtn && footerBtn?.txt ? (
          <AtButton
            className={styles.submitBtn}
            onClick={() => {
              GPage.DoWXCall("onFooterClick");
            }}
          >
            {footerBtn?.icon ? (
              <Image className={styles.submitIcon} src={footerBtn.icon} />
            ) : (
              ""
            )}

            {footerBtn.txt}
          </AtButton>
        ) : (
          ""
        )}

        <Comp_Nav config={navData} type={"normal"} className={styles.nav} />
      </View>
    </Root>
  );
}
