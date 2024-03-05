import React, { useEffect, useState } from "react";
import { View, Text, Image, Picker } from "@tarojs/components";
import Taro from '@tarojs/taro';
import {
  AtButton, AtTabs, AtDivider, AtRate, AtFloatLayout
} from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { GGWingBlank, GGWhiteSpace, GGCPS_TopBar } from "@/GGCPS";
// import BASE from "@/GGPageBase";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
// import "~taro-ui/dist/style/index.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_IH_drawboard_docdetail_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.active_index],
        () => {
          setAI(nda.active_index)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.active_index],
        () => {
          setAI(nda.active_index)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.isDetail],
        () => {
          setIsDetail(nda.isDetail)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.userInfo],
        () => {
          setUserInfo(nda.userInfo)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.schedule],
        () => {
          setSchedule(nda.schedule)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.scheduleShow],
        () => {
          setSS(nda.scheduleShow)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.timelist],
        () => {
          setTL(nda.timelist)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.scheduleIndex],
        () => {
          setSI(nda.scheduleIndex)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.amOrpm],
        () => {
          setAO(nda.amOrpm)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.weekInfo],
        () => {
          setWI(nda.weekInfo)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.timeIndex],
        () => {
          setTI(nda.timeIndex)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.focusIndex],
        () => {
          setFI(nda.focusIndex)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.patientinfor],
        () => {
          setPI(nda.patientinfor)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.appointmentShow],
        () => {
          setAMS(nda.appointmentShow)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.ConsultationList],
        () => {
          setCTL(nda.ConsultationList)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.notice],
        () => {
          setNotice(nda.notice)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.swt],
        () => {
          setSwitch(nda.swt)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.title],
        () => {
          setTitle(nda.title)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.rest],
        () => {
          setRest(nda.rest)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.viewHeight],
        () => {
          setView(nda.viewHeight)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  
    const [maxTxt,setMaxtxt] = useState(35); //简介最大长度
    const [isDetail,setIsDetail]= useState(false); //是否显示详情,默认为假
    const [viewHeight,setView] = useState(1000);
    // userInfo:super.BASE_GDATA.userInfo
    const [userInfo,setUserInfo] = useState(GPage.Data.userInfo);
    const [schedule,setSchedule] = useState(GPage.Data.schedule);
    const [scheduleShow,setSS] = useState(true);
    const [timelist,setTL] = useState([""]);
    const [rest,setRest] = useState([0, 0, 0, 0, 0, 0]);
    const [scheduleIndex,setSI] = useState(0);
    const [amOrpm,setAO] = useState("am");
    const [weekInfo,setWI] = useState("周信息");
    const [timeIndex,setTI] = useState(0);
    const [appointmentShow,setAMS] = useState(false);
    const [ConsultationList,setCTL] = useState(GPage.Data.ConsultationList);
    const [focusIndex,setFI] = useState(-1);
    const [patientinfor,setPI] = useState(GPage.Data.patientinfor);
    const [notice,setNotice] = useState(false);
    const [swt,setSwitch] = useState(GPage.Data.switch);
    const [active_index,setAI] = useState(GPage.Data.active_index)
    const [title,setTitle] = useState(GPage.Data.title);
    // noticeClick: super.BASE_EXCUTE_NON_DATA("noticeClick", () => {}),
    // appointmentTypeOnClick: super.BASE_EXCUTE_NON_DATA(
    //   "appointmentTypeOnClick",
    //   () => {}
    // ),
    // scheduleOnClick: super.BASE_EXCUTE_NON_DATA("scheduleOnClick", () => {}),
    // appointmentOnClick: super.BASE_EXCUTE_NON_DATA(
    //   "appointmentOnClick",
    //   () => {}
    // ),

  useEffect(() => {
    setFI(-1)
    if (Taro.getEnv() === "WEAPP") {
      let windowHeight = wx.getSystemInfoSync().windowHeight;
      setView(windowHeight - 100 );//70
    }
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  const getClass = (count) => {
    //判断简介详情和收起的样式类
    // +'at-col at-col-6'
    let className = "";
    if (count >= maxTxt) className = styles.tTitle;
    if (isDetail) className = styles.tTitleD;
    return className;
  };

  return (
    <Root hashData={styles}>
      <GGCPS_TopBar
          mode="patientInfor"
          className=""
          patientInfor={patientinfor}
        />
        {/* <GGWhiteSpace />
        <GGWingBlank> */}
        <View className={styles.GGWhiteSpace}/>
        <View className={styles.GGWingBlank}>
          <View
            className={styles.docdetail_main}
            style={{ height: viewHeight }}
          >
            <View className={styles.firstcontainer}>
              {/* 第一部分 */}
              <View className="at-row">
                <View className="at-col at-col-3">
                  <Image
                    className={styles.icoImg}
                    style={{}}
                    src={userInfo.icon}
                    onClick={() => {
                      // super.BASE_MOD('drawboard/flw_ttest', '')
                    }}
                  />
                </View>
                <View className={styles.at9+" at-col at-col-9"}>
                  <View className={styles.nj+" at-row"}>
                    <View className={styles.docdetail_name}>
                      {userInfo.name}
                    </View>
                    <View className={styles.docdetail_job}>
                      {userInfo.job}
                    </View>
                    <AtButton
                      customStyle={{
                        color: notice ? "darkgray" : "",
                      }}
                      size="small"
                      onClick={() => {
                        // let i = 0;
                        // for (i; i <= 1; i++) {
                        //   if (swt[i].isActive) break;
                        // }
                        // let temp = swt;
                        // temp[0].isActive = !temp[0].isActive;
                        // temp[1].isActive = !temp[1].isActive;
                        // setSwitch(temp);
                        GPage.DoWXCall('noticeClick',swt[active_index],active_index)
                      }}
                    >
                      {swt[active_index].label}
                    </AtButton>
                  </View>
                  <View className="at-row">
                    <View className={styles.docdetail_tTitle}>
                      {userInfo.tTitle}
                    </View>
                  </View>
                </View>
              </View>

              {/* 第二部分 */}
              <View style={scheduleShow ? {} : { display: "none" }}>
                <Text>简介:</Text>
                <br></br>
                <View
                  className={getClass(
                    userInfo.briefIntro.length
                  )}
                >
                  &emsp;&emsp;{userInfo.briefIntro}
                  <View className={styles.docdetail_more}>
                    <View
                      className={styles.docdetail_more_text}
                      onClick={() => {
                        setIsDetail(!isDetail);
                      }}
                      style={{
                        display:
                          userInfo.briefIntro.length <
                          maxTxt
                            ? "none"
                            : "",
                      }}
                    >
                      {isDetail ? "收起" : "详情"}
                    </View>
                  </View>
                </View>
              </View>

              {/* 第三部分 */}
              <View
                style={scheduleShow ? {} : { display: "none" }}
                className={styles.sr}
              >
                <Text className={styles.web}>
                  互联网服务次数:{userInfo.serviceTime}
                </Text>
                <View style={{ display: "inline-flex" }}>
                  <AtRate max={1} value={1} />
                  <Text className="">
                    <Image src="" />
                    {userInfo.rate}
                  </Text>
                </View>
              </View>

              {/* 分割线 */}
              <AtDivider customStyle={{ height: "20px" }} content="" />

              {/* 周信息 */}
              <View
                style={!scheduleShow ? {} : { display: "none" }}
                className=""
              >
                {weekInfo.date}&nbsp;{weekInfo.week}&nbsp;
                {amOrpm === "am" ? "上午" : "下午"}
              </View>

              <View style={{ textAlign: "center" }}>
                <View className={styles.web} style={{ marginBottom: "10px" }}>
                  {scheduleShow ? "医生排班表" : ""}
                </View>
                <View className={"at-row"} style={{ textAlign: "center" }}>
                  <Text
                    className={styles.col1+" at-col"}
                    style={{ borderRadius: "8px 0 0 0" }}
                  >
                    {scheduleShow ? "日期" : "时间"}
                  </Text>
                  <Text className={styles.col2+" at-col"}>
                    {scheduleShow ? "上午" : "剩余号源"}
                  </Text>
                  <Text
                    className={styles.col2+" at-col"}
                    style={{ borderRadius: "0 8px 0 0" }}
                  >
                    {scheduleShow ? "下午" : "预约"}
                  </Text>
                </View>
                {scheduleShow
                  ? schedule.map((item, index) => {
                      // console.error(item.am);
                      return (
                        <View
                          className={"at-row"}
                          style={{ textAlign: "center" }}
                          key={index}
                        >
                          <Text
                            className={styles.col1+" at-col"}
                            style={
                              index === schedule.length - 1
                                ? {
                                    borderTop: "none",
                                    borderRadius: "0 0 0 8px",
                                  }
                                : { borderTop: "none" }
                            }
                          >
                            {item.date} {item.week}
                          </Text>

                          <View
                            className={styles.col2+" at-col"}
                            style={{ borderTop: "none" }}
                          >
                            {/* js 0默认为false，判读有无值需用hasOwnProperty */}
                            {item.hasOwnProperty("am") ? (
                              <AtButton
                              className={styles.main_color}
                                customStyle={
                                  item.am.st === 1
                                    ? { width: "82px", borderRadius: "13px" }
                                    : {
                                        width: "82px",
                                        borderRadius: "13px",
                                        backgroundColor: "bisque",
                                        color: "black",
                                      }
                                }
                                type={
                                  item.am.st === 1 ? "primary" : "secondary"
                                }
                                size="small"
                                disabled={item.am.st != 1}
                                onClick={() => {
                                  // console.log('此时状态为可选')
                                  setSS(!schedule)
                                  setSI(index)
                                  setAO('am')
                                  setWI(item)
                                  setFI(-1)
                                  
                                  GPage.DoWXCall('scheduleOnClick',item, index, "am")
                                }}
                              >
                                {item.am.st === 1 ? "可约(线上)" : "约满"}
                              </AtButton>
                            ) : (
                              ""
                            )}
                          </View>

                          <View
                            className={styles.col2+" at-col"}
                            style={
                              index === schedule.length - 1
                                ? {
                                    borderTop: "none",
                                    borderRadius: "0 0 8px 0",
                                  }
                                : { borderTop: "none" }
                            }
                          >
                            {item.hasOwnProperty("pm") ? (
                              <AtButton
                              className={styles.main_color}
                                customStyle={
                                  item.pm.st === 1
                                    ? { width: "82px", borderRadius: "13px" }
                                    : {
                                        width: "82px",
                                        borderRadius: "13px",
                                        backgroundColor: "bisque",
                                        color: "black",
                                      }
                                }
                                type={
                                  item.pm.st === 1 ? "primary" : "secondary"
                                }
                                size="small"
                                disabled={item.pm.st != 1}
                                onClick={() => {
                                  // console.log('此时状态为可选')
                                  setSS(!schedule)
                                  setSI(index)
                                  setAO('pm')
                                  setWI(item)
                                  setFI(-1)
                                  GPage.DoWXCall('scheduleOnClick',item, index, "pm")
                                }}
                              >
                                {item.pm.st === 1 ? "可约(线上)" : "约满"}
                              </AtButton>
                            ) : (
                              ""
                            )}
                          </View>
                        </View>
                      );
                    })
                  : // (amOrpm==='am'?
                    // (schedule[scheduleIndex].am.rest):(schedule[scheduleIndex].pm.rest)).map((item,index)=>{
                    // console.error(item.am);
                    rest.map((item, index) => {
                      return (
                        <View
                          className="at-row"
                          style={{ textAlign: "center" }}
                          key={index}
                        >
                          <Text
                            className={styles.col1+" at-col"}
                            style={
                              (
                                amOrpm === "am"
                                  ? index === rest.length - 1
                                  : index === rest.length - 1
                              )
                                ? {
                                    borderTop: "none",
                                    borderRadius: "0 0 0 8px",
                                  }
                                : { borderTop: "none" }
                            }
                          >
                            {timelist[index]}
                          </Text>

                          <View
                            className={styles.col2+" at-col"}
                            style={{ borderTop: "none" }}
                          >
                            {/* js 0默认为false，判读有无值需用hasOwnProperty */}
                            <View style={{}}>余&nbsp;{item}</View>
                          </View>

                          <View
                            className={styles.col2+" at-col"}
                            style={
                              (
                                amOrpm === "am"
                                  ? index === rest.length - 1
                                  : index === rest.length - 1
                              )
                                ? {
                                    borderTop: "none",
                                    borderRadius: "0 0 8px 0",
                                  }
                                : { borderTop: "none" }
                            }
                          >
                            {
                              <AtButton
                              className={styles.main_color}
                                customStyle={
                                  item != 0
                                    ? {
                                        width: "82px",
                                        border: "none",
                                        borderRadius: "13px",
                                        background:
                                          index === focusIndex
                                            ? "orange"
                                            : "",
                                      }
                                    : {
                                        width: "82px",
                                        borderRadius: "13px",
                                        background: "bisque",
                                        color: "black",
                                      }
                                }
                                type={item != 0 ? "primary" : "secondary"}
                                size="small"
                                disabled={item === 0}
                                onClick={() => {
                                  // console.log('此时状态为可选')
                                  setTI(index)
                                  setFI(index)

                                  GPage.DoWXCall('appointmentOnClick',index)
                                }}
                              >
                                {item != 0 ? "可约(线上)" : "约满"}
                              </AtButton>
                            }
                          </View>
                        </View>
                      );
                    })}
              </View>
            </View>

            <View
              style={!scheduleShow ? {} : { display: "none" }}
              className={styles.docdetail_back}
            >
              <AtButton
                type="primary"
                size="normal"
                className={styles.main_color}
                onClick={() => {
                  setSS(true)
                  setAMS(false)
                  setFI(-1)
                }}
              >
                返回上一步
              </AtButton>
            </View>

            <AtFloatLayout
              isOpened={appointmentShow}
              title={title}
              onClose={() => {
                setAMS(false);
                setFI(-1);
              }}
            >
              <View
                style={!appointmentShow ? { display: "none" } : {}}
                className={styles.firstcontainer}
              >
                <AtTabs
                  className={styles.menu_block}
                  current={0}
                  tabList={[{ title: "预约方式" }]}
                  onClick={() => {}}
                ></AtTabs>
                <View className={styles.appointmentTime}>
                  {weekInfo.date}&nbsp;&nbsp;
                  {weekInfo.week}&nbsp;&nbsp;
                  {amOrpm === "am" ? "上午" : "下午"}&nbsp;&nbsp;
                  {timelist[timeIndex]}
                </View>

                <View className={styles.appointmentType}>
                  {ConsultationList.map((item, index) => {
                    return (
                      <View
                        key={index}
                        className={styles.appointmentTypecontent}
                        onClick={() => {
                          GPage.DoWXCall('appointmentTypeOnClick',item, index)
                        }}
                      >
                        <Text>{item.text}</Text>
                        <Image
                          src={item.imgurl}
                          style={{
                            width: "40px",
                            height: "40px",
                            border: "",
                            margin: "15px",
                          }}
                        />
                        <AtButton
                        className={styles.main_color}
                          onClick={() => {
                            GPage.DoWXCall('appointmentTypeOnClick',item, index)
                          }}
                          type="primary"
                          size="small"
                          customStyle={{ width: "75px", borderRadius: "15px" }}
                        >
                          {item.money}
                        </AtButton>
                      </View>
                    );
                  })}
                </View>
              </View>
            </AtFloatLayout>
          </View>
        {/* </GGWingBlank> */}
        </View>
    </Root>
  );
}
