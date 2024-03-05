import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import { Picker, View, WebView } from "@tarojs/components";
import { Current } from "@tarojs/taro";
import { AtIcon, AtList, AtListItem, AtTabs, AtTabsPane } from "taro-ui";
import { Comp_CardList, Comp_Result } from "@/GGH5/ggcomplib";
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_reportDocuments_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.examineArea],
        () => {
          setExamineArea(nda.examineArea);
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
        [nda.topTips],
        () => {
          setTopTips(nda.topTips);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [topTips, setTopTips] = useState(GPage.Data.topTips);
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
  // label前的icon处理
  const iconHandle = objData => {
    for (let i = 0; i < objData.content.listData.length; i++) {
      for (let j = 0; j < objData.content.listData[i].contents.length; j++) {
        objData.content.listData[i].contents[j].label =
          `<image src="${objData.content.imgUrlArr[j]}" style="height:20px;margin-right:5px"/>` +
          objData.content.listData[i].contents[j].label;
      }
    }
    setExamineArea(objData);
  };
  useEffect(() => {
    iconHandle({ ...examineArea });
    iconHandle({ ...checkoutArea });
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});
  const handleMessage = () => {

  }
  return (
    <Root hashData={styles}>
    <View className={styles.reportDocuments}>
    <View className={styles.topTips}>
        {topTips}
      </View>
      <AtTabs
        current={current}
        tabList={tabList}
        onClick={value => {
          changeTab(value);
          GPage.DoWXCall("onTabClick", tabList[value], value);
        }}
      >
        <AtTabsPane current={current} index={0}>
          <View className={styles.tabContent}>
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
              <View>--</View>
              <Picker mode="date" onChange={onEndTimeChange}>
                <AtList>
                  <AtListItem
                    extraText={dateSelector ? dateSelector.endDate : ""}
                  />
                </AtList>
              </Picker>
            </View>
            <View className={styles.cardContent}>
              {examineArea.isEmpty === "N" ? (
                <Comp_CardList
                  config={examineArea.content}
                  type="01"
                  onItemFooterClick={(item, index) => {
                    GPage.DoWXCall("onCheckDetail", item, index);
                  }}
                >
                  <View className={styles.footerBtn}>
                    <View className={styles.btnText}>
                      {examineArea.content.footerBtn}
                    </View>
                    <AtIcon value="chevron-right" />
                  </View>
                </Comp_CardList>
              ) : (
                <View className={styles.result}>
                  <Comp_Result
                    config={{
                      icon: examineArea.emptyIcon,
                      title: examineArea.emptyTips
                    }}
                    type="01"
                  />
                </View>
              )}
            </View>
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View className={styles.tabContent}>
            <View className={styles.dateSelect}>
              <Picker mode="date" onChange={onStartTimeChange}>
                <AtList>
                  <AtListItem
                    extraText={dateSelector ? dateSelector.startDate : ""}
                  />
                </AtList>
              </Picker>
              <View>--</View>
              <Picker mode="date" onChange={onEndTimeChange}>
                <AtList>
                  <AtListItem
                    extraText={dateSelector ? dateSelector.endDate : ""}
                  />
                </AtList>
              </Picker>
            </View>
            <View className={styles.cardContent}>
              {checkoutArea.isEmpty === "N" ? (
                <Comp_CardList
                  config={checkoutArea.content}
                  type="01"
                  onItemFooterClick={(item, index) => {
                    GPage.DoWXCall("onCheckDetail", item, index);
                  }}
                >
                  <View className={styles.footerBtn}>
                    <View className={styles.btnText}>
                      {checkoutArea.content.footerBtn}
                    </View>
                    <AtIcon value="chevron-right" />
                  </View>
                </Comp_CardList>
              ) : (
                <View className={styles.result}>
                  <Comp_Result
                    config={{
                      icon: checkoutArea.emptyIcon,
                      title: checkoutArea.emptyTips
                    }}
                    type="01"
                  />
                </View>
              )}
            </View>
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
    </Root>
  );
}
