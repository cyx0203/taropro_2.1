import React, { useEffect, useState } from "react";
import { AtFloatLayout, AtIcon, AtTag } from "taro-ui";
import { View, WebView, Image, Text, Button } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "@/GGPageRoot";
import { Comp_Menu, Comp_Nav } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import { Comp_DateBar, Comp_Result } from "@/GGH5/ggcomplib";
import GridBtn from "@/GGH5/components/GridBtn";
import { has, hasIn, isEmpty } from "lodash";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_IH_selectDoctorTime_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.doctorObj],
        () => {
          setDoctorObj(nda.doctorObj);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.mainList],
        () => {
          console.log("🐏🐏", nda.mainList);
          let obj = { ...mainList };
          obj.title = nda.mainList.title;
          obj.dataList = nda.mainList.dataList;
          setMainList(obj);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.subList],
        () => {
          setSubList(nda.subList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  /**顶部横向日期选择数据 */
  const dateBar = {
    listData: GPage.Data.datebar && GPage.Data.datebar.listData /**数据列表 */,
    onItemClick: GPage.WXCall.dateOnClick /**点击事件 */,
    direction: "01" /**组件类型 */
  };
  /**医生信息 */
  const [doctorObj, setDoctorObj] = useState(GPage.Data.doctorObj);
  const [star, isStar] = useState(true);
  /**主列表 */
  const [mainList, setMainList] = useState(GPage.Data.mainList);
  /**副列表 */
  const [subList, setSubList] = useState(GPage.Data.subList);
  const [floatOpen, setFloatOpen] = useState(false);
  const [moreBtnShow, setMoreBtnShow] = useState(false);
  useEffect(() => {
    return () => {};
  }, []);
  //对应：onReady
  useReady(() => {
    // 判断该账户是否收藏该医生,设置初始值
    if (doctorObj && hasIn(doctorObj, "isStar")) {
      isStar(doctorObj.isStar);
    }
  });

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});
  return (
    <Root hashData={styles}>
      <View className={styles.selectDoctorTime}>
        {doctorObj && (
          <View className={styles.userinfo}>
            <Image src={doctorObj.img} className={styles.userPic} />
            {hasIn(doctorObj, "isStar") && (
              <View
                className={styles.starBtn}
                onClick={() => {
                  let current = !star;
                  isStar(current);
                  GPage.DoWXCall("focusOnClick", current);
                }}
              >
                <AtIcon
                  value={star ? "heart-2" : "heart"}
                  customStyle={{ marginRight: "3px" }}
                  size={15}
                />
                {star ? "已收藏" : "收藏"}
              </View>
            )}
            <View
              className={styles.infoContent}
              style={{ marginTop: !hasIn(doctorObj, "isStar") ? "28px" : "" }}
            >
              <Text className={styles.name}>{doctorObj.name}</Text>
              {hasIn(doctorObj, "subTitle") && (
                <Text className={styles.sub}>{doctorObj.subTitle}</Text>
              )}

              {!isEmpty(doctorObj.infoList) &&
                doctorObj.infoList.map((item, index) => {
                  return (
                    <View className={styles.infoItem} key={index}>
                      <Text className={styles.itemLabel}>{item.label}：</Text>
                      <Text className={styles.itemValue}>{item.value}</Text>
                    </View>
                  );
                })}
            </View>
          </View>
        )}

        <View className={styles.mainContent}>
          {GPage.Data.datebar && (
            <Comp_DateBar
              type="01"
              config={dateBar}
              className={styles.datebar}
            />
          )}
          {hasIn(mainList, "title") && mainList.title && (
            <Text className={styles.title}>{mainList.title}</Text>
          )}
          {mainList?.dataList &&
            mainList.dataList.length > 0 &&
            mainList.dataList.map((item, index) => {
              return (
                <View
                  className={`${styles.contentinfo} ${
                    index == mainList.dataList.length - 1 ? styles.noBorder : ""
                  }`}
                  key={index}
                >
                  <View className={styles.haoIinfo}>
                    <Text>{item.content1}</Text>
                    {hasIn(item, "content2") && item.content2 && (
                      <View
                        className={styles.content2}
                        dangerouslySetInnerHTML={{ __html: item.content2 }}
                      />
                    )}
                  </View>
                  {hasIn(item, "btn") && item.btn && (
                    <Button
                      className={styles.haoBtn}
                      type="primary"
                      onClick={() => {
                        subList && setFloatOpen(true);
                        console.log(mainList)
                        GPage.DoWXCall("mainDataOnClick", item, index);
                      }}
                    >
                      {item.btn}
                    </Button>
                  )}
                </View>
              );
            })}
          {GPage.Data.moreBtnText &&
            mainList.dataList &&
            mainList.dataList.length > 0 && (
              <View
                className={styles.footerBtn}
                onClick={() => {
                  GPage.DoWXCall("moreOnClick");
                  setMoreBtnShow(true);
                }}
                style={{ display: moreBtnShow ? "none" : "" }}
              >
                {GPage.Data.moreBtnText}
                <AtIcon value="chevron-down" size={15}></AtIcon>
              </View>
            )}
        </View>
        <AtFloatLayout isOpened={floatOpen} onClose={() => setFloatOpen(false)}>
          <View className={styles.header}>
            <View className={styles.floatTitle}>
              <Text className={styles.title}>{subList.title}</Text>
              {hasIn(subList, "subTitle") && (
                <Text className={styles.subtitle}>{subList.subTitle}</Text>
              )}
            </View>
          </View>
          <View className={styles.content}>
            {subList.dataList && subList.dataList.length > 0 ? (
              <View className={styles.btnListArea}>
                {subList.dataList.map((item, index) => {
                  return (
                    <View
                      className={`${styles.btnItem} ${
                        item.active ? styles.active : ""
                      } ${item.disabled ? styles.btnDisabled : ""}`}
                      key={index}
                      onClick={() => {
                        if (!item.disabled)
                          GPage.DoWXCall("subDataOnClick", item, index);
                      }}
                    >
                      {item.value}
                      {item?.active && (
                        <View className={styles.selected}>
                          <AtIcon
                            value="check"
                            color="#fff"
                            customStyle={{ fontSize: "10px" }}
                            className={styles.selectedIcon}
                          />
                        </View>
                      )}

                      {item.disabled && (
                        <View className={styles.masking_class}>无号</View>
                      )}
                    </View>
                  );
                })}
              </View>
            ) : (
              <View className={styles.result}>
                <Comp_Result
                  config={{ icon: "@empty", title: "未查询到记录" }}
                  type="01"
                />
              </View>
            )}
          </View>
        </AtFloatLayout>
      </View>
    </Root>
  );
}
