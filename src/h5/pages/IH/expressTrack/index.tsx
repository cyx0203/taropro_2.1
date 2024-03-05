import React, { useEffect, useRef, useState } from "react";
import Taro,{ useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import { View, Text, Button } from "@tarojs/components";
import { Current } from "@tarojs/taro";
import { Comp_Result } from "@/GGH5/ggcomplib";
import { AtIcon, AtTimeline } from "taro-ui";
import _ from "lodash";
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_expressTrack_index",
    ndaExcute: (nda: any) => {
      GPage.SetState(
        [nda.trackData],
        () => {
          setTrackData(nda.trackData);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.expressData],
        () => {
          setExpressData(nda.expressData);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [trackData, setTrackData] = useState(GPage.Data.trackData);
  const [expressData, setExpressData] = useState(GPage.Data.expressData);
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
      <View className={styles.expressTrack}>
        <View className={styles.expressInfo}>
          <View className={styles.title}>
            <Text>{expressData.title}</Text>
            <Button
              className={styles.copyBtn}
              onClick={() => {
                Taro.setClipboardData({
                  data: `${expressData.title}`,
                })
              }}
            >
              复制
            </Button>
          </View>
          <View className={styles.content}>
            <View className={styles.start_end}>
              {expressData.start}
              <AtIcon value="arrow-right" size={30} className={styles.arrow} />
              {expressData.end}
            </View>
            {_.has(expressData, "extra") && expressData.extra && (
              <View className={styles.extra}>{expressData.extra}</View>
            )}

            <Text className={styles.status}>{expressData.status}</Text>
          </View>
        </View>
        <View className={styles.trackArea}>
          {_.has(expressData, "detailAddress") && expressData.detailAddress && (
            <View className={styles.detailAddress}>
              <AtIcon value="map-pin" size={24} />
              <Text className={styles.address}>
                收货地址：{expressData.detailAddress}
              </Text>
            </View>
          )}

          <AtTimeline items={trackData} />
        </View>
      </View>
    </Root>
  );
}
