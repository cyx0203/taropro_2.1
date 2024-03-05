import React, { useEffect, useState } from "react";
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
  AtImagePicker,
  AtToast
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
    pageName: "h5_pages_ESZXYY_apply_index",
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
        [nda.warmTips],
        () => {
          setWarmTips(nda.warmTips);
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
  const [tipsOpen, setTipsOpen] = useState(false);
  const [stepTxt, setStepTxt] = useState(GPage.Data.stepTxt);
  const [warmTips, setWarmTips] = useState(GPage.Data.warmTips);
  const [assets, setassets] = useState(GPage.Data.assets);
  const [patientName, setName] = useState<any>("");
  const [patientID, setID] = useState<any>("");
  const [navData, setNavData] = useState({
    list: GPage.Data.navData,
    onClick: GPage.WXCall.navOnClick
  });
  useEffect(() => {
    return () => {};
  }, []);
  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  const nextClick = () => {
    var obj = {
      patientID,
      patientName
    };
    if (patientID === "" || patientName === "") {
      setTipsOpen(true);
    } else  GPage.DoWXCall("nextClick", obj);
  };
  return (
    <Root hashData={styles}>
      <View className={styles.apply}>
        {/* 顶部步骤导向 */}
        <View
          className={styles.headerArea}
          style={{
            backgroundImage: `url(${assets.titleBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }}
        >
          <View className={styles.title}>{stepTxt.title}</View>
          <View className={styles.subtitle}>
            <Image
              className={styles.tipsIcon}
              src={assets.tips}
            />
            {stepTxt.subtitle}
          </View>
        </View>
        <View className={styles.formArea}>
          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>*</View>
            <View className={styles.formLabel}>姓名</View>
            <AtInput
              placeholder="请填写患者姓名"
              name="name"
              onChange={val => {
                setName(val);
              }}
              value={patientName}
            />
          </View>
          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>*</View>
            <View className={styles.formLabel}>住院号</View>
            <AtInput
              placeholder="请填写患者住院号"
              name="ID"
              onChange={val => {
                setID(val);
              }}
              value={patientID}
            />
          </View>
        </View>
        <View className={styles.warmTips}>{warmTips}</View>

        <AtButton
          className={styles.submitBtn}
          onClick={() => {
            nextClick();
          }}
        >
          <Image
            className={styles.submitIcon}
            src={assets.next}
          />
          下一步
        </AtButton>
        <Comp_Nav config={navData} type={"normal"} className={styles.nav} />
        <AtToast
          duration={1500}
          isOpened={tipsOpen}
          text="必填项为空！"
          icon="close"
          onClose={() => setTipsOpen(false)}
        ></AtToast>
      </View>
    </Root>
  );
}
