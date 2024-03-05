import React, { useEffect, useState } from "react";
import {
  AtTabs,
  AtTabsPane,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton,
  AtIcon,
  AtInput,
  AtImagePicker,
  AtToast
} from "taro-ui";
import { View, Image, Swiper, SwiperItem, Radio } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "@/GGPageRoot";
import { Comp_Menu, Comp_Nav } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import _ from "lodash";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_ESZXYY_register_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.stepTxt],
        () => {
          setStepTxt(nda.stepTxt);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.formSet],
        () => {
          setFormSet(nda.formSet);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.tipsTxt],
        () => {
          setTipsTxt(nda.tipsTxt);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.navData],
        () => {
          setNavData({
            list: nda.navData,
            onClick: GPage.WXCall.navOnClick
          });
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [toastData, setToastData] = useState({
    open: false,
    txt: "",
    icon: ""
  });
  const [checkRadio, setRadio] = useState(false);
  const [formSet, setFormSet] = useState(GPage.Data.formSet);
  const [stepTxt, setStepTxt] = useState(GPage.Data.stepTxt);
  const [tipsTxt, setTipsTxt] = useState(GPage.Data.tipsTxt);

  const [userName, setUserName] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");
  const [IDBase64, setIDBase64] = useState<any>("");
  const [personalBase64, setpersonalBase64] = useState("");
  const [NATBase64, setNATBase64] = useState("");
  const [upDateFileID, setFileID] = useState([]);
  const [upDateFilePerson, setFilePerson] = useState([]);
  const [upDateFileNAT, setFileNAT] = useState([]);
  const [navData, setNavData] = useState({
    list: GPage.Data.navData,
    onClick: GPage.WXCall.navOnClick
  });
  useEffect(() => {
    return () => {};
  }, []);
  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const submit = () => {
    const resultData = {
      userName,
      userID,
      userPhoneNumber,
      IDBase64,
      personalBase64,
      NATBase64
    };
    GPage.DoWXCall("submitClick", resultData);
  };
  return (
    <Root hashData={styles}>
      <View className={styles.register}>
        {/* 顶部步骤导向 */}
        <View
          className={styles.headerArea}
          style={{
            backgroundImage: `url(${GPage.Data.assets.titleBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }}
        >
          <View className={styles.title}>{stepTxt.title}</View>
          <View className={styles.subtitle}>
            <Image
              className={styles.tipsIcon}
              src={GPage.Data.assets.tips}
            />
            {stepTxt.subtitle}
          </View>
        </View>
        {/* 表单部分 */}
        <View className={styles.formArea}>
          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>
              {formSet.userName.asterisk ? "*" : ""}
            </View>
            <View className={styles.formLabel}>姓名</View>
            <AtInput
              placeholder={formSet.userName.placeholder}
              name="name"
              onChange={(val: string) => {
                setUserName(val);
              }}
            />
          </View>
          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>
              {formSet.userID.asterisk ? "*" : ""}
            </View>
            <View className={styles.formLabel}>身份证号</View>
            <AtInput
              placeholder={formSet.userID.placeholder}
              name="ID"
              onChange={(val: string) => {
                setUserID(val);
              }}
            />
          </View>
          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>
              {formSet.userPhoneNumber.asterisk ? "*" : ""}
            </View>
            <View className={styles.formLabel}>联系电话</View>
            <AtInput
              placeholder={formSet.userPhoneNumber.placeholder}
              name="number"
              onChange={(val: string) => {
                setUserPhoneNumber(val);
              }}
            />
          </View>
          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>
              {formSet.IDImg.asterisk ? "*" : ""}
            </View>
            <View className={styles.formLabel}>身份证照片</View>
            <View className={styles.upDateArea}>
              <AtImagePicker
                count={1}
                length={1}
                files={upDateFileID}
                onChange={(val: any) => {
                  if (!_.isEmpty(val)) {
                    getBase64(val[0].file.originalFileObj, (imageUrl: any) => {
                      setIDBase64(imageUrl);
                    });
                  }else {
                    setIDBase64('');
                  }

                  setFileID(val);
                }}
                onFail={() => {
                  let obj = {
                    open: true,
                    txt: "上传失败",
                    icon: ""
                  };
                  setToastData(obj);
                }}
              />
            </View>
          </View>
          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>
              {formSet.personalImg.asterisk ? "*" : ""}
            </View>
            <View className={styles.formLabel}>个人照片</View>
            <View className={styles.upDateArea}>
              <AtImagePicker
                count={1}
                length={1}
                files={upDateFilePerson}
                onChange={(val: any) => {
                  if (!_.isEmpty(val)) {
                    getBase64(val[0].file.originalFileObj, (imageUrl: any) => {
                      setpersonalBase64(imageUrl);
                    });
                  }else {
                    setpersonalBase64('')
                  }
                  setFilePerson(val);
                }}
                onFail={() => {
                  let obj = {
                    open: true,
                    txt: "上传失败",
                    icon: ""
                  };
                  setToastData(obj);
                }}
              />
            </View>
          </View>
          <View className={styles.formItem}>
            <View className={styles.formAsterisk}>
              {formSet.NATImg.asterisk ? "*" : ""}
            </View>
            <View className={styles.formLabel}>核酸检测报告</View>
            <View className={styles.upDateArea}>
              <AtImagePicker
                count={1}
                length={1}
                files={upDateFileNAT}
                onChange={(val: any) => {
                  if (!_.isEmpty(val)) {
                    getBase64(val[0].file.originalFileObj, (imageUrl: any) => {
                      setNATBase64(imageUrl);
                    });
                  }else {
                    setNATBase64('');
                  }
                  setFileNAT(val);
                }}
                onFail={() => {
                  let obj = {
                    open: true,
                    txt: "上传失败",
                    icon: ""
                  };
                  setToastData(obj);
                }}
              />
            </View>
          </View>
        </View>
        <View className={styles.footerTips}>
          <View
            className={styles.checkArea}
            onClick={() => {
              setRadio(!checkRadio);
            }}
          >
            <View className={styles.circle}></View>
            <Image
              style={{ display: checkRadio ? "" : "none" }}
              className={styles.selectedIcon}
              src={GPage.Data.assets.selected}
            />
          </View>
          <View
            className={styles.tipTxt}
            dangerouslySetInnerHTML={{ __html: tipsTxt }}
          ></View>
        </View>
        <AtButton
          className={styles.submitBtn}
          disabled={!checkRadio}
          onClick={submit}
        >
          <Image
            className={styles.submitIcon}
            src={GPage.Data.assets.submit}
          />
          提交
        </AtButton>
        <Comp_Nav config={navData} type={"normal"} className={styles.nav} />
        <AtToast
          isOpened={toastData.open}
          text={toastData.txt}
          icon={toastData.icon}
        ></AtToast>
      </View>
    </Root>
  );
}
