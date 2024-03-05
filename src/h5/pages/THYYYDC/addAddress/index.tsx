import React, { useEffect, useRef, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
var _ = require("lodash");
//TaroUI的组件
import {
  AtButton,
  AtInput,
  AtSwitch,
  AtToast,
  AtList,
  AtListItem
} from "taro-ui";
//原生组件
import { View, RadioGroup, Label, Radio, Picker } from "@tarojs/components";
//自定义组件
import { Comp_AreaPicker } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_THYYYDC_addAddress_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.patientTypeList],
        () => {
          setPatientTypeList(nda.patientTypeList);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.footerBtn],
        () => {
          setFooterBtn(nda.footerBtn);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.patientAddress],
        () => {
          setPatientAddress(nda.patientAddress);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.patientGender],
        () => {
          setPatientGender(nda.patientGender);
        },
        () => {
          console.log("Fail");
        }
      );
      // GPage.SetState(
      //   [nda.regionRes],
      //   () => {
      //     setPatientRegion(nda.regionRes.join(" "));
      //     setRegionRes(nda.regionRes);
      //   },
      //   () => {
      //     console.log("Fail");
      //   }
      // );
      GPage.SetState(
        [nda.linkManName],
        () => {
          setlinkManName(nda.linkManName);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.patientHosID],
        () => {
          setPatientHosID(nda.patientHosID);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.patientName],
        () => {
          setPatientName(nda.patientName);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.patientAddress],
        () => {
          setPatientPhoneNumber(nda.patientPhoneNumber);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.defaultAddress],
        () => {
          setDefaultOpen(nda.defaultAddress);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.addressList],
        () => {
          setAddressList(nda.addressList);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.patientExist],
        () => {
          flag.current = nda.patientExist;
          setPatientExist(nda.patientExist);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.errorTips],
        () => {
          setErrorTips(nda.errorTips);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.regionList],
        () => {
          setRegionList(nda.regionList);
          ref.current.setPickerArea();
          setPatientRegion(nda.regionList.defaultTxt)
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.patientGenderList],
        () => {
          setPatientGenderList(nda.patientGenderList);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.patientInfoShow],
        () => {
          setPatientInfoShow(nda.patientInfoShow);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.placeholderData],
        () => {
          setPlaceholderData(nda.placeholderData);
        },
        () => {
          console.log("Fail");
        }
      );
    }
  });
  //定义state
  const [errorTipContent, setErrorTipContent] = useState<string>();
  const [errorTipOpen, setErrorTipOpen] = useState(false);
  const [placeholderData, setPlaceholderData] = useState(
    GPage.Data.placeholderData
  );
  const [defaultOpen, setDefaultOpen] = useState(GPage.Data.defaultAddress);
  const [footerBtn, setFooterBtn] = useState(GPage.Data.footerBtn);
  const [errorTips, setErrorTips] = useState(GPage.Data.errorTips);
  const [patientInfoShow, setPatientInfoShow] = useState(
    GPage.Data.patientInfoShow
  );
  const [patientTypeList, setPatientTypeList] = useState(
    GPage.Data.patientTypeList
  );
  const ref = useRef(null);
  const [patientExist, setPatientExist] = useState(GPage.Data.patientExist);
  const flag = useRef(GPage.Data.patientExist);
  const [addressList, setAddressList] = useState(GPage.Data.addressList);
  const [regionList, setRegionList] = useState(GPage.Data.regionList);
  const [patientGenderList, setPatientGenderList] = useState(
    GPage.Data.patientGenderList
  );
  const [patientRegion, setPatientRegion] = useState<string>();
  const [patientType, setPatientType] = useState<string>();
  const [patientHosID, setPatientHosID] = useState<string>(
    GPage.Data.patientHosID
  );
  const [patientName, setPatientName] = useState<string>(
    GPage.Data.patientName
  );
  const [patientPhoneNumber, setPatientPhoneNumber] = useState<string>(
    GPage.Data.patientPhoneNumber
  );
  const [linkManName, setlinkManName] = useState<string>(
    GPage.Data.linkManName
  );
  const [patientAddress, setPatientAddress] = useState<string>(
    GPage.Data.patientAddress
  );
  const [patientGender, setPatientGender] = useState<string>(
    GPage.Data.patientGender
  );
  const [formShow, setFormShow] = useState(false);
  const [regionRes, setRegionRes] = useState(GPage.Data.regionRes);
  const [selected, setS] = useState([0, 0]);
  useEffect(() => {
    init();
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  const init = () => {
    setPatientRegion(regionList.defaultTxt)
    // 单选框默认值
    for (let i = 0; i < patientTypeList.length; i++) {
      if (patientTypeList[i].checked) {
        setPatientType(patientTypeList[i].title);
      }
    }
    // 初始化二级地址选择器选项
    // let listData = _.clone(addressList);
    // let newList = [[], []];
    // for (let i = 0; i < listData.length; i++) {
    //   newList[0].push(listData[i].label);
    // }
    // for (let j = 0; j < listData[0].children.length; j++) {
    //   newList[1].push(listData[0].children[j].label);
    // }
    // setRegionList(newList);
  };
  /**
   * 切换一级地址更新二级地址列表
   * @param index 选择的一级地址在数据源内的下标
   */
  const updateSelectList = index => {
    let listData = _.clone(addressList);
    let currentListData = _.clone(regionList);
    let newList = [];
    for (let i = 0; i < listData[index].children.length; i++) {
      newList.push(listData[index].children[i].label);
    }
    currentListData[1] = newList;
    setRegionList(currentListData);
  };
  /**
   * 单选框点击处理事件
   * @param dataList 单选选项列表
   * @param value 当前被选中的string值
   * @returns 修改checked
   */
  const handleRadio = (dataList: any, value: string) => {
    if (dataList[0].title === value) {
      dataList[0].checked = !dataList[0].checked;
      dataList[1].checked = !dataList[0].checked;
    } else {
      dataList[1].checked = !dataList[1].checked;
      dataList[0].checked = !dataList[1].checked;
    }
    return dataList;
  };
  const inquireClick = () => {
    if (patientHosID === "" || patientName === "") {
      setErrorTipContent("请将信息填写完整！");
      setErrorTipOpen(true);
      return;
    }
    GPage.DoWXCall("inquireClick", patientHosID, patientName);
  };
  // 保存结果
  const submit = () => {
    let resultObj: any = {
      patientAddress,
      patientGender,
      patientHosID,
      patientRegion,
      patientName,
      patientType,
      patientPhoneNumber,
      linkManName
    };
    if (patientType === "非住院患者") delete resultObj.patientHosID;
    if (!patientInfoShow) {
      delete resultObj.patientHosID;
      delete resultObj.patientName;
    }
    for (const key in resultObj) {
      if (!resultObj[key]) {
        setErrorTipContent("请将信息填写完整！");
        setErrorTipOpen(true);
        return;
      }
    }
    resultObj.default = defaultOpen;
    GPage.DoWXCall("submitClick", resultObj);
  };
  useEffect(() => {
    GPage.Data.addForm?.region && ref.current.setPickerArea();
    return () => {};
  }, []);
  return (
    <Root hashData={styles}>
      <View className={styles.addAddress}>
        <View style={{ display: patientInfoShow ? "" : "none" }}>
          <View className={styles.roleType}>
            <View className={styles.label}>角色分类</View>
            <View className={styles.value}>
              <RadioGroup
                onChange={e => {
                  const { value } = e.detail;
                  setPatientTypeList(handleRadio([...patientTypeList], value));
                  setPatientType(value);
                  if (value !== "住院患者") {
                    setFormShow(true);
                  } else {
                    setFormShow(false);
                  }
                }}
                name="type"
              >
                {patientTypeList.map((item: any, i: any) => {
                  return (
                    <Label for={i} key={i}>
                      <Radio value={item.title} checked={item.checked}>
                        {item.title}
                      </Radio>
                    </Label>
                  );
                })}
              </RadioGroup>
            </View>
          </View>
          <View
            className={styles.roleType}
            style={{ display: patientType === "住院患者" ? "" : "none" }}
          >
            <View className={styles.label}>住院号</View>
            <View className={styles.value}>
              <AtInput
                name="hosID"
                onChange={(val: any) => {
                  setPatientHosID(val);
                  setErrorTipOpen(false);
                }}
                value={patientHosID}
                placeholder={placeholderData.hosID}
              />
            </View>
          </View>
          <View className={styles.roleType}>
            <View className={styles.label}>患者姓名</View>
            <View className={styles.value}>
              <AtInput
                name="patientName"
                onChange={(val: any) => {
                  setPatientName(val);
                  setErrorTipOpen(false);
                }}
                value={patientName}
                placeholder={placeholderData.patientName}
              />
            </View>
          </View>
          <View
            className={styles.inquireBtn}
            style={{ display: patientType === "住院患者" ? "" : "none" }}
          >
            <AtButton
              className={styles.btn}
              onClick={() => {
                inquireClick();
              }}
            >
              查询信息
            </AtButton>
          </View>
        </View>
        <View
          className={styles.infoArea}
          style={{
            display: !patientInfoShow || patientExist || formShow ? "" : "none"
          }}
        >
          <View className={styles.roleType}>
            <View className={styles.label}>联系方式</View>
            <View className={styles.value}>
              <AtInput
                name="phoneNumber"
                onChange={(val: any) => {
                  setPatientPhoneNumber(val);
                  setErrorTipOpen(false);
                }}
                value={patientPhoneNumber}
                placeholder={placeholderData.phoneNumber}
              />
            </View>
          </View>
          <View className={styles.roleType}>
            <View className={styles.label}>联系人姓名</View>
            <View className={styles.value}>
              <AtInput
                name="linkManName"
                onChange={(val: any) => {
                  setlinkManName(val);
                  setErrorTipOpen(false);
                }}
                value={linkManName}
                placeholder={placeholderData.linkManName}
              />
            </View>
          </View>
          <View className={styles.roleType}>
            <View className={styles.label}>性别</View>
            <View className={styles.value}>
              <RadioGroup
                onChange={e => {
                  const { value } = e.detail;
                  setPatientGenderList(
                    handleRadio([...patientGenderList], value)
                  );
                  setPatientGender(value);
                }}
                name="gender"
              >
                {patientGenderList.map((genderItem: any, genderIndex: any) => {
                  // if (currentAddressObj?.gender === genderItem.title)
                  //   genderItem.checked = true;
                  return (
                    <Label for={genderIndex} key={genderIndex}>
                      <Radio
                        value={genderItem.title}
                        checked={genderItem.checked}
                      >
                        {genderItem.title}
                      </Radio>
                    </Label>
                  );
                })}
              </RadioGroup>
            </View>
          </View>
          <View className={styles.regionSelect}>
            <View className={styles.label}>收货地址</View>
            <View className={styles.selectAddress}>
              {/* <Picker
                className={styles.picker}
                mode="multiSelector"
                range={regionList}
                onColumnChange={e => {
                  if (!e.detail.column) {
                    updateSelectList(e.detail.value);
                    let t = [...selected];
                    t[0] = e.detail.value;
                    setS(t);
                  } else {
                    let t = [...selected];
                    t[1] = e.detail.value;
                    setS(t);
                  }
                }}
                onChange={e => {
                  setPatientRegion(
                    regionList[0][e.detail.value[0]] +
                      " " +
                      regionList[1][e.detail.value[1]]
                  );
                  setRegionRes([
                    regionList[0][e.detail.value[0]],
                    regionList[1][e.detail.value[1]]
                  ]);
                }}
                value={selected}
              >
                <AtList>
                  <AtListItem extraText={patientRegion} />
                </AtList>
              </Picker> */}
              <Comp_AreaPicker
                ref={ref}
                config={regionList}
                type="01"
                // className={
                //   patientRegion
                //     ? `${styles.selector} ${styles.displayNone}`
                //     : `${styles.selector}`
                // }
                className={`${styles.selector} ${styles.displayNone}`}
                onItemClick={item => {
                  setPatientRegion(item);
                }}
              />
            </View>
            <View className={styles.inputAddress}>
              <AtInput
                name="inputAddress"
                onChange={(val: any) => {
                  setPatientAddress(val);
                  setErrorTipOpen(false);
                }}
                value={patientAddress}
                placeholder={placeholderData.inputAddress}
              />
            </View>
          </View>
          <View className={styles.defaultBtn}>
            <AtSwitch
              title="默认地址"
              checked={defaultOpen}
              onChange={val => setDefaultOpen(val)}
            />
          </View>
          {footerBtn ? (
            <AtButton
              className={styles.submit}
              onClick={() => {
                submit();
              }}
            >
              {footerBtn}
            </AtButton>
          ) : (
            ""
          )}
        </View>
        <AtToast
          duration={1500}
          isOpened={errorTipOpen}
          text={errorTipContent}
          icon="alert-circle"
          onClose={() => {
            setErrorTipOpen(false);
          }}
        ></AtToast>
      </View>
    </Root>
  );
}
