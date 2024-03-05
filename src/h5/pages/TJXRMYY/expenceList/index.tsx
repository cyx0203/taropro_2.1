import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
// import { * } from "taro-ui";
//原生组件
//自定义组件
import { Comp_Result, Comp_Table } from "@/GGCompLib";
import { View, Picker, Image } from "@tarojs/components";
import { AtList, AtListItem, AtIcon, AtCurtain } from "taro-ui";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_expenceList_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.dateSelector],
        () => {
          setStartTime(nda.dateSelector.startDate);
          setEndTime(nda.dateSelector.endDate);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.recordsArea],
        () => {
          setrecordsArea(nda.recordsArea);
          if (nda.recordsArea.hasOwnProperty("emptyTips")) {
            let obj = { ...resultData };
            obj.title = nda.recordsArea.emptyTips;
            setResultData(obj);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.recordDetail],
        () => {
          setrecordDetail(nda.recordDetail);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [dateSelector] = useState(GPage.Data.dateSelector);
  const [startTime, setStartTime] = useState();
  const onStartTimeChange = e => {
    setStartTime(e.detail.value);
    GPage.DoWXCall("onDateClick", "startTime", e.detail.value);
  };
  const [endTime, setEndTime] = useState();
  const onEndTimeChange = e => {
    setEndTime(e.detail.value);
    GPage.DoWXCall("onDateClick", "endTime", e.detail.value);
  };
  const [recordsArea, setrecordsArea] = useState(GPage.Data.recordsArea);
  const [resultData, setResultData] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  const [curtainOpen, setCurtainOpen] = useState(false);
  const openCurtain = () => {
    setCurtainOpen(true);
  };
  const closeCurtain = () => {
    setCurtainOpen(false);
  };
  const [recordDetail, setrecordDetail] = useState(GPage.Data.recordDetail);
  useEffect(() => {
    if (dateSelector) {
      setStartTime(dateSelector.startDate);
      setEndTime(dateSelector.endDate);
    }
    if (recordsArea && recordsArea.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData };
      obj.title = recordsArea.emptyTips;
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
      <View className={styles.expenceList}>
        <View
          className={styles.dateSelect}
          style={{ display: GPage.Data.dateSelector ? "" : "none" }}
        >
          <Picker mode="date" onChange={onStartTimeChange}>
            <AtList>
              <AtListItem extraText={startTime} />
            </AtList>
          </Picker>
          <View>--</View>
          <Picker mode="date" onChange={onEndTimeChange}>
            <AtList>
              <AtListItem extraText={endTime} />
            </AtList>
          </Picker>
        </View>
        <View className={styles.content}>
          {recordsArea.isEmpty === "N" ? (
            <View className={styles.main}>
              {GPage.Map(
                recordsArea.listData,
                (item: any, index: any) => {
                  return (
                    <View className={styles.card}>
                      <View className={styles.info}>
                        {GPage.Map(
                          item.content,
                          (item1: any, index1: any) => {
                            return (
                              <View className={styles.item}>
                                <Image
                                  src={item1.icon}
                                  className={styles.icon}
                                />
                                <View className={styles.label}>
                                  {item1.label}:
                                </View>
                                <View className={styles.value}>
                                  {item1.value}
                                </View>
                              </View>
                            );
                          },
                          ""
                        )}
                      </View>
                      <View
                        className={styles.btn}
                        style={{
                          display:
                            recordsArea &&
                            recordsArea.hasOwnProperty("footerBtn") === true
                              ? ""
                              : "none"
                        }}
                        onClick={() => {
                          GPage.DoWXCall("onCheckDetail", item, index);
                          openCurtain();
                        }}
                      >
                        <View className={styles.title}>
                          {recordsArea.footerBtn}
                        </View>
                        <AtIcon value="chevron-right" />
                      </View>
                    </View>
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
        {recordDetail.isShow === "Y" ? (
          <AtCurtain isOpened={curtainOpen} onClose={closeCurtain}>
            <View className={styles.curtainData}>
              <View className={styles.title}>
                <View className={styles.line}></View>费用明细
              </View>
              <Comp_Table
                className={styles.floatDetail}
                type="01"
                config={recordDetail}
              />
            </View>
          </AtCurtain>
        ) : (
          ""
        )}
      </View>
    </Root>
  );
}
