import React, { useEffect, useState } from "react";
import { View, Image, Text, Button } from "@tarojs/components";

import {
  AtTabs,
  AtTabsPane,
  AtList,
  AtListItem,
  AtIcon,
  AtFloatLayout,
  AtButton,
  AtInput,
} from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import {
  Comp_CardList,
  Comp_Result,
  Comp_UserInforCard,
  Comp_Table
} from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGH5/core/root";
import styles from "./style/index.module.scss";

import GPage from "../../../../core/page";

const RES = GPage.param.test3Url;

const img1 = `${RES}/assets/img/gglogo.png`;
const bgImg = `${RES}/assets/img/bg.png`;
const img3 = `${RES}/assets/icon/message.svg`
const img4 = `${RES}/assets/icon/menu_1_1.svg`
const img5 = `${RES}/assets/icon/menu_1_2.svg`
const img6 = `${RES}/assets/icon/menu_1_3.svg`
const img7 = `${RES}/assets/icon/menu_1_4.svg`

const noticeImg = `${RES}/assets/img/notice.png`
const img8 = `${RES}/assets/img/headPic.png`
const img9 = `${RES}/assets/img/qrCode_black.png`
const img10 = `${RES}/assets/icon/daohang.svg`
const img11 = `${RES}/assets/icon/louceng.svg`

const menu_2_1 = `${RES}/assets/icon/menu_2_1.svg`
const menu_2_2 = `${RES}/assets/icon/menu_2_2.svg`
const menu_2_3 = `${RES}/assets/icon/menu_2_3.svg`
const menu_2_4 = `${RES}/assets/icon/menu_2_4.svg`
const menu_2_5 = `${RES}/assets/icon/menu_2_5.svg`
const menu_3_1 = `${RES}/assets/icon/menu_3_1.svg`
const menu_3_2 = `${RES}/assets/icon/menu_3_2.svg`
const menu_3_3 = `${RES}/assets/icon/menu_3_3.svg`
const menu_3_4 = `${RES}/assets/icon/menu_3_4.svg`

const menu_2List = [
  {name: '我的挂号',img: menu_2_1},
  {name: '就诊人管理',img: menu_2_2},
  {name: '缴费查询',img: menu_2_3},
  {name: '报告查询',img: menu_2_4},
  {name: '医技预约',img: menu_2_5},
];

const menu_3List = [
  {name: '医院介绍',img: menu_3_1},
  {name: '科室介绍',img: menu_3_2},
  {name: '医生介绍',img: menu_3_3},
  {name: '满意度调查',img: menu_3_4},
];



