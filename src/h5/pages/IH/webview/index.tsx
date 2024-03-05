import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import { View, WebView } from "@tarojs/components";
import { Current } from "@tarojs/taro";
import Taro from '@tarojs/taro';

export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_webview_index",
    ndaExcute: (nda: any) => {
      GPage.SetState(
        [nda.url],
        () => {
          setUrl(nda.url)
        },
        () => {
          console.log('Fail');
        }
      );
      GPage.SetState(
        [nda.params],
        () => {
          setParams(nda.params)
        },
        () => {
          console.log('Fail');
        }
      );
    }
  });
  const [url, setUrl] = useState(GPage.Data.url);
  const [params, setParams] = useState(GPage.Data.params);
  useEffect(() => {
    return () => {
      const backUrl=GPage.Data.backUrl;
      if(backUrl&& backUrl!==''){
        Taro.reLaunch({
          url:backUrl
        })
      }
    };
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});
  const handleMessage = () => {

  }
  return (
    <Root hashData={styles}>
      <WebView src={`${url}?${params}`} onMessage={() => handleMessage()} />
    </Root>
  );
}
