import React, { useEffect, useState, useRef } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import {
  AtInput,
  AtButton,
  AtTextarea,
  AtList,
  AtListItem,
  AtIcon,
  AtToast
} from "taro-ui";
//原生组件
import { View, Picker, Text } from "@tarojs/components";
//自定义组件
import { Comp_AreaPicker } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_submitForm_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.inputForms],
        () => {
          let obj = { ...resultObj };
          let arr = selectValue;
          for (let i = 0; i < nda.inputForms.length; i++) {
            if (nda.inputForms[i].id === "classify") {
              arr[i] = nda.inputForms[i].defaultValue;
              setSelectValue(arr);
            }
            if (nda.inputForms[i].id === "profession") {
              arr[i] = nda.inputForms[i].defaultValue;
              setSelectValue(arr);
            }
            if (nda.inputForms[i].hasOwnProperty("defaultValue")) {
              obj[nda.inputForms[i].id] = nda.inputForms[i].defaultValue;
            } else {
              obj[nda.inputForms[i].id] = "";
            }
            if (nda.inputForms[i].type === "region") {
              ref.current.setPickerArea();
            }
          }
          setResultObj(obj);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.footerBtn],
        () => {
          setfooterBtn(nda.footerBtn);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.tipsText],
        () => {
          setTipsText(nda.tipsText);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.patientInfo],
        () => {
          setpatientInfo(nda.patientInfo);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.classifyList],
        () => {
          let preData = [...inputForms];
          for (let i = 0; i < preData.length; i++) {
            if (inputForms[i].id === "classify") {
              preData[i].selectList = nda.classifyList;
              setinputForms(preData);
            }
          }
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.professionList],
        () => {
          let preData = [...inputForms];
          for (let i = 0; i < preData.length; i++) {
            if (inputForms[i].id === "profession") {
              preData[i].selectList = nda.professionList;
              setinputForms(preData);
            }
          }
        },
        () => {
          console.log("Fail");
        }
      );
    }
  });
  const ref = useRef();
  const [tipOpen, setTipOpen] = useState(false);
  const [tipsText, setTipsText] = useState(GPage.Data.tipsText);
  const [inputForms, setinputForms] = useState(GPage.Data.inputForms);
  const [footerBtn, setfooterBtn] = useState(GPage.Data.footerBtn);
  const [resultObj, setResultObj] = useState({});
  const [patientInfo, setpatientInfo] = useState(GPage.Data.patientInfo);
  const [selectValue, setSelectValue] = useState(["", ""]);
  const [classifyList] = useState(GPage.Data.classifyList);
  const [professionList] = useState(GPage.Data.professionList);
  // 提交表单
  const submit = obj => {
    let handleObj = { ...obj };
    delete handleObj.inHospitalNumber;
    for (let key in handleObj) {
      if (handleObj[key] === "" || handleObj[key] === "请选择") {
        setTipOpen(true);
        return;
      }
    }
    GPage.DoWXCall("submitEvaluate", obj);
  };
  useEffect(() => {
    let preData = [...inputForms];
    let obj = { ...resultObj };
    let arr = selectValue;
    for (let i = 0; i < inputForms.length; i++) {
      if (inputForms[i].id === "classify") {
        arr[i] = inputForms[i].defaultValue;
        preData[i].selectList = classifyList;
        setSelectValue(arr);
        setinputForms(preData);
      }
      if (inputForms[i].id === "profession") {
        arr[i] = inputForms[i].defaultValue;
        preData[i].selectList = professionList;
        setSelectValue(arr);
        setinputForms(preData);
      }
      if (inputForms[i].hasOwnProperty("defaultValue")) {
        obj[inputForms[i].id] = inputForms[i].defaultValue;
      } else {
        obj[inputForms[i].id] = "";
      }
      if (inputForms[i].type === "region") {
        ref.current.setPickerArea();
      }
    }
    setResultObj(obj);
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
      <View className={styles.submitForm}>
        <View className={styles.patientInfo}>
          {GPage.Map(
            patientInfo && patientInfo.content,
            (item: any, index: any) => {
              return (
                <View className={styles.infoItem}>
                  <View className={styles.label}>{item.label}：</View>
                  <View className={styles.value}>{item.value}</View>
                </View>
              );
            },
            ""
          )}
        </View>
        {GPage.Map(
          inputForms,
          (item: any, index: any) => {
            return item.type === "text" ? (
              <AtInput
                className={styles.inputMain}
                placeholder={item.placeholder}
                name={item.id}
                title={item.label + "："}
                type={item.type}
                value={resultObj[item.id]}
                onChange={value => {
                  let obj = { ...resultObj };
                  obj[item.id] = value;
                  setResultObj(obj);
                }}
              />
            ) : item.type === "region" ? (
              <View className={styles.regionSelect}>
                <View className={styles.title}>省市地区：</View>
                <Comp_AreaPicker
                  ref={ref}
                  config={item.regionList}
                  type="01"
                  onItemClick={value => {
                    let obj = { ...resultObj };
                    obj[item.id] = value;
                    setResultObj(obj);
                  }}
                />
              </View>
            ) : item.type === "select" ? (
              <View className={styles.typeSelect}>
                <Picker
                  mode="selector"
                  range={item.selectList}
                  rangeKey="value"
                  onChange={e => {
                    let obj = { ...resultObj };
                    obj[item.id] = item.selectList[e.detail.value];
                    let arr = selectValue;
                    arr[index] = item.selectList[e.detail.value].value;
                    setSelectValue(arr);
                    setResultObj(obj);
                  }}
                >
                  <AtList className={styles.selectList}>
                    <AtListItem
                      title={item.label + "："}
                      extraText={selectValue[index]}
                    />
                  </AtList>
                </Picker>
              </View>
            ) : (
              ""
            );
          },
          ""
        )}
        <AtButton
          type="primary"
          onClick={() => {
            submit(resultObj);
          }}
        >
          {footerBtn}
        </AtButton>
        {/* 提示框 */}
        <AtToast
          isOpened={tipOpen}
          text={tipsText}
          icon="close-circle"
          duration={1500}
          onClose={() => setTipOpen(false)}
        ></AtToast>
      </View>
    </Root>
  );
}