const List = [{title: '门诊服务'}, {title: '门诊服务'}, {title: '门诊服务'}]

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_demo_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.examineArea],
        () => {
          setExamineArea(nda.examineArea);
          if (nda.examineArea.hasOwnProperty("emptyTips")) {
            let obj = {...resultData};
            obj.title = nda.examineArea.emptyTips;
            setResultData(obj);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.checkoutArea],
        () => {
          setCheckoutArea(nda.checkoutArea);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.tabList],
        () => {
          setTabList(nda.tabList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.dateSelector],
        () => {
          setdateSelector(nda.dateSelector);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.userCard],
        () => {
          if (nda.userCard) {
            nda.userCard.pop = {
              isShow: false
            };
            setUserCard(nda.userCard);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.warmTips],
        () => {
          setWarmTips(nda.warmTips);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.dateSelector],
        () => {
          setdateSelector(nda.dateSelector);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.detailsArea],
        () => {
          setdetailsArea(nda.detailsArea);
          if (nda.detailsArea.hasOwnProperty("emptyTips")) {
            let obj = {...resultData};
            obj.title = nda.detailsArea.emptyTips;
            setResultData1(obj);
          }
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [detailsArea, setdetailsArea] = useState(GPage.Data.detailsArea);
  const [userCard, setUserCard] = useState(GPage.Data.userCard);
  const [examineArea, setExamineArea] = useState(GPage.Data.examineArea);
  const [checkoutArea, setCheckoutArea] = useState(GPage.Data.checkoutArea);
  const [tabList, setTabList] = useState(GPage.Data.tabList);
  const [current, setCurrent] = useState(0);
  const changeTab = value => {
    setCurrent(value);
  };
  const [dateSelector, setdateSelector] = useState(GPage.Data.dateSelector);
  const onStartTimeChange = e => {
    let obj = {...dateSelector};
    obj.startDate = e.detail.value;
    setdateSelector(obj);
    GPage.DoWXCall("onDateClick", "startTime", e.detail.value);
  };
  const onEndTimeChange = e => {
    let obj = {...dateSelector};
    obj.endDate = e.detail.value;
    setdateSelector(obj);
    GPage.DoWXCall("onDateClick", "endTime", e.detail.value);
  };
  const [warmTips, setWarmTips] = useState(GPage.Data.warmTips);
  const [resultData, setResultData] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  const [resultData1, setResultData1] = useState({
    icon: "@empty",
    title: "未查询到记录"
  });
  const [floatOpen, setFloatOpen] = useState(false);


  const [searchVal, setSearchVal] = useState('');


  useEffect(() => {
    if (examineArea && examineArea.hasOwnProperty("emptyTips")) {
      let obj = {...resultData};
      obj.title = examineArea.emptyTips;
      setResultData(obj);
    }
    if (detailsArea && detailsArea.hasOwnProperty("emptyTips")) {
      let obj = {...resultData};
      obj.title = detailsArea.emptyTips;
      setResultData1(obj);
    }
    if (userCard) {
      let obj = userCard;
      obj.pop = {
        isShow: false
      };
      setUserCard(obj);
    }

    return () => {
    };
  }, []);

  //对应：onReady
  useReady(() => {
  });

  //对应：onShow
  useDidShow(() => {
  });

  //对应：onHide
  useDidHide(() => {
  });


  const handleChange = (val) => {
    // console.log('change',val)
  }

  const handleClick = (val) => {
    setCurrent(val);
  }

  return (
    <Root hashData={styles}>
      <View className={styles.demo}>
        <View className={styles.top}>
          <Image className={styles.bgImg} src={bgImg} mode="widthFix"></Image>
          <Image className={styles.img1} src={img1}></Image>
          <Text className={styles.textClass}>江苏国光</Text>
          <View className={styles.search_class}>
            <AtInput
              className={styles.search_input}
              name='value'
              title=''
              type='text'
              placeholder='搜医生'
              value={searchVal}
              onChange={handleChange}
            >
              <AtButton type='primary' className={styles.searchButton}>搜索</AtButton>

            </AtInput>
            <AtIcon
              className={styles.searchIcon}
              value='search'
              size='30'
              color='gray'
            ></AtIcon>
            <Image className={styles.kefu} src={img3}></Image>
          </View>

          <View className={styles.functionArea}>
            <View className={styles.item}>
              <View className={styles.item_a}>
                <Image className={styles.image} src={img4}></Image>
              </View>
              <View className={styles.item_b}>候诊服务</View>
            </View>
            <View className={styles.item}>
              <View className={styles.item_a}>
                <Image className={styles.image} src={img5}></Image>
              </View>
              <View className={styles.item_b}>门诊缴费</View>
            </View>
            <View className={styles.item}>
              <View className={styles.item_a}>
                <Image className={styles.image} src={img6}></Image>
              </View>
              <View className={styles.item_b}>预约挂号</View>
            </View>
            <View className={styles.item}>
              <View className={styles.item_a}>
                <Image className={styles.image} src={img7}></Image>
              </View>
              <View className={styles.item_b}>自助核酸</View>
            </View>
          </View>
        </View>

        <View className={styles.userInfoClass}>
          <View className={styles.userInfoClass_left}>
            <Image src={img8} className={styles.image}></Image>
          </View>
          <View className={styles.userInfoClass_middle}>
            <View className={styles.userInfoClass_middle_a}>
              <View className={styles.name}>张晓明</View>
              <View className={styles.btn}>切换就诊卡</View>
            </View>
            <View className={styles.userInfoClass_middle_b}>
              就诊卡：123456
            </View>

          </View>
          <View className={styles.userInfoClass_right}>
            <Image src={img9} className={styles.image}></Image>
            <View className={styles.text}>点击放大</View>
          </View>
        </View>

        <View className={styles.noticeClass}>
          <Image src={noticeImg} className={styles.noticeBtn}></Image>

          <Text className={styles.detailClass}>查看详情 {`>`} </Text>

          <View className={styles.title2}>
            2023年3月9日 周三 09:00~11:00就诊
          </View>

          <View className={styles.title3}>耳鼻咽喉科门诊</View>

          <View className={styles.foot}>
            <View className={styles.foot_left}>
              <View className={styles.btn}>门诊专家号</View>
              <View className={styles.btn}>上午</View>
            </View>
            <View className={styles.foot_right}>
              <View className={styles.item}>
                <Image src={img10} className={styles.image}></Image>
                <Text className={styles.text}>来院导航</Text>
              </View>
              <View className={styles.item}>
                <Image src={img11} className={styles.image}></Image>
                <Text className={styles.text}>楼层分布</Text>
              </View>
            </View>
          </View>
        </View>

        <View className={styles.hospitalInfoClass}>
          <AtTabs current={current} tabList={List} onClick={handleClick}>
            <AtTabsPane current={current} index={0}>
              <View className={styles.body}>
                {
                  menu_2List.map(t => t).map((t, i) => {
                    return (
                      <View className={styles.item}>
                        <View className={styles.item_a}>
                          <Image src={t.img} className={styles.image}></Image>
                        </View>
                        <View className={styles.item_b}>{t.name}</View>
                      </View>
                    )
                  })
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={current} index={1}>
              222
            </AtTabsPane>
            <AtTabsPane current={current} index={2}>
              333
            </AtTabsPane>
          </AtTabs>

        </View>

        <View className={styles.hospitalInfoClass}>
          <View className={styles.title}>医院信息</View>
          <View className={styles.body}>
            {
              menu_3List.map(t => t).map((t, i) => {
                return (
                  <View className={styles.item}>
                    <View className={styles.item_a}>
                      <Image src={t.img} className={styles.image}></Image>
                    </View>
                    <View className={styles.item_b}>{t.name}</View>
                  </View>
                )
              })
            }
          </View>
        </View>


      </View>
    </Root>
  );
}
