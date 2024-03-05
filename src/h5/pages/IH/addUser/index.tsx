import React, { useEffect, useRef, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
import Taro from "@tarojs/taro";
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
  AtModalAction,
  AtNoticebar,
  AtActionSheet,
  AtActionSheetItem
} from "taro-ui";
//原生组件
import { View, Text, Image, Picker, Radio, Button } from "@tarojs/components";
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
    //定义该模版独有的pageName，命名规则 该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_IH_addUser_index",
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
        [nda.formShow],
        () => {
          setFormShow(nda.formShow);
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
      GPage.SetState(
        [nda.clauseData],
        () => {
          setClauseData(nda.clauseData);
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
    }
  });
  const [time, setTime] = useState(0);
  const timer = useRef(null);
  //定义state
  const [activeOpen, setActiveOpen] = useState(false);
  const [footerBtn, setFooterBtn] = useState(GPage.Data.footerBtn);
  const [formShow, setFormShow] = useState(GPage.Data.formShow);
  const [modelOpen, setModelOpen] = useState(false);
  const [checkRadio, setRadio] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
  const [userName, setUserName] = useState(GPage.Data.defaultValue.name || "");
  const [userGender, setUserGender] = useState(
    GPage.Data.defaultValue.gender || ""
  );
  const [userIdType, setUserIdType] = useState(
    GPage.Data.defaultValue.idType || ""
  );
  const [userIDNumber, setUserIDNumber] = useState(
    GPage.Data.defaultValue.idNumber || ""
  );
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [numberCheck, setNumberCheck] = useState<any>("");
  const [userAddress, setUseAddress] = useState("");
  const [userNation, setUserNation] = useState("汉族");
  const [nationList, setNation] = useState(GPage.Data.nationList);
  const [clauseData, setClauseData] = useState(GPage.Data.clauseData);
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
      userNation,
      numberCheck,
      userGender,
      userIdType
    };
    // 非空判断
    if (
      Obj.userName === "" ||
      Obj.userIDNumber === "" ||
      Obj.userPhoneNumber === "" ||
      (Obj.userAddress === "" && formShow.address) ||
      (Obj.userGender === "" && formShow.gender) ||
      (Obj.userIdType === "" && formShow.idType) ||
      (Obj.numberCheck === "" && formShow.numberCheck) ||
      (Obj.userNation === "" && formShow.nation)
    ) {
      setTipOpen(true);
      return 0;
    }
    if (!formShow.nation) delete Obj.userNation;
    if (!formShow.address) delete Obj.userAddress;
    if (!formShow.numberCheck) delete Obj.numberCheck;
    GPage.DoWXCall("addUserClick", Obj);
  };
  useEffect(() => {
    timer.current && clearInterval(timer.current);
    return () => timer.current && clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (time === 60)
      timer.current = setInterval(() => setTime(time => --time), 1000);
    else if (time <= 0) timer.current && clearInterval(timer.current);
  }, [time]);

  const getCode = () => {
    if (time) return;
    setTime(60);
    GPage.DoWXCall("getCheckClick", userPhoneNumber);
  };

  //对应 onReady
  useReady(() => {});

  //对应 onShow
  useDidShow(() => {});

  //对应 onHide
  useDidHide(() => {});
  const checkTelephone = telephone => {
    var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (reg.test(telephone)) return true;
    else return false;
  };
  // 调用相册
  const handleChooseImage = async () => {
    try {
      const result = await Taro.chooseImage({
        count: 1, // 最多选择一张图片
        sourceType: ["album"] // 从相册选择
      });
      GPage.DoWXCall('selectPicOnClick',result)
      setActiveOpen(false);
    } catch (error) {
      console.error("选择图片出错：", error);
    }
  };

  // 调用拍照
  const handleTakePhoto = async () => {
    try {
      const result = await Taro.chooseImage({
        count: 1,
        sourceType: ["camera"] // 使用相机拍照
      });
      GPage.DoWXCall('selectPicOnClick',result)
      setActiveOpen(false);
    } catch (error) {
      console.error("拍照出错：", error);
    }
  };
  return (
    <Root hashData={styles}>
      {GPage.Data.topTipsText && (
        <AtNoticebar icon="alert-circle">{GPage.Data.topTipsText}</AtNoticebar>
      )}
      <View className={styles.addUser}>
        <View
          className={styles.idPicBox}
          onClick={() => {
            setActiveOpen(true);
          }}
        >
          <AtIcon value="camera" size={15} />
          <Text>身份证快速识别</Text>
        </View>
        {/* 输入表单 */}
        <View className={styles.input_index}>
          <View className={styles.input_main}>
            <View className={styles.input_title}>
              <Text>姓名 </Text>
            </View>
            <AtInput
              name="name"
              type="text"
              placeholder={"请输入姓名"}
              value={userName}
              onChange={value => userNameChange(value)}
            />
          </View>
          <View
            className={styles.input_main}
            style={{ display: formShow?.gender ? "" : "none" }}
          >
            <View className={styles.input_title}>
              <Text>性别 </Text>
            </View>
            <View className={styles.selector}>
              <Picker
                mode="selector"
                range={["男", "女"]}
                onChange={e => {
                  setUserGender(["男", "女"][e.detail.value]);
                }}
              >
                <View className={styles.selectorValue}>
                  {userGender ? (
                    <Text style={{ color: "#000" }}>{userGender}</Text>
                  ) : (
                    <Text style={{ color: "#d6cccc" }}>请选择性别</Text>
                  )}

                  <AtIcon value="chevron-right" size={16} color="#979797" />
                </View>
              </Picker>
            </View>
          </View>
          <View
            className={styles.input_main}
            style={{ display: formShow?.idType ? "" : "none" }}
          >
            <View className={styles.input_title}>
              <Text>证件类型 </Text>
            </View>
            <View className={styles.selector}>
              <Picker
                mode="selector"
                range={GPage.Data.idTypeList}
                onChange={e => {
                  setUserIdType(GPage.Data.idTypeList[e.detail.value]);
                }}
              >
                <View className={styles.selectorValue}>
                  {userIdType ? (
                    <Text style={{ color: "#000" }}>{userIdType}</Text>
                  ) : (
                    <Text style={{ color: "#d6cccc" }}>请选择证件类型</Text>
                  )}

                  <AtIcon value="chevron-right" size={16} color="#979797" />
                </View>
              </Picker>
            </View>
          </View>
          <View className={styles.input_main}>
            <View className={styles.input_title}>
              <Text>证件号 </Text>
            </View>
            <AtInput
              name="idnumber"
              type="text"
              placeholder={"请输入证件号"}
              value={userIDNumber}
              onChange={value => userIDNumberChange(value)}
            />
          </View>
          <View
            className={styles.input_main}
            style={{
              display: nationList && formShow?.nation ? "" : "none"
            }}
          >
            <View className={styles.input_title}>
              <Text>民族 </Text>
            </View>
            <View className={styles.selector}>
              <Picker
                mode="selector"
                range={nationList}
                onChange={nationChange}
              >
                <View className={styles.selectorValue}>
                  {userNation ? (
                    <Text style={{ color: "#000" }}>{userNation}</Text>
                  ) : (
                    <Text style={{ color: "#d6cccc" }}>请选择民族</Text>
                  )}

                  <AtIcon value="chevron-right" size={16} color="#979797" />
                </View>
              </Picker>
            </View>
          </View>
          <View
            className={styles.input_main}
            style={{ display: formShow?.address ? "" : "none" }}
          >
            <View className={styles.input_title}>
              <Text>地址 </Text>
            </View>
            <AtInput
              name="address"
              type="text"
              placeholder={"请输入地址"}
              value={userAddress}
              onChange={value => userAddressChange(value)}
            />
          </View>
          <View className={styles.input_main}>
            <View className={styles.input_title}>
              <Text>手机号码 </Text>
            </View>
            <AtInput
              name="phonenumber"
              type="text"
              placeholder={"请输入手机号"}
              value={userPhoneNumber}
              onChange={value => userPhoneNumberChange(value)}
            />
          </View>
          <View
            className={styles.input_main}
            style={{
              display: formShow?.numberCheck ? "" : "none",
              border: 0
            }}
          >
            <View className={styles.input_title}>
              <Text>验证码 </Text>
            </View>
            <AtInput
              name="numberCheck"
              type="text"
              placeholder={"验证码"}
              value={numberCheck}
              onChange={value => {
                setNumberCheck(value);
              }}
            />
            <Button
              className={styles.numberCheckBtn}
              disabled={time ? true : false}
              onClick={() => {
                if (checkTelephone(userPhoneNumber)) getCode();
                else GPage.DoWXCall("errPhoneNumber");
              }}
            >
              {time ? `${time}秒后重试` : "获取验证码"}
            </Button>
          </View>
        </View>
        {/* 提示框 */}
        <AtToast
          isOpened={tipOpen}
          text="必填项不能为空！"
          icon="close-circle"
          duration={1500}
          onClose={() => setTipOpen(false)}
        ></AtToast>

        {GPage.Data.agreementShow ? (
          <View className={styles.tipsArea}>
            <View
              onClick={() => {
                setRadio(!checkRadio);
              }}
            >
              <Radio checked={checkRadio}></Radio>
              <Text>我已阅读并同意</Text>
            </View>

            <View
              style={{ color: "#e4b675" }}
              onClick={() => {
                setModelOpen(true);
              }}
            >
              《隐私条款》
            </View>
          </View>
        ) : (
          ""
        )}
        {footerBtn?.btn1 ? (
          <AtButton
            onClick={onSubmit}
            disabled={!checkRadio && GPage.Data.agreementShow}
          >
            {/* <AtIcon value="add-circle" size="20" color="#FFF"></AtIcon> */}
            {footerBtn?.btn1}
          </AtButton>
        ) : (
          ""
        )}
        {footerBtn?.btn2 ? (
          <AtButton
            onClick={() => {
              GPage.DoWXCall("footerBtn2Click");
            }}
            // disabled={!checkRadio && GPage.Data.agreementShow}
            // customStyle={{'backgroundColor':'#bbb',color:'#21a1ff'}}
          >
            {/* <AtIcon value="add-circle" size="20" color="#FFF"></AtIcon> */}
            {footerBtn?.btn2}
          </AtButton>
        ) : (
          ""
        )}

        <AtModal isOpened={modelOpen} onClose={() => setModelOpen(false)}>
          <AtModalHeader>隐私条款</AtModalHeader>
          <AtModalContent>
            <View dangerouslySetInnerHTML={{ __html: clauseData }}></View>

            <AtModalAction>
              <AtButton type="primary" onClick={() => setModelOpen(false)}>
                确认
              </AtButton>
            </AtModalAction>
          </AtModalContent>
        </AtModal>
        <AtActionSheet isOpened={activeOpen} cancelText="取消">
          <AtActionSheetItem
            onClick={() => {
              handleTakePhoto();
            }}
          >
            拍摄
          </AtActionSheetItem>
          <AtActionSheetItem
            onClick={() => {
              handleChooseImage();
            }}
          >
            从相册选择
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    </Root>
  );
}
