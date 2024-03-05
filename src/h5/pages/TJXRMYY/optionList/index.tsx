import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtButton, AtTabs, AtTabsPane, AtSearchBar } from "taro-ui";
//原生组件
import { View, Image } from "@tarojs/components";
//自定义组件
import { Comp_Result } from "@/GGCompLib";
//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_optionList_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.tabList],
        () => {
          setTabList(nda.tabList);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.optionDataList],
        () => {
          setOptionDataList(nda.optionDataList);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.seachPlaceholder],
        () => {
          setseachPlaceholder(nda.seachPlaceholder);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.resultData],
        () => {
          setResultData(nda.resultData);
        },
        () => {
          console.log("Fail");
        }
      );
    }
  });
  const [tabCurrent, setCurrent] = useState(0);
  const changeCurrent = (val: any) => {
    setCurrent(val);
  };
  const [tabList, setTabList] = useState(GPage.Data.tabList);
  const [optionDataList, setOptionDataList] = useState(
    GPage.Data.optionDataList
  );
  const [seachPlaceholder, setseachPlaceholder] = useState(
    GPage.Data.seachPlaceholder
  );
  // 搜索内容
  const [searchContent, setSearchContent] = useState("");
  // 搜索框内文字
  // 搜索方法
  const searchFunc = val => {
    setSearchContent(val);
  };
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
      <View className={styles.optionList}>
        <AtSearchBar
          onClear={() => searchFunc("")}
          placeholder={seachPlaceholder}
          value={searchContent}
          onChange={val => searchFunc(val)}
          onActionClick={() => {
            GPage.DoWXCall("searchClick", searchContent);
          }}
        />
        <AtTabs
          current={tabCurrent}
          tabList={tabList}
          scroll={true}
          onClick={value => {
            changeCurrent(value);
            GPage.DoWXCall("tabChange", tabList[value], value);
          }}
        >
          {tabList && tabList.length > 0
            ? tabList.map((item, index) => {
                return (
                  <AtTabsPane current={tabCurrent} index={index} key={index}>
                    {optionDataList &&
                    optionDataList.isEmpty === "N" &&
                    optionDataList.content.length > 0 ? (
                      optionDataList.content.map((cardItem, cardIndex) => {
                        return (
                          <View
                            className={styles.cardMain}
                            key={cardIndex}
                            onClick={() => {
                              GPage.DoWXCall(
                                "onItemClick",
                                cardItem,
                                cardIndex
                              );
                            }}
                          >
                            <Image
                              src={cardItem?.pic}
                              className={styles.cardImg}
                            />
                            <View className={styles.cardText}>
                              <View className={styles.name}>
                                {cardItem?.name}
                              </View>
                              <View className={styles.position}>
                                {cardItem?.position}
                              </View>
                            </View>
                          </View>
                        );
                      })
                    ) : (
                      <View className={styles.result}>
                        <Comp_Result config={resultData} type="01" />
                      </View>
                    )}
                  </AtTabsPane>
                );
              })
            : ""}
        </AtTabs>
      </View>
    </Root>
  );
}
