import React, { useEffect, useState } from "react";
import { View, Image, Text, Swiper, SwiperItem } from "@tarojs/components";
import Taro from '@tarojs/taro';
import { AtTag, AtAvatar, AtList, AtListItem, AtFloatLayout, AtButton, AtTabBar, AtSearchBar, AtTabs, AtTabsPane, AtGrid, AtForm, AtInput } from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Barcode, QRCode } from 'taro-code'
import { GGCPS_NavBar } from "@/GGCPS";
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
    pageName: "h5_pages_IH_index_index4_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      console.log('NDA');
      console.log(nda);
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.robot],
        () => {
          setRobot(nda.robot)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.cRobotTip],
        () => {
          setCRobotTip(nda.cRobotTip)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.userPanel],
        () => {
          setUserPanel(nda.userPanel)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.noticMore],
        () => {
          setNoticMore(nda.noticMore)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.lv3_menu_list],
        () => {
          setL3ML(nda.lv3_menu_list)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.lv3_menu_tab],
        () => {
          setL3MT(nda.lv3_menu_tab)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.lv2_menu_list],
        () => {
          setL2ML(nda.lv2_menu_list)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.lv2_menu_tab],
        () => {
          setL2MT(nda.lv2_menu_tab)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.lv2_index],
        () => {
          setL2I(nda.lv2_index)
        },
        () => {
          console.error("NDA设置出错");
        }
      );

      GPage.SetState(
        [nda.lv3_index],
        () => {
          setL3I(nda.lv3_index)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.bannerList],
        () => {
          setBannerList(nda.bannerList)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.noticList],
        () => {
          setNoticList(nda.noticList)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.lv1_menu_list],
        () => {
          setL1ML(nda.lv1_menu_list)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.searchValue],
        () => {
          setSearchValue(nda.searchValue)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.tabNav],
        () => {
          setTabNav(nda.tabNav)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.navIndex],
        () => {
          setNavIndex(nda.navIndex)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.inforPanelShow],
        () => {
          setInforPanelShow(nda.inforPanelShow)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.editState],
        () => {
          setEditState(nda.editState)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.inputValue],
        () => {
          setInputValue(nda.inputValue)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.search],
        () => {
          setSearch(nda.search)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.userinfor],
        () => {
          setUserinfor(nda.userinfor)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.userExtra],
        () => {
          setUserExtra(nda.userExtra)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });

  const [viewHeight, setView] = useState(1080);
  const [robot, setRobot] = useState(GPage.Data.robot)
  const [cRobotTip, setCRobotTip] = useState(GPage.Data.cRobotTip)
  const [userPanel, setUserPanel] = useState(GPage.Data.userPanel)
  const [noticMore, setNoticMore] = useState(GPage.Data.noticMore)
  const [lv3_menu_list, setL3ML] = useState(GPage.Data.lv3_menu_list)
  const [lv3_menu_tab, setL3MT] = useState(GPage.Data.lv3_menu_tab)
  const [lv2_menu_list, setL2ML] = useState(GPage.Data.lv2_menu_list)
  const [lv2_menu_tab, setL2MT] = useState(GPage.Data.lv2_menu_tab)
  const [lv2_index, setL2I] = useState(0)
  const [lv3_index, setL3I] = useState(0)
  const [bannerList, setBannerList] = useState(GPage.Data.bannerList)
  const [noticList, setNoticList] = useState(GPage.Data.noticList)
  const [lv1_menu_list, setL1ML] = useState(GPage.Data.lv1_menu_list)
  const [searchValue, setSearchValue] = useState('')
  const [tabNav, setTabNav] = useState(GPage.Data.tabNav)
  const [navIndex, setNavIndex] = useState(0)
  const [inforPanelShow, setInforPanelShow] = useState(false)
  const [editState, setEditState] = useState(false)
  const [inputValue, setInputValue] = useState([])
  const [search, setSearch] = useState(GPage.Data.search)
  const [userinfor, setUserinfor] = useState(GPage.Data.userinfor)
  const [userExtra, setUserExtra] = useState(GPage.Data.userExtra)


  useEffect(() => {
    if (Taro.getEnv() === "WEAPP") {
      let windowHeight = wx.getSystemInfoSync().windowHeight;
      setView(windowHeight - 100);//70
    }
    return () => { };
  }, []);

  //对应：onReady
  useReady(() => { });

  //对应：onShow
  useDidShow(() => { });

  //对应：onHide
  useDidHide(() => { });

  const handleChangeInput = (value, e, index) => {
    // console.log('index为:'+index)
    let val = e.target.value;
    let tempList = userPanel
    tempList.inforList[index].value = val
    setUserPanel(tempList)
    // this.setState({
    //   userPanel:tempList
    // })
  }

  const getDefaultSelected = (dt) => {
    let index = 0;
    for (let i = 0; i < dt.length; i++) {
      if (dt[i] && dt[i].hasOwnProperty('selected') && dt[i].selected) {
        index = i;
        break;
      }
    }
    return index;
  }

  return (
    <Root hashData={styles}>
      {/* <GGWingBlank> */}
      <View className={styles.index4_main} style={{ height: viewHeight }}>
        {/* 顶部背景 */}
        {/* <Image src={topbg} className='index3-topbg' mode='aspectFill' /> */}
        {/* 顶部背景颜色 */}
        <View className={styles.index4_topbg_pure_color}></View>

        {/* 用户顶部BAR,搜索那一行 */}
        <View className={styles.index4_userbar}>
          {/* 用户信息区域 */}
          <View className={styles.index4_userinfor} onClick={() => {
            // let func = userinfor.onClick;
            // if (func) func();
            GPage.DoWXCall('userinfor_onClick')
          }}>
            <Image src={userinfor.icon} className={styles.index4_userinfor_img} />
            <Text className={styles.index4_userinfor_text}>{userinfor.name}</Text>
          </View>
          {/* 用户搜索区域 */}
          <AtSearchBar
            className={styles.index4_user_search}
            placeholder={search.defaultText}
            actionName='搜索'
            value={searchValue}
            onChange={(value) => {
              setSearchValue(value)
            }}
            onActionClick={() => {
              // let func = search.onClick;
              // if (func) func(searchValue);
              GPage.DoWXCall('search_onClick', searchValue)
              setSearchValue('')
            }}
          />
          {/* 用户额外功能区 */}
          <Image src={userExtra.icon} className={styles.index4_user_extra} onClick={() => {
            // this.setState({ inforPanelShow: true });
            // let func = userExtra.onClick; 
            // if (func) func(userExtra.icon);

            GPage.DoWXCall('userExtra_onClick', userExtra.icon)
          }}
          />
        </View>

        {/* 图片那行 */}
        <View className={styles.index4_banner_block}>
          <View className='at-row'>
            
          <View className='at-col at-col-5'>
              {
                lv1_menu_list ? lv1_menu_list.slice(2).map((item, index) => {
                  return (
                    <View onClick={() => {
                      GPage.DoWXCall('lv1_menu_list_onClick', item, index)
                    }} key={index} className={styles.index4_banner_3} style={{ backgroundSize: 'cover', backgroundImage: 'url(' + item.backimg + ')' }}>
                      <View style={{ position: 'relative', top: '15%' }}>
                        <Text className={'at-row ' + styles.index4_banner_3_main_text}>{item.title}</Text>
                        <Text className={'at-row ' + styles.index4_banner_3_sub_text}>{item.subTitle}</Text>
                      </View>
                    </View>
                    // <Image className='index4-banner-3'
                    //   src={item.backimg}
                    //   key={index}
                    //   onClick={() => {
                    // let func = bannerListOnClick;
                    // if (func) func(item, index);
                    //   }}
                    // />
                  )
                }) : ''
              }
            </View>

            <View className='at-col at-col-7'>
              {
                lv1_menu_list ? lv1_menu_list.slice(0, 2).map((item, index) => {
                  return (
                    <View onClick={() => {
                      GPage.DoWXCall('lv1_menu_list_onClick', item, index)
                    }} key={index} className={styles.index4_banner} style={{ backgroundSize: 'cover', backgroundImage: 'url(' + item.backimg + ')' }}>
                      <View style={{ position: 'relative', left: '15%' }}>
                        <Text className={'at-row ' + styles.index4_banner_main_text} >{item.title}</Text>
                        <Text className={'at-row ' + styles.index4_banner_sub_text}>{item.subTitle}</Text>
                      </View>
                    </View>
                    // {/* <Image className='index4-banner'
                    //   key={index}
                    //   src={item}
                    //   onClick={() => {
                    //     let func = bannerListOnClick;
                    //     if (func) func(item, index);
                    //   }}
                    // /> */}
                  )
                }) : ''
              }
            </View>
            
          </View>
        </View>

        {/* 门诊住院菜单栏1 */}
        <View className={styles.index4_lv2_menu_block}>
          <AtTabs
            current={lv2_index}
            scroll
            tabList={lv2_menu_tab}
            onClick={(value) => { setL2I(value) }}
          >
            {
              lv2_menu_list.map((item, index) => {
                return <AtTabsPane current={lv2_index} index={index} key={index}>
                  <View className={styles.index4_lv2_menu_tabcontainer}>
                    <AtGrid data={item} columnNum={4} hasBorder={false} onClick={(item, index) => {
                      GPage.DoWXCall('lv2_menu_list_onClick', item, lv2_index, index)
                    }}
                    />
                  </View>
                </AtTabsPane>
              })
            }
          </AtTabs>
        </View>

        {/* 门诊住院菜单栏2 */}
        <View className={styles.index4_lv3_menu_block}>
          <AtTabs
            current={lv3_index}
            scroll
            tabList={lv3_menu_tab}
            onClick={(value) => { setL3I(value) }}
          >
            {
              lv3_menu_list.map((item, index) => {
                return <AtTabsPane current={lv3_index} index={index} key={index}>
                  <View className={styles.index4_lv3_menu_tabcontainer}>
                    <AtGrid data={item} columnNum={4} hasBorder={false} onClick={(item, index) => {
                      GPage.DoWXCall('lv3_menu_list_onClick', item, lv3_index, index)
                    }}
                    />
                  </View>
                </AtTabsPane>
              })
            }
          </AtTabs>
        </View>

        {
          (robot && robot.open) ? <View className={styles.index4_robot}>
            <AtAvatar image={robot.icon} circle className={styles.index4_robot_img}></AtAvatar>
            <AtTag size='small' className={styles.index4_robot_tip}>{cRobotTip}</AtTag>
          </View> : ''
        }

        {/* 底部首页和个人中心 */}
        {
          tabNav ?
            <GGCPS_NavBar tabNav={tabNav} tabNavClick={(item, index) =>
              GPage.DoWXCall('tabNavClick', item, index)} />
            // ""
            : ""
          // <AtTabBar
          //   className='index4-tabnav'
          //   fixed
          //   backgroundColor='#fff'
          //   color='#545454'
          //   tabList={tabNav}
          //   onClick={(index) => {
          //     this.setState({ navIndex: index }, () => {
          //       let func = tabNavClick;
          //       if (func) func(tabNav[index], index);
          //     });

          //     // let func = tabNavClick;
          //     // if (func) func(tabNav[index], index);
          //     // Taro.navigateTo({
          //     //   url: '../../usercenter/usercenter2/index'
          //     // })
          //   }}
          //   current={navIndex}
          // />
        }


        {/* 用户信息面板（用户信息+二维码+条码） */}
        {
          userPanel ? <AtFloatLayout isOpened={inforPanelShow}
            title={userPanel ? userPanel.title : ''}
            onClose={() => {
              setInforPanelShow(false)
            }}
          >
            <View className={styles.index4_inforPanel}>
              <View className={styles.index4_inforPanel_qrcode}>
                <QRCode
                  text={userPanel ? userPanel.qrcode : ''}
                  size={150}
                  scale={4}
                  errorCorrectLevel='M'
                  typeNumber={2}
                />
              </View>

              <View className={styles.index4_inforPanel_barcode}>
                <Barcode text={userPanel ? userPanel.barcode : ''} width={300} height={60} scale={4} />
                <Text>{userPanel ? userPanel.barcode : ''}</Text>
              </View>
            </View>
            <View>
              <AtList>
                {
                  (userPanel && userPanel.inforList) ? userPanel.inforList.map((item, index) => {
                    return !editState ?
                      (<View className={styles.index4_inforPanel_item_bar}>
                        <AtListItem title={item.title} extraText={item.value} className={styles.index4_inforPanel_item} />
                        {
                          item.extra ? <AtButton type='primary' size='small' onClick={() => {
                            setEditState(!editState)
                            // let func = item.extra.onClick;
                            // if (func) func(item);

                            GPage.DoWXCall('item_extra_onClick', item)
                          }}>{item.extra.text}</AtButton> : ''
                        }
                      </View>)
                      : <View className={styles.index4_inforPanel_item_bar}>
                        <AtInput
                          className={styles.index4_inforPanel_item}
                          name={item.value}
                          title={item.title}
                          type='text'
                          placeholder='请输入修改信息'
                          value={item.value}
                          onChange={(value, e) => handleChangeInput(value, e, index)} />
                        {
                          item.extra ? <AtButton type='primary' size='small' onClick={() => {
                            // let func = item.extra.onClick;
                            // if (func) func(item, editState);

                            GPage.DoWXCall('item_extra_onClick', item)
                            setEditState(!editState)
                          }}
                          >{!editState ? item.extra.text : item.extra.text2}</AtButton> : ''
                        }
                      </View>
                  }) : ''
                }
              </AtList>
            </View>
            {/* <View style={{display:!userPanel.editState?'none':''}}>
                <AtForm>
                  {
                    (userPanel && userPanel.inforList) ? userPanel.inforList.map((item, index) => {
                      return <View className='index4-inforPanel-item-bar'>
                        <AtListItem title={item.title} extraText={item.value} className={'index4-inforPanel-item'} />
                        {
                          item.extra ? <AtButton type='primary' size='small' onClick={() => {
                            let func = item.extra.onClick;
                            if (func) func(item);
                          }}>{item.extra.text}</AtButton> : ''
                        }
                      </View>
                    }) : ''
                  }
                </AtForm>
            </View> */}
            {/* <AtButton loading type='primary'>按钮文案</AtButton> */}
          </AtFloatLayout> : ''
        }


        <View className={styles.index4_banner2_block}>
          <Swiper
            className={styles.SwiperStyle}
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay>
            {/* <SwiperItem>
            <View className=''>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className=''>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className=''>3</View>
          </SwiperItem> */}

            {
              bannerList ? bannerList.map((item, index) => {
                return (
                  <SwiperItem key={index}>
                    <View className=''>
                      <Image className={styles.index4_banner2}
                        src={item} onClick={() => {
                          GPage.DoWXCall('bannerListOnClick', item, index)
                        }}
                      />
                    </View>
                  </SwiperItem>
                )
              }) : ''
            }
          </Swiper>
        </View>

      </View>
      {/* </GGWingBlank> */}
    </Root>
  );
}
