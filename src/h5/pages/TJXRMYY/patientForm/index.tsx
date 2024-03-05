import React, { useEffect, useRef, useState } from "react";
import {
  AtButton,
  AtInput,
  AtToast,
  AtList,
  AtListItem,
  AtIcon
} from "taro-ui";
import { View, Radio, Text, Picker } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "../../../core/root";
import { Comp_AreaPicker } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_patientForm_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.placeholderData],
        () => {
          setPlaceholderData(nda.placeholderData);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.nationList],
        () => {
          setNationList(nda.nationList);
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
      GPage.SetState(
        [nda.professionList],
        () => {
          setProfessionList(nda.professionList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.classifyList],
        () => {
          setClassifyList(nda.classifyList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.footerBtn],
        () => {
          setFooterBtn(nda.footerBtn);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.tipsText],
        () => {
          setTipsText(nda.tipsText);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const ref = useRef(null);
  const [tipOpen, setTipOpen] = useState(false);
  const [tipsText, setTipsText] = useState(GPage.Data.tipsText);
  const [patientName, setPatientName] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [genderSelect, setGenderSelect] = useState([true, false]);
  const [patientNation, setPatientNation] = useState("");
  const [nation, setNation] = useState("");
  const [patientIDNumber, setPatientIDNumber] = useState("");
  const [patientPhoneNumber, setPatientPhoneNumber] = useState("");
  const [patientRegion, setPatientRegion] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [patientProfession, setPatientProfession] = useState("");
  const [profession, setProfession] = useState("");
  const [patientClassify, setPatientClassify] = useState("");
  const [classify, setClassify] = useState("");
  const [patientMCardNumber, setPatientMCardNumber] = useState("");
  const [patientAdmissionNumber, setPatientAdmissionNumber] = useState("");
  const [placeholderData, setPlaceholderData] = useState(
    GPage.Data.placeholderData
  );
  const [nationList, setNationList] = useState(GPage.Data.nationList);
  const [regionList, setRegionList] = useState(GPage.Data.regionList);
  const [professionList, setProfessionList] = useState(
    GPage.Data.professionList
  );
  const [classifyList, setClassifyList] = useState(GPage.Data.classifyList);
  const [footerBtn, setFooterBtn] = useState(GPage.Data.footerBtn);
  // 输入框内容修改函数
  const changeData = (value, func) => {
    func(value);
  };
  // 选择器修改函数
  const changeSelector = (e, func1, list, func2) => {
    if (list === "") func1(e.detail.value);
    else {
      func1(list[e.detail.value].value);
      func2(list[e.detail.value]);
    }
  };
  // 提交数据函数
  const submitData = obj => {
    if (
      obj.patientClassify === "" ||
      obj.patientProfession === "" ||
      obj.patientAddress === "" ||
      obj.patientRegion === "" ||
      obj.patientPhoneNumber === "" ||
      obj.patientIDNumber === "" ||
      obj.patientNation === "" ||
      obj.genderSelect === "" ||
      obj.patientGender === "" ||
      obj.patientName === ""
    ) {
      setTipOpen(true);
      return 0;
    }
    GPage.DoWXCall("registerClick", obj);
  };
  useEffect(() => {
    // 性别选择默认为 "男"
    setPatientGender("男");
    ref.current.setPickerArea();
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
      <View className={styles.patientForm}>
        <View className={styles.form_main}>
          <AtInput
            name="patientName"
            title="姓名"
            type="text"
            placeholder={placeholderData.name}
            value={patientName}
            onChange={value => changeData(value, setPatientName)}
          />
          <View className={styles.gender}>
            <Text className={styles.title}>性别</Text>
            <View className={styles.radio}>
              <Radio
                value="男"
                checked={genderSelect[0]}
                onClick={() => {
                  let arr = [...genderSelect];
                  arr[0] = true;
                  if (arr[0]) {
                    arr[1] = false;
                    setPatientGender("男");
                  }
                  setGenderSelect(arr);
                }}
              >
                男
              </Radio>
              <Radio
                value="女"
                checked={genderSelect[1]}
                onClick={() => {
                  let arr = [...genderSelect];
                  arr[1] = true;
                  if (arr[1]) {
                    arr[0] = false;
                    setPatientGender("女");
                  }
                  setGenderSelect(arr);
                }}
              >
                女
              </Radio>
            </View>
          </View>
          <View className={styles.nationSelect}>
            <Picker
              mode="selector"
              range={nationList}
              rangeKey="value"
              onChange={e => {
                changeSelector(e, setNation, nationList, setPatientNation);
              }}
            >
              <AtList>
                <AtListItem title="民族" extraText={nation} />
                <View
                  className={styles.picker_tip}
                  style={{
                    display: patientNation === "" ? "" : "none"
                  }}
                >
                  <Text>{placeholderData.nation}</Text>
                  <AtIcon
                    value="chevron-right"
                    size="30"
                    color="#7e7e7e"
                  ></AtIcon>
                </View>
              </AtList>
            </Picker>
          </View>
          <AtInput
            name="patientIDNumber"
            title="证件号"
            type="text"
            placeholder={placeholderData.idNumber}
            value={patientIDNumber}
            onChange={value => changeData(value, setPatientIDNumber)}
            onBlur={() => GPage.DoWXCall('IDNumberonBlur',patientIDNumber)}
          />
          <AtInput
            name="patientPhoneNumber"
            title="手机号"
            type="text"
            placeholder={placeholderData.phoneNumber}
            value={patientPhoneNumber}
            onChange={value => changeData(value, setPatientPhoneNumber)}
          />
          <View className={styles.regionSelect}>
            <View className={styles.title}>省市地区</View>
            <Comp_AreaPicker
              ref={ref}
              config={regionList}
              type="01"
              className={
                patientRegion !== ""
                  ? [`${styles.displayNone}`, `${styles.select}`].join(" ")
                  : styles.select
              }
              onItemClick={item => {
                setPatientRegion(item);
              }}
            />
          </View>
          <AtInput
            name="patientAddress"
            title="详细地址"
            type="text"
            placeholder={placeholderData.address}
            value={patientAddress}
            onChange={value => changeData(value, setPatientAddress)}
          />
          <View className={styles.nationSelect}>
            <Picker
              mode="selector"
              range={professionList}
              rangeKey="value"
              onChange={e => {
                changeSelector(
                  e,
                  setProfession,
                  professionList,
                  setPatientProfession
                );
              }}
            >
              <AtList>
                <AtListItem title="职业" extraText={profession} />
                <View
                  className={styles.picker_tip}
                  style={{
                    display: patientProfession === "" ? "" : "none"
                  }}
                >
                  <Text>{placeholderData.profession}</Text>
                  <AtIcon
                    value="chevron-right"
                    size="30"
                    color="#7e7e7e"
                  ></AtIcon>
                </View>
              </AtList>
            </Picker>
          </View>
          <View
            className={styles.nationSelect}
          >
            <Picker
              mode="selector"
              range={classifyList}
              rangeKey="value"
              onChange={e => {
                changeSelector(
                  e,
                  setClassify,
                  classifyList,
                  setPatientClassify
                );
              }}
            >
              <AtList>
                <AtListItem title="分类" extraText={classify} />
                <View
                  className={styles.picker_tip}
                  style={{
                    display: patientClassify === "" ? "" : "none"
                  }}
                >
                  <Text>{placeholderData.classify}</Text>
                  <AtIcon
                    value="chevron-right"
                    size="30"
                    color="#7e7e7e"
                  ></AtIcon>
                </View>
              </AtList>
            </Picker>
          </View>
          <AtInput
            name="patientMCardNumber"
            title="就诊卡号"
            type="text"
            placeholder={placeholderData.mCardNumber}
            value={patientMCardNumber}
            onChange={value => changeData(value, setPatientMCardNumber)}
            customStyle={{
              display:
                placeholderData && placeholderData.hasOwnProperty("mCardNumber")
                  ? ""
                  : "none"
            }}
          />
          <AtInput
            name="patientAdmissionNumber"
            title="住院号"
            type="text"
            placeholder={placeholderData.admissionNumber}
            value={patientAdmissionNumber}
            onChange={value => changeData(value, setPatientAdmissionNumber)}
            customStyle={{
              display:
                placeholderData &&
                placeholderData.hasOwnProperty("admissionNumber")
                  ? ""
                  : "none"
            }}
          />
        </View>
        {/* 提示框 */}
        <AtToast
          isOpened={tipOpen}
          text={tipsText}
          icon="close-circle"
          duration={1500}
          onClose={() => setTipOpen(false)}
        ></AtToast>
        <AtButton
          onClick={() => {
            let obj = {
              patientName,
              patientIDNumber,
              patientPhoneNumber,
              patientAddress,
              patientMCardNumber,
              patientAdmissionNumber,
              patientClassify,
              patientProfession,
              patientRegion,
              patientNation,
              patientGender
            };
            if (
              !placeholderData &&
              placeholderData.hasOwnProperty("admissionNumber")
            )
              delete obj.patientAdmissionNumber;
            if (
              !placeholderData &&
              placeholderData.hasOwnProperty("mCardNumber")
            )
              delete obj.patientMCardNumber;
            submitData(obj);
          }}
        >
          {footerBtn}
        </AtButton>
      </View>
    </Root>
  );
}
