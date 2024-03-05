import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import { View, Text, Button } from "@tarojs/components";
import {
  Comp_DateBar,
  Comp_CardList,
  Comp_Result,
  Comp_Table
} from "@/GGCompLib";
import { AtFloatLayout, AtAccordion, AtList, AtListItem } from "taro-ui";
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_TJXRMYY_doctorSelect_index",
    ndaExcute: (nda: any) => {
      GPage.SetState(
        [nda.datebar],
        () => {
          if (nda.dateBar) {
            setDateBar({
              listData: GPage.Data.datebar.listData,
              onItemClick: GPage.WXCall.onDateClick,
              direction: "01"
            });
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.doctorInfo_Area],
        () => {
          setDoctorInfo_Area(nda.doctorInfo_Area);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.appointTime_Area],
        () => {
          setappointTime_Area(nda.appointTime_Area);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.subscribeDetailTime],
        () => {
          setsubscribeDetailTime(nda.subscribeDetailTime);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.subscribeNoonTime],
        () => {
          setsubscribeNoonTime(nda.subscribeNoonTime);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.subscribeFloatData],
        () => {
          setsubscribeFloatData(nda.subscribeFloatData);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [dateBar, setDateBar] = useState(GPage.Data.datebar);
  const [doctorInfo_Area, setDoctorInfo_Area] = useState(
    GPage.Data.doctorInfo_Area
  );
  const [appointTime_Area, setappointTime_Area] = useState(
    GPage.Data.appointTime_Area
  );

  const [floatOpen, setFloatOpen] = useState(false);
  const [subscribeOpen, setsubscribeOpen] = useState(false);
  const [subscribeFloatData, setsubscribeFloatData] = useState(
    GPage.Data.subscribeFloatData
  );

  const [subscribeNoonTime, setsubscribeNoonTime] = useState(
    GPage.Data.subscribeNoonTime
  );
  const [subscribeDetailTime, setsubscribeDetailTime] = useState(
    GPage.Data.subscribeDetailTime
  );
  const [detailOpen, setdetailOpen] = useState([]);
  const handleDetailOpen = (value, index) => {
    let arr = [...detailOpen];
    if (value) {
      arr[index] = value;
      for (let i = 0; i < arr.length; i++) {
        if (i !== index) arr[i] = false;
      }
    } else {
      arr[index] = value;
    }
    setdetailOpen(arr);
  };
  useEffect(() => {
    if (dateBar) {
      setDateBar({
        listData: GPage.Data.datebar.listData,
        onItemClick: GPage.WXCall.onDateClick,
        direction: "01"
      });
    }
    let arr = [];
    for (let i = 0; i < subscribeNoonTime.content.length; i++) {
      arr.push(false);
    }
    setdetailOpen(arr);
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {
    let arr = [];
    for (let i = 0; i < subscribeNoonTime.content.length; i++) {
      arr.push(false);
    }
    setdetailOpen(arr);
  });
  //对应：onHide
  useDidHide(() => {
    setsubscribeOpen(false);
  });

  return (
    <Root hashData={styles}>
      <View className={styles.doctorSelect}>
        {/* 预约日期时间选择 */}
        <View className={styles.selectDate}>
          {dateBar ? (
            <Comp_DateBar
              type="01"
              config={dateBar}
              className={styles.datebar}
            />
          ) : (
            ""
          )}
        </View>
        <View className={styles.doctorCard}>
          {doctorInfo_Area.isEmpty === "N" ? (
            <View>
              {GPage.Map(
                doctorInfo_Area.cardList,
                (item: any, index: any) => {
                  return (
                    <Comp_CardList
                      key={index}
                      config={item}
                      type="02"
                      onItemClick={(item, index, btnName) => {
                        setsubscribeOpen(true);
                        GPage.DoWXCall("onSubAppClick", item, index, btnName);
                      }}
                    >
                      <View
                        className={styles.footerPart}
                        style={{
                          display:
                            item.hasOwnProperty("footerData") &&
                            item.footerData.isEmpty === "N"
                              ? ""
                              : "none"
                        }}
                      >
                        {GPage.Map(
                          item.hasOwnProperty("footerData")
                            ? item.footerData.content
                            : "",
                          (item1: any, index1: any) => {
                            return (
                              <View className={styles.item} key={index1}>
                                <View className={styles.itemLeft}>
                                  <View
                                    className={styles.date}
                                    style={{
                                      display:
                                        item1.hasOwnProperty("noon") === true
                                          ? ""
                                          : "none"
                                    }}
                                  >
                                    {item1.noon}
                                  </View>
                                  <View
                                    className={styles.type}
                                    style={{
                                      display:
                                        item1.hasOwnProperty("type") === true
                                          ? ""
                                          : "none"
                                    }}
                                  >
                                    {item1.type}
                                  </View>
                                  <View
                                    className={styles.number}
                                    style={{
                                      display:
                                        item1.hasOwnProperty("number") === true
                                          ? ""
                                          : "none"
                                    }}
                                  >
                                    余{item1.number}个号
                                  </View>
                                  <View
                                    style={{
                                      display:
                                        item1.hasOwnProperty("money") === true
                                          ? ""
                                          : "none"
                                    }}
                                  >
                                    挂号费：
                                    <Text className={styles.money}>
                                      {item1.money}
                                    </Text>
                                    元
                                  </View>
                                </View>
                                <View
                                  className={styles.btn}
                                  onClick={() => {
                                    GPage.DoWXCall(
                                      "onMainAppClick",
                                      item.listData[0],
                                      item1
                                    );
                                    setFloatOpen(true);
                                  }}
                                >
                                  {item1.btn}
                                </View>
                              </View>
                            );
                          },
                          ""
                        )}
                      </View>
                    </Comp_CardList>
                  );
                },
                ""
              )}
            </View>
          ) : (
            <View className={styles.result}>
              <Comp_Result
                config={{
                  icon: doctorInfo_Area.emptyIcon,
                  title: doctorInfo_Area.emptyTips
                }}
                type="01"
              />
            </View>
          )}
        </View>
        {appointTime_Area && appointTime_Area.isShow === "Y" ? (
          <AtFloatLayout
            isOpened={floatOpen}
            title="就诊时间"
            onClose={() => {
              setFloatOpen(false);
            }}
            className={styles.floatlayout}
          >
            {appointTime_Area.isEmpty === "N" ? (
              <Comp_Table
                type="01"
                config={appointTime_Area}
                onItemClick={(item, index) => {
                  GPage.DoWXCall("onSubAppClick", item, index);
                }}
              />
            ) : (
              <View className={styles.result}>
                <Comp_Result
                  config={{
                    icon: appointTime_Area.emptyIcon,
                    title: appointTime_Area.emptyTips
                  }}
                  type="01"
                />
              </View>
            )}
          </AtFloatLayout>
        ) : (
          ""
        )}
        {subscribeFloatData && subscribeFloatData.isShow === "Y" ? (
          <AtFloatLayout
            isOpened={subscribeOpen}
            title={subscribeFloatData.title}
            onClose={() => {
              setsubscribeOpen(false);
              let arr = [];
              for (let i = 0; i < subscribeNoonTime.content.length; i++) {
                arr.push(false);
              }
              setdetailOpen(arr);
            }}
            className={styles.floatlayout}
          >
            <View className={styles.subscribeMain}>
              {subscribeNoonTime.isEmpty === "N" ? (
                <View className={styles.content}>
                  {subscribeNoonTime && subscribeNoonTime.content.length ? (
                    subscribeNoonTime.content.map((item, index) => {
                      let stringData = "";
                      if (item.hasOwnProperty("number")) {
                        stringData = "--余号：";
                      }
                      return (
                        <AtAccordion
                          key={index}
                          open={detailOpen[index]}
                          onClick={value => {
                            handleDetailOpen(value, index);
                            GPage.DoWXCall("onNoonTimeClick", item, index);
                          }}
                          title={`${item.noon}${stringData}${
                            item.number ? item.number : ""
                          }`}
                        >
                          {subscribeDetailTime.isEmpty === "N" ? (
                            <AtList>
                              {subscribeDetailTime &&
                              subscribeDetailTime.content.length ? (
                                subscribeDetailTime.content.map(
                                  (item1, index1) => {
                                    return (
                                      <AtListItem
                                        key={index1}
                                        title={item1.time}
                                        extraText={item1.btn}
                                        onClick={() =>
                                          GPage.DoWXCall(
                                            "onDetailTimeClick",
                                            item1,
                                            index1
                                          )
                                        }
                                      />
                                    );
                                  }
                                )
                              ) : (
                                <View className={styles.result}>
                                  <Comp_Result
                                    config={{
                                      icon: "@empty",
                                      title: "未查询到预约时间段"
                                    }}
                                    type="01"
                                  />
                                </View>
                              )}
                            </AtList>
                          ) : (
                            ""
                          )}
                        </AtAccordion>
                      );
                    })
                  ) : (
                    <View className={styles.result}>
                      <Comp_Result
                        config={{
                          icon: "@empty",
                          title: "未查询到预约时间段"
                        }}
                        type="01"
                      />
                    </View>
                  )}
                </View>
              ) : (
                <View>
                  {subscribeDetailTime.isEmpty === "N" ? (
                    <AtList>
                      {subscribeDetailTime &&
                      subscribeDetailTime.content.length ? (
                        subscribeDetailTime.content.map(
                          (itemTime, indexTime) => {
                            return (
                              <View
                                className={styles.selectTimeBox}
                                key={indexTime}
                                style={{
                                  backgroundColor:
                                    indexTime % 2 ? "#f5f5f5" : ""
                                }}
                              >
                                <View className={styles.boxContent}>
                                  <View className={styles.timeContent}>
                                    时间段：{itemTime?.time}
                                  </View>
                                  {itemTime?.number ? (
                                    <View className={styles.numberContent}>
                                      {itemTime?.number}
                                    </View>
                                  ) : (
                                    ""
                                  )}
                                </View>
                                <Button
                                  className={styles.confBtn}
                                  onClick={() =>
                                    GPage.DoWXCall(
                                      "onDetailTimeClick",
                                      itemTime,
                                      indexTime
                                    )
                                  }
                                >
                                  {itemTime?.btn}
                                </Button>
                              </View>
                            );
                          }
                        )
                      ) : (
                        <View className={styles.result}>
                          <Comp_Result
                            config={{
                              icon: "@empty",
                              title: "未查询到预约时间段"
                            }}
                            type="01"
                          />
                        </View>
                      )}
                    </AtList>
                  ) : (
                    <View className={styles.result}>
                      <Comp_Result
                        config={{
                          icon: "@empty",
                          title: "未查询到预约时间段"
                        }}
                        type="01"
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          </AtFloatLayout>
        ) : (
          <View className={styles.result}>
            <Comp_Result
              config={{
                icon: "@empty",
                title: "未查询到预约时间段"
              }}
              type="01"
            />
          </View>
        )}
      </View>
    </Root>
  );
}
