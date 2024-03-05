import React, { useEffect, useRef, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import { Button, View, WebView, Image } from "@tarojs/components";
import { Current } from "@tarojs/taro";
import { Comp_Result } from "@/GGH5/ggcomplib";
import { AtModal, AtModalContent } from "taro-ui";
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_result_index",
    ndaExcute: (nda: any) => {
      GPage.SetState(
        [nda.resultData],
        () => {
          setResultData(nda.resultData);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.resultInfo],
        () => {
          setResultInfo(nda.resultInfo);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.toastData],
        () => {
          setToastData(nda.toastData);
          modalDuration(nda.toastData?.duration);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const timeInterval = useRef(null);
  const [modalShow, setModalShow] = useState(true);
  const [toastData, setToastData] = useState(GPage.Data.toastData);
  const [resultData, setResultData] = useState(GPage.Data.resultData);
  const [resultInfo, setResultInfo] = useState(GPage.Data.resultInfo);
  useEffect(() => {
    modalDuration(toastData?.duration);
    return () => {
      clearInterval(timeInterval.current);
    };
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});
  const modalDuration = (second: number) => {
    setModalShow(true);
    if (second) {
      timeInterval.current = setInterval(() => {
        setModalShow(false);
      }, second * 1000);
    } else {
      setModalShow(false);
    }
  };
  return (
    <Root hashData={styles}>
      <View className={styles.result}>
        <Comp_Result config={resultData} type="01" />
        {resultInfo && resultInfo.length > 0 && (
          <View className={styles.resultInfo}>
            {resultInfo && resultInfo.length > 0
              ? resultInfo.map((item, index) => {
                  return (
                    <View className={styles.infoItem} key={index}>
                      <View className={styles.label}>{item.label}</View>
                      <View
                        className={styles.value}
                        dangerouslySetInnerHTML={{ __html: item.value }}
                      ></View>
                    </View>
                  );
                })
              : ""}
          </View>
        )}

        {GPage.Data.footerBtn ? (
          <Button
            className={styles.footerBtn}
            onClick={() => {
              GPage.DoWXCall("footerBtnClick");
            }}
          >
            {GPage.Data.footerBtn}
          </Button>
        ) : (
          ""
        )}
        <AtModal isOpened={modalShow} closeOnClickOverlay={false}>
          <AtModalContent>
            <Image
              style={{
                width: "25px",
                height: "25px",
                marginRight: "5px"
              }}
              src={toastData.icon}
            />
            <View
              dangerouslySetInnerHTML={{ __html: toastData.content }}
            ></View>
          </AtModalContent>
        </AtModal>
      </View>
    </Root>
  );
}
