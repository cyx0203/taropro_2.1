import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtButton, AtInput, AtToast } from "taro-ui";
//原生组件
import { View } from "@tarojs/components";
//自定义组件
// import { * } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_login_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.pageData],
        () => {
          setpageData(pageData);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.defaultValue],
        () => {
          setdefaultValue(nda.defaultValue);
          setName(nda.defaultValue.name)
          setNumber(nda.defaultValue.number)
        },
        () => {
          console.log("Fail");
        }
      );
    }
  });
  //定义state
  const [pageData, setpageData] = useState(GPage.Data.pageData);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [defaultValue, setdefaultValue] = useState(GPage.Data.defaultValue);
  const [tipOpen, setTipOpen] = useState(false);
  // 输入框内容修改函数
  const changeData = (value, func) => {
    func(value);
  };
  // 提交数据函数
  const submitData = obj => {
    if (obj.name === "" || obj.number === "") {
      setTipOpen(true);
      return 0;
    }
    GPage.DoWXCall("loginIn", obj);
  };
  useEffect(() => {
    if (defaultValue) {
      setName(defaultValue.name);
      setNumber(defaultValue.number);
    }
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
      <View className={styles.login}>
        <View className={styles.header}>{pageData.title}</View>
        <View className={styles.formData}>
          <AtInput
            name="number"
            title="住院号:"
            type="text"
            value={number}
            onChange={value => changeData(value, setNumber)}
          />
          <AtInput
            name="patientName"
            title="姓名:"
            type="text"
            value={name}
            onChange={value => changeData(value, setName)}
          />
        </View>
        {/* 提示框 */}
        <AtToast
          isOpened={tipOpen}
          text={pageData.tips}
          icon="close-circle"
          duration={1500}
          onClose={() => setTipOpen(false)}
        ></AtToast>
        <AtButton
          onClick={() => {
            submitData({ name, number });
          }}
        >
          {pageData.btn}
        </AtButton>
      </View>
    </Root>
  );
}
