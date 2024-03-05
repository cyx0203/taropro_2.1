import React, { useEffect, useState } from "react";
import { View} from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { AtFloatLayout } from "taro-ui";
import {
  Comp_DateBar,
  Comp_CardList,
  Comp_Table,
  Comp_Result
} from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import { Root } from "../../../core/root";

//模板主体
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_SCWJYY_demo_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.doctorInfo_Area],
        () => {
          setDoctorInfo_Area(nda.doctorInfo_Area)
          if (nda.doctorInfo_Area.hasOwnProperty("emptyTips")) {
            let obj = { ...resultData1 };
            obj.title = nda.doctorInfo_Area.emptyTips;
            setResultData1(obj);
          };
        },
        () => {
          console.error("NDA设置出错");
        }
      );

      GPage.SetState(
        [nda.datebar],
        () => {
          setDateBar({
            listData: nda.datebar.listData,
            onItemClick: GPage.WXCall.onDateClick,
            direction: "01"
          });
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.appointTime_Area],
        () => {
          setAppointTime_Area(nda.appointTime_Area);
          if (nda.appointTime_Area.hasOwnProperty("emptyTips")) {
            let obj = { ...resultData2 };
            obj.title = nda.appointTime_Area.emptyTips;
            setResultData2(obj);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [dateBar, setDateBar] = useState({
    listData: GPage.Data.datebar.listData,
    onItemClick: GPage.WXCall.onDateClick,
    direction: "01"
  });
  const [doctorInfo_Area, setDoctorInfo_Area] = useState(
    GPage.Data.doctorInfo_Area
  );
  const [appointTime_Area, setAppointTime_Area] = useState(
    GPage.Data.appointTime_Area
  );
  const [floatOpen, setFloatOpen] = useState(false);
  const [resultData1, setResultData1] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  const [resultData2, setResultData2] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  useEffect(() => {
    if (doctorInfo_Area.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData1 };
      obj.title = doctorInfo_Area.emptyTips;
      setResultData1(obj);
    }
    if (appointTime_Area.hasOwnProperty("emptyTips")) {
      let obj = { ...resultData2 };
      obj.title = appointTime_Area.emptyTips;
      setResultData2(obj);
    }
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
      <View className={styles.demo}>
        {/* 预约日期时间选择 */}
        <View className={styles.selectDate}>
          <Comp_DateBar type="01" config={dateBar} className={styles.datebar} />
        </View>
        {/* 预约医生信息列表 */}
        <View className={styles.doctorCard}>
          {doctorInfo_Area.isEmpty === "N" ? (
            <Comp_CardList
              type="02"
              config={doctorInfo_Area}
              onItemClick={(item, index) => {
                GPage.DoWXCall("onSelectDoctor", item, index);
                setFloatOpen(true);
              }}
            />
          ) : (
            <View className={styles.result}>
              <Comp_Result config={resultData1} type="01" />
            </View>
          )}
        </View>
        {appointTime_Area.isShow === "Y" ? (
          <AtFloatLayout
            isOpened={floatOpen}
            title="就诊时间"
            onClose={() => {
              setFloatOpen(false);
            }}
            className={styles.floatlayout}
          >
            <View className={styles.time_dept}>
              <View>{appointTime_Area.time}</View>
              <View>{appointTime_Area.dept}</View>
            </View>
            {appointTime_Area.isEmpty === "N" ? (
              <Comp_Table
                type="01"
                config={appointTime_Area}
                onItemClick={(item, index) => {
                  GPage.DoWXCall("onAppTime", item, index);
                }}
              />
            ) : (
              <View className={styles.result}>
              <Comp_Result config={resultData2} type="01" />
            </View>
            )}
          </AtFloatLayout>
        ) : (
          ""
        )}
      </View>
    </Root>
  );
}
