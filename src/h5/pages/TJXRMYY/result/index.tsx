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
import { View, Image } from "@tarojs/components";
//自定义组件
import { Comp_Result } from "@/GGCompLib";
//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_result_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.bgImg],
        () => {
          setBgImg(bgImg)
        },
        () => {
          console.log('Fail');
        }
      );
      GPage.SetState(
        [nda.btns],
        () => {
          setBtns(btns)
        },
        () => {
          console.log('Fail');
        }
      );
      GPage.SetState(
        [nda.resultData],
        () => {
          setResultData(resultData)
        },
        () => {
          console.log('Fail');
        }
      );
    }
  });
  const [bgImg,setBgImg] = useState(GPage.Data.bgImg);
  const [btns, setBtns] = useState(GPage.Data.btns);
  const [resultData, setResultData] = useState(GPage.Data.resultData);
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
      <View className={styles.result}>
        <View className={styles.upper}>
          <Image
            src={bgImg}
            className={styles.bgImg}
          />
          <Comp_Result
            type="01"
            config={resultData}
            className={styles.resultArea}
          />
          <Image
            src={resultData.img}
            style={{
              height: "230px",
              width: "240px",
              position: "absolute",
              top: "-55px",
              right: "-60px"
            }}
          />
        </View>
        <View className={styles.btnArea}>
          <View
            className={styles.examineBtn}
            onClick={() => {
              GPage.DoWXCall("onClickExamine");
            }}
            style={{ display: btns&&btns.hasOwnProperty("examine") ? "" : "none" }}
          >
            <AtButton>{btns.examine}</AtButton>
          </View>
          <View
            className={styles.regretBtn}
            onClick={() => {
              GPage.DoWXCall("onClickRegret");
            }}
            style={{ display: btns&&btns.hasOwnProperty("regret") ? "" : "none" }}
          >
            <AtButton>{btns.regret}</AtButton>
          </View>
        </View>
      </View>
    </Root>
  );
}
