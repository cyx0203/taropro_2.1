import React, { useEffect, useState } from "react";
import { View, Text, Radio, Picker } from "@tarojs/components";
import PayCard from "../../../components/payCard";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import {
  AtTabs,
  AtTabsPane,
  AtToast,
  AtFloatLayout,
  AtList,
  AtListItem
} from "taro-ui";
import { Comp_Table, Comp_Result } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "../../../core/root";
import styles from "./style/index.module.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_IH_paymentList_index",
    //用于接收外部发送的更新数据的事件
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
        [nda.footerArea],
        () => {
          setFooterArea(nda.footerArea);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.payBtnText],
        () => {
          setPayBtnText(nda.payBtnText);
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
        [nda.paidsArea],
        () => {
          setPaidsArea(nda.paidsArea);
          if (nda.paidsArea.hasOwnProperty("emptyTips")) {
            let obj = { ...resultData3 };
            obj.title = nda.paidsArea.emptyTips;
            setResultData3(obj);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.NATArea],
        () => {
          setNATArea(nda.NATArea);
          if (nda.NATArea.hasOwnProperty("emptyTips")) {
            let obj = { ...resultData4 };
            obj.title = nda.NATArea.emptyTips;
            setResultData4(obj);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.unpaidsArea],
        () => {
          setUnpaidsArea(nda.unpaidsArea);
          if (nda.unpaidsArea.hasOwnProperty("emptyTips")) {
            let obj = { ...resultData1 };
            obj.title = nda.unpaidsArea.emptyTips;
            setResultData1(obj);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.detailsArea],
        () => {
          setDetailsArea(nda.detailsArea);
          if (nda.detailsArea.hasOwnProperty("emptyTips")) {
            let obj = { ...resultData2 };
            obj.title = nda.detailsArea.emptyTips;
            setResultData2(obj);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      //互联网医院暂时不用这个数据的更新
      // GPage.SetState(
      //   [nda.currentTabIndex],
      //   () => {
      //     setTabCurrent(nda.currentTabIndex);
      //   },
      //   () => {
      //     console.error("NDA设置出错");
      //   }
      // );
      GPage.SetState(
        [nda.floatIsShow],
        () => {
          setfloatIsShow(nda.floatIsShow);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [footerArea, setFooterArea] = useState(GPage.Data.footerArea);
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
  const [tabCurrent, setTabCurrent] = useState(GPage.Data.currentTabIndex);
  const handleCurrent = value => {
    setTabCurrent(value);
  };
  const totalMoney = () => {
    let total: any = 0;
    if (NATArea && NATArea.paidList && NATArea.paidList.length > 0) {
      for (let i = 0; i < NATArea.paidList.length; i++) {
        total += Number(NATArea.paidList[i].money);
      }
    }

    total = total.toFixed(2);
    return total;
  };
  const [payBtnText, setPayBtnText] = useState(GPage.Data.payBtnText);
  const [RadioBtn, setRadioBtn] = useState(false);
  const [moneyTotal, setMoneyTotal] = useState(0);
  const [tabList, setTabList] = useState(GPage.Data.tabList);
  const [paidsArea, setPaidsArea] = useState(GPage.Data.paidsArea);
  const [NATArea, setNATArea] = useState(GPage.Data.NATArea);
  const [unpaidsArea, setUnpaidsArea] = useState(GPage.Data.unpaidsArea);
  const [toastOpen, setToastOpen] = useState(false);
  const [detailsArea, setDetailsArea] = useState(GPage.Data.detailsArea);
  const [floatOpen, setFloatOpen] = useState(false);
  const [floatIsShow, setfloatIsShow] = useState(GPage.Data.floatIsShow || "Y");
  const [resultData1, setResultData1] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  const [resultData2, setResultData2] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  const [resultData3, setResultData3] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  const [resultData4, setResultData4] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  // 选中
  const handleCheckedData = value => {
    let dataObj = { ...unpaidsArea };
    let flag = 0;
    if (GPage.Data.isRadio && GPage.Data.isRadio) {
      for (let i = 0; i < dataObj.unpaidList.length; i++) {
        if (dataObj.unpaidList[i].id === value.id)
          dataObj.unpaidList[i] = value;
        else {
          dataObj.unpaidList[i].checked = false;
        }
      }
    } else {
      for (let i = 0; i < dataObj.unpaidList.length; i++) {
        if (dataObj.unpaidList[i].id === value.id)
          dataObj.unpaidList[i] = value;
        if (dataObj.unpaidList[i].checked) flag++;
        if (flag === dataObj.unpaidList.length) {
          setRadioBtn(true);
          GPage.DoWXCall("allInClick", unpaidsArea.unpaidList, !RadioBtn);
        } else setRadioBtn(false);
      }
    }
    setUnpaidsArea(dataObj);
    calTotal(dataObj.unpaidList);
  };
  //“详情”点击事件
  const handleDetail = (item, index) => {
    GPage.DoWXCall("detailClick", item, index);
    setFloatOpen(true);
  };
  // 全选
  const allSelect = () => {
    let dataObj = { ...unpaidsArea };
    let flag = RadioBtn;
    flag = !flag;
    for (let i = 0; i < dataObj.unpaidList.length; i++) {
      dataObj.unpaidList[i].checked = flag;
    }
    setUnpaidsArea(dataObj);
    calTotal(dataObj.unpaidList);
    setRadioBtn(flag);
  };
  // 合计金额
  const calTotal = dataArr => {
    let total: any = 0;
    for (let i = 0; i < dataArr.length; i++) {
      if (dataArr[i].checked) {
        total += Number(dataArr[i].arrearage);
      }
    }
    total = total.toFixed(2);
    setMoneyTotal(total);
  };
  useEffect(() => {
    unpaidsArea && calTotal(unpaidsArea.unpaidList);
    return () => {};
  }, [unpaidsArea]);

  //对应：onReady
  useReady(() => {
    unpaidsArea && calTotal(unpaidsArea.unpaidList);
    let checkedCount = 0
    for(let i = 0;i < unpaidsArea.unpaidList.length;i++) {
      if(unpaidsArea.unpaidList[i].checked) checkedCount ++;
    }
    console.log(checkedCount)
    if(checkedCount === unpaidsArea.unpaidList.length) setRadioBtn(true)
    // if (!GPage.Data.isRadio&&GPage.Data.isRadio) {
    //   //默认全选
    //   allSelect();
    //   setRadioBtn(true)
    // }

    if (GPage.Data.footerArea) {
      setFooterArea(GPage.Data.footerArea);
    } else setFooterArea(true);
    if (dateSelector) {
      setStartTime(dateSelector.startDate);
      setEndTime(dateSelector.endDate);
    }
    if (paidsArea && paidsArea.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData3 };
      obj.title = paidsArea.emptyTips;
      setResultData3(obj);
    }
    if (NATArea && NATArea.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData4 };
      obj.title = NATArea.emptyTips;
      setResultData4(obj);
    }
    if (unpaidsArea && unpaidsArea.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData1 };
      obj.title = unpaidsArea.emptyTips;
      setResultData1(obj);
    }
    if (detailsArea && detailsArea.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData2 };
      obj.title = detailsArea.emptyTips;
      setResultData2(obj);
    }});

  //对应：onShow
  useDidShow(() => {
    setFloatOpen(false);
  });

  //对应：onHide
  useDidHide(() => {});

  return (
    <Root hashData={styles}>
      <View className={styles.paymentList}>
        <View
          className={styles.dateSelect}
          style={{ display: GPage.Data.dateSelector.isShow ? "" : "none" }}
        >
          <Picker mode="date" onChange={onStartTimeChange}>
            <AtList>
              <AtListItem extraText={startTime} />
            </AtList>
          </Picker>
          {dateSelector?.endDate ? <View>--</View> : ""}
          {dateSelector?.endDate ? (
            <Picker mode="date" onChange={onEndTimeChange}>
              <AtList>
                <AtListItem extraText={endTime} />
              </AtList>
            </Picker>
          ) : (
            ""
          )}
        </View>
        <AtTabs
          current={tabCurrent}
          tabList={tabList}
          onClick={value => {
            if (tabList.length > 1) {
              handleCurrent(value);
              GPage.DoWXCall("tabClick", tabList[value], value);
            } else {
              handleCurrent(tabCurrent);
            }
          }}
        >
          <AtTabsPane current={tabCurrent} index={0}>
            {tabList[0].type === "unpaid" ? (
              <>
                {unpaidsArea && unpaidsArea.isEmpty === "N" ? (
                  <View className={styles.payment_main}>
                    {GPage.Map(
                      unpaidsArea.unpaidList,
                      (item: any, index: any) => {
                        return (
                          <View key={index}>
                            <PayCard
                              data={item}
                              handleDetail={handleDetail}
                              handleCheckedData={handleCheckedData}
                              btns={item?.btns}
                              radioDisabled={GPage.Data.isDisabled}
                            />
                          </View>
                        );
                      },
                      ""
                    )}
                  </View>
                ) : (
                  <View className={styles.result}>
                    <Comp_Result config={resultData1} type="01" />
                  </View>
                )}
              </>
            ) : (
              <>
                {paidsArea && paidsArea.isEmpty === "N" ? (
                  <View className={styles.payment_main}>
                    {GPage.Map(
                      paidsArea.paidList,
                      (item: any, index: any) => {
                        return (
                          <View key={index}>
                            <PayCard
                              data={item}
                              handleDetail={handleDetail}
                              btns={item?.btns}
                            />
                          </View>
                        );
                      },
                      ""
                    )}
                  </View>
                ) : (
                  <View className={styles.result}>
                    <Comp_Result config={resultData3} type="01" />
                  </View>
                )}
              </>
            )}
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={1}>
            {paidsArea && paidsArea.isEmpty === "N" ? (
              <View className={styles.payment_main}>
                {GPage.Map(
                  paidsArea.paidList,
                  (item: any, index: any) => {
                    return (
                      <View key={index}>
                        <PayCard
                          data={item}
                          handleDetail={handleDetail}
                          btns={item?.btns}
                        />
                      </View>
                    );
                  },
                  ""
                )}
              </View>
            ) : (
              <View className={styles.result}>
                <Comp_Result config={resultData3} type="01" />
              </View>
            )}
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={2}>
            {NATArea && NATArea.isEmpty === "N" ? (
              <View className={styles.payment_main}>
                {GPage.Map(
                  NATArea.paidList,
                  (item: any, index: any) => {
                    return (
                      <View key={index}>
                        <PayCard
                          data={item}
                          handleDetail={handleDetail}
                          btns={item?.btns}
                        />
                      </View>
                    );
                  },
                  ""
                )}
              </View>
            ) : (
              <View className={styles.result}>
                <Comp_Result config={resultData4} type="01" />
              </View>
            )}
          </AtTabsPane>
        </AtTabs>
        {payBtnText && (
          <View
            className={styles.footer}
            style={{
              display: tabCurrent === 1 || (tabList[0].type === 'paid') ? "none" : ""
            }}
          >
            <View className={styles.paySum}>
              {!GPage.Data.isRadio && footerArea && tabCurrent === 0 && !GPage.Data.isDisabled ? (
                <Radio
                  checked={RadioBtn}
                  onClick={() => {
                    let flag = RadioBtn;
                    flag = !flag;
                    setRadioBtn(flag);
                    allSelect();
                    GPage.DoWXCall(
                      "allInClick",
                      unpaidsArea.unpaidList,
                      !RadioBtn
                    );
                  }}
                >
                  全选|
                </Radio>
              ) : null}

              <Text>合计：</Text>
              <Text className={styles.money}>
                {tabCurrent === 0
                  ? Number(moneyTotal).toFixed(2)
                  : totalMoney()}
              </Text>
              <Text>元</Text>
            </View>
            <View
              className={styles.payBtn}
              onClick={() => {
                if (moneyTotal === 0 && tabCurrent === 0) {
                  setToastOpen(true);
                  return 0;
                }
                if (tabCurrent === 2) {
                  GPage.DoWXCall(
                    "paymentOnClick",
                    NATArea.paidList,
                    totalMoney()
                  );
                  return;
                }
                let arrData = { ...unpaidsArea };
                arrData.unpaidList = arrData.unpaidList.filter(item => {
                  return item.checked === true;
                });
                GPage.DoWXCall(
                  "paymentOnClick",
                  arrData.unpaidList,
                  moneyTotal
                );
              }}
            >
              {payBtnText}
            </View>
          </View>
        )}

        <AtFloatLayout
          isOpened={floatOpen && floatIsShow === "Y"}
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
              <Comp_Result config={resultData2} type="01" />
            </View>
          )}
        </AtFloatLayout>
      </View>

      <AtToast
        isOpened={toastOpen}
        text="请选择要缴费的订单"
        icon="close-circle"
        duration={1500}
        onClose={() => setToastOpen(false)}
      />
    </Root>
  );
}
