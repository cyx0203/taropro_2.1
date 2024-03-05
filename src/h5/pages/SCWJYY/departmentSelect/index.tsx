import React, { useEffect, useState } from "react";
import { AtSearchBar } from "taro-ui";
import { View} from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import {
  Comp_BtnList,
} from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import { Root } from "../../../core/root";

//模板主体
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_SCWJYY_departmentSelect_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
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
        [nda.btnList],
        () => {
          setBtnList(nda.btnList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [searchContent, setSearchContent] = useState("");
  const [btnList, setBtnList] = useState(GPage.Data.btnList);
  const [searchPlaceholder, setSearchPlaceholder] = useState(GPage.Data.searchPlaceholder)
  const onSearchChange = value => {
    setSearchContent(value);
  };
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
      <View className={styles.departmentSelect}>
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
        <Comp_BtnList
          className={styles.btnList}
          config={btnList}
          type="01"
          onItemClick={(item, index) => {
            GPage.DoWXCall("onDeptClick", item, index);
          }}
        />
      </View>
    </Root>
  );
}
