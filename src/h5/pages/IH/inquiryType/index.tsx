import React, { useEffect, useRef, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import { Button, View, WebView, Image, Text } from "@tarojs/components";
import { Current } from "@tarojs/taro";
import { Comp_Result } from "@/GGH5/ggcomplib";
import { AtButton, AtIcon, AtTimeline } from "taro-ui";
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_inquiryType_index",
    ndaExcute: (nda: any) => {
      GPage.SetState(
        [nda.typeList],
        () => {
          setTypeList(nda.typeList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [typeList, setTypeList] = useState(GPage.Data.typeList);
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
      <View className={styles.inquiryType}>
        {typeList && typeList.length > 0
          ? typeList.map((item, index) => {
              return (
                <View className={styles.cardItem} key={`cardItem-${index}`}>
                  <View className={styles.cardItemTitle}>
                    <Image
                      src={item.typeTitle.icon}
                      className={styles.titleIcon}
                    />
                    <Text className={styles.titleTitle}>
                      {item.typeTitle.title}
                    </Text>
                  </View>
                  <View className={styles.cardItemBody}>
                    <View className={styles.cardItemInfoTips}>
                      {item.infoData.tips}
                    </View>
                    <AtTimeline items={item.infoData.lineList} />
                    <View className={styles.cardItemExtra}>
                      <View className={styles.cardItemExtraTitle}>
                        {item.infoData.extra.label}:
                      </View>
                      <View className={styles.cardItemExtraList}>
                        {item.infoData.extra.value.map((eItem, eIndex) => {
                          return (
                            <Text
                              className={styles.cardItemExtraItem}
                              key={`extraItem-${eIndex}`}
                            >
                              {eItem}
                              {eIndex !=
                              item.infoData.extra.value.length - 1 ? (
                                <AtIcon
                                  value="arrow-right"
                                  size="12"
                                  // color="#F00"
                                />
                              ) : (
                                ""
                              )}
                            </Text>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                  <View className={styles.cardItemFooter}>
                    <AtButton disabled={item.footerBtn.disabled} className={styles.footerBtn} onClick={() => {
                      if(item.footerBtn?.disabled) return 
                      GPage.DoWXCall('inquiryOnClick',item,index)
                    }}>
                      {item.footerBtn.text}
                    </AtButton>
                  </View>
                </View>
              );
            })
          : null}
      </View>
    </Root>
  );
}
