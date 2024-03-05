import React, { useEffect, useState } from "react";
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
// import { * } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_feedback_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理

      GPage.SetState(
        [nda.inputForms],
        () => {
          setinputForms(nda.inputForms);
          let obj = resultObj;
          for (let i = 0; i < nda.inputForms.length; i++) {
            obj[nda.inputForms[i].id] = "";
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
    }
  });
  //定义state
  // const [xxx, setXXX] = useState('');
  const [tipOpen, setTipOpen] = useState(false);
  const [tipsText, setTipsText] = useState(GPage.Data.tipsText);
  const [inputForms, setinputForms] = useState(GPage.Data.inputForms);

  const [footerBtn, setfooterBtn] = useState(GPage.Data.footerBtn);
  const [resultObj, setResultObj] = useState({});
  const submit = (obj) => { 
    for(var key in obj){
      if(!obj[key]) {setTipOpen(true); return};
    }

    GPage.DoWXCall('submitEvaluate',obj)
   }
  useEffect(() => {
    let obj = { ...resultObj };
    for (let i = 0; i < inputForms.length; i++) {
      obj[inputForms[i].id] = "";
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
      <View className={styles.feedback}>
        {GPage.Map(
          inputForms,
          (item: any, index: any) => {
            return item.type === "text" ? (
              <AtInput
                className={styles.inputMain}
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
            ) : item.type === "textarea" ? (
              <AtTextarea
                className={styles.textArea}
                value={resultObj[item.id]}
                onChange={value => {
                  let obj = { ...resultObj };
                  obj[item.id] = value;
                  setResultObj(obj);
                }}
                maxLength={300}
                placeholder="你的问题是..."
              />
            ) : item.type === "select" ? (
              <View className={styles.typeSelect}>
                <Picker
                  mode="selector"
                  range={item.selectList}
                  rangeKey="value"
                  onChange={e => {
                    let obj = { ...resultObj };
                    obj[item.id] = item.selectList[e.detail.value].value;
                    setResultObj(obj);
                  }}
                >
                  <AtList className={styles.selectList}>
                    <AtListItem
                      title={item.label + "："}
                      extraText={resultObj[item.id]}
                    />
                    <View
                      className={styles.picker_tip}
                      style={{
                        display: resultObj[item.id] === "" ? "" : "none"
                      }}
                    >
                      <Text className={styles.tip}>请选择</Text>
                      <AtIcon
                        value="chevron-down"
                        size="30"
                        color="#7e7e7e"
                      ></AtIcon>
                    </View>
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
            submit(resultObj)
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
