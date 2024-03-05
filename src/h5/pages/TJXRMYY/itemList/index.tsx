import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtListItem, AtList, AtAccordion, AtDivider } from "taro-ui";
//原生组件
import { Button, View, Text } from "@tarojs/components";
//自定义组件
import { Comp_Result } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_itemList_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.singleContentData],
        () => {
          setSingleContentData(nda.singleContentData);
        },
        () => {
          console.error("Fail");
        }
      );
      GPage.SetState(
        [nda.resultData],
        () => {
          setResultData(nda.resultData);
        },
        () => {
          console.error("Fail");
        }
      );
      GPage.SetState(
        [nda.getherContentData],
        () => {
          setGetherContentData(nda.getherContentData);
        },
        () => {
          console.error("Fail");
        }
      );
      GPage.SetState(
        [nda.footerBtn],
        () => {
          setFooterBtn(nda.footerBtn);
        },
        () => {
          console.error("Fail");
        }
      );
      GPage.SetState(
        [nda.totalAmount],
        () => {
          setTotalAmount(nda.totalAmount);
        },
        () => {
          console.error("Fail");
        }
      );
    }
  });
  // 列表主要内容
  const [getherContentData, setGetherContentData] = useState(
    GPage.Data.getherContentData
  );
  const [singleContentData, setSingleContentData] = useState(
    GPage.Data.singleContentData
  );
  const [totalAmount, setTotalAmount] = useState(GPage.Data.totalAmount);
  const [footerBtn, setFooterBtn] = useState(GPage.Data.footerBtn);
  // 空反馈内容
  const [resultData, setResultData] = useState(GPage.Data.resultData);
  const [detailOpen, setDetailOpen] = useState(GPage.Data.detailOpen);
  const handleDetailOpen = value => {
    setDetailOpen(value);
  };
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
      <View className={styles.itemList}>
        {(getherContentData && JSON.stringify(getherContentData)) !== "{}" ||
        (singleContentData && singleContentData.isEmpty !== "Y") ? (
          <View className={styles.mainContent}>
            {/* 套餐项目内容 */}
            {getherContentData &&
            getherContentData.isEmpty === "N" &&
            JSON.stringify(getherContentData) !== "{}" ? (
              <View>
                <AtDivider content="套餐内容" />
                <AtAccordion
                  open={detailOpen}
                  onClick={value => {
                    handleDetailOpen(value);
                  }}
                  title={`${getherContentData.title}`}
                >
                  <View className={styles.header}>
                    <View
                      className={styles.infoTitle}
                      style={{ paddingLeft: "20px" }}
                    >
                      <View className={styles.left}>项目名称</View>
                      <View className={styles.middle}>单价</View>
                      <View className={styles.right}>操作</View>
                    </View>
                  </View>
                  <AtList>
                    {getherContentData && getherContentData.listData.length
                      ? getherContentData.listData.map((item1, index1) => {
                          return (
                            <View
                              className={styles.item}
                              key={index1}
                              onClick={() => {
                                GPage.DoWXCall("onItemClick", item1, index1);
                              }}
                              style={{ paddingLeft: "20px" }}
                            >
                              <View className={styles.name}>{item1.name}</View>
                              <View className={styles.univalence}>
                                {item1.univalence}
                              </View>
                              <View className={styles.operation}>
                                <Button
                                  className={styles.operBtn}
                                  style={{
                                    backgroundColor: item1.operation_color
                                      ? "#bbb"
                                      : "red"
                                  }}
                                  onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    GPage.DoWXCall(
                                      "cancelItemClick",
                                      item1,
                                      index1
                                    );
                                  }}
                                >
                                  {item1.operation}
                                </Button>
                              </View>
                            </View>
                          );
                        })
                      : ""}
                    <View
                      style={{
                        display: "flex",
                        fontSize: "18px",
                        justifyContent: "space-around",
                        padding: "10px 20px",
                        backgroundColor: "#e1e1e1",
                        borderBottom: "3px solid #bbb"
                      }}
                    >
                      <View>
                        总计：
                        {/* <Text style={{ color: "red" }}> */}
                        {getherContentData.total}
                        {/* </Text> */}
                      </View>
                      <Button
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          GPage.DoWXCall(
                            "cancelGetherClick",
                            getherContentData
                          );
                        }}
                        style={{
                          width: "60px",
                          height: "30px",
                          color: "#fff",
                          fontSize: "15px",
                          backgroundColor: getherContentData.operation_color
                            ? "#bbb"
                            : "red",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0"
                        }}
                      >
                        {getherContentData.operation}
                      </Button>
                    </View>
                  </AtList>
                </AtAccordion>
              </View>
            ) : (
              ""
            )}

            {/* 单项项目内容 */}
            {singleContentData && singleContentData.isEmpty === "N" ? (
              <View style={{ paddingBottom: "70px" }}>
                <AtDivider content="单项内容" />
                {/* 头部搜索框 */}
                <View className={styles.header}>
                  <View className={styles.infoTitle}>
                    <View className={styles.left}>项目名称</View>
                    <View className={styles.middle}>单价</View>
                    <View className={styles.right}>操作</View>
                  </View>
                </View>
                {singleContentData.listData.map((item, index) => {
                  return (
                    <View
                      className={styles.item}
                      key={index}
                      onClick={() => {
                        GPage.DoWXCall("onItemClick", item, index);
                      }}
                    >
                      <View className={styles.name}>{item.name}</View>
                      <View className={styles.univalence}>
                        {item.univalence}
                      </View>
                      <View className={styles.operation}>
                        <Button
                          className={styles.operBtn}
                          style={{
                            backgroundColor: item.operation_color
                              ? "#bbb"
                              : "red"
                          }}
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            GPage.DoWXCall("cancelItemClick", item, index);
                          }}
                        >
                          {item.operation}
                        </Button>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              ""
            )}
          </View>
        ) : (
          <View className={styles.result}>
            <Comp_Result config={resultData} type="01" />
          </View>
        )}
        <View className={styles.footerArea}>
          <View className={styles.totalAmount}>总计：{totalAmount}</View>
          <View
            className={styles.footerBtn}
            onClick={() => {
              GPage.DoWXCall("footerBtnClick");
            }}
          >
            {footerBtn}
          </View>
        </View>
      </View>
    </Root>
  );
}
