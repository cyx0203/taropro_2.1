import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtCard, AtIcon } from "taro-ui";
//原生组件
import { View } from "@tarojs/components";
//自定义组件
import { Comp_Result } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_surveyList_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.surveyData],
        () => {
          setsurveyData(nda.surveyData);
          if (nda.surveyData.hasOwnProperty("emptyTips")) {
            let obj = { ...resultData };
            obj.title = nda.surveyData.emptyTips;
            setResultData(obj);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  //定义state
  const [surveyData, setsurveyData] = useState(GPage.Data.surveyData);
  const [resultData, setResultData] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  useEffect(() => {
    if (surveyData&&surveyData.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData };
      obj.title = surveyData.emptyTips;
      setResultData(obj);
    }
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
      <View className={styles.surveyList}>
        {surveyData.isEmpty === "N" ? (
          <View className={styles.item}>
            {GPage.Map(
              surveyData.listData,
              (item: any, index: any) => {
                return (
                  <AtCard
                    extra={"发布者：" + item.promulgator}
                    title={item.title}
                    onClick={() => {
                      GPage.DoWXCall("detailClick", item, index);
                    }}
                  >
                    <View className={styles.content}>
                      <View className={styles.time}>创建时间：{item.date}</View>
                      <View className={styles.btn}>
                        {item.btn}
                        <AtIcon
                          value="chevron-right"
                          size="30"
                          color="#bbb"
                        ></AtIcon>
                      </View>
                    </View>
                  </AtCard>
                );
              },
              ""
            )}
          </View>
        ) : (
          <View className={styles.result}>
            <Comp_Result config={resultData} type="01" />
          </View>
        )}
      </View>
    </Root>
  );
}
