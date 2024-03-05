import React, { useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Comp_Tips } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import "./style/index.scss";
import { Root } from "../../../core/root";
import { AtButton } from "taro-ui";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_SCWJYY_confirmRegistration_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.content],
        () => {
          // setContent(nda.content);
          let info1 = [];
          let info2 = [];
          info1 = nda.content.slice(0, -1);
          info2.push(nda.content[nda.content.length - 1]);
          setContentList1(info1);
          setContentList2(info2);
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
        [nda.warmPrompt],
        () => {
          setWarmPrompt(nda.warmPrompt);
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
    }
  });
  const [content, setContent] = useState(GPage.Data.content);
  const [contentList1, setContentList1] = useState([]);
  const [contentList2, setContentList2] = useState([]);
  const [patient, setPatient] = useState(GPage.Data.patient);
  const [btns, setBtns] = useState(GPage.Data.btns);
  const [warmPrompt, setWarmPrompt] = useState(GPage.Data.warmPrompt);
  let patientInfo = {
    label: "就诊人",
    value: patient
  };
  useEffect(() => {
    let info1 = [];
    let info2 = [];
    info1 = content.slice(0, -1);
    info2.push(content[content.length - 1]);
    setContentList1(info1);
    setContentList2(info2);
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  return (
    <Root>
      <View className="confirmRegistration">
        <View className="confshowList">
          <View className="confmain-content">
            {/* 信息列表反显 */}
            {GPage.Map(
              contentList1,
              (item: any, index: any) => {
                return (
                  <View className="confitem">
                    <View className="label">{item.label}</View>
                    <View className="value">{item.value}</View>
                  </View>
                );
              },
              ""
            )}
            {/* 切换就诊人 */}
            <View
              className="confitem-patient"
              style={{ display: patient ? "" : "none" }}
            >
              <View className="confpatient">
                <View className="label">{patientInfo.label}</View>
                <View className="value">{patientInfo.value}</View>
              </View>
              <View
                className="btn"
                onClick={() => {
                  GPage.DoWXCall("changePatient");
                }}
                style={{
                  display: btns.hasOwnProperty("changePatient") ? "" : "none"
                }}
              >
                {btns.changePatient}
              </View>
            </View>
            {/* 信息列表反显 */}
            {GPage.Map(
              contentList2,
              (item: any, index: any) => {
                return (
                  <View className="confitem">
                    <View className="label">{item.label}</View>
                    <View className="value">{item.value}</View>
                  </View>
                );
              },
              ""
            )}
          </View>
          {/* 温馨提示 */}
          <Comp_Tips type="01" config={warmPrompt} />
        </View>
        <View
          className="confirmBtn"
          onClick={() => {
            GPage.DoWXCall("confirm");
          }}
          style={{ display: btns.hasOwnProperty("confirm") ? "" : "none" }}
        >
          <AtButton>{btns.confirm}</AtButton>
        </View>
        <View
          className="cancelBtn"
          onClick={() => {
            GPage.DoWXCall("cancel");
          }}
          style={{ display: btns.hasOwnProperty("cancel") ? "" : "none" }}
        >
          <AtButton>{btns.cancel}</AtButton>
        </View>
      </View>
    </Root>
  );
}
