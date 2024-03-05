import React, { useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import { Root } from "../../../core/root";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_SCWJYY_resultSubmit_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.content],
        () => {
          setContent(nda.content);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.patient],
        () => {
          setPatient(nda.patient);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [content, setContent] = useState(GPage.Data.content);
  const [patient, setPatient] = useState(GPage.Data.patient);
  let patientInfo = {
    label: "就诊人",
    value: patient
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
      <View className={styles.resultSubmit}>
        <View className={styles.showList}>
          <View className={styles.title}>{content.title}</View>
          <View className={styles.main_content}>
            {GPage.Map(
              content.info,
              (item: any, index: any) => {
                return (
                  <View className={styles.item}>
                    <View className={styles.label}>{item.label}</View>
                    <View className={styles.value}>{item.value}</View>
                  </View>
                );
              },
              ""
            )}
            <View className={styles.item_patient}>
              <View className={styles.patient}>
                <View className={styles.label}>{patientInfo.label}</View>
                <View className={styles.value}>{patientInfo.value}</View>
              </View>
              <View
                className={styles.btn}
                onClick={() => {
                  GPage.DoWXCall('changePatient')
                }}
              >
                切换
              </View>
            </View>
          </View>
        </View>
        <AtButton onClick={() => GPage.DoWXCall('resultSubmit')}>提交评价</AtButton>
      </View>
    </Root>
  );
}
