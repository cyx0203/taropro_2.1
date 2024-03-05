import React, { useEffect, useRef, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtButton, AtTextarea } from "taro-ui";
//原生组件
import { View } from "@tarojs/components";
//自定义组件
import { Comp_Evaluation } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_evaluate_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.evaluateDataArea],
        () => {
          setevaluateDataArea(nda.evaluateDataArea);
        },
        () => {
          console.log("fail");
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
        [nda.textAreaTips],
        () => {
          setTextAreaTips(nda.textAreaTips);
        },
        () => {
          console.log("Fail");
        }
      );
    }
  });
  const ref = useRef();

  const [footerBtn, setfooterBtn] = useState(GPage.Data.footerBtn);
  //定义state
  const [evaluateDataArea, setevaluateDataArea] = useState(
    GPage.Data.evaluateDataArea
  );
  const [textAreaTips, setTextAreaTips] = useState(GPage.Data.textAreaTips);
  const [textArea, setTextArea] = useState("");
  const changeArea = value => {
    setTextArea(value);
  };
  useEffect(() => {
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
      <View className={styles.evaluate}>
        <Comp_Evaluation
          className={styles.main}
          type="01"
          config={evaluateDataArea}
          ref={ref}
          onItemClick={(item, index, activeList) => {
            console.log(item, index, activeList);
          }}
          onSubListClick={(item, index) => {
            console.log(item, index);
          }}
          onButtonClick={(mainList, subList) => {
            console.log(mainList, subList);
          }}
        />
        <AtTextarea
          value={textArea}
          onChange={value => changeArea(value)}
          maxLength={300}
          placeholder={textAreaTips}
        />
        <AtButton
          type="primary"
          onClick={() => {console.log(ref.current.value());console.log(textArea);
          }}
        >
          {footerBtn}
        </AtButton>
      </View>
    </Root>
  );
}
