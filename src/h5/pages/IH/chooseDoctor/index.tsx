import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import { AtAvatar, AtButton, AtFloatLayout, AtIcon } from "taro-ui";
import { View, Text, Image } from "@tarojs/components";
import { Comp_Result } from "@/GGCompLib";
import { GGCPS_TopBar, GGCPS_Switch, GGCPS_DropDown } from "@/GGCPS";
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_chooseDoctor_index",
    ndaExcute: (nda: any) => {
      GPage.SetState(
        [nda.searchPlaceholder],
        () => {
          setSearchPlaceholder(nda.searchPlaceholder);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.resultData],
        () => {
          setResultData(nda.resultData);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.doctorInfor],
        () => {
          setdoctorInfor(nda.doctorInfor);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.classifyDoctor],
        () => {
          setClassifyDoctor(nda.classifyDoctor);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.classifyDept],
        () => {
          setClassifyDept(nda.classifyDept);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.floatData],
        () => {
          setFloatData(nda.floatData);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  //定义state
  const [floatData, setFloatData] = useState(GPage.Data.floatData);
  const [floatOpen, setFloatOpen] = useState(false);
  const [resultData, setResultData] = useState(GPage.Data.resultData);
  const [doctorInfor, setdoctorInfor] = useState(GPage.Data.doctorInfor);
  const [classifyDoctor, setClassifyDoctor] = useState(
    GPage.Data.classifyDoctor
  );
  const [classifyDept, setClassifyDept] = useState(GPage.Data.classifyDept);
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    GPage.Data.searchPlaceholder
  );

  const [noticeArr, setNoticeArr] = useState([]);
  useEffect(() => {
    const arr = new Array(doctorInfor.dataList.length).fill(false);
    for (let i = 0; i < doctorInfor.dataList.length; i++) {
      doctorInfor.dataList[i].hasOwnProperty("isFocus") &&
        (arr[i] = doctorInfor.dataList[i].isFocus);
    }
    console.log(arr);
    setNoticeArr(arr);
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});
  const isArray = (data: any) => {
    return Object.prototype.toString.call(data) === "[object Array]";
  };
  return (
    <Root hashData={styles}>
      <View className={styles.chooseDoctor}>
        <GGCPS_TopBar
          mode="search"
          searchPlaceholder={searchPlaceholder}
          searchOnclick={value => {
            GPage.DoWXCall("searchOnClick", value);
          }}
        />
        <View className={styles.header}>
          {classifyDept && classifyDept.length > 0 ? (
            <GGCPS_DropDown
              content={classifyDept}
              onClick={(item, index) => {
                GPage.DoWXCall("deptClick", item, index);
              }}
            />
          ) : (
            <View></View>
          )}
          {classifyDoctor && classifyDoctor.length > 0 ? (
            <GGCPS_Switch
              content={classifyDoctor}
              onClick={(sw, item, index) => {
                GPage.DoWXCall("switchClick", sw, item, index);
              }}
            />
          ) : (
            <View></View>
          )}
        </View>
        <View className={styles.content}>
          {doctorInfor &&
          doctorInfor.isEmpty === "N" &&
          isArray(doctorInfor.dataList) &&
          doctorInfor.dataList.length > 0 ? (
            doctorInfor.dataList.map((item1, index1) => {
              return (
                <View
                  className={styles.depdoctor_doctorinfo}
                  onClick={() => {
                    GPage.DoWXCall("doctorClick", item1, index1);
                    setFloatOpen(true);
                  }}
                >
                  <View key={index1} className={styles.doctorinfor_section}>
                    {item1?.online && (
                      <View>
                        <Image
                          className={styles.defaultImg}
                          src={item1.onlineIcon}
                        />
                        <Text className={styles.defaultTxt}>
                          {item1?.online}
                        </Text>
                      </View>
                    )}
                    <View className={styles.depdoctor_doctorinfo_left}>
                      <AtAvatar
                        image={item1.image}
                        className={styles.depdoctor_doctorinfo_image}
                        circle
                      />
                    </View>
                    <View className={styles.depdoctor_doctorinfo_right}>
                      <View className={styles.depdoctor_doctorinfo_upperright}>
                        <Text className={styles.depdoctor_doctorinfo_name}>
                          {item1.name}
                        </Text>
                        <Text className={styles.depdoctor_doctorinfo_identity}>
                          {item1.identity}
                        </Text>
                        <AtButton
                          size="small"
                          className={styles.depdoctor_doctorinfo_noticeBtn}
                          onClick={e => {
                            if (e && e.stopPropagation)
                              //因此它支持W3C的stopPropagation()方法
                              e.stopPropagation();
                            else {
                              //否则，我们需要使用IE的方式来取消事件冒泡
                              window.event.cancelBubble = true;
                            }
                            let arr = [...noticeArr];
                            arr[index1] = !arr[index1];
                            setNoticeArr(arr);
                            GPage.DoWXCall("noticeClick", item1, index1);
                          }}
                        >
                          {noticeArr[index1] ? (
                            <Text>
                              <AtIcon
                                value="heart-2"
                                size={12}
                                color="#37C787"
                              />
                              已关注
                            </Text>
                          ) : (
                            "点击关注"
                          )}
                        </AtButton>
                        {/* <View className={styles.depdoctor_doctorinfo_stars}>
                          <Image
                            src={item1.starIcon}
                            className={styles.depdoctor_doctorinfo_icon}
                          />
                          <Text className={styles.depdoctor_doctorinfo_txt}>
                            {item1.stars}
                          </Text>
                        </View> */}
                      </View>

                      <View
                        className={styles.depdoctor_doctorinfo_introduction}
                      >
                        {item1.introduction}
                      </View>
                    </View>
                  </View>
                  <View className={styles.depdoctor_doctorinfo_footer}>
                    {GPage.Map(
                      item1?.infor,
                      (item2, index2) => {
                        return (
                          <View
                            key={index2}
                            className={styles.depdoctor_doctorinfo_item}
                          >
                            <Image
                              className={styles.depdoctor_doctorinfo_item_img}
                              src={item2.icon}
                            />
                            <Text
                              className={styles.depdoctor_doctorinfo_item_txt}
                            >
                              {item2.text}
                            </Text>
                          </View>
                        );
                      },
                      null
                    )}
                  </View>
                </View>
              );
            })
          ) : (
            <Comp_Result config={resultData} type="01" />
          )}
        </View>
        <AtFloatLayout
          isOpened={floatData.isShow && floatOpen}
          title={floatData.title}
          onClose={() => {
            setFloatOpen(false);
          }}
        >
          <View className={styles.appointmentType}>
            {GPage.Map(
              floatData.dataList,
              (item3, index3) => {
                return (
                  <View
                    key={`floatServer+${index3}`}
                    className={styles.appointmentTypecontent}
                    onClick={() => {
                      GPage.DoWXCall("floatServerClick", item3, index3);
                    }}
                  >
                    <Text className="">{item3.text}</Text>
                    <Image
                      className={styles.appointmentTypeimg}
                      src={item3.icon}
                    />
                    <AtButton
                      type="primary"
                      size="small"
                      className={styles.appointmentTypebtn}
                    >
                      {item3.money}
                    </AtButton>
                  </View>
                );
              },
              null
            )}
          </View>
        </AtFloatLayout>
      </View>
    </Root>
  );
}
