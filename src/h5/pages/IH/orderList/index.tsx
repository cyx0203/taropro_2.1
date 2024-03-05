import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtTabs, AtTabsPane, AtButton, AtAvatar } from "taro-ui";
//原生组件
import { View, Text } from "@tarojs/components";
//自定义组件
import { Comp_Result,Comp_Nav } from "@/GGCompLib";
import {
  GGWhiteSpace,
  GGWingBlank,
  GGCPS_TopBar,
  GGCPS_NavBar,
  GGCPS_Result
} from "@/GGCPS";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_IH_orderList_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.navData],
        () => {
          setNavData({
            list: nda.navData,
            onClick: GPage.WXCall.navOnClick
          });
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.orderData],
        () => {
          setOrderData(nda.orderData);
        },
        () => {
          console.log("Fail");
        }
      );
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
        [nda.patientinfor],
        () => {
          setPatientinfor(nda.patientinfor);
        },
        () => {
          console.log("Fail");
        }
      );
    }
  });
  //定义state
  const [patientinfor, setPatientinfor] = useState(GPage.Data.patientinfor);
  const [orderData, setOrderData] = useState(GPage.Data.orderData);
  const [tabList, setTabList] = useState(GPage.Data.tabList);
  const [tabCurrent, setTabCurrent] = useState(0);
  const [resultData, setResultData] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  const [navData, setNavData] = useState({
    list: GPage.Data.navData,
    onClick: GPage.WXCall.navOnClick
  });

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
      <View className={styles.orderList}>
        <GGCPS_TopBar mode="patientInfor" patientInfor={patientinfor} />
        <AtTabs
        customStyle={{'paddingBottom':navData.list?'65px':''}}
          current={tabCurrent}
          tabList={tabList}
          onClick={val => {
            setTabCurrent(val);
            GPage.DoWXCall("tabClick", tabList[val], val);
          }}
        >
          {tabList
            ? tabList.map((item, index) => {
                return (
                  <AtTabsPane
                    className="content_item_tabList"
                    current={tabCurrent}
                    index={index}
                    key={index}
                  >
                    {orderData.dataList &&
                    orderData.dataList.length > 0 &&
                    orderData.isEmpty === "N" ? (
                      orderData.dataList.map((item1, index1) => {
                        return (
                          <View
                            className={styles.content_item_main}
                            key={index1}
                          >
                            {item1.hasOwnProperty("status") &&
                            item1.hasOwnProperty("ordernumber") ? (
                              <View className={styles.content_item_header}>
                                {item1.hasOwnProperty("ordernumber") ? (
                                  <Text
                                    className={styles.content_item_ordernumber}
                                  >
                                    {"订单编号：" + item1.ordernumber}
                                  </Text>
                                ) : (
                                  ""
                                )}
                                {item1.hasOwnProperty("status") ? (
                                  <Text className={styles.content_item_status}>
                                    {item1.status}
                                  </Text>
                                ) : (
                                  ""
                                )}
                              </View>
                            ) : (
                              ""
                            )}
                            <View className={styles.content_item_banner}>
                              <View
                                className={styles.content_item_doctor}
                                onClick={() => {
                                  GPage.DoWXCall("orderClick", item1, index1);
                                }}
                              >
                                {item1.doctorinfor.hasOwnProperty("image") ? (
                                  <View className={styles.content_item_img}>
                                    <AtAvatar
                                      className={styles.content_item_doctorimg}
                                      image={item1.doctorinfor.image}
                                      circle
                                    />
                                  </View>
                                ) : (
                                  ""
                                )}
                                <View
                                  className={
                                    item1.hasOwnProperty("status") &&
                                    item1.hasOwnProperty("ordernumber")
                                      ? `${styles.content_item_doctorinfor}`
                                      : `${styles.content_item_doctorinfor} ${styles.banner}`
                                  }
                                >
                                  <Text
                                    className={
                                      styles.content_item_doctorinfor_name
                                    }
                                  >
                                    {item1.doctorinfor.name}
                                  </Text>
                                  <Text
                                    className={
                                      styles.content_item_doctorinfor_department
                                    }
                                  >
                                    {item1.doctorinfor.department}
                                  </Text>
                                  <Text
                                    className={
                                      styles.content_item_doctorinfor_identity
                                    }
                                  >
                                    {item1.doctorinfor.identity}
                                  </Text>
                                  {item1.inquiry.map((item2, index2) => {
                                    return (
                                      <View
                                        className={styles.content_item_people}
                                        key={index2}
                                      >
                                        <Text>
                                          {item2.label}：{item2.value}
                                        </Text>
                                      </View>
                                    );
                                  })}
                                </View>
                              </View>
                            </View>
                            <View
                              className={styles.content_item_banner_btnList}
                            >
                              {item1.server.map((item3, index3) => {
                                return (
                                  <AtButton
                                    className={styles.content_item_banner_btn}
                                    onClick={() => {
                                      GPage.DoWXCall(
                                        "serverOnClick",
                                        item3,
                                        index3
                                      );
                                    }}
                                  >
                                    {item3.text}
                                  </AtButton>
                                );
                              })}
                            </View>
                            {item1.inquiryinfor.hasOwnProperty("type") &&
                            item1.inquiryinfor.hasOwnProperty("time") &&
                            item1.inquiryinfor.hasOwnProperty("countdown") ? (
                              <View className={styles.content_item_footer}>
                                <View
                                  className={styles.content_item_inquiry_left}
                                >
                                  {item1.inquiryinfor.hasOwnProperty("type") ? (
                                    <Text
                                      className={
                                        styles.content_item_inquiry_type
                                      }
                                    >
                                      {"问诊类型：" + item1.inquiryinfor.type}
                                    </Text>
                                  ) : (
                                    ""
                                  )}
                                  {item1.inquiryinfor.hasOwnProperty("time") ? (
                                    <Text
                                      className={
                                        styles.content_item_inquiry_time
                                      }
                                    >
                                      {"问诊时间：" + item1.inquiryinfor.time}
                                    </Text>
                                  ) : (
                                    ""
                                  )}
                                </View>
                                {item1.inquiryinfor.hasOwnProperty(
                                  "countdown"
                                ) ? (
                                  <View
                                    className={
                                      styles.content_item_inquiry_right
                                    }
                                  >
                                    <Text>
                                      {"剩余时间：" +
                                        item1.inquiryinfor.countdown}
                                    </Text>
                                  </View>
                                ) : (
                                  ""
                                )}
                              </View>
                            ) : (
                              ""
                            )}
                          </View>
                        );
                      })
                    ) : (
                      <Comp_Result config={resultData} type="01" />
                    )}
                  </AtTabsPane>
                );
              })
            : ""}
        </AtTabs>
        {
          navData.list?<Comp_Nav config={navData} type={"normal"} className={styles.nav} />:''
        }
        
      </View>
    </Root>
  );
}
