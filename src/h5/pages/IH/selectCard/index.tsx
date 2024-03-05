import React, { useEffect, useRef, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import { Button, View, WebView, Image, Text } from "@tarojs/components";
import { Current } from "@tarojs/taro";
import { Comp_Result, Comp_Tips } from "@/GGH5/ggcomplib";
import { AtModal, AtModalContent } from "taro-ui";
import Taro from "@tarojs/taro";
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_selectCard_index",
    ndaExcute: (nda: any) => {
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
  const [dataList, setDataList] = useState(GPage.Data.dataList);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Root hashData={styles}>
      <View className={styles.selectCard}>
        <View className={styles.listContent}>
          {dataList && dataList.length > 0 ? (
            dataList.map((item, index) => {
              return (
                <View
                  key={index}
                  className={`${styles.cardBox} ${!item.check &&
                    styles.scaleCard}`}
                >
                  <View
                    className={styles.cardContent}
                    style={{
                      backgroundImage: `url(${item.bgUrl})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 100%"
                    }}
                    onClick={() => GPage.DoWXCall("cardOnClick", item, index)}
                  >
                    <Text className={styles.headline}>{item.headline}</Text>
                    <View className={styles.infoList}>
                      {GPage.Map(
                        item.infoList,
                        (infoItem, infoIndex) => {
                          return (
                            <View
                              key={infoIndex}
                              className={`${infoItem?.fontSize}`}
                            >
                              <Text style="marginRight:8px">
                                {infoItem.label}
                              </Text>
                              <Text style="fontSize:20px">
                                {infoItem.value}
                              </Text>
                            </View>
                          );
                        },
                        ""
                      )}
                    </View>
                  </View>
                  {!item?.check && (
                    <View
                      className={styles.cardAction}
                      onClick={() => {
                        Taro.showModal({
                          title: "提示",
                          content: `确认选择当前健康卡吗？`,
                          success: function(res) {
                            if (res.confirm) {
                              GPage.DoWXCall("changeOnClick", item, index);
                            }
                          }
                        });
                      }}
                    >
                      点击设为默认
                    </View>
                  )}
                </View>
              );
            })
          ) : (
            <View className={styles.result}>
              <Comp_Result
                type="01"
                config={{ icon: "@empty", title: "暂未查询到数据" }}
              />
            </View>
          )}
        </View>
        <View className={styles.footer}>
          {GPage.Data.warmTipsObj && (
            <View className={styles.warmTips}>
              {GPage.Data.warmTipsObj.content}
            </View>
          )}
          {GPage.Map(
            GPage.Data.btnList,
            (item, index) => {
              return (
                <Button
                  key={index}
                  type={item.type}
                  className={`${styles.btn} ${
                    item.type == "primary" ? styles.primary : ""
                  }`}
                  onClick={() => {
                    GPage.DoWXCall("btnOnClick", item, index);
                    console.log(dataList);
                  }}
                >
                  {item.text}
                </Button>
              );
            },
            ""
          )}
        </View>
      </View>
    </Root>
  );
}
