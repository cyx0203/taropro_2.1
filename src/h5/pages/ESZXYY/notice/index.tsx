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
import {
  View,
  Image,
  Swiper,
  SwiperItem,
  Radio,
  Text,
  Button
} from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "@/GGPageRoot";
import { Comp_Menu, Comp_Nav } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import _ from "lodash";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_ESZXYY_notice_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.agreeMent],
        () => {
          setagreeMent(nda.agreeMent);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.tipsTxt],
        () => {
          setTipsTxt(nda.tipsTxt);
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
  const [navData, setNavData] = useState({
    list: GPage.Data.navData,
    onClick: GPage.WXCall.navOnClick
  });
  const [assets] = useState(GPage.Data.assets);
  const [agreeMent, setagreeMent] = useState(GPage.Data.agreeMent);
  const [checkRadio, setRadio] = useState(false);
  const [tipsTxt, setTipsTxt] = useState(GPage.Data.tipsTxt);
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
      <View className={styles.notice}>
        <View className={styles.content}>
          <View
            className={styles.txt}
            dangerouslySetInnerHTML={{ __html: agreeMent }}
          ></View>
          <View className={styles.footerTips}>
            <View
              className={styles.checkArea}
              onClick={() => {
                setRadio(!checkRadio);
              }}
            >
              <View className={styles.circle}></View>
              <Image
                style={{ display: checkRadio ? "" : "none" }}
                className={styles.selectedIcon}
                src={assets.selected}
              />
            </View>
            <View
              className={styles.tipTxt}
              dangerouslySetInnerHTML={{ __html: tipsTxt }}
            ></View>
          </View>
        </View>
        <View className={styles.btnArea}>
          <AtButton
            className={styles.btn}
            onClick={() => {
              GPage.DoWXCall("disagreeClick");
            }}
          >
            不同意并退出
          </AtButton>
          <AtButton
            disabled={!checkRadio}
            className={styles.btn}
            onClick={() => {
              GPage.DoWXCall("confirmClick");
            }}
          >
            同意并继续
          </AtButton>
        </View>
        {GPage.Data.navData && GPage.Data.navData.length > 0 ? (
          <Comp_Nav config={navData} type={"normal"} className={styles.nav} />
        ) : (
          ""
        )}
      </View>
    </Root>
  );
}
