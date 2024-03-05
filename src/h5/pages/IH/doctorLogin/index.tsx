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
  AtToast,
  AtList,
  AtListItem,
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction
} from "taro-ui";
//原生组件
import {
  View,
  Text,
  Image,
  Picker,
  Radio,
  Button,
  Input
} from "@tarojs/components";
//自定义组件
import { Comp_Tips } from "@/GGCompLib";
import {
  GGWhiteSpace,
  GGWingBlank,
  GGCPS_TopBar,
  GGCPS_NavBar,
  GGCPS_Result
} from "@/GGCPS";
import _ from "lodash";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_IH_doctorLogin_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
    }
  });
  //定义state
  const [tipsOpen, setTipsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [type, setType] = useState({ label: "" });
  useEffect(() => {
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  const tidySelectorData = (data: Array<{ label?: string }>) => {
    let arr = [];
    if (data) {
      for (let i = 0; i < data.length; i++) arr[i] = data[i].label;
    }
    return arr;
  };
  const submit = () => {
    let result = { user, password, area: type };
    if (_.isEmpty(user) || _.isEmpty(password) || _.isEmpty(type)) {
      setTipsOpen(true);
      return;
    } else {
      GPage.DoWXCall("submitClick", result);
    }
  };
  return (
    <Root hashData={styles}>
      <View className={styles.doctorLogin}>
        <View className={styles.content}>
          <Image src={GPage.Data.assets} className={styles.img} />
          <Text className={styles.title}>{GPage.Data.title}</Text>
          <Text className={styles.subtitle}>{GPage.Data.subtitle}</Text>

          <View className={styles.input_main}>
            <View className={styles.input_title}>
              <Text>账号</Text>
            </View>
            <Input
              name="user"
              type="number"
              placeholder={"请输入账号"}
              value={user}
              onInput={value => setUser(value.detail.value)}
              className={styles.formInput}
            />
          </View>
          <View className={styles.input_main}>
            <View className={styles.input_title}>
              <Text>密码</Text>
            </View>
            <Input
              name="password"
              password
              placeholder={"请输入密码"}
              value={password}
              onInput={value => setPassword(value.detail.value)}
              className={styles.formInput}
            />
          </View>
          <View className={styles.input_main}>
            <Picker
              mode="selector"
              range={tidySelectorData(GPage.Data.selectList)}
              onChange={e => {
                let obj = { ...type };
                obj = GPage.Data.selectList[e.detail.value];
                setType(obj);
              }}
              className={styles.select}
            >
              <View
                className={
                  type.label == ""
                    ? `${styles.typeLabel}`
                    : `${styles.typeValue}`
                }
              >
                {type.label ? (
                  <View className={styles.selectValue}>
                    <Text>{type.label}</Text>
                    <AtIcon value="chevron-down" size={20} color="#979797" />
                  </View>
                ) : (
                  <View className={styles.selectValue}>
                    <Text>请选择院区</Text>
                    <AtIcon value="chevron-down" size={20} color="#979797" />
                  </View>
                )}
              </View>
            </Picker>
          </View>
          <Button className={styles.submitBtn} onClick={submit}>
            {"登录"}
          </Button>
        </View>
        <AtToast
          isOpened={tipsOpen}
          text="请将内容填写完整！"
          icon="close-circle"
          onClose={() => setTipsOpen(false)}
          duration={1500}
        />
      </View>
    </Root>
  );
}
