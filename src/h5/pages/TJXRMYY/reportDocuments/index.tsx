import React, { useEffect, useState } from "react";
import { View, Picker } from "@tarojs/components";
import {
  AtTabs,
  AtTabsPane,
  AtList,
  AtListItem,
  AtIcon,
  AtFloatLayout
} from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import {
  Comp_CardList,
  Comp_Result,
  Comp_UserInforCard,
  Comp_Table
} from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "../../../core/root";
import styles from "./style/index.module.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_reportDocuments_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.examineArea],
        () => {
          setExamineArea(nda.examineArea);
          if (nda.examineArea.hasOwnProperty("emptyTips")) {
            let obj = { ...resultData };
            obj.title = nda.examineArea.emptyTips;
            setResultData(obj);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.checkoutArea],
        () => {
          setCheckoutArea(nda.checkoutArea);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.tabList],
        () => {
          setTabList(nda.tabList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.dateSelector],
        () => {
          setdateSelector(nda.dateSelector);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.userCard],
        () => {
          if (nda.userCard) {
            nda.userCard.pop = {
              isShow: false
            };
            setUserCard(nda.userCard);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.warmTips],
        () => {
          setWarmTips(nda.warmTips);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.dateSelector],
        () => {
          setdateSelector(nda.dateSelector);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.detailsArea],
        () => {
          setdetailsArea(nda.detailsArea);
          if (nda.detailsArea.hasOwnProperty("emptyTips")) {
            let obj = { ...resultData };
            obj.title = nda.detailsArea.emptyTips;
            setResultData1(obj);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [detailsArea, setdetailsArea] = useState(GPage.Data.detailsArea);
  const [userCard, setUserCard] = useState(GPage.Data.userCard);
  const [examineArea, setExamineArea] = useState(GPage.Data.examineArea);
  const [checkoutArea, setCheckoutArea] = useState(GPage.Data.checkoutArea);
  const [tabList, setTabList] = useState(GPage.Data.tabList);
  const [current, setCurrent] = useState(0);
  const changeTab = value => {
    setCurrent(value);
  };
  const [dateSelector, setdateSelector] = useState(GPage.Data.dateSelector);
  const onStartTimeChange = e => {
    let obj = { ...dateSelector };
    obj.startDate = e.detail.value;
    setdateSelector(obj);
    GPage.DoWXCall("onDateClick", "startTime", e.detail.value);
  };
  const onEndTimeChange = e => {
    let obj = { ...dateSelector };
    obj.endDate = e.detail.value;
    setdateSelector(obj);
    GPage.DoWXCall("onDateClick", "endTime", e.detail.value);
  };
  const [warmTips, setWarmTips] = useState(GPage.Data.warmTips);
  const [resultData, setResultData] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  const [resultData1, setResultData1] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  const [floatOpen, setFloatOpen] = useState(false);
  useEffect(() => {
    if (examineArea && examineArea.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData };
      obj.title = examineArea.emptyTips;
      setResultData(obj);
    }
    if (detailsArea && detailsArea.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData };
      obj.title = detailsArea.emptyTips;
      setResultData1(obj);
    }
    if (userCard) {
      let obj = userCard;
      obj.pop = {
        isShow: false
      };
      setUserCard(obj);
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
      <View className={styles.reportDocuments}>
        {userCard ? (
          <Comp_UserInforCard
            config={userCard}
            type="01"
            className={styles.userCard}
            onItemClick={(item, state) => {
              GPage.DoWXCall("userCardClick", item, state);
            }}
            onExtraClick={() => {
              GPage.DoWXCall("changePatient");
            }}
          />
        ) : (
          ""
        )}

        <View
          className={styles.dateSelect}
          style={{ display: dateSelector ? "" : "none" }}
        >
          <Picker mode="date" onChange={onStartTimeChange}>
            <AtList>
              <AtListItem
                extraText={dateSelector ? dateSelector.startDate : ""}
              />
            </AtList>
          </Picker>
          <View
            style={{
              display: dateSelector.hasOwnProperty("endDate") ? "" : "none"
            }}
          >
            --
          </View>
          <Picker
            mode="date"
            onChange={onEndTimeChange}
            style={{
              display: dateSelector.hasOwnProperty("endDate") ? "" : "none"
            }}
          >
            <AtList>
              <AtListItem
                extraText={dateSelector ? dateSelector.endDate : ""}
              />
            </AtList>
          </Picker>
        </View>

        <View
          className={styles.warmTips}
          style={{ display: warmTips ? "" : "none" }}
        >
          {warmTips}
        </View>
        <View className={styles.tabArea}>
          <AtTabs
            current={current}
            tabList={tabList}
            onClick={value => {
              changeTab(value);
              GPage.DoWXCall("onTabClick", tabList[value], value);
            }}
            className={tabList ? "" : styles.noneHeader}
          >
            <AtTabsPane current={current} index={0}>
              <View className={styles.tabContent}>
                <View className={styles.cardContent}>
                  {examineArea && examineArea.isEmpty === "N" ? (
                    <Comp_CardList
                      config={examineArea.content}
                      type="01"
                      onItemFooterClick={(item, index) => {
                        GPage.DoWXCall("onCheckDetail", item, index);
                        setFloatOpen(true);
                      }}
                      onItemClick={(item, index) => {
                        GPage.DoWXCall("onPayClick", item, index);
                      }}
                      onItemClick2={(item, index) => {
                        GPage.DoWXCall("onCancelClick", item, index);
                      }}
                      onCardClick={(item, index) => {
                        GPage.DoWXCall("onCheckDetail", item, index);
                        setFloatOpen(true);
                      }}
                    >
                      <View
                        className={styles.footerBtn}
                        // onClick={() => {
                        //   setFloatOpen(true);
                        // }}
                      >
                        <View className={styles.btnText}>
                          {examineArea.content.footerBtn}
                        </View>
                        <AtIcon value="chevron-right" />
                      </View>
                    </Comp_CardList>
                  ) : (
                    <View className={styles.result}>
                      <Comp_Result config={resultData} type="01" />
                    </View>
                  )}
                </View>
              </View>
            </AtTabsPane>
            <AtTabsPane current={current} index={1}>
              <View className={styles.tabContent}>
                <View className={styles.cardContent}>
                  {checkoutArea && checkoutArea.isEmpty === "N" ? (
                    <Comp_CardList
                      config={checkoutArea.content}
                      type="01"
                      onItemFooterClick={(item, index) => {
                        GPage.DoWXCall("onCheckDetail", item, index);
                        setFloatOpen(true);
                      }}
                      onItemClick={(item, index) => {
                        GPage.DoWXCall("onPayClick", item, index);
                      }}
                      onItemClick2={(item, index) => {
                        GPage.DoWXCall("onCancelClick", item, index);
                      }}
                      onCardClick={(item, index) => {
                        GPage.DoWXCall("onCheckDetail", item, index);
                        setFloatOpen(true);
                      }}
                    >
                      <View
                        className={styles.footerBtn}
                        onClick={() => {
                          setFloatOpen(true);
                        }}
                      >
                        <View className={styles.btnText}>
                          {checkoutArea.content.footerBtn}
                        </View>
                        <AtIcon value="chevron-right" />
                      </View>
                    </Comp_CardList>
                  ) : (
                    <View className={styles.result}>
                      <Comp_Result config={resultData} type="01" />
                    </View>
                  )}
                </View>
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
        {detailsArea ? (
          <AtFloatLayout
            isOpened={floatOpen}
            title="详细信息"
            onClose={() => {
              setFloatOpen(false);
            }}
            className={styles.floatlayout}
          >
            {detailsArea.isEmpty === "N" ? (
              <Comp_Table
                className={styles.floatDetail}
                type="01"
                config={detailsArea.floatData}
              />
            ) : (
              <View className={styles.result}>
                <Comp_Result config={resultData1} type="01" />
              </View>
            )}
          </AtFloatLayout>
        ) : (
          ""
        )}
      </View>
    </Root>
  );
}
