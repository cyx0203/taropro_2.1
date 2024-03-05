import React, { useEffect, useRef, useState } from "react";
import {
  AtTabs,
  AtTabsPane,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton,
  AtIcon,
  AtInput,
  AtImagePicker,
  AtToast,
  AtList,
  AtListItem,
  AtFloatLayout
} from "taro-ui";
import {
  View,
  Image,
  Swiper,
  SwiperItem,
  Radio,
  Picker,
  Text
} from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "@/GGPageRoot";
import { Comp_Menu, Comp_Nav } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import { Comp_AreaPicker } from "@/GGCompLib";
import FloatLayout from './component/floatLayout';

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_ESZXYY_applyInfo_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.stepTxt],
        () => {
          setStepTxt(nda.stepTxt);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.warmTips],
        () => {
          setWarmTips(nda.warmTips);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.navData],
        () => {
          setNavData({
            list: nda.navData,
            onClick: GPage.WXCall.navOnClick
          });
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.regionList],
        () => {
          setRegionList(nda.regionList);
          ref.current.setPickerArea();
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });


  const [tipsOpen, setTipsOpen] = useState(false);
  const [stepTxt, setStepTxt] = useState(GPage.Data.stepTxt);
  const [warmTips, setWarmTips] = useState(GPage.Data.warmTips);
  const [navData, setNavData] = useState({
    list: GPage.Data.navData,
    onClick: GPage.WXCall.navOnClick
  });

  const [patientName, setPatientName] = useState<any>(""); // 患者姓名
  const [patientID, setPatientID] = useState<any>(""); // 患者身份证
  const [patientPhone, setPatientPhone] = useState<any>(""); // 患者电话
  const [hospitalizedNum, setHospitalizedNum] = useState<any>(""); // 住院号
  const [addresseeName, setAddresseeName] = useState<any>(""); // 收件人姓名
  const [addresseePhone, setAddresseePhone] = useState<any>(""); // 收件人电话
  const [city, setCity] = useState<any>(""); // 城市
  const [address, setAddress] = useState<any>(""); // 详细地址
  const [postcode, setPostcode] = useState<any>(""); // 邮编
  const [applyReason, setApplyReason] = useState<any>(""); // 申请原因

  const ref = useRef(null);
  const [regionList, setRegionList] = useState(GPage.Data.regionList);
  const [selectorChecked, setSelectorChecked] = useState("出院记录"); // 打印病案

  const [isOpen, setIsOpen] = useState<any>(false);

  const [activeList, setActiveList] = useState<any>([]);

  const [checkList,setCheckList] = useState<any>([]);

 
  useEffect(() => {
    console.log(ref.current);
    
    ref.current.setPickerArea();
    return () => {
    };
  }, []);
  //对应：onReady
  useReady(() => {
  });

  //对应：onShow
  useDidShow(() => {
  });

  //对应：onHide
  useDidHide(() => {
  });

  // 下一步
  const nextClick = () => {
    var obj = {
      patientName,
      patientID,
      patientPhone,
      activeList:checkList,
      hospitalizedNum,
      addresseeName,
      addresseePhone,
      city,
      address,
      postcode,
      applyReason
    };
    if (!formCheck()) {
      setTipsOpen(true);
    } else {
      GPage.DoWXCall("nextClick", obj);
    }
  };

  // 返回
  const returnClick = () => {
    GPage.DoWXCall("returnClick");
  };

  // form校验
  const formCheck = () => {
    if (!patientName) {
      return false;
    } else if (!patientID) {
      return false;
    } else if (!patientPhone) {
      return false;
    } else if (!checkList.length) {
      return false;
    } else if (!hospitalizedNum) {
      return false;
    } else if (!addresseeName) {
      return false;
    } else if (!addresseePhone) {
      return false;
    } else if (!city) {
      return false;
    } else if (!address) {
      return false;
    } else if (!applyReason) {
      return false;
    }
    return true;
  };

  const printRecordClick = () => {
    setIsOpen(true);
  };

  const floatLayoutHandleClose = res => {


    let list = GPage.Data.copyContent.filter(t => {
      return res.includes(t.id);
    })
    setCheckList(list)
    setActiveList(res);
    setIsOpen(false);
  };

  const floatLayoutClose = () => {
    setIsOpen(false);
  };

  return (
    <Root hashData={styles}>
      <View className={styles.applyInfo}>
        {/* 顶部步骤导向 */}
        <View
          className={styles.headerArea}
          style={{
            backgroundImage: `url("${GPage.Data.images.topImg}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }}
        >
          <View className={styles.title}>{stepTxt.title}</View>
          <View className={styles.subtitle}>
            <Image
              className={styles.tipsIcon}
              src={GPage.Data.images.smallIcon}
            />
            {stepTxt.subtitle}
          </View>
        </View>
        <View className={styles.formArea}>
          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>*</View>
            <View className={styles.formLabel}>患者姓名</View>
            <AtInput
              clear
              placeholder="请填写患者姓名"
              name="patientName"
              onChange={val => {
                setPatientName(val);
              }}
              value={patientName}
            />
          </View>

          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>*</View>
            <View className={styles.formLabel}>患者身份证号码</View>
            <AtInput
              placeholder="请填写患者身份证号码"
              clear
              name="patientID"
              onChange={val => {
                setPatientID(val);
              }}
              value={patientID}
              type="idcard"
              maxlength={18}
            />
          </View>

          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>*</View>
            <View className={styles.formLabel}>联系电话</View>
            <AtInput
              placeholder="请填写联系电话"
              clear
              name="patientPhone"
              onChange={val => {
                setPatientPhone(val);
              }}
              value={patientPhone}
              type="phone"
            />
          </View>

          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>*</View>
            <View className={styles.formLabel}>选择打印病案</View>
            <View className={styles.printRecord} onClick={() => printRecordClick()}>
              {
                activeList.length > 0 ? (
                  <Text className={styles.printRecord_a}>
                    已选{activeList.length}份
                  </Text>
                ) : (
                  <Text className={styles.printRecord_b}>
                    请选择
                    <AtIcon className={styles.img} value="chevron-right"></AtIcon>
                  </Text>
                )
              }
            </View>

            {/*<AtInput placeholder="请选择打印病案" disabled clear name="printRecord" onChange={val => {}} value={patientPhone} type='phone'/>*/}

            {/*<Picker mode='selector' range={printRecordList} onChange={pickerOnChange}>*/}
            {/*  <AtList>*/}
            {/*    <AtListItem*/}
            {/*      title=''*/}
            {/*      extraText={selectorChecked}*/}
            {/*    />*/}
            {/*  </AtList>*/}
            {/*</Picker>*/}
          </View>

          <View
            className={styles.formItem}
            style={{borderBottom: "2px solid #CDEEFA"}}
          >
            <View className={styles.formAsterisk}>*</View>
            <View className={styles.formLabel}>住院号</View>
            <AtInput
              placeholder="请填写住院号"
              clear
              name="hospitalizedNum"
              onChange={val => {
                setHospitalizedNum(val);
              }}
              value={hospitalizedNum}
            />
          </View>

          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>*</View>
            <View className={styles.formLabel}>收件人姓名</View>
            <AtInput
              placeholder="请填写收件人姓名"
              clear
              name="addresseeName"
              onChange={val => {
                setAddresseeName(val);
              }}
              value={addresseeName}
            />
          </View>

          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>*</View>
            <View className={styles.formLabel}>收件人联系电话</View>
            <AtInput
              placeholder="请填写收件人联系电话"
              clear
              name="addresseePhone"
              onChange={val => {
                setAddresseePhone(val);
              }}
              value={addresseePhone}
              type="phone"
            />
          </View>

          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>*</View>
            <View className={styles.formLabel}>城市选择</View>
            <View style={{width: "9rem"}}>
              <Comp_AreaPicker
                ref={ref}
                config={regionList}
                type="01"
                className={
                  city !== ""
                    ? [`${styles.displayNone}`].join(" ")
                    : styles.select
                }
                onItemClick={value => {
                  GPage.DoWXCall("onItemClick", value);
                  setCity(value);
                }}
              />
            </View>
          </View>

          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>*</View>
            <View className={styles.formLabel}>详细地址</View>
            <AtInput
              placeholder="请填写详细地址"
              clear
              name="address"
              onChange={val => {
                setAddress(val);
              }}
              value={address}
            />
          </View>

          <View className={styles.formItem}>
            <View className={styles.formAsterisk}></View>
            <View className={styles.formLabel}>邮编号</View>
            <AtInput
              placeholder="请填写邮编号"
              clear
              name="postcode"
              onChange={val => {
                setPostcode(val);
              }}
              value={postcode}
            />
          </View>

          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>*</View>
            <View className={styles.formLabel}>申请原因</View>
            <AtInput
              placeholder="请填写申请原因"
              clear
              name="applyReason"
              onChange={val => {
                setApplyReason(val);
              }}
              value={applyReason}
            />
          </View>
        </View>
        <View className={styles.warmTips}>
          <Image
            className={styles.tipsIcon}
            src={GPage.Data.images.smallIcon}
          />
          <View className={styles.tips}>{warmTips}</View>
        </View>

        <View className={styles.foot}>
          <AtButton
            className={styles.submitBtn}
            onClick={() => {
              returnClick();
            }}
          >
            返回
          </AtButton>
          <AtButton
            className={styles.submitBtn}
            onClick={() => {
              nextClick();
            }}
          >
            下一步
          </AtButton>
        </View>

        <Comp_Nav config={navData} type={"normal"} className={styles.nav}/>
        <AtToast
          duration={1500}
          isOpened={tipsOpen}
          text="必填项为空！"
          icon="close"
          onClose={() => setTipsOpen(false)}
        ></AtToast>

        {/*打印病案弹框*/}
        <FloatLayout isOpen={isOpen} actived={activeList} optionList={GPage.Data.copyContent}
                     change={floatLayoutHandleClose}
                     close={floatLayoutClose}></FloatLayout>

      </View>
    </Root>
  );
}
