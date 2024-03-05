import React, { useEffect, useState } from "react";
import { View, Image, Text } from "@tarojs/components";
import {
  AtDivider,
  AtButton,
  AtIcon,
} from "taro-ui";
import Taro from '@tarojs/taro';
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { GGWingBlank, GGWhiteSpace, GGCPS_TopBar,GGCPS_Switch } from "@/GGCPS";
// import BASE from "@/GGPageBase";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
// import "~taro-ui/dist/style/index.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_IH_Consultation_pay_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.consultationInfo],
        () => {
          setCTI(nda.consultationInfo)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.patientinfor],
        () => {
          setPI(nda.patientinfor)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.addressArray],
        () => {
          setAA(nda.addressArray)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.defaultIndex],
        () => {
          setDI(nda.defaultIndex)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.money],
        () => {
          setMoney(nda.money)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.isAddress],
        () => {
          setIA(nda.isAddress)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.showPAndD],
        () => {
          setSPAD(nda.showPAndD)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.switchC],
        () => {
          setSwitchC(nda.switchC)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.defaultImg],
        () => {
          setDIM(nda.defaultImg)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  
  const [viewHeight,setView] = useState(1080);
    const [consultationInfo,setCTI] = useState(GPage.Data.consultationInfo)
    const [addressArray,setAA] = useState(GPage.Data.addressArray)
    const [patientinfor,setPI] = useState(GPage.Data.patientinfor)
    const [defaultIndex,setDI] = useState(GPage.Data.default_index?GPage.Data.default_index:-1)
    const [money,setMoney] = useState(GPage.Data.money)
    const [isAddress,setIA] = useState(false)
    const [showPAndD,setSPAD] = useState(GPage.Data.showPAndD)
    const [switchC,setSwitchC] = useState([{ txt: "配送", type: "配送" },{ txt: "自提", type: "自提" },])
    // const [showSwitch,setSS] = useState(GPage.Data.showSwitch)
    const [defaultImg,setDIM] = useState(GPage.Data.defaultImg)

  useEffect(() => {
    // excuteAddress()
    // setAA([])
    if (Taro.getEnv() === "WEAPP") {
      let windowHeight = wx.getSystemInfoSync().windowHeight;
      setView(windowHeight - 100 );//70
    }
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  const excuteAddress=()=>{
    let add = addressArray;
    for (var i = 0; i < add.length; i++) {
      console.log("default:" + add[i].default);
      if (add[i].default) {
        setDI(i);
        break;
      }
    }
  }

  return (
    <Root hashData={styles}>
        <GGCPS_TopBar
          mode="patientInfor"
          className=""
          patientInfor={patientinfor}
        />
        {/* <GGWhiteSpace />
        <GGWingBlank> */}
        <View className={styles.GGWhiteSpace}/>
        <View className={styles.GGWingBlank}>
          <View className={styles.pay_main} style={{ height: viewHeight }}>
            <View className={styles.firstcontainer}>
              {/* 第一部分 */}
              <View>
                {consultationInfo.map((item, index) => {
                  return (
                    // 分割线
                    <View key={index}>
                      <AtDivider
                        customStyle={{
                          height: "20px",
                          display: index === 0 ? "none" : "",
                        }}
                        content=''
                      />
                      <View className='at-row'>
                        <View className={'at-col '+styles.padleft+' '+styles.mainTitle}>
                          {item.label}
                        </View>
                        {/* <View className='at-col textColor' style={{textAlign:'right',paddingRight:'20px'}}>{index===0?consultationInfo.type:(index===1?consultationInfo.name:(index===2?consultationInfo.card.replace(/(\d{2})\d{9}(\d{2})/, '$1*********$2'):String(consultationInfo.phone).replace(/(\d{3})\d{5}(\d{3})/, '$1*****$2')))}</View> */}
                        <View
                          className={'at-col '+styles.textColor}
                          style={{ textAlign: "right", paddingRight: "20px" }}
                        >
                          {item.value}
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

        <View style={{display:showPAndD?'':'none'}}  className={styles.firstcontainer}>
          <View style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}} className='at-row'>
            <Text>选择方式:&emsp;</Text>
          <GGCPS_Switch content={switchC}
          onClick={(sw:boolean,txt:string,index:number)=>{
            setIA(!isAddress)
            GPage.DoWXCall('switchClick',sw,txt,index)
          }}/>
        </View>
        </View>

        {/* 默认地址 */}
        <View style={{display:showPAndD?'':'none'}}>
        {
        defaultIndex<0?
        <View className={styles.firstcontainer} style={{display:!isAddress?'':'none'}}>
          <View
            className='at-row'
            onClick={() => {
              GPage.DoWXCall('addClick')
            }}
          >
                  <View  style={{display: 'flex',justifyContent: 'center',alignItems: 'center',fontSize: '24px'
                  }} className='at-col at-col-10'
                  >
                    <Text>新增地址</Text>
                  </View>
                  <View
                    className='at-col at-col-2 mainTitle'
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <AtIcon
                      value='chevron-right'
                      size='30'
                      color='gray'
                    ></AtIcon>
                  </View>
                </View>
        </View>
        :
        <View className={styles.firstcontainer} style={{display:!isAddress?'':'none'}}>

                <View
                  className='at-row'
                  onClick={() => {
                    GPage.DoWXCall('confirmClick',addressArray[defaultIndex])
                  }}
                >
                  <View className='at-col at-col-2' style={{ display: "flex",alignItems:'center',justifyContent:'center' }}>
                    <Image
                      className={styles.defaultImg}
                      src={defaultImg}
                    />
                  </View>
                  <View className='at-col at-col-8'>
                    <View className={'at-row '+styles.mainTitle}>
                      {addressArray[defaultIndex].name}
                      &emsp;
                      {String(
                        addressArray[defaultIndex].phone
                      ).replace(/(\d{2})\d{5}(\d{4})/, "$1*****$2")}
                    </View>
                    <View className={'at-row '+styles.sub}>
                      {addressArray[defaultIndex].area}
                    </View>
                    <View className={'at-row '+styles.add+' '+styles.textColor}>
                      {addressArray[defaultIndex].address}
                    </View>
                  </View>
                  <View
                    className={'at-col at-col-2 '+styles.mainTitle}
                    style={{ display: "flex", alignItems: "center" }} 
                    // onClick={() => {
                    //   let func = addressClick;
                    //   if (func)
                    //     func(addressArray[defaultIndex]);
                    // }}
                  >
                    <AtIcon
                      value='chevron-right'
                      size='50'
                      color='gray'
                    ></AtIcon>
                  </View>
                </View>
              </View>
            }
          </View>
            <View className={styles.firstcontainer}>
              <View className={styles.pay}>
                <View className={'at-row '+styles.mainTitle}>支付金额:</View>
                <View className={'at-row '+styles.textColor} style={{ fontSize: "24px" }}>
                  {/* ￥ {Math.floor(100 * money) / 100} */}
                  ￥{money}
                </View>
                <View className={'at-row '+styles.sub} style={{ fontSize: "12px" }}>
                  <Text style={{ color: "orange" }}>注意:</Text>
                  &emsp;请确认您的缴费信息!
                </View>
              </View>
              <AtButton
                type='primary'
                onClick={() => {
                  GPage.DoWXCall('confirmClick',addressArray,consultationInfo,money,isAddress)
                }}
                className={styles.bottombt}
              >
                确认缴费
              </AtButton>
            </View>
          </View>
        {/* </GGWingBlank> */}
        </View>
    </Root>
  );
}
