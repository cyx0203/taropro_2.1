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
    pageName: "h5_pages_TJXRMYY_bodySelect_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.listDataArea],
        () => {
          setListDataArea(nda.listDataArea);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [listDataArea, setListDataArea] = useState(GPage.Data.listDataArea);
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
      <View className={styles.bodySelect}>
        <View className={styles.deptContent}>
          <View className={styles.dept_v1}>
            {GPage.Map(
              listDataArea.main_data,
              (item: any, index: any) => {
                return (
                  <View
                    key={index}
                    className={
                      item.hasOwnProperty("active") && item.active
                        ? `${styles.v1_item + " " + styles.dept_active}`
                        : `${styles.v1_item}`
                    }
                    onClick={() => {
                      GPage.DoWXCall("onMainClick", item);
                    }}
                  >
                    {item.title}
                  </View>
                );
              },
              ""
            )}
          </View>
          <View className={styles.dept_v2}>
            {GPage.Map(
              listDataArea.sub_data,
              (item: any, index: any) => {
                return (
                  <View
                    className={styles.v2_item}
                    onClick={() => {
                      GPage.DoWXCall("onSubClick", item);
                    }}
                    key={index}
                  >
                    {item.title}
                  </View>
                );
              },
              ""
            )}
          </View>
        </View>
      </View>
    </Root>
  );
}
