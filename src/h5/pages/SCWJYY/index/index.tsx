import React, { useEffect, useState } from "react";
import { AtSearchBar } from "taro-ui";
import { View, Image } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from '../../../core/root';
import {
  Comp_Menu,
  Comp_Nav,
} from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_SCWJYY_index_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
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
        [nda.navData],
        () => {
          setNavData({
            list: nda.navData.list,
            onClick: GPage.WXCall.onDateClick
          });
        },
        () => {
          console.error("NDA设置出错");
        }
      );
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
        [nda.adImg],
        () => {
          setAdImg(nda.adImg);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.loginText],
        () => {
          setLoginText(nda.loginText);
        },
        () => {
          console.error("NDA设置出错");
        }
      );

    }
  });
  const [searchContent, setSearchContent] = useState("");
  const onSearchChange = value => {
    setSearchContent(value);
  };

  // 主菜单数据
  const [mainMenu, setMainMenu] = useState(GPage.Data.mainMenu);
  // 子菜单数据
  const [subMenu, setSubMenu] = useState(GPage.Data.subMenu);
  // 导航数据
  const [navData, setNavData] = useState({
    list: GPage.Data.navData,
    onClick: GPage.WXCall.navOnClick
  });
  const [adImg, setAdImg] = useState(GPage.Data.adImg)
  //搜索框默认文案
  const [searchPlaceholder, setSearchPlaceholder] = useState(GPage.Data.searchPlaceholder);
  const [loginText, setLoginText] = useState(GPage.Data.loginText)
  useEffect(() => {
    return () => { };
  }, []);

  //对应：onReady
  useReady(() => { });

  //对应：onShow
  useDidShow(() => { });

  //对应：onHide
  useDidHide(() => { });

  return (
    <Root hashData={styles}>
      <View className={styles.index}>
        <View className={styles.uppart} style={{
          paddingTop: GPage.Data.needSearch ? '0px' : '10px'
        }}>
          <View className={styles.header} style={{
            display: GPage.Data.needSearch ? 'flex' : 'none',
          }}>
            <View
              onClick={() => {
                GPage.DoWXCall('loginOnClick');
              }}
              className={styles.login}
            >
              {loginText}
            </View>
            <AtSearchBar
              placeholder={searchPlaceholder}
              value={searchContent}
              onChange={value => {
                onSearchChange(value);
              }}
              onActionClick={() => {
                GPage.WXCall.searchOnClick(searchContent);
              }}
            />
          </View>
          <Image src={adImg} className={styles.hosp_img} />
        </View>
        {/*主菜单区域*/}
        <View className={styles.subMenuArea}>
          {GPage.Map(
            mainMenu,
            (item: any, index: any) => {
              return (
                <Comp_Menu
                  config={item}
                  type="02"
                  className={styles.subMenu}
                  onItemClick={item => {
                    GPage.WXCall.mainOnClick(item, index);
                  }}
                />
              );
            },
            ""
          )}
        </View>
        <View className={styles.childMenuArea_main}>
          <View className={styles.childMenuArea_sub}>
            <View className={styles.childMenuArea}>
              {GPage.Map(
                subMenu,
                (item: any, index: any) => {
                  return (
                    <Comp_Menu
                      config={item}
                      type="02"
                      className={styles.childMenu}
                      onItemClick={item => {
                        GPage.WXCall.subOnClick(item, index);
                      }}
                    />
                  );
                },
                ""
              )}
            </View>
          </View>
        </View>
        {/*底部导航区域*/}
        <Comp_Nav config={navData} type={"normal"} className={styles.nav} />
      </View>
    </Root>
  );
}
