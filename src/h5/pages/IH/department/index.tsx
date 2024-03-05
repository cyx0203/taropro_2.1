import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtTabs, AtTabsPane, AtButton, AtAvatar, AtIcon } from "taro-ui";
//原生组件
import { View, Text, Image } from "@tarojs/components";
//自定义组件
import { Comp_Result, Comp_Nav } from "@/GGCompLib";
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
    pageName: "h5_pages_IH_department_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.pageData],
        () => {
          setPageData(nda.pageData);
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
        [nda.resultData],
        () => {
          setResultData(nda.resultData);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  //定义state
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    GPage.Data.searchPlaceholder
  );
  const [pageData, setPageData] = useState(GPage.Data.pageData);
  const [resultData, setResultData] = useState(GPage.Data.resultData);

  useEffect(() => {
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});
  const isArray = (data: any) => {
    return Object.prototype.toString.call(data) === "[object Array]";
  };
  return (
    <Root hashData={styles}>
      <View className={styles.department}>
        <GGCPS_TopBar
          mode="search"
          searchPlaceholder={searchPlaceholder}
          searchOnclick={value => {
            GPage.DoWXCall("searchOnClick", value);
          }}
        />
        <View className={styles.main}>
          <View className={styles.title}>
            {pageData.title}
            <View className={styles.underline}></View>
          </View>
          <View className={styles.list}>
            {pageData &&
            pageData.isEmpty === "N" &&
            isArray(pageData?.deptList) &&
            pageData.deptList.length > 0 ? (
              pageData.deptList.map((item, index) => {
                return (
                  <View
                    key={index}
                    className={styles.deptItem}
                    style={{
                      borderBottom:
                        index === pageData.deptList.length - 1 ? "0" : ""
                    }}
                    onClick={()=> {
                      GPage.DoWXCall('deptClick',item,index)
                    }}
                  >
                    <Image src={item.icon} className={styles.deptIcon} />
                    <Text className={styles.deptTxt}>{item.txt}</Text>
                    <AtIcon
                      className={styles.deptAtIcon}
                      value="chevron-right"
                      color="#bbb"
                    />
                  </View>
                );
              })
            ) : (
              <Comp_Result config={resultData} type="01"  className={styles.result}/>
            )}
          </View>
        </View>
      </View>
    </Root>
  );
}
