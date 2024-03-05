import React, { useEffect, useRef, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
import GPage from "../../../../core/page";
const RES = GPage.param.resUrl;

//引入样式
import styles from "./style/index.module.scss";
var _ = require("lodash");
//TaroUI的组件
import {
  AtBadge,
  AtFloatLayout,
  AtIcon,
  AtModal,
  AtModalContent,
  AtButton,
  AtModalHeader
} from "taro-ui";
//原生组件
import {
  View,
  Swiper,
  SwiperItem,
  Image,
  Text,
  Button
} from "@tarojs/components";
//自定义组件
import { Comp_Nav, Comp_Result } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_THYYYDC_selectType_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.dateList],
        () => {
          setDateList(nda.dateList);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.bannerUrlList],
        () => {
          setBannerUrlList(nda.bannerUrlList);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.typeList],
        () => {
          setTypeList(nda.typeList);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.diningHallInfo],
        () => {
          setDiningHallInfo(nda.diningHallInfo);
        },
        () => {
          console.log("Fail");
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
  //定义state
  const [typeList, setTypeList] = useState(GPage.Data.typeList);
  const [bannerUrlList, setBannerUrlList] = useState(GPage.Data.bannerUrlList);
  const [dateList, setDateList] = useState(GPage.Data.dateList);
  const [modalOpen, setModalOpen] = useState(false);

  const [diningHallInfo, setDiningHallInfo] = useState(
    GPage.Data.diningHallInfo
  );
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

  return (
    <Root hashData={styles}>
      <View className={styles.selectType}>
        {/* 轮播图 */}
        <View className={styles.bannerImg}>
          <Swiper
            className={styles.swiper}
            autoplay
            indicatorDots
            indicatorActiveColor="#ffdc3a"
          >
            {GPage.Map(
              bannerUrlList,
              (item: any, index: any) => {
                return (
                  <SwiperItem
                    className={styles.swiperItem}
                    onClick={() => {
                      GPage.DoWXCall("bannerClick", item, index);
                    }}
                    style={{ width: "100%" }}
                    key={index}
                  >
                    <Image
                      src={item.img}
                      className={styles.banner}
                      mode="aspectFit"
                    />
                  </SwiperItem>
                );
              },
              ""
            )}
          </Swiper>
        </View>
        {/* 日期选择 */}
        {dateList && dateList.length > 0 ? (
          <View className={styles.dateSelectArea}>
            {dateList.map((dateItem, dateIndex) => {
              return (
                <View
                  key={dateIndex}
                  className={styles.dateItem}
                  onClick={() => {
                    GPage.DoWXCall("dateSelectClick", dateItem, dateIndex);
                  }}
                >
                  <View className={styles.week}>{dateItem.week}</View>
                  <View
                    className={styles.day}
                    style={{
                      backgroundColor: dateItem.active ? "#4facff" : "",
                      color: dateItem.active ? "#fff" : "#4facff"
                    }}
                  >
                    {dateItem.day}
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          ""
        )}
        {/* 类型选择 */}
        <View className={styles.selectTypeArea}>
          {typeList && typeList.length > 0
            ? typeList.map((typeItem, typeIndex) => {
                return (
                  <View className={styles.typeItem} key={typeIndex}>
                    <View className={styles.left}>
                      <View className={styles.title}>{typeItem.title}</View>
                      <View
                        className={styles.subTitle}
                        dangerouslySetInnerHTML={{ __html: typeItem.subTitle }}
                      ></View>
                    </View>
                    <AtButton
                      disabled={typeItem.btnDisable}
                      className={styles.btn}
                      onClick={() => {
                        GPage.DoWXCall("orderClick", typeItem, typeIndex);
                      }}
                    >
                      {typeItem.btn}
                    </AtButton>
                  </View>
                );
              })
            : ""}
        </View>
        <View className={styles.infoArea}>
          <View className={styles.infoTitle}>{diningHallInfo.title}</View>
          {diningHallInfo?.infoList.map((infoItem, infoIndex) => {
            return (
              <View className={styles.infoItem} key={infoIndex}>
                <Image src={infoItem.icon} className={styles.infoIcon} />
                <Text className={styles.infoTxt}>{infoItem.txt}</Text>
              </View>
            );
          })}
        </View>
        {GPage.Data.floatTxt && (
          <View
            className={styles.floatBtn}
            onClick={() => {
              if (!_.isEmpty(GPage.Data.changeList)) {
                setModalOpen(true);
              } else {
                GPage.DoWXCall("changeClick");
              }
            }}
          >
            <Image
              src={`${RES}/assets/icon/click.svg`}
              className={styles.clickImg}
            />
            <View className={styles.clickText}>{GPage.Data.floatTxt}</View>
          </View>
        )}

        {/* 底部导航 */}
        <Comp_Nav config={navData} type={"normal"} className={styles.nav} />
        <AtModal
          isOpened={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <View className={styles.modalHead}>
            <Image
              src={`${RES}/assets/img/modalHead.png`}
              className={styles.headImg}
            />
            <View className={styles.headContent}>
              <Image
                src={`${RES}/assets/icon/location.svg`}
                className={styles.location}
              />
              <Text>选择门店</Text>
            </View>
          </View>
          <View className={styles.modalContent}>
            {!_.isEmpty(GPage.Data.changeList) &&
              GPage.Data.changeList.map((item, index) => {
                return (
                  <View
                    key={index}
                    className={styles.shopItem}
                    onClick={() => {
                      GPage.DoWXCall("changeClick", item, index);
                    }}
                  >
                    <View className={styles.shopInfo}>
                      <View className={styles.name}>{item.name}</View>
                      <View className={styles.infoArea} style={{ margin: 0 }}>
                        {item.infoList.map((item, index) => {
                          return (
                            <View
                              className={styles.infoItem}
                              key={index}
                              style={{ margin: 0 }}
                            >
                              <Image
                                src={item.icon}
                                className={styles.infoIcon}
                              />
                              <Text className={styles.infoTxt}>{item.txt}</Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                    <AtIcon value="chevron-right" size={16} />
                  </View>
                );
              })}
          </View>
        </AtModal>
      </View>
    </Root>
  );
}
