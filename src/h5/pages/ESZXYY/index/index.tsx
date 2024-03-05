import React, { useEffect, useState } from "react";
import {
  AtTabs,
  AtTabsPane,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton,
  AtIcon
} from "taro-ui";
import { View, Image, Swiper, SwiperItem, Text } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "@/GGPageRoot";
import { Comp_Menu, Comp_Nav } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_ESZXYY_index_index",
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
        [nda.bannerUrl],
        () => {
          setbannerUrl(nda.bannerUrl);
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
        [nda.menuTabData],
        () => {
          setMenuTabData(nda.menuTabData);
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
        [nda.userCard],
        () => {
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
      GPage.SetState(
        [nda.assets],
        () => {
          setAssets(nda.assets);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [assets, setAssets] = useState(GPage.Data.assets);
  const [adImg, setAdImg] = useState(GPage.Data.adImg);
  const [bannerUrl, setbannerUrl] = useState(GPage.Data.bannerUrl);
  const [userCard, setUserCard] = useState(GPage.Data.userCard);
  const [mainMenu, setMainMenu] = useState(GPage.Data.mainMenu);
  const [menuTabData, setMenuTabData] = useState(GPage.Data.menuTabData);
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
    GPage.DoWXCall('modalConfirm')
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
    <Root hashData={styles}>
      <View className={styles.index}>
        <Image src={adImg} className={styles.ad_img} />
        <View className={styles.contentMain}>
          <View className={styles.userCardArea}>
            <Image src={assets.bg1} className={styles.userCardBg} />
            <View className={styles.userInfoArea}>
              {userCard.isEmpty === "N" ? (
                <View className={styles.userInfo}>
                  <View className={styles.infoLeft}>
                    <View className={styles.firstLine}>
                      <View className={styles.name}>{userCard.user.name}</View>
                      <View
                        className={styles.changeBtn}
                        onClick={() => {
                          GPage.DoWXCall("changeUserClick");
                        }}
                      >
                        切换
                        <AtIcon value="chevron-right"></AtIcon>
                      </View>
                    </View>
                    <View className={styles.secondLine}>
                      {userCard.user.number}
                    </View>
                    <View className={styles.thirdLine}>{userCard.title}</View>
                  </View>
                  <View className={styles.qrBox}>
                    <Image
                      className={styles.qrcodeImg}
                      src={assets.qrcode}
                      onClick={() => {
                        GPage.DoWXCall("userQRCodeClick");
                      }}
                    ></Image>
                    <Text className={styles.qrText}>点击扫码</Text>
                  </View>
                </View>
              ) : (
                <View
                  className={styles.EmptyArea}
                  onClick={() => {
                    GPage.DoWXCall("addUserClick");
                  }}
                >
                  <Image
                    src={userCard.empty.icon}
                    className={styles.emptyImg}
                  />
                  <View className={styles.emptyText}>{userCard.empty.msg}</View>
                </View>
              )}
            </View>
          </View>
          <View className={styles.mainMenuArea}>
            {GPage.Map(
              mainMenu,
              (item: any, index: any) => {
                return (
                  <Comp_Menu
                    className={styles.mainMenuItem}
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
          {bannerUrl && (
            <View className={styles.bannerImg}>
              <Image
                src={bannerUrl}
                className={styles.Img}
                onClick={() => {
                  GPage.DoWXCall("bannerClick");
                }}
              />
            </View>
          )}

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
                    <View className={styles.btnMask}></View>
                  </AtTabsPane>
                );
              },
              ""
            )}
          </AtTabs>
        </View>
        <Comp_Nav config={navData} type={"normal"} className={styles.nav} />
        <AtModal isOpened={tipsOpen}>
          <AtModalHeader>{tipsData.content.title}</AtModalHeader>
          <AtModalContent>
            <View
              dangerouslySetInnerHTML={{ __html: tipsData.content.txtData }}
            ></View>
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
