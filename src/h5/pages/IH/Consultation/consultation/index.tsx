import React, { useEffect, useState } from "react";
import { View, Image, Text } from "@tarojs/components";
import {
  AtDivider,
  AtButton,
} from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { 
  // GGWingBlank, GGWhiteSpace,
  GGCPS_TopBar } from "@/GGCPS";
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
    pageName: "h5_pages_IH_Consultation_consultation_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.topTitle],
        () => {
          setTopTitle(nda.topTitle)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.patient],
        () => {
          setPatient(nda.patient)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.topBarInfor],
        () => {
          setTopBarInfor(nda.topBarInfor)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.sign],
        () => {
          setSign(nda.sign)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.buttonTxt],
        () => {
          setButtonTxt(nda.buttonTxt)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.rxSVG],
        () => {
          setRxsvg(nda.rxSVG)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  
    const viewHeight = 1000;
    const [topTitle,setTopTitle] = useState(GPage.Data.topTitle)
    const [patient,setPatient] = useState(GPage.Data.patient)
    const [topBarInfor,setTopBarInfor] = useState(GPage.Data.topBarInfor)
    const [sign,setSign] = useState(GPage.Data.sign)
    const [buttonTxt,setButtonTxt] = useState(GPage.Data.buttonTxt)
    const [rxSVG,setRxsvg] = useState(GPage.Data.rxSVG)

  useEffect(() => {
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  // const { topBarInfor } = this.state;
  const base64FixStr: string = 'data:image/png;base64,';
  return (
    <Root hashData={styles}>
      <View>
        <GGCPS_TopBar mode='infor' inforContent={<View>
          <Text style={{ marginRight: '10px' }}>{topBarInfor.docName}</Text>
          <Text>{topBarInfor.office}</Text>
        </View>} />
        {/* <GGWhiteSpace /> */}
        {/* <GGWingBlank> */}
        <View className={styles.GGWhiteSpace}/>
        <View className={styles.GGWingBlank}>
          <View className={styles.consultation_main} style={{ height: viewHeight }}>
            <View className={styles.tb}>
            <View className='at-row'>
              <View className='at-col at-col-3'>
                <Image className={styles.icoImg} src={rxSVG} onClick={() => { }} />
              </View>
              <View className={'at-col at-col-9 '+styles.at9}>
                <View className={'at-row '+styles.row2}>
                  <View className={styles.mainTitle}>{topTitle.firstTitle}</View>
                </View>
                <View className={'at-row '+styles.row2}>
                  <View className={styles.mainTitle} style={{ fontSize: '36rpx' }}>{topTitle.subTitle}</View>
                </View>
              </View>
            </View>
            </View>

            {/* <GGWingBlank> */}
            <View className={styles.ttb}>
              {/* 第一部分 */}
              <View>
                <View className={'at-row '+styles.weighttitle+' '+styles.mainTitle}>患者信息</View>
                <View className='at-row sub'>
                  <View className={'at-col at-col-3 '+styles.consultation_sub_text}>{patient.name}</View>
                  <View className={'at-col at-col-2 '+styles.consultation_sub_text}>{patient.sex}</View>
                  <View className={'at-col at-col-3 '+styles.consultation_sub_text}>{patient.age}岁</View>
                  <View className={'at-col at-col-4 '+styles.consultation_sub_text} style={{ display: 'flex', justifyContent: 'flex-end' }}>{patient.departments}</View>
                </View>
                <View className={'at-row '+styles.consultation_sub_text} style={{ justifyContent: 'flex-end' }}>{patient.time}</View>
              </View>

              {/* 分割线 */}
              <AtDivider customStyle={{ height: '20px' }} content='' />

              {/* 第二部分 */}
              <View>
                <View className={'at-row '+styles.weighttitle+' '+styles.mainTitle}>诊断</View>
                <View className={'at-row '+styles.consultation_sub_text+' '+styles.sub}>{patient.illness}</View>
              </View>

              <AtDivider customStyle={{ height: '20px' }} content='' />


              {/* 第三部分 */}
              <View className={'at-row '+styles.weighttitle+' '+styles.mainTitle}>处方</View>

              {
                patient.prescriptions.map((item, key) => {
                  return (
                    <View key={key}>
                      <View className={'at-row '+styles.sub}>
                        <View className='at-col at-col-11'>{item.name}</View>
                        <View className='at-col at-col-1'>{item.num}</View>
                      </View>
                      <View className={styles.grayfont}>
                        <View className='at-row'>规格：{item.specifications}</View>
                        <View className='at-row'>{item.type}</View>
                      </View>

                      {/* 虚线分隔符 */}
                      <View className={styles.divline}></View>
                    </View>
                  )
                })
              }

              <View className={styles.sign+' '+styles.mainTitle}>
                <Text>签字盖章</Text>
                <View className={styles.sign_main}>
                  <View >
                    <View className={styles.sign_sub}>
                      <Text>医师：</Text>
                      <Image className={styles.signImg_small} src={sign.doc.type==='base64'?`${base64FixStr}${sign.doc.url}`:sign.doc.url} />
                    </View>
                    <View className={styles.sign_sub}>
                      <Text>药师：</Text>
                      <Image className={styles.signImg_small} src={sign.medi.type==='base64'?`${base64FixStr}${sign.medi.url}`:sign.medi.url} />
                    </View>
                  </View>
                  <Image className={styles.signImg_big} src={sign.hosp.type==='base64'?`${base64FixStr}${sign.hosp.url}`:sign.hosp.url} />
                </View>


              </View>

              <AtButton onClick={() => {
                // super.BASE_MOD('consultation/flw_pay', '');
                // let func = confirmClick;
                // if (func) func(patient);
                GPage.DoWXCall('confirmClick',patient)

              }} className={styles.bottombt}
              >{buttonTxt}</AtButton>
            </View>
            {/* </GGWingBlank> */}

          </View>
          </View>
        {/* </GGWingBlank> */}
      </View>
    </Root>
  );
}
