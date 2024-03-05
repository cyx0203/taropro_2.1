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
    pageName: "h5_pages_TJXRMYY_register_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.selectorData],
        () => {
          setSelectorData(nda.selectorData);
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
        [nda.placeholderData],
        () => {
          setPlaceholderData(nda.placeholderData);
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
        [nda.defaultValue],
        () => {
          setDefaultValue(nda.defaultValue);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const ref = useRef(null);
  const [selectorData, setSelectorData] = useState(GPage.Data.selectorData);
  const [nation, setNation] = useState("");
  const [gender, setGender] = useState("");
  const [idType, setIdType] = useState("");
  const [birthday, setBirthday] = useState("");
  const [footerBtn, setFooterBtn] = useState(GPage.Data.footerBtn);
  const [placeholderData, setPlaceholderData] = useState(
    GPage.Data.placeholderData
  );
  const [patientName, setPatientName] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientIdType, setPatientIdType] = useState("");
  const [selectorVal, setSelectorVal] = useState("");
  const [patientIDNumber, setPatientIDNumber] = useState("");
  const [patientPhoneNumber, setPatientPhoneNumber] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [patientRegion, setPatientRegion] = useState("");
  const [regionList, setRegionList] = useState(GPage.Data.regionList);
  const [defaultValue, setDefaultValue] = useState(GPage.Data.defaultValue);

  const submit = () => {
    let obj = {
      patientName: defaultValue?.name || patientName,
      selectorVal,
      patientIDNumber: defaultValue?.idNumber || patientIDNumber,
      patientPhoneNumber,
      patientAddress,
      patientRegion,
      patientGender,
      patientIdType,
      birthday
    };
    GPage.DoWXCall("registerClick", obj);
  };
  useEffect(() => {
    GPage.Data.addForm?.region && ref.current.setPickerArea();
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});
  const genderList = {
    label: "性别",
    listData: [
      { label: "male", value: "男" },
      { label: "female", value: "女" }
    ]
  };
  return (
    <Root hashData={styles}>
      <View className={styles.register}>
        <View className={styles.form_main}>
          <AtInput
            name="patientName"
            title="姓名"
            type="text"
            disabled={defaultValue?.name}
            placeholder={placeholderData?.name}
            value={defaultValue?.name || patientName}
            onChange={value => {
              setPatientName(value);
            }}
          />
          {GPage.Data.addForm?.gender && (
            <View className={styles.nationSelect}>
              <Picker
                mode="selector"
                range={genderList.listData}
                rangeKey="value"
                onChange={e => {
                  setGender(genderList.listData[e.detail.value].value);
                  setPatientGender(genderList.listData[e.detail.value]);
                }}
              >
                <AtList>
                  <AtListItem title={genderList.label} extraText={gender} />
                  <View
                    className={styles.picker_tip}
                    style={{
                      display: gender === "" ? "" : "none"
                    }}
                  >
                    {placeholderData?.gender ? (
                      <>
                        <Text>{placeholderData.gender}</Text>
                        <AtIcon
                          value="chevron-right"
                          size="30"
                          color="#7e7e7e"
                        ></AtIcon>
                      </>
                    ) : (
                      ""
                    )}
                  </View>
                </AtList>
              </Picker>
            </View>
          )}
          {GPage.Data.addForm?.birthday && (
            <View className={styles.nationSelect}>
              <Picker
                mode="date"
                start="1900-01-01"
                onChange={e => {
                  setBirthday(e.detail.value);
                }}
              >
                <AtList>
                  <AtListItem title={"出生日期"} extraText={birthday} />
                  <View
                    className={styles.picker_tip}
                    style={{
                      display: birthday === "" ? "" : "none"
                    }}
                  >
                    {placeholderData?.birthday ? (
                      <>
                        <Text>{placeholderData.birthday}</Text>
                        <AtIcon
                          value="chevron-right"
                          size="30"
                          color="#7e7e7e"
                        ></AtIcon>
                      </>
                    ) : (
                      ""
                    )}
                  </View>
                </AtList>
              </Picker>
            </View>
          )}
          {GPage.Data.addForm?.idType && (
            <View className={styles.nationSelect}>
              <Picker
                mode="selector"
                range={GPage.Data.idTypeList.listData}
                rangeKey="value"
                onChange={e => {
                  setIdType(
                    GPage.Data.idTypeList.listData[e.detail.value].value
                  );
                  setPatientIdType(
                    GPage.Data.idTypeList.listData[e.detail.value]
                  );
                }}
              >
                <AtList>
                  <AtListItem
                    title={GPage.Data.idTypeList.label}
                    extraText={idType}
                  />
                  <View
                    className={styles.picker_tip}
                    style={{
                      display: idType === "" ? "" : "none"
                    }}
                  >
                    {placeholderData?.idType ? (
                      <>
                        <Text>{placeholderData.idType}</Text>
                        <AtIcon
                          value="chevron-right"
                          size="30"
                          color="#7e7e7e"
                        ></AtIcon>
                      </>
                    ) : (
                      ""
                    )}
                  </View>
                </AtList>
              </Picker>
            </View>
          )}
          <AtInput
            name="patientIDNumber"
            title="证件号"
            type="text"
            disabled={defaultValue?.idNumber}
            placeholder={placeholderData?.idCard}
            value={defaultValue?.idNumber || patientIDNumber}
            onChange={value => {
              setPatientIDNumber(value);
            }}
          />
          {selectorData && (
            <View className={styles.nationSelect}>
              <Picker
                mode="selector"
                range={selectorData?.listData}
                rangeKey="value"
                onChange={e => {
                  setNation(selectorData.listData[e.detail.value].value);
                  setSelectorVal(selectorData.listData[e.detail.value]);
                }}
              >
                <AtList>
                  <AtListItem title={selectorData?.label} extraText={nation} />
                  <View
                    className={styles.picker_tip}
                    style={{
                      display: nation === "" ? "" : "none"
                    }}
                  >
                    {placeholderData?.nation ? (
                      <>
                        <Text>{placeholderData.nation}</Text>
                        <AtIcon
                          value="chevron-right"
                          size="30"
                          color="#7e7e7e"
                        ></AtIcon>
                      </>
                    ) : (
                      ""
                    )}
                  </View>
                </AtList>
              </Picker>
            </View>
          )}
          {GPage.Data.addForm?.region && (
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
          )}

          <AtInput
            name="patientAddress"
            title="地址"
            type="text"
            placeholder={placeholderData?.address}
            value={patientAddress}
            onChange={value => {
              setPatientAddress(value);
            }}
          />
          <AtInput
            name="patientPhoneNumber"
            title="手机号"
            type="text"
            placeholder={placeholderData?.number}
            value={patientPhoneNumber}
            onChange={value => {
              setPatientPhoneNumber(value);
            }}
          />
        </View>
        <AtButton
          onClick={() => {
            submit();
          }}
        >
          {footerBtn}
        </AtButton>
      </View>
    </Root>
  );
}
