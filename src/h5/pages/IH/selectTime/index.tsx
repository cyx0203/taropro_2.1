import React, { useEffect, useState } from "react";
import { AtTag } from "taro-ui";
import { View, WebView, Image, Text } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "@/GGPageRoot";
import { Comp_Menu, Comp_Nav } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import { Comp_DateBar, Comp_Result } from "@/GGH5/ggcomplib";
import GridBtn from "@/GGH5/components/GridBtn";
import { has } from "lodash";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_IH_selectTime_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.dataList],
        () => {
          setDataList(nda.dataList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const dateBar = {
    listData: GPage.Data.datebar && GPage.Data.datebar.listData /**数据列表 */,
    onItemClick: GPage.WXCall.dateOnClick /**点击事件 */,
    direction: "01" /**组件类型 */
  };
  const [dataList, setDataList] = useState(GPage.Data.dataList);
  useEffect(() => {
    return () => {};
  }, []);
  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {
    let arr = [...dataList];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].timeList.length; j++) {
        delete arr[i].timeList[j].active;
      }
    }
    setDataList(arr);
  });
  return (
    <Root hashData={styles}>
      <View className={styles.selectTime}>
        {GPage.Data.datebar && (
          <Comp_DateBar type="01" config={dateBar} className={styles.datebar} />
        )}
        <View className={styles.content}>
          {dataList && dataList.length > 0 ? (
            dataList.map((item, index) => {
              return (
                <View
                  className={styles.cardItem}
                  key={index}
                  onClick={() => {
                    GPage.DoWXCall("cardOnClick", item, index);
                  }}
                >
                  <View className={styles.upper}>
                    {item?.img && (
                      <Image src={item.img} className={styles.userCard_image} />
                    )}
                    <View className={styles.userCard_middle}>
                      {item?.title && (
                        <View
                          style={{ display: "flex", alignItems: "flex-end" }}
                        >
                          {typeof item?.title === "string" ? (
                            <Text className={styles.userCard_middle_title}>
                              {item?.title}
                            </Text>
                          ) : (
                            <View className={styles.userCard_middle_title}>
                              {item?.title}
                            </View>
                          )}
                          <AtTag className={styles.tag}>{item?.tag}</AtTag>
                        </View>
                      )}

                      {item?.subTitle && (
                        <View className={styles.userCard_middle_next}>
                          {item?.subTitle}
                        </View>
                      )}
                    </View>
                  </View>
                  <View className={styles.btnArea}>
                    <GridBtn
                      config={item.timeList}
                      rowNum={3}
                      onItemClick={(date, dateIndex, e) => {
                        if (e && e.stopPropagation) e.stopPropagation();
                        else {
                          window.event.cancelBubble = true;
                        }
                        // 有且只有一个医生卡片内的时间能被选中
                        let arr = [...dataList];
                        for (let i = 0; i < arr.length; i++) {
                          if (i != index && has(arr[i], "timeList")) {
                            for (let j = 0; j < arr[i].timeList.length; j++) {
                              if (arr[i].timeList[j]?.active)
                                arr[i].timeList[j].active = false;
                            }
                          }
                        }
                        // setDataList(arr)
                        GPage.DoWXCall("timeOnClick", date, dateIndex);
                      }}
                      expansion
                    />
                  </View>
                </View>
              );
            })
          ) : (
            <Comp_Result
              className={styles.result}
              config={{
                icon: "@empty",
                title: "暂无查询到数据"
              }}
              type="01"
            />
          )}
        </View>
      </View>
    </Root>
  );
}
