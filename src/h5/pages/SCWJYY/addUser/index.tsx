import React, { useEffect, useState } from "react";
import { View, Text, Image, Picker } from "@tarojs/components";
import {
  AtForm,
  AtInput,
  AtButton,
  AtToast,
  AtList,
  AtListItem,
  AtIcon
} from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import {
  Comp_Menu,
  Comp_MenuTab,
  Comp_UserInforCard,
  Comp_Indexes,
  Comp_Nav,
  Comp_BtnList,
  Comp_UserECard,
  Comp_Tips
} from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "../../../core/root";
import "./style/index.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_SCWJYY_addUser_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.inputPlaceholder],
        () => {
          setInputPlaceholder(nda.inputPlaceholder);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.warmPrompt],
        () => {
          setWarmPrompt(nda.warmPrompt);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.nationList],
        () => {
          setNation(nda.nationList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [tipOpen, setTipOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userIDNumber, setUserIDNumber] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userAddress, setUseAddress] = useState("");
  const [userNation, setUserNation] = useState("汉族");
  const [nationList,setNation] = useState(GPage.Data.nationList);
  const [inputPlaceholder, setInputPlaceholder] = useState(
    GPage.Data.inputPlaceholder
  );
  const [warmPrompt, setWarmPrompt] = useState(GPage.Data.warmPrompt);
  const nationChange = e => {
    setUserNation(nationList[e.detail.value]);
  };
  const userNameChange = value => {
    setUserName(value);
  };
  const userIDNumberChange = value => {
    setUserIDNumber(value);
  };
  const userPhoneNumberChange = value => {
    setUserPhoneNumber(value);
  };
  const userAddressChange = value => {
    setUseAddress(value);
  };
  const onSubmit = () => {
    let Obj = {
      userName,
      userIDNumber,
      userPhoneNumber,
      userAddress,
      userNation
    };
    // 非空判断
    if (
      Obj.userName === "" ||
      Obj.userIDNumber === "" ||
      Obj.userPhoneNumber === "" ||
      Obj.userAddress === ""
    ) {
      setTipOpen(true);
      return 0;
    }
    GPage.DoWXCall("addUserClick", Obj);
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
    <Root>
      <View className="addUser">
        {/* 输入表单 */}
        <View className="input_index">
          <View className="input_main">
            <View className="input_title">
              <Text className="asterisk">*</Text>
              <Text>姓名：</Text>
            </View>
            <AtInput
              name="name"
              type="text"
              placeholder={inputPlaceholder}
              value={userName}
              onChange={value => userNameChange(value)}
            />
          </View>
          <View className="input_main">
            <View className="input_title">
              <Text className="asterisk">*</Text>
              <Text>身份证：</Text>
            </View>
            <AtInput
              name="idnumber"
              type="text"
              placeholder={inputPlaceholder}
              value={userIDNumber}
              onChange={value => userIDNumberChange(value)}
            />
          </View>
          <View className="input_main">
            <View className="input_title">
              <Text className="asterisk">*</Text>
              <Text>手机号：</Text>
            </View>
            <AtInput
              name="phonenumber"
              type="text"
              placeholder={inputPlaceholder}
              value={userPhoneNumber}
              onChange={value => userPhoneNumberChange(value)}
            />
          </View>
          <View className="input_main">
            <View className="input_title">
              <Text className="asterisk">*</Text>
              <Text>地址：</Text>
            </View>
            <AtInput
              name="address"
              type="text"
              placeholder={inputPlaceholder}
              value={userAddress}
              onChange={value => userAddressChange(value)}
            />
          </View>
          <View className="input_main" style={{ border: "0" }}>
            <View className="input_title">
              <Text className="asterisk">*</Text>
              <Text>民族：</Text>
            </View>
            <View className="selector">
              <Picker
                mode="selector"
                range={nationList}
                onChange={nationChange}
              >
                <AtList>
                  <AtListItem extraText={userNation} />
                </AtList>
              </Picker>
            </View>
          </View>
          {/* 温馨提示 */}
          <Comp_Tips type="01" config={warmPrompt} />
        </View>
        {/* 提示框 */}
        <AtToast
          isOpened={tipOpen}
          text="必填项不能为空！"
          icon="close-circle"
          duration={1500}
          onClose={() => setTipOpen(false)}
        ></AtToast>
        <AtButton onClick={onSubmit}>
          <AtIcon value="add-circle" size="20" color="#FFF"></AtIcon>提交
        </AtButton>
      </View>
    </Root>
  );
}
