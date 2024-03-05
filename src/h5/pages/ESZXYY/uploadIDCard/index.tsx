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
import {
  View,
  Image,
  Swiper,
  SwiperItem,
  Radio,
  Text
} from "@tarojs/components";
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
    pageName: "h5_pages_ESZXYY_uploadIDCard_index",
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
  const [idCard_url1, setUrl1] = useState("");
  const [idCard_url2, setUrl2] = useState("");
  const [idCard_url3, setUrl3] = useState("");
  const [idCard_Base641, setBase641] = useState<any>("");
  const [idCard_Base642, setBase642] = useState<any>("");
  const [idCard_Base643, setBase643] = useState<any>("");
  const [toastData, setToastData] = useState({
    open: false,
    txt: "",
    icon: ""
  });
  const [stepTxt, setStepTxt] = useState(GPage.Data.stepTxt);
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
  const submit = () => {
    const resultData = {
      idCard_Base641,
      idCard_Base642,
      idCard_Base643
    };
    if (idCard_Base641 && idCard_Base642 && idCard_Base643) {
      GPage.DoWXCall("submitClick", resultData);
    } else {
      setToastData({
        open: true,
        txt: "图片上传未完成！",
        icon: "alert-circle"
      });
    }
  };
  return (
    <Root hashData={styles}>
      <View className={styles.uploadIDCard}>
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
            <Image className={styles.tipsIcon} src={GPage.Data.assets.tips} />
            {stepTxt.subtitle}
          </View>
        </View>
        <View
          className={styles.uploadBox}
          onClick={() => {
            Taro.chooseImage({ count: 1 }).then(res => {
              if (res.tempFiles[0].size < 10000000) {
                setUrl1(res.tempFilePaths[0]);
              } else {
                let obj = {
                  open: true,
                  txt: "图片过大上传失败",
                  icon: "alert-circle"
                };
                setToastData(obj);
                return;
              }
              fetch(res.tempFilePaths[0])
                .then(fetchRes => {
                  return fetchRes.blob();
                })
                .then(data => {
                  let reader = new FileReader();
                  reader.onloadend = () => {
                    setBase641(reader.result);
                  };
                  reader.readAsDataURL(data);
                });
            });
          }}
        >
          {idCard_url1 ? (
            <Image
              className={styles.idCardImg}
              src={idCard_url1}
              mode="aspectFit"
            />
          ) : (
            <View
              className={styles.idCardArea}
              style={{
                backgroundImage: `url(${GPage.Data.assets.idCard_1})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%"
              }}
            >
              <Image
                src={GPage.Data.assets.upload}
                className={styles.uploadIcon}
              />
              <Text className={styles.uploadTxt}>患者身份证正面上传</Text>
            </View>
          )}
        </View>
        <View
          className={styles.uploadBox}
          onClick={() => {
            Taro.chooseImage({ count: 1 }).then(res => {
              if (res.tempFiles[0].size < 10000000) {
                setUrl2(res.tempFilePaths[0]);
              } else {
                let obj = {
                  open: true,
                  txt: "图片过大上传失败",
                  icon: "alert-circle"
                };
                setToastData(obj);
                return;
              }
              fetch(res.tempFilePaths[0])
                .then(fetchRes => {
                  return fetchRes.blob();
                })
                .then(data => {
                  let reader = new FileReader();
                  reader.onloadend = () => {
                    setBase642(reader.result);
                  };
                  reader.readAsDataURL(data);
                });
            });
          }}
        >
          {idCard_url2 ? (
            <Image
              className={styles.idCardImg}
              src={idCard_url2}
              mode="aspectFit"
            />
          ) : (
            <View
              className={styles.idCardArea}
              style={{
                backgroundImage: `url(${GPage.Data.assets.idCard_2})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%"
              }}
            >
              <Image
                src={GPage.Data.assets.upload}
                className={styles.uploadIcon}
              />
              <Text className={styles.uploadTxt}>患者身份证反面上传</Text>
            </View>
          )}
        </View>
        <View
          className={styles.uploadBox}
          onClick={() => {
            Taro.chooseImage({ count: 1 }).then(res => {
              if (res.tempFiles[0].size < 10000000) {
                setUrl3(res.tempFilePaths[0]);
              } else {
                let obj = {
                  open: true,
                  txt: "图片过大上传失败",
                  icon: "alert-circle"
                };
                setToastData(obj);
                return;
              }
              fetch(res.tempFilePaths[0])
                .then(fetchRes => {
                  return fetchRes.blob();
                })
                .then(data => {
                  let reader = new FileReader();
                  reader.onloadend = () => {
                    setBase643(reader.result);
                  };
                  reader.readAsDataURL(data);
                });
            });
          }}
        >
          {idCard_url3 ? (
            <Image
              className={styles.idCardImg}
              src={idCard_url3}
              mode="aspectFit"
            />
          ) : (
            <View
              className={styles.idCardArea}
              style={{
                backgroundImage: `url(${GPage.Data.assets.idCard_3})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%"
              }}
            >
              <Image
                src={GPage.Data.assets.upload}
                className={styles.uploadIcon}
              />
              <Text className={styles.uploadTxt}>患者手持身份证照片</Text>
              <Text className={styles.uploadsubTxt}>
                双手举起身份证正面放至胸前，漏出五官
              </Text>
            </View>
          )}
        </View>
        <AtButton className={styles.submitBtn} onClick={submit}>
          <Image className={styles.submitIcon} src={GPage.Data.assets.submit} />
          提交
        </AtButton>
        {GPage.Data.navData && GPage.Data.navData.length > 0 ? (
          <Comp_Nav config={navData} type={"normal"} className={styles.nav} />
        ) : (
          ""
        )}

        <AtToast
          duration={1500}
          isOpened={toastData.open}
          text={toastData.txt}
          icon={toastData.icon}
          onClose={() => {
            setToastData({ open: false, txt: "", icon: "" });
          }}
        ></AtToast>
      </View>
    </Root>
  );
}
