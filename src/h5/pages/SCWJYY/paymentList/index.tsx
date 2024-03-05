import React, { useEffect, useState } from "react";
import { View, Text, Radio } from "@tarojs/components";
import PayCard from "../../../components/payCard";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { AtTabs, AtTabsPane, AtToast, AtFloatLayout } from "taro-ui";
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
    pageName: "h5_pages_SCWJYY_paymentList_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
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
    }
  });
  const [tabCurrent, setTabCurrent] = useState(0);
  const handleCurrent = value => {
    setTabCurrent(value);
  };
  const [payBtnText, setPayBtnText] = useState(GPage.Data.payBtnText);
  const [RadioBtn, setRadioBtn] = useState(false);
  const [moneyTotal, setMoneyTotal] = useState(0);
  const [tabList, setTabList] = useState(GPage.Data.tabList);
  const [paidsArea, setPaidsArea] = useState(GPage.Data.paidsArea);
  const [unpaidsArea, setUnpaidsArea] = useState(GPage.Data.unpaidsArea);
  const [toastOpen, setToastOpen] = useState(false);
  const [detailsArea, setDetailsArea] = useState(GPage.Data.detailsArea);
  const [floatOpen, setFloatOpen] = useState(false);
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
  // 单选
  const handleCheckedData = value => {
    let dataObj = { ...unpaidsArea };
    let flag = 0;
    for (let i = 0; i < dataObj.unpaidList.length; i++) {
      if (dataObj.unpaidList[i].id === value.id) dataObj.unpaidList[i] = value;
    }
    setUnpaidsArea(dataObj);
    for (let j = 0; j < dataObj.unpaidList.length; j++) {
      if (dataObj.unpaidList[j].checked) flag++;
    }
    if (flag === dataObj.unpaidList.length) {
      setRadioBtn(true);
      GPage.DoWXCall("allInClick", unpaidsArea.unpaidList, !RadioBtn);
    } else setRadioBtn(false);
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
  };
  // 合计金额
  const calTotal = dataArr => {
    let total = 0;
    for (let i = 0; i < dataArr.length; i++) {
      if (dataArr[i].checked) {
        total += Number(dataArr[i].arrearage);
      }
    }
    setMoneyTotal(total);
  };
  useEffect(() => {
    if (paidsArea.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData3 };
      obj.title = paidsArea.emptyTips;
      setResultData3(obj);
    }
    if (unpaidsArea.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData1 };
      obj.title = unpaidsArea.emptyTips;
      setResultData1(obj);
    }
    if (detailsArea.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData2 };
      obj.title = detailsArea.emptyTips;
      setResultData2(obj);
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
      <View className={styles.paymentList}>
        <AtTabs
          current={tabCurrent}
          tabList={tabList}
          onClick={value => {
            handleCurrent(value);
            GPage.DoWXCall("tabClick", tabList[value], value);
          }}
        >
          <AtTabsPane current={tabCurrent} index={0}>
            {unpaidsArea.isEmpty === "N" ? (
              <View className={styles.payment_main}>
                {GPage.Map(
                  unpaidsArea.unpaidList,
                  (item: any, index: any) => {
                    return (
                      <PayCard
                        data={item}
                        handleDetail={handleDetail}
                        handleCheckedData={handleCheckedData}
                      />
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
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={1}>
            {paidsArea.isEmpty === "N" ? (
              <View className={styles.payment_main}>
                {GPage.Map(
                  paidsArea.paidList,
                  (item: any, index: any) => {
                    return <PayCard data={item} handleDetail={handleDetail} />;
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
        </AtTabs>
        <View
          className={styles.footer}
          style={{
            display:
              tabCurrent === 0 && unpaidsArea.isEmpty === "N" ? "" : "none"
          }}
        >
          <View className={styles.paySum}>
            <Radio
              checked={RadioBtn}
              onClick={() => {
                let flag = RadioBtn;
                flag = !flag;
                setRadioBtn(flag);
                allSelect();
                GPage.DoWXCall("allInClick", unpaidsArea.unpaidList, !RadioBtn);
              }}
            >
              全选
            </Radio>
            <Text>|合计：</Text>
            <Text className={styles.money}>{moneyTotal}</Text>
            <Text>元</Text>
          </View>
          <View
            className={styles.payBtn}
            onClick={() => {
              if (moneyTotal === 0) {
                setToastOpen(true);
                return 0;
              }
              let arrData = { ...unpaidsArea };
              arrData.unpaidList = arrData.unpaidList.filter(item => {
                return item.checked === true;
              });
              GPage.DoWXCall("paymentOnClick", arrData.unpaidList);
            }}
          >
            {payBtnText}
          </View>
        </View>
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
