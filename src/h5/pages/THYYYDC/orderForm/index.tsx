import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtButton, AtTabs, AtTabsPane, AtFloatLayout } from "taro-ui";
//原生组件
import { View, Image } from "@tarojs/components";
//自定义组件
import { Comp_Result, Comp_Nav } from "@/GGCompLib";
//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_THYYYDC_orderForm_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.orderListData],
        () => {
          setOrderListData(nda.orderListData);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.floatData],
        () => {
          setFloatData(nda.floatData);
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
  const [floatOpen, setFloatOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [tabList, setTabList] = useState(GPage.Data.tabList);
  const [floatData, setFloatData] = useState(GPage.Data.floatData);
  const [resultData, setResultData] = useState(GPage.Data.resultData);
  const [orderListData, setOrderListData] = useState(GPage.Data.orderListData);
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

  const createCard = (infoObj: any, index) => {
    return (
      <View className={styles.cardBox}>
        <View className={styles.header}>
          <View className={styles.left}>{infoObj?.headerLeft}</View>
          <View className={styles.right}>{infoObj?.headerRight}</View>
        </View>
        <View
          className={styles.content}
          onClick={() => {
            GPage.DoWXCall("cardClick", infoObj, index);
            setFloatOpen(true);
          }}
        >
          {infoObj?.pic ? (
            <View className={styles.left}>
              <Image src={infoObj.pic} className={styles.infoPic} />
            </View>
          ) : (
            ""
          )}

          <View className={styles.right}>
            {infoObj.infoList.length > 0
              ? infoObj.infoList.map((item, index) => {
                  return (
                    <View key={index} className={styles.infoItem}>
                      <View className={styles.label}>{item.label}</View>
                      <View className={styles.value}>{item.value}</View>
                    </View>
                  );
                })
              : ""}
          </View>
        </View>
        {infoObj?.footerBtn ? (
          <View className={styles.footer}>
            <AtButton
              className={styles.footerBtn}
              onClick={() => {
                GPage.DoWXCall("footerBtnClick", infoObj, index);
              }}
            >
              {infoObj.footerBtn}
            </AtButton>
          </View>
        ) : (
          ""
        )}
      </View>
    );
  };
  const createInfoItem = item => {
    return (
      <View className={styles.item}>
        <View style={{'display':'flex'}}>
          <Image src={item.pic} className={styles.dataPic} />
          <View className={styles.infoTxt}>
            <View className={styles.title}>{item.title}</View>
            <View className={styles.subtitle}>{item.subtitle}</View>
          </View>
        </View>
        <View className={styles.extra}>{item.extra}</View>
      </View>
    );
  };
  return (
    <Root hashData={styles}>
      <View className={styles.orderForm}>
        <AtTabs
          current={currentTab}
          tabList={tabList}
          onClick={val => {
            setCurrentTab(val);
            GPage.DoWXCall("tabClick", tabList[val], val);
          }}
        >
          {tabList && tabList.length > 0
            ? tabList.map((tabItem, tabIndex) => {
                return (
                  <AtTabsPane
                    current={currentTab}
                    index={tabIndex}
                    key={tabIndex}
                  >
                    {orderListData.isEmpty === "N" &&
                    orderListData.dataList.length > 0 ? (
                      orderListData.dataList.map((item, index) => {
                        return (
                          <View key={index} className={styles.cardList}>
                            {createCard(item, index)}
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
        {/* 底部导航 */}
        <Comp_Nav config={navData} type={"normal"} className={styles.nav} />
        <AtFloatLayout isOpened={floatOpen} onClose={() => setFloatOpen(false)}>
          <View className={styles.floatBox}>
            <View className={styles.header}>{floatData.header.title}</View>
            <View className={styles.content}>
              {floatData.content.dataList.length > 0
                ? floatData.content.dataList.map((item, index) => {
                    return (
                      <View className={styles.dataItem} key={index}>
                        {createInfoItem(item)}
                      </View>
                    );
                  })
                : ""}
              <View className={styles.extreInfo}>
                {floatData.content.extraInfo}
              </View>
            </View>
            <View className={styles.footer}>
              {floatData.footer.dataList.length > 0
                ? floatData.footer.dataList.map((item, index) => {
                    return (
                      <View className={styles.dataItem} key={index}>
                        <View className={styles.infoLabel}>{item.label}</View>
                        <View className={styles.infoValue} dangerouslySetInnerHTML={{__html:item.value}}></View>
                      </View>
                    );
                  })
                : ""}
            </View>
          </View>
        </AtFloatLayout>
      </View>
    </Root>
  );
}
