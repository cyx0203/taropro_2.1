import React, { useEffect, useState, useRef } from "react";
import { View, Picker, Text } from "@tarojs/components";
import {AtInput, AtDivider, AtSwitch, AtButton, AtForm} from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { GGCPS_TopBar } from "@/GGCPS";
// import BASE from "@/GGPageBase";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import { Comp_AreaPicker } from "@/GGCompLib";
import styles from "./style/index.module.scss";
// import "~taro-ui/dist/style/index.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_IH_Consultation_editAddress_index",
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
        [nda.consultationInfo],
        () => {
          setConsultationInfo(nda.consultationInfo)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.addressItem],
        () => {
          setAddressItem(nda.addressItem)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.valueName],
        () => {
          setValueName(nda.valueName)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.valuePhone],
        () => {
          setValuePhone(nda.valuePhone)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.valueAdd],
        () => {
          setValueAdd(nda.valueAdd)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.edit],
        () => {
          setEdit(nda.edit)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.regionList],
        () => {
          setRegionList(nda.regionList)
          ref.current.setPickerArea();
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.address],
        () => {
          setAddress(nda.address)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  
    const viewHeight = 1000;
    const [patientinfor,setPatientinfor] = useState(GPage.Data.patientinfor)
    const [consultationInfo,setConsultationInfo] = useState(GPage.Data.consultationInfo)
    const [addressItem,setAddressItem] = useState(GPage.Data.addressItem)
    const [valueName,setValueName] = useState('')
    const [valuePhone,setValuePhone] = useState('')
    const [valueAdd,setValueAdd] = useState('')
    const [edit,setEdit] = useState(false)
    const [regionList,setRegionList] = useState(GPage.Data.regionList)
    const [address,setAddress] = useState('')
    const ref = useRef()

  useEffect(() => {
    console.log('regionList:',regionList)
    ref.current.setPickerArea();
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});


  const handleChange1=(value)=> {
    let temp = addressItem
    temp.name = value
    // this.setState({
    //   addressItem:temp
    // })
    // return value
    setAddressItem(temp)
  }

  const handleChange2=(value)=> {
    let temp = addressItem
    temp.phone = value
    // this.setState({
    //   addressItem:temp
    // })
    setAddressItem(temp)
  }

  const handleChange3=(value)=> {
    let temp = addressItem
    temp.address = value
    // this.setState({
    //   addressItem:temp
    // })
    setAddressItem(temp)
  }

  // 开关
  const handleChange = value => {
    let temp = addressItem
    temp.default = value
    // this.setState({
    //   addressItem:temp
    // })
    setAddressItem(temp)
  }

  return (
    <Root hashData={styles}>
      <View>
        <GGCPS_TopBar mode="patientInfor"
          className=""
          patientInfor={patientinfor}
          />
          <View className={styles.GGWingBlank}>
          <View className={styles.editAddress_main} style={{ height: viewHeight }}>

            <View className='firstcontainer' style={{background:"#fff"}}>
              {/* 第一部分 */}
              <View className=''>
                {/* 分割线 */}
                <View className={'at-row '+styles.inputPosition}>
                  <View className={'at-col '+styles.padleft+' '+styles.mainTitle}>姓名:</View>
                  <AtInput
                    className={styles.textColor}
                    name='valueName'
                    type='text'
                    maxlength={5}
                    placeholder='请输入姓名'
                    value={addressItem.name}
                    onChange={(value)=>handleChange1(value)}
                  />
                </View>
                <AtDivider customStyle={{ height: '20px' }} content='' />

                <View className={'at-row '+styles.inputPosition}>
                  <View className={'at-col '+styles.padleft+' '+styles.mainTitle}>手机号码:</View>
                  <AtInput
                    className={styles.textColor}
                    title='+86'
                    name='valuePhone'
                    type='phone'
                    placeholder='请输入手机号'
                    value={addressItem.phone}
                    onChange={(value)=>handleChange2(value)}
                  />
                </View>
                <AtDivider customStyle={{ height: '20px' }} content='' />

                <View className={'at-row '+styles.inputPosition}>
                  <View className={'at-col at-col-5 '+styles.padleft+' '+styles.mainTitle}>所在地区:</View>
                  <Comp_AreaPicker
                    ref={ref}
                    config={regionList}
                    type="01"
                    onItemClick={value => {
                      GPage.DoWXCall('onItemClick',value)
                      setAddress(value)
                    }}
                  />
                  
                </View>
                <AtDivider customStyle={{ height: '20px' }} content='' />

                <View className={'at-row '+styles.inputPosition}>
                  <View className={'at-col '+styles.padleft+' '+styles.mainTitle}>详细地址:</View>
                  <AtInput
                    className='textColor'
                    name='valueAdd'
                    type='text'
                    placeholder='请输入详细地址'
                    value={addressItem.address}
                    onChange={(value)=>handleChange3(value)}
                  />
                </View>
              </View>
            </View>



            <View className={styles.firstcontainer}>
              <View className='at-row'>
                <AtSwitch color='#37C787' className='at-col at-col-3' checked={addressItem.default} onChange={(value)=>handleChange(value)} />
                <Text className='at-col at-col-6' style={{ display: 'flex', alignItems: 'center', color: '#25BA9F' }}>设为默认地址</Text>
              </View>
              <AtButton type='primary'
                onClick={() => {
                  // let func = confirmClick;
                  // if (func) func(addressItem,[combo[0][selectIndexList[0]],combo[1][selectIndexList[1]],combo[2][selectIndexList[2]]]);
                  GPage.DoWXCall('confirmClick',addressItem,address)
                }}
                className={styles.bottombt}
              >保&emsp;存</AtButton>
            </View>
 
          </View>
          </View>
      </View>
    </Root>
  );
}
