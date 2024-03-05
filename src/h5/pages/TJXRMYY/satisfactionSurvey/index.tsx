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
  AtCheckbox,
  AtRate,
  AtButton,
  AtTextarea,
  AtList,
  AtListItem
} from "taro-ui";
//原生组件
import { View, Radio, Text, Checkbox, Picker } from "@tarojs/components";
import { result } from "lodash";
//自定义组件
// import { * } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_satisfactionSurvey_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.questionList],
        () => {
          setquestionList(nda.questionList);
          let obj = { ...resultObj };
          for (let i = 0; i < nda.questionList.length; i++) {
            if (nda.questionList[i].type === "1") {
              obj[nda.questionList[i].uniqueId] = "满意";
            } else if (nda.questionList[i].type === "2") {
              let arr = [];
              for (let j = 0; j < nda.questionList[i].answer.length; j++) {
                arr.push(nda.questionList[i].answer[j].value);
                obj[nda.questionList[i].uniqueId] = arr;
              }
            } else if (nda.questionList[i].type === "3") {
              obj[nda.questionList[i].uniqueId] = 5;
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
    }
  });
  //定义state
  const [questionList, setquestionList] = useState(GPage.Data.questionList);
  const [footerBtn, setfooterBtn] = useState(GPage.Data.footerBtn);
  const [resultObj, setResultObj] = useState({});
  const submit = obj => {
    let result = [];
    for (let i = 0; i < questionList.length; i++) {
      for (var key in obj) {
        if (questionList[i].uniqueId === key) {
          result.push({
            type: questionList[i].type,
            label: questionList[i].title,
            value: obj[key]
          });
        }
      }
    }

    for (let i = 0; i < questionList.length; i++) {
      if (questionList[i].type === "2") {
        for (let k = 0; k < questionList[i].answer.length; k++) {
          for (let j = 0; j < result.length; j++) {
            for (let s = 0; s < result[j].value.length; s++) {
              if (result[j].value[s] === questionList[i].answer[k].label) {
                result[j].value[s] = questionList[i].answer[k];
              }
            }
          }
        }
      }
    }
    GPage.DoWXCall("submitEvaluate", result);
  };
  const init = () => {
    // 给选择添加默认值;
    let obj = { ...resultObj };
    for (let i = 0; i < questionList.length; i++) {
      if (questionList[i].type === "1") {
        obj[questionList[i].uniqueId] = "满意";
      } else if (questionList[i].type === "2") {
        let arr = [];
        for (let j = 0; j < questionList[i].answer.length; j++) {
          arr.push(questionList[i].answer[j].value);
          obj[questionList[i].uniqueId] = arr;
        }
      } else if (questionList[i].type === "3") {
        obj[questionList[i].uniqueId] = 0;
      }
    }
    setResultObj(obj);
  };
  const createElement = (type, item, index) => {
    switch (type) {
      case "1":
        return (
          <View>
            {item.answer.map((item1, index1) => {
              return (
                <View
                  className={styles.radioMain}
                  onClick={() => {
                    // 勾选
                    if (
                      !item.answer[index1].hasOwnProperty("checked") &&
                      !item.answer[index1].checked
                    )
                      item.answer[index1].checked = true;
                    // 只能勾选一个
                    for (let j = 0; j < item.answer.length; j++) {
                      if (item.answer[index1] && index1 !== j) {
                        delete item.answer[j].checked;
                      }
                    }
                    let obj = { ...resultObj };
                    obj[item.uniqueId] = item.answer[index1];
                    setResultObj(obj);
                  }}
                >
                  <Radio
                    className={styles.radio_btn}
                    checked={item1.checked}
                  ></Radio>
                  <Text className={styles.radioText}>{item1.label}</Text>
                </View>
              );
            })}
          </View>
        );
      case "2":
        return (
          <AtCheckbox
            options={item.answer}
            selectedList={resultObj[item.uniqueId]}
            onChange={value => {
              let obj = { ...resultObj };
              obj[item.uniqueId] = value;
              setResultObj(obj);
            }}
          />
        );
      case "3":
        return (
          <AtRate
            value={resultObj[item.uniqueId]}
            onChange={(value: any) => {
              let obj = { ...resultObj };
              obj[item.uniqueId] = value;
              setResultObj(obj);
            }}
            className={styles.rateMain}
          />
        );
      case "4":
        return (
          <AtTextarea
            value={resultObj[item.uniqueId]}
            onChange={(value: any) => {
              let obj = { ...resultObj };
              obj[item.uniqueId] = value;
              setResultObj(obj);
            }}
            maxLength={200}
            placeholder={
              resultObj[item?.placeholder] ? resultObj[item?.placeholder] : ""
            }
          />
        );
      case "5":
        return (
          <Picker
            mode="selector"
            range={item.answer}
            onChange={e => {
              let obj = { ...resultObj };
              obj[item.uniqueId] = item.answer[e.detail.value];
              setResultObj(obj);
            }}
          >
            <View className={styles.picker_5}>
            {resultObj[item.uniqueId]?resultObj[item.uniqueId]:'点击选择科室'}
            </View>
          </Picker>
        );
    }
  };
  useEffect(() => {
    // init();

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
      <View className={styles.satisfactionSurvey}>
        {GPage.Map(
          questionList,
          (item: any, index: any) => {
            return (
              <View className={styles.item}>
                <View className={styles.title}>
                  {item.id}. {item.title}
                </View>
                <View className={styles.content}>
                  {createElement(item.type, item, index)}
                </View>
              </View>
            );
          },
          ""
        )}
        <AtButton
          type="primary"
          className={styles.btn1}
          onClick={() => {
            submit(JSON.parse(JSON.stringify(resultObj)));
          }}
        >
          {footerBtn}
        </AtButton>
      </View>
    </Root>
  );
}
