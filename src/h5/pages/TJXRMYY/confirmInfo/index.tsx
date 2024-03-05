import React, { useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Comp_Tips } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import { Root } from "../../../core/root";
import { AtButton } from "taro-ui";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_confirmInfo_index",
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
      GPage.SetState(
        [nda.btns],
        () => {
          setBtns(nda.btns);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.warmPrompt],
        () => {
          setwarmPrompt(nda.warmPrompt);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [warmPrompt, setwarmPrompt] = useState(GPage.Data.warmPrompt);
  const [content, setContent] = useState(GPage.Data.content);
  const [patient, setPatient] = useState(GPage.Data.patient);
  const [btns, setBtns] = useState(GPage.Data.btns);
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
      <View className={styles.confirmInfo}>
        <View className={styles.infoMain}>
          {/* 切换就诊人 */}
          <View
            className={styles.patientArea}
            style={{ display: patient ? "" : "none" }}
          >
            <View className={styles.patient}>
              <View className={styles.label}>{patientInfo.label}</View>
              <View className={styles.value}>{patientInfo.value}</View>
            </View>
            {btns &&
            btns.hasOwnProperty("changePatient") &&
            btns.changePatient.txt ? (
              <View
                className={styles.btn}
                onClick={() => {
                  if(!btns.changePatient.disabled)
                  GPage.DoWXCall("changePatient");
                }}
              >
                {btns.changePatient.txt}
              </View>
            ) : (
              ""
            )}
          </View>
          <View className={styles.content}>
            {/* 信息列表反显 */}
            {GPage.Map(
              content,
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
          </View>
        </View>
        {/* 温馨提示 */}
        {warmPrompt ? <Comp_Tips type="01" config={warmPrompt} /> : ""}
        {btns && btns.hasOwnProperty("confirm") && btns.confirm.txt ? (
          <View
            className={styles.confirmBtn}
            onClick={() => {
              if(!btns.confirm.disabled)
              GPage.DoWXCall("confirm");
            }}
          >
            <AtButton disabled={btns.confirm.disabled}>
              {btns.confirm.txt}
            </AtButton>
          </View>
        ) : (
          ""
        )}
        {btns && btns.hasOwnProperty("cancel") && btns.cancel.txt ? (
          <View
            className={styles.cancelBtn}
            onClick={() => {
              if(!btns.cancel.disabled)
              GPage.DoWXCall("cancel");
            }}
          >
            <AtButton disabled={btns.cancel.disabled}>
              {btns.cancel.txt}
            </AtButton>
          </View>
        ) : (
          ""
        )}
      </View>
    </Root>
  );
}
