import React, { useEffect, useState } from "react";
import {
  AtTabs,
  AtTabsPane,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton
} from "taro-ui";
import { View, Image, Swiper, SwiperItem, Text } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "@/GGPageRoot";
import { Comp_Menu, Comp_Nav, Comp_UserInforCard } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_indexNew_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.adImg],
        () => {
          setAdImg(nda.adImg);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.bannerUrlList],
        () => {
          setBannerUrlList(nda.bannerUrlList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.mainMenu],
        () => {
          setMainMenu(nda.mainMenu);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.subMenu],
        () => {
          setSubMenu(nda.subMenu);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.menuTabData],
        () => {
          setMenuTabData(nda.menuTabData);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.pop],
        () => {
          setPop(nda.pop);
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
      GPage.SetState(
        [nda.userCard, nda.pop],
        () => {
          if (nda.userCard.isEmpty === "N") delete nda.userCard.empty;
          nda.userCard.pop = nda.pop;
          setUserCard(nda.userCard);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.tipsData],
        () => {
          settipsData(nda.tipsData);
          setTipsOpen(nda.tipsData.tipsOpen);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [adImg, setAdImg] = useState(GPage.Data.adImg);
  const [bannerUrlList, setBannerUrlList] = useState(GPage.Data.bannerUrlList);
  const [userCard, setUserCard] = useState(GPage.Data.userCard);
  const [pop, setPop] = useState(GPage.Data.pop);
  const [mainMenu, setMainMenu] = useState(GPage.Data.mainMenu);
  const [subMenu, setSubMenu] = useState(GPage.Data.subMenu);
  const [menuTabData, setMenuTabData] = useState(GPage.Data.menuTabData);
  const [bannerText, setBannerText] = useState(GPage.Data.bannerText);
  const [current, setCurrent] = useState(0);
  const changeCurrent = value => {
    setCurrent(value);
  };
  const [navData, setNavData] = useState({
    list: GPage.Data.navData,
    onClick: GPage.WXCall.navOnClick
  });
  // 提示文字数据
  const [tipsData, settipsData] = useState(GPage.Data.tipsData);
  // 提示文字弹框开关
  const [tipsOpen, setTipsOpen] = useState(GPage.Data.tipsData.tipsOpen);
  // 关闭提示弹框事件
  const closeTipsHandle = () => {
    setTipsOpen(false);
  };
  useEffect(() => {
    let dataObj = { ...userCard };
    if (dataObj.isEmpty === "N") delete dataObj.empty;
    dataObj.pop = pop;
    setUserCard(dataObj);
    console.log("$%##$", styles);

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
      <View className={styles.index}>
        <Image src={adImg} className={styles.ad_img} />
        <Comp_UserInforCard
          config={userCard}
          type="01"
          className={styles.userCard}
          onItemClick={(item, state) => {
            GPage.DoWXCall("userCardClick", item, state);
          }}
          onExtraClick={item => {
            GPage.DoWXCall("userQRCodeClick", item.pop);
          }}
        />
        <View className={styles.mainMenuArea}>
          {GPage.Map(
            mainMenu,
            (item: any, index: any) => {
              return (
                <Comp_Menu
                  config={item}
                  type="01"
                  onItemClick={() => {
                    GPage.DoWXCall("mainOnClick_large", item, index);
                  }}
                />
              );
            },
            ""
          )}
        </View>
        <View className={styles.subMenuArea}>
          {GPage.Map(
            subMenu,
            (item: any, index: any) => {
              return (
                <Comp_Menu
                  config={item}
                  type="02"
                  onItemClick={() => {
                    GPage.DoWXCall("mainOnClick_small", item, index);
                  }}
                />
              );
            },
            ""
          )}
        </View>
        <View className={styles.bannerImg}>
          <Swiper className={styles.swiper} autoplay>
            {GPage.Map(
              bannerUrlList,
              (item: any, index: any) => {
                return (
                  <SwiperItem
                    className={styles.swiperItem}
                    onClick={() => {
                      GPage.DoWXCall("bannerClick", item, index);
                    }}
                  >
                    <View style={{ position: "relative" }}>
                      <Image
                        src={item.img}
                        className={styles.banner}
                        mode="aspectFit"
                      />
                      <View
                        className={styles.bannerText}
                        dangerouslySetInnerHTML={{__html:bannerText}}
                      >
                      </View>
                    </View>
                  </SwiperItem>
                );
              },
              ""
            )}
          </Swiper>
        </View>
        <AtTabs
          current={current}
          tabList={menuTabData.tabs}
          onClick={value => {
            changeCurrent(value);
            GPage.DoWXCall("tabOnClick", menuTabData.tabs[value], value);
          }}
        >
          {GPage.Map(
            menuTabData.menuList,
            (item: any, index: any) => {
              return (
                <AtTabsPane current={current} index={index}>
                  <View className={styles.tabContent}>
                    {GPage.Map(
                      item,
                      (item1: any, index1: any) => {
                        return (
                          <Comp_Menu
                            config={item1}
                            type="02"
                            onItemClick={() => {
                              GPage.DoWXCall("menuOnClick", item1, index1);
                            }}
                            className={styles.item}
                          />
                        );
                      },
                      ""
                    )}
                  </View>
                </AtTabsPane>
              );
            },
            ""
          )}
        </AtTabs>
        <Comp_Nav config={navData} type={"normal"} className={styles.nav} />
        <AtModal isOpened={tipsOpen}>
          <AtModalHeader>{tipsData.content.title}</AtModalHeader>
          <AtModalContent>
            {tipsData &&
              tipsData.content.listData.length &&
              tipsData.content.listData.map((item, index) => {
                return (
                  <View className={styles.tipsItem}>
                    {index + 1}、{item}
                  </View>
                );
              })}
          </AtModalContent>
          <AtModalAction>
            <AtButton type="primary" onClick={closeTipsHandle}>
              {tipsData.btnText}
            </AtButton>
          </AtModalAction>
        </AtModal>
      </View>
    </Root>
  );
}
