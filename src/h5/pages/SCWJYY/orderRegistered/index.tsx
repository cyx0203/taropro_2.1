import React, { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import { AtIcon, AtTabs, AtTabsPane } from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Comp_UserInforCard, Comp_CardList ,Comp_Result} from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import "./style/index.scss";
import { Root } from "../../../core/root";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_SCWJYY_orderRegistered_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
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
        [nda.tabList],
        () => {
          setTabList(nda.tabList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.paidData],
        () => {
          setPaidData(nda.paidData);
          if(nda.paidData.hasOwnProperty('emptyTips')) {
            let obj = {...resultData1}
            obj.title = nda.paidData.emptyTips
            setResultData1(obj)
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.unpaidData],
        () => {
          setUnPaidData(nda.unpaidData);
          if(nda.unpaidData.hasOwnProperty('emptyTips')) {
            let obj = {...resultData1}
            obj.title = nda.unpaidData.emptyTips
            setResultData2(obj)
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [patient, setPatient] = useState(GPage.Data.patient);
  const [tabCurrent, setTabCurrent] = useState(0);
  const [tabList, setTabList] = useState(GPage.Data.tabList);
  const [paidData, setPaidData] = useState(GPage.Data.paidData);
  const [unpaidData, setUnPaidData] = useState(GPage.Data.unpaidData);
  const [resultData1,setResultData1] = useState({
    icon: '@empty',
    title: '暂无信息',
  })
  const [resultData2,setResultData2] = useState({
    icon: '@empty',
    title: '暂无信息',
  })
  const handleCurrent = value => {
    setTabCurrent(value);
  };
  useEffect(() => {
    if(paidData.hasOwnProperty('emptyTips')) {
      let obj = {...resultData1}
      obj.title = paidData.emptyTips
      setResultData1(obj)
    }
    if(unpaidData.hasOwnProperty('emptyTips')) {
      let obj = {...resultData2}
      obj.title = unpaidData.emptyTips
      setResultData2(obj)
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
    <Root>
      <View className="orderRegistered">
        <View
          className="patient_main"
          onClick={() => GPage.DoWXCall("patientClick")}
        >
          <View className="patientInfo">
            <View className="name">{patient.name}</View>
            <View className="number">{`就诊卡号:${patient.number}`}</View>
          </View>
          <View>
            <AtIcon value="chevron-right" size="30" color="#ddd"></AtIcon>
          </View>
        </View>
        <View className="tip">默认查询近30天的记录</View>
        <View className="content_main">
          <AtTabs
            current={tabCurrent}
            tabList={tabList}
            onClick={value => {
              handleCurrent(value);
              GPage.DoWXCall("tabClick", tabList[value], value);
            }}
          >
            <AtTabsPane current={tabCurrent} index={0}>
              <View className="card_main">
              {
                  paidData.isEmpty === 'N'?(<Comp_CardList
                  type="01"
                  config={paidData}
                  onItemClick={(item, index, btnName) => {
                    GPage.DoWXCall("onItemClick", item, index, btnName);
                  }}
                  onItemClick2={(item, index, btnName) => {
                    GPage.DoWXCall("onItemClick", item, index, btnName);
                  }}
                />):(<View className="result">
                <Comp_Result config={resultData1} type="01" />
              </View>)
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={tabCurrent} index={1}>
              <View className="card_main">
                {
                  unpaidData.isEmpty === 'N'?(<Comp_CardList
                  type="01"
                  config={unpaidData}
                  onItemClick={(item, index, btnName) => {
                    GPage.DoWXCall("onItemClick", item, index, btnName);
                  }}
                  onItemClick2={(item, index, btnName) => {
                    GPage.DoWXCall("onItemClick", item, index, btnName);
                  }}
                />):(<View className="result">
                <Comp_Result config={resultData2} type="01" />
              </View>)
                }
                
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    </Root>
  );
}
