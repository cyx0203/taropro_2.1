import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtButton, AtTabs, AtTabsPane } from "taro-ui";
//原生组件
import { View, Image, Text, Button } from "@tarojs/components";
//自定义组件
import { Comp_Result } from "@/GGCompLib";
//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_bodyinfoShow_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.infoData],
        () => {
          setInfoData(nda.infoData);
        },
        () => {
          console.log("Fail");
        }
      );
    }
  });
  const [infoData, setInfoData] = useState(GPage.Data.infoData);
  const [currentTab, setCurrent] = useState(0);
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
      <View className={styles.bodyinfoShow}>
        <View className={styles.titleArea}>
          <Image
            src={GPage.Data.assets.deptImg}
            className={styles.deptImg}
          />
          <Text className={styles.deptText}>{infoData.title}</Text>
        </View>
        <View className={styles.deptTitle}>
          <View>推荐科室</View>
          {infoData.btn !== "" ? (
            <View
              className={styles.goDept}
              onClick={() => {
                GPage.DoWXCall("mainRegister");
              }}
            >
              {infoData.btn}
            </View>
          ) : (
            ""
          )}
        </View>
        <View className={styles.deptArea}>
          {infoData.rec_dept && infoData.rec_dept.length > 0
            ? infoData.rec_dept.map((item, index) => {
                return (
                  <View key={index} className={styles.deptItem}>
                    <View className={styles.deptName}>{item.title}</View>
                    {item?.btn ? (
                      <View
                        className={styles.goDept}
                        onClick={() => {
                          GPage.DoWXCall("register", item, index);
                        }}
                      >
                        {item.btn}
                      </View>
                    ) : (
                      ""
                    )}
                  </View>
                );
              })
            : ""}
        </View>
        <AtTabs
          current={currentTab}
          tabList={infoData.tabList}
          onClick={val => {
            setCurrent(val);
          }}
        >
          {infoData.tabList.map((item, index) => {
            return (
              <AtTabsPane current={currentTab} index={index} key={index}>
                <View
                  className={styles.question}
                  style={{ display: item.value?.question ? "" : "none" }}
                >
                  {item.value?.question}
                </View>
                <View
                  className={styles.Textcontent}
                  dangerouslySetInnerHTML={{ __html: item.value.value }}
                ></View>
              </AtTabsPane>
            );
          })}
        </AtTabs>
      </View>
    </Root>
  );
}
