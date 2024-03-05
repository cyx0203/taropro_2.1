import React, { useEffect, useState,useRef } from "react";
import { View, Image, Text,Radio,RadioGroup, WebView } from "@tarojs/components";
import {
  AtButton, AtIcon
} from "taro-ui";
import Taro from '@tarojs/taro';
import { useReady, useDidShow, useDidHide, navigateTo } from "@tarojs/taro";
import { 
  // GGWingBlank,  GGWhiteSpace, 
  GGCPS_Result,GGCPS_Modal,
  GGCPS_TopBar
} from "@/GGCPS";
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
    pageName: "h5_pages_IH_Consultation_addressList_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.patientinfor],
        () => {
          setPatientinfor(nda.patientinfor)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.addressArray],
        () => {
          setAddressArray(nda.addressArray)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.radioList],
        () => {
          setRadioList(nda.radioList)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.noticeModal],
        () => {
          setNoticeModal(nda.noticeModal)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      // GPage.SetState(
      //   [nda.focusIndex],
      //   () => {
      //     setFocusIndex(nda.focusIndex)
      //   },
      //   () => {
      //     console.error("NDA设置出错");
      //   }
      // );
      GPage.SetState(
        [nda.defaultSVG],
        () => {
          setDefaultSVG(nda.defaultSVG)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.editSVG],
        () => {
          setEditSVG(nda.editSVG)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  
    const viewHeight = 1000;
    const [patientinfor,setPatientinfor] = useState(GPage.Data.patientinfor)
    const [addressArray,setAddressArray] = useState(GPage.Data.addressArray)
    const [radioList,setRadioList] = useState([])
    const [noticeModal,setNoticeModal] = useState({
      title:'即将删除该条记录',
      content: '是否确认删除'
    })
    // const [focusIndex,setFocusIndex] = useState(-1)//定位model为哪一行
    const focusIndex = useRef(-1)
    const [defaultSVG,setDefaultSVG] = useState(GPage.Data.defaultSVG)
    const [editSVG,setEditSVG] = useState(GPage.Data.editSVG)

  useEffect(() => {
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  const ChangeRadio=(index)=>{
    let temp = radioList;
    temp.fill(false)
    temp[index] = true;
    // this.setState({radioList:temp})
    setRadioList(temp)
    // let func = Click
    // if(func) func(index)
    GPage.DoWXCall('Click',index)
  }

  let GGCPS_Modal_Ref: any;

  return (
    <Root hashData={styles}>
      {/* <View>
        <WebView src='http://localhost:8000'></WebView>
      </View> */}
      <View>
        {/* <AtButton onClick={()=>{Taro.navigateTo({url:'h5/pages/IH/consultation/consultation/index'})}}>跳转</AtButton> */}
        <GGCPS_TopBar mode="patientInfor"
          className=""
          patientInfor={patientinfor}
          />
          {/* <GGWhiteSpace /> */}
      {/* <GGWingBlank> */}
      
      <View className={styles.GGWhiteSpace}/>
      <View className={styles.GGWingBlank}>
      <View className={styles.addressList_main} style={{ height: viewHeight }}>

        {/* 地址 */}
      {
        addressArray[0]?
        addressArray.map((item,index)=>{
          return(
          <View className={styles.firstcontainer} key={index}>
            <View className='at-row'>
            <View className='at-col at-col-2' style={{display:'flex'}}><Image className={styles.defaultImg} style={{display:addressArray[index].default?'':'none'}} src={defaultSVG} /></View></View>
              {/* <Image style={{display:radioList[index]?'':'none'}}  className='defaultImg' src={super.BASE_RES('icon/default.svg')} /></View> */}
              {/* <Image style={{display:addressArray[index].default?'':'none'}}  className='defaultImg' src={super.BASE_RES('icon/default.svg')} /></View> */}
            <View className='at-row'>
              {/* <View className='at-col at-col-2' style={{display:'flex',alignItems:'center'}}>
              <Radio onClick={
                this.ChangeRadio.bind(this,index)
              } checked={radioList[index]}></Radio>
              </View> */}
              <View className='at-col at-col-9'>
                <View className={'at-row '+styles.mainTitle}>{item.name}&emsp;{String(item.phone).replace(/(\d{2})\d{5}(\d{4})/, '$1*****$2')}</View>
                <View className={'at-row '+styles.sub}>{item.area}</View>
                <View className={'at-row '+styles.add+' '+styles.textColor}>{item.address}</View>
              </View>
              <View className={'at-col at-col-3 '+styles.mainTitle} style={{display:'flex',alignItems:'center'}}>
                <Image style={{height:'25px'}} className='' src={editSVG} 
                  onClick={()=>{
                    // let func = editClick;
                    // if(func) func(item)
                    GPage.DoWXCall('editClick',item)
                  }}
                />
                <View style={{display:'flex',alignItems:'center',justifyContent:'flex-end',fontSize:'25px',margin:'0 0px 0 0px'}} className={'at-col at-icon at-icon-trash'}
                  onClick={()=>{
                    GGCPS_Modal_Ref.opt(true, `${noticeModal.title}`, <View className={styles.dev_collection_modal_content}>
                    <Text>{`${noticeModal.content}`}</Text>
                    </View>)
                  // this.setState({focusIndex:index})
                  // setFocusIndex(index)
                  focusIndex.current = index;
                  // let func = deleteClick;
                  // if(func) func(item,index)
                  GPage.DoWXCall('deleteClick',item,index)
                }}
                >
                  </View>
                </View>
            </View>
            <GGCPS_Modal onConfirm={()=>{
              // let func = onConfirm;
              // if(func) func(addressArray[focusIndex],focusIndex)
                GPage.DoWXCall('onConfirm',addressArray[focusIndex.current],focusIndex.current)
              }} ref={e=>GGCPS_Modal_Ref=e}/>  
          </View>
          
        )
        }):
        // ''
        <GGCPS_Result type='empty'/>
      }

            <AtButton type='primary'
              onClick={()=>{
                // let func = addClick;
                // if(func) func();
                GPage.DoWXCall('addClick')
            }} 
              className={styles.bottombt}
            >新增邮寄地址</AtButton>

      </View>
      </View>
      {/* </GGWingBlank> */}
      </View>
    </Root>
  );
}
