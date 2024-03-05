import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtButton } from "taro-ui";
//原生组件
import { View } from "@tarojs/components";
import QRCode from "qrcode-react";
//自定义组件
// import { * } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_appDetail_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.topTips],
        () => {
          setTopTips(nda.topTips)
        },
        () => {
          console.log('Fail');
        }
      );
      GPage.SetState(
        [nda.appInfo],
        () => {
          setAppInfo(nda.appInfo)
        },
        () => {
          console.log('Fail');
        }
      );
      GPage.SetState(
        [nda.warmTips],
        () => {
          setWarmTips(nda.warmTips)
        },
        () => {
          console.log('Fail');
        }
      );
      GPage.SetState(
        [nda.footerBtn],
        () => {
          setFooterBtn(nda.footerBtn)
        },
        () => {
          console.log('Fail');
        }
      );
    }
  });
  //定义state
  const [topTips, setTopTips] = useState(GPage.Data.topTips);
  const [appInfo, setAppInfo] = useState(GPage.Data.appInfo);
  const [warmTips, setWarmTips] = useState(GPage.Data.warmTips);
  const [footerBtn, setFooterBtn] = useState(GPage.Data.footerBtn);

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
      <View className={styles.appDetail}>
        <View className={styles.header}>
          {topTips}
        </View>
        <View className={styles.main}>
          <View className={styles.qrcode}>
            <View className={styles.number}>{appInfo.number}</View>
            <QRCode
              size={120}
              value={appInfo.QRCode}
              logoWidth={30}
              logoHeight={30}
            />
          </View>
          <View className={styles.content}>
          {GPage.Map(
            appInfo.info,
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
        <View className={styles.footer}>
          <View className={styles.warmText}>
            <View className={styles.title}>{warmTips.title}</View>
            <View className={styles.content}>{warmTips.content}</View>
          </View>
          <View className={styles.btnArea}>
            <View
              className={styles.cancelBtn}
              onClick={() => {
                GPage.DoWXCall("onCancelClick");
              }}
              style={{
                display: footerBtn&&footerBtn.hasOwnProperty("cancel") ? "" : "none"
              }}
            >
              <AtButton>{footerBtn.cancel}</AtButton>
            </View>
            <View
              className={styles.payBtn}
              onClick={() => {
                GPage.DoWXCall("onPayClick");
              }}
              style={{ display: footerBtn&&footerBtn.hasOwnProperty("pay") ? "" : "none" }}
            >
              <AtButton>{footerBtn.pay}</AtButton>
            </View>
          </View>
        </View>
      </View>
    </Root>
  );
}
