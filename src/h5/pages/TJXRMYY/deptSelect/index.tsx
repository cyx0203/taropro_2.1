import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { AtSearchBar, AtTabs, AtTabsPane, AtIcon } from "taro-ui";
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
import { Comp_DateBar, Comp_Result } from "@/GGCompLib";
import styles from "./style/index.module.scss";
import { Icon, View,Text } from "@tarojs/components";
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_TJXRMYY_deptSelect_index",
    ndaExcute: (nda: any) => {
      GPage.SetState(
        [nda.datebar],
        () => {
          setDateBar({
            listData: nda.datebar.listData,
            onItemClick: GPage.WXCall.onDateClick,
            direction: "01"
          });
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.searchPlaceholder],
        () => {
          setSearchPlaceholder(nda.searchPlaceholder);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.deptDataArea],
        () => {
          setDeptDataArea(nda.deptDataArea);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [resultData, setResultData] = useState({
    icon: "@empty",
    title: "未查询到科室"
  });
  const [dateBar, setDateBar] = useState({
    listData: GPage.Data.datebar.listData,
    onItemClick: GPage.WXCall.onDateClick,
    direction: "01"
  });
  const [searchContent, setSearchContent] = useState("");
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    GPage.Data.searchPlaceholder
  );
  const onSearchChange = value => {
    setSearchContent(value);
  };
  const [deptDataArea, setDeptDataArea] = useState(GPage.Data.deptDataArea);
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
      <View className={styles.deptSelect}>
        {/* 预约日期时间选择 */}
        <View className={styles.selectDate}>
          <Comp_DateBar type="01" config={dateBar} className={styles.datebar} />
        </View>
        {/* 搜索框 */}
        <View className={styles.search_main}>
          <AtSearchBar
            placeholder={searchPlaceholder}
            value={searchContent}
            onChange={value => {
              onSearchChange(value);
            }}
            onActionClick={() => {
              GPage.DoWXCall("searchClick", searchContent);
            }}
          />
        </View>
        <View className={styles.deptContent}>
          <View
            className={styles.dept_v1}
            style={{
              display: deptDataArea.hasOwnProperty("main_dept") ? "" : "none"
            }}
          >
            {GPage.Map(
              deptDataArea.main_dept,
              (item: any, index: any) => {
                return (
                  <View
                    className={
                      item.active && item.active === true
                        ? [`${styles.v1_item}`, `${styles.dept_active}`].join(
                            " "
                          )
                        : styles.v1_item
                    }
                    onClick={() => {
                      GPage.DoWXCall("onMainDeptClick", item);
                    }}
                  >
                    {item.title}
                  </View>
                );
              },
              ""
            )}
          </View>
          <View
            className={styles.dept_v2}
            style={{
              width: deptDataArea.hasOwnProperty("main_dept") ? "68%" : "100%",
              textAlign: deptDataArea.hasOwnProperty("main_dept")
                ? "center"
                : "start"
            }}
          >
            {deptDataArea &&
            deptDataArea.hasOwnProperty("sub_dept") &&
            deptDataArea.sub_dept.length ? (
              deptDataArea.sub_dept.map((item, index) => {
                return (
                  <View
                    key={index}
                    // className={styles.v2_item}
                    className={
                      deptDataArea.hasOwnProperty("main_dept")
                        ? `${styles.v2_item}`
                        : `${styles.v2_item + " " + styles.dept_item}`
                    }
                    // style={{
                    //   paddingLeft: deptDataArea.hasOwnProperty("main_dept")
                    //     ? ""
                    //     : "10px",
                    //   borderBottom:deptDataArea.hasOwnProperty("main_dept")?'':"1px solid #bbb",
                    //   margin:deptDataArea.hasOwnProperty("main_dept")?'':'0 20px'
                    // }}
                    onClick={() => {
                      GPage.DoWXCall("onSubDeptClick", item);
                    }}
                  >
                    {/* <img src={}/> */}
                    <Text dangerouslySetInnerHTML={{__html:item.dept_name}}></Text>
                    <AtIcon
                      value="chevron-right"
                      color="#bbb"
                      customStyle={{
                        display: deptDataArea.hasOwnProperty("main_dept")
                          ? "none"
                          : ""
                      }}
                    ></AtIcon>
                  </View>
                );
              })
            ) : (
              <View className={styles.result}>
                <Comp_Result config={resultData} type="01" />
              </View>
            )}
          </View>
        </View>
      </View>
    </Root>
  );
}
