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
  AtTabs,
  AtTabsPane,
  AtButton,
  AtAvatar,
  AtTabBar,
  AtIcon
} from "taro-ui";
//原生组件
import { View, Text, Image } from "@tarojs/components";
//自定义组件
import { Comp_Result, Comp_Nav } from "@/GGCompLib";
import {
  GGWhiteSpace,
  GGWingBlank,
  GGCPS_TopBar,
  GGCPS_NavBar,
  GGCPS_Result
} from "@/GGCPS";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_IH_inquiryCard_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理

      GPage.SetState(
        [nda.doctorinfor],
        () => {
          setDoctorinfor(nda.doctorinfor);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.main_title],
        () => {
          setMain_title(nda.main_title);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.cardcontent],
        () => {
          setCardcontent(nda.cardcontent);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.confirm_title],
        () => {
          setConfirm_title(nda.confirm_title);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  //定义state
  const [doctorinfor, setDoctorinfor] = useState(GPage.Data.doctorinfor);
  const [main_title, setMain_title] = useState(GPage.Data.main_title);
  const [imgIndex, setImgIndex] = useState(0);
  const [cardcontent, setCardcontent] = useState(GPage.Data.cardcontent);
  const [confirm_title, setConfirm_title] = useState(GPage.Data.confirm_title);

  const [isChangeBig, setIsChangeBig] = useState(true);
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
      <View className={styles.inquiryCard}>
        <GGCPS_TopBar mode="doctorInfor" doctorInfor={doctorinfor} />
        <View className={styles.inquirycard_content}>
          <View className={styles.inquirycard_header}>
            <Text className={styles.inquirycard_header_txt}>
              {main_title.text}
            </Text>
          </View>
          {cardcontent && cardcontent.length > 0
            ? cardcontent.map((item, index) => {
                return (
                  <View
                    className={styles.inquirycard_content_main}
                    key={`item ${index}`}
                  >
                    <View
                      className={`${styles.inquirycard_content_patientinfor}  ${styles.underline}`}
                    >
                      <Text>患者：{item.patientname}</Text>
                      <Text>{item.patientgender}</Text>
                      <Text>{item.patientage}岁</Text>
                    </View>
                    <View
                      className={`${styles.inquirycard_content_disease}  ${styles.underline}`}
                    >
                      <View>问诊主题：</View>
                      <View className={styles.inquiry_text}>{item.theme}</View>
                    </View>
                    <View
                      className={`${styles.inquirycard_content_disease}  ${styles.underline}`}
                    >
                      <View>病情描述：</View>
                      <View className={styles.inquiry_text}>
                        {item.disease}
                      </View>
                    </View>
                    <View
                      className={`${styles.inquirycard_content_else}  ${styles.underline}`}
                    >
                      <View>其他信息补充：</View>
                      {item.else.map((item1, index1) => {
                        return (
                          <View
                            className={styles.inquiry_text}
                            key={` item1 ${index1}`}
                          >
                            <Text>{item1.label}：</Text>
                            <Text>{item1.value}</Text>
                          </View>
                        );
                      })}
                    </View>
                    <View
                      className={`${styles.inquirycard_content_else}  ${styles.underline}`}
                    >
                      <View>照片：</View>
                      <View
                        className={`${styles.inquirycard_content_picture}`}
                      >
                        {item.picture && item.picture.length > 0
                          ? item.picture.map((item2, index2) => {
                              return (
                                <View key={`item222 ${index2}`}>
                                  <Image
                                    src={item2.image}
                                    className={styles.picture}
                                    onClick={() => {
                                      setIsChangeBig(!isChangeBig);
                                      setImgIndex(index2);
                                    }}
                                  />
                                </View>
                              );
                            })
                          : ""}
                        <View
                          className={
                            isChangeBig
                              ? `${styles.imgPreview}`
                              : `${styles.imgPreview}  ${styles.imgChange}`
                          }
                          onClick={() => {
                            setIsChangeBig(!isChangeBig);
                          }}
                        >
                          <Image
                            src={
                              item.picture && item.picture.length > 0
                                ? item.picture[imgIndex].image
                                : ""
                            }
                            className={styles.picture_big}
                          />
                          <AtIcon
                            value="close-circle"
                            onClick={() => {
                              console.log("关闭s");
                              setIsChangeBig(!isChangeBig);
                            }}
                          />
                        </View>
                      </View>
                    </View>

                    <AtButton
                      onClick={() => {
                        GPage.DoWXCall("confirm_onClick");
                      }}
                    >
                      {confirm_title.text}
                    </AtButton>
                  </View>
                );
              })
            : ""}
        </View>
      </View>
    </Root>
  );
}
