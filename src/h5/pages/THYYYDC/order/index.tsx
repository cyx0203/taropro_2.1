import React, { useEffect, useRef, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
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
  AtSearchBar
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
import { isArray } from "lodash";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_THYYYDC_order_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.timeQuantumList],
        () => {
          setTimeQuantumList(nda.timeQuantumList);
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
        [nda.commodityList],
        () => {
          setCommodityList(nda.commodityList);
          let selectArr = [...selectTypeArr];
          for (let i = 0; i < selectArr.length; i++) {
            selectArr[i] = false;
          }
          selectArr[0] = true;
          setSelecTypeArr(selectArr);
          setCurrentIndex(0);
          setCurrentComCList(nda.commodityList[0].content);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.currentComCList],
        () => {
          setCurrentComCList(nda.currentComCList);
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
      GPage.SetState(
        [nda.resultData],
        () => {
          setResultData(nda.resultData);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.packData],
        () => {
          setPackData(nda.packData);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.dateIsShow],
        () => {
          setDateIsShow(nda.dateIsShow);
        },
        () => {
          console.log("Fail");
        }
      );
    }
  });
  //定义state
  const plusBtn = useRef();
  const [packData, setPackData] = useState(GPage.Data.packData);
  const maxNumber = 99;
  const [selectTypeArr, setSelecTypeArr] = useState([]);
  const [currentTypeIndex, setCurrentIndex] = useState(
    0
  ); /**左侧商品类型下标 */
  const [resultData, setResultData] = useState(GPage.Data.resultData);
  const [currentComItem, setCurrentComItem] = useState<any>();
  const [currentComIndex, setCurrentComIndex] = useState<any>();
  const [modalOpen, setModalOpen] = useState(false);
  const [floatOpen, setFloatOpen] = useState(false);
  const [currentSelectComCList, setCurrentSelectComCList] = useState([]);
  const [currentComCList, setCurrentComCList] = useState<any>();
  const [currentDate, setCurrentDate] = useState<any>();
  const [timeQuantumList, setTimeQuantumList] = useState(
    GPage.Data.timeQuantumList
  );
  const [dateIsShow, setDateIsShow] = useState(GPage.Data.dateIsShow);
  const [commodityList, setCommodityList] = useState(GPage.Data.commodityList);
  const [bannerUrlList, setBannerUrlList] = useState(GPage.Data.bannerUrlList);
  const [navData, setNavData] = useState({
    list: GPage.Data.navData,
    onClick: GPage.WXCall.navOnClick
  });
  const [searchValue, setSearchValue] = useState("");
  // 获取日期
  const getDate = () => {
    var date = new Date();
    var mounth =
      date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var localToday = date.getFullYear() + "/" + mounth + "/" + day;
    return localToday;
  };
  // 初始化
  const init = () => {
    let arr: any = [];
    for (let i = 0; i < commodityList.length; i++) {
      arr.push(false);
    }
    arr[0] = true;
    setSelecTypeArr(arr);
    setCurrentDate(getDate());
    // setCurrentType("早餐");
    setCurrentComCList(commodityList[0].content);
  };
  useEffect(() => {
    init();
    return () => {};
  }, []);
  useEffect(() => {
    console.log("&*&^*&*^");
    return () => {};
  }, [searchValue]);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});
  // 获取富文本的内容
  const getText = (str: any) => {
    return str
      ?.replace(/<[^<>]+>/g, "")
      ?.replace(/&nbsp;/gi, "")
      ?.slice(1);
  };
  // 求总金额
  const getTotal = () => {
    let total: any = 0;
    for (let i = 0; i < currentSelectComCList.length; i++) {
      if (currentSelectComCList[i]?.spec) {
        currentSelectComCList[i]?.spec.forEach(el => {
          total += el.number * Number(el.price);
          total += el.number * Number(packData?.money);
        });
      } else {
        total +=
          currentSelectComCList[i].number *
          Number(currentSelectComCList[i].price);
        total += currentSelectComCList[i].number * Number(packData?.money);
      }
    }
    total = total.toFixed(2);
    return total;
  };
  // 求总数量
  const getTotalNumber = () => {
    let total = 0;
    for (let i = 0; i < currentSelectComCList.length; i++) {
      if (currentSelectComCList[i]?.spec) {
        currentSelectComCList[i]?.spec.forEach(el => {
          total += el.number;
        });
      } else total += currentSelectComCList[i].number;
    }
    return total;
  };
  /**
   * 初始项目的加、减操作
   * @param type 加/减
   * @param item 当前操作的对象
   * @param index 操作的对象在当前列表的索引值
   * @param hasSpec 是否是有规格的商品，默认false
   */
  const changeComNumber = (
    type: string,
    item: any,
    index: number,
    hasSpec: boolean = false
  ) => {
    /**当前选中的商品列表 */
    let selectData = [...currentSelectComCList];
    /**正在展示商品列表 */
    let showData = [...currentComCList];
    /**全量数据 */
    let allData = [...commodityList];
    if (!item.hasOwnProperty("number") && !item.hasOwnProperty("spec")) {
      item.number = 0;
    }
    item?.spec?.forEach(el => {
      if (!el?.number) el.number = 0;
    });
    if (type === "+") {
      // 区分增加的是不是同一个商品
      let flag = false;
      let curIndex = 0;
      if (selectData.length > 0) {
        // 当购物车内有商品时，先进行判断再添加进购物车
        for (let i = 0; i < selectData.length; i++) {
          if (selectData[i].id === item.id) {
            flag = true;
            curIndex = i;
            break;
          }
        }
        if (flag) {
          // 如果是有规格的商品
          if (hasSpec) {
            // 判断添加的是否是同规格的商品
            for (let i = 0; i < selectData.length; i++) {
              if (
                selectData[i].id === item.id &&
                selectData[i].hasOwnProperty("spec")
              ) {
                console.log(selectData[i]);
                selectData[i].spec.find(
                  v => v.title === item.spec.find(v => v.default).title
                ).number++;
                if (
                  selectData[i].spec.find(
                    v => v.title === item.spec.find(v => v.default).title
                  ).number > maxNumber
                )
                  selectData[i].spec.find(
                    v => v.title === item.spec.find(v => v.default).title
                  ).number = maxNumber;
              }
            }
            showData[index] = selectData[curIndex];
          } else {
            // 如果添加的是同一个商品，则不需要再往购物车内塞新的商品，直接增加商品number
            selectData[curIndex].number++;
            // 限制添加商品数量不能超过最大数 99
            if (selectData[curIndex].number > maxNumber)
              selectData[curIndex].number = maxNumber;
            showData[index] = selectData[curIndex];
          }
        } else {
          if (hasSpec) {
            item.spec.find(v => v.default).number++;
          } else item.number++;
          selectData.push(item);
          showData[index] = item;
        }
      } else {
        if (hasSpec) {
          item.spec.find(v => v.default).number++;
        } else item.number++;
        selectData.push(item);
        showData[index] = item;
      }
    } else if (type === "-") {
      for (let i = 0; i < selectData.length; i++) {
        // 找到对应商品id，减去数量
        if (selectData[i].id === item.id) {
          if (hasSpec) {
            selectData[i].spec.find(
              v => v.title === item.spec.find(v => v.default).title
            ).number--;
            // item.spec.find(v => v.default).number--;
            if (!selectData[i].spec.find(v => v.number > 0)) {
              selectData.splice(i, 1);
            }
          } else {
            selectData[i].number--;
            item.number--;
            // 如果数量为 0 时，从购物车中删除该商品
            if (!selectData[i].number) {
              selectData.splice(i, 1);
            }
          }
        }
      }
      showData[index] = item;
    }
    // 数据列表更新 -总的数据源 -展示列表 -已选列表
    allData[currentTypeIndex].content = showData;
    console.log(selectData);
    setCurrentSelectComCList(selectData);
    setCurrentComCList(showData);
    setCommodityList(allData);
  };
  /**
   * 创建项目卡片
   * @param infoObj 需要展示的信息对象
   * @param index 操作的对象在当前列表的索引值
   * @returns
   */
  const createCommodityCard = (infoObj: any, index: any) => {
    let count = 0;
    if (infoObj.hasOwnProperty("spec")) {
      infoObj.spec.forEach(v => {
        if (v?.number) count += v.number;
      });
    }
    return (
      <View className={styles.CommodityCard}>
        <Image src={infoObj.pic} className={styles.pic} />
        <View className={styles.infoTextArea}>
          {infoObj?.title && (
            <View className={styles.title}>{infoObj.title}</View>
          )}
          {infoObj?.materialsInfo && (
            <View className={styles.materialsInfo}>
              {infoObj.materialsInfo}
            </View>
          )}
          {infoObj?.sale && (
            <View className={styles.sale}>已售：{infoObj.sale}</View>
          )}
          {infoObj?.price && (
            <View className={styles.price}>¥{infoObj.price}</View>
          )}
          {infoObj?.spec && (
            <View className={styles.price}>¥{infoObj.spec[0].price}</View>
          )}
        </View>
        {infoObj?.spec && isArray(infoObj?.spec) && infoObj?.spec.length > 0 ? (
          infoObj?.spec?.find(v => v?.number > 0) ? (
            <AtBadge value={count} maxValue={99} className={styles.selectSpec}>
              <Button className={styles.specBtn}>选规格</Button>
            </AtBadge>
          ) : (
            <View className={styles.selectSpec}>
              <Button className={styles.specBtn}>选规格</Button>
            </View>
          )
        ) : (
          <View className={styles.numberBtnArea}>
            <View className={styles.numberBtnLeft}>
              <Image
                src={GPage.Data.assets.subtract}
                className={styles.activeBtn}
                style={{ display: infoObj?.number ? "" : "none" }}
                onClick={e => {
                  if (e && e.stopPropagation) e.stopPropagation();
                  else window.event.cancelBubble = true;

                  changeComNumber("-", infoObj, index);
                }}
              />
            </View>
            <View className={styles.currentNumber}>
              {infoObj?.number ? infoObj?.number : ""}
            </View>
            <Image
              ref={plusBtn}
              src={GPage.Data.assets.plus}
              className={`${styles.activeBtn} addIcon`}
              onClick={e => {
                if (e && e.stopPropagation) e.stopPropagation();
                else window.event.cancelBubble = true;

                changeComNumber("+", infoObj, index);
              }}
            />
          </View>
        )}
      </View>
    );
  };
  // 创建结算区域
  const createOrderBtn = () => {
    return (
      <View className={styles.SettlementBtn}>
        <View
          className={styles.btnLeft}
          onClick={() => {
            setFloatOpen(true);
          }}
        >
          <AtBadge value={getTotalNumber()} maxValue={99}>
            <Image src={GPage.Data.assets.order} className={styles.orderICON} />
          </AtBadge>
        </View>
        <View className={styles.btnMiddle}>￥{getTotal()}</View>
        <View
          className={styles.btnRight}
          onClick={() => {
            if (currentSelectComCList?.length)
              GPage.DoWXCall(
                "settlementClick",
                currentSelectComCList,
                getTotal()
              );
          }}
        >
          去结算
        </View>
      </View>
    );
  };
  // 清空餐篮
  const clearFoodBasket = () => {
    let selectData = [...currentSelectComCList];
    let showData = [...currentComCList];
    let allData = [...commodityList];
    selectData.splice(0, selectData.length);
    for (let i = 0; i < allData.length; i++) {
      for (let j = 0; j < allData[i].content.length; j++) {
        if (allData[i].content[j].hasOwnProperty("spec")) {
          allData[i].content[j].spec.forEach(el => (el.number = 0));
        } else {
          allData[i].content[j].number = 0;
        }
      }
    }
    setCurrentSelectComCList(selectData);
    setCurrentComCList(showData);
    setCommodityList(allData);
  };
  /**
   * modal内的项目加减 区别：只需要对已存在数组中的数据进行操作
   * @param type 加/减
   * @param index 操作的项目在列表中的索引
   */
  const modalChangeNumber = (
    type: string,
    index: number,
    specTitle?: boolean
  ) => {
    let selectData = [...currentSelectComCList];
    let showData = [...currentComCList];
    let allData = [...commodityList];
    if (type === "+") {
      if (specTitle) {
        selectData[index].spec.find(v => v.title === specTitle).number++;
        if (
          selectData[index].spec.find(v => v.title === specTitle).number >
          maxNumber
        )
          selectData[index].spec.find(
            v => v.title === specTitle
          ).number = maxNumber;
      } else {
        selectData[index].number++;
        if (selectData[index].number > maxNumber)
          selectData[index].number = maxNumber;
      }
    } else {
      if (specTitle) {
        selectData[index].spec.find(v => v.title === specTitle).number--;
        if (!selectData[index].spec.find(v => v.number > 0)) {
          selectData.splice(index, 1);
        }
      } else {
        selectData[index].number--;
        if (!selectData[index].number) {
          selectData.splice(index, 1);
        }
      }
    }
    allData[currentTypeIndex].content = showData;
    setCurrentSelectComCList(selectData);
    setCurrentComCList(showData);
    setCommodityList(allData);
  };
  return (
    <Root hashData={styles}>
      <View className={styles.order}>
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
        {/* 搜索框 */}
        <AtSearchBar
          value={searchValue}
          onChange={e => {
            setSearchValue(e);
            GPage.DoWXCall("searchOnChange", e);
          }}
        />
        {/* 时间段 */}
        <View
          className={styles.timeQuantumArea}
          style={{ display: dateIsShow ? "" : "none" }}
        >
          <AtIcon
            value="chevron-right"
            size="30"
            color="#bbb"
            className={styles.tipIcon}
            customStyle={{ display: timeQuantumList ? "" : "none" }}
          ></AtIcon>
          <View className={styles.currentDateArea}>
            <View className={styles.currentDataContent}>
              当前点餐日期{currentDate}
              {/* <Text className={styles.currentType}>{currentType}</Text> */}
            </View>
          </View>

          <View className={styles.timeQuantumListArea}>
            <View className={styles.Timecontainer}>
              {timeQuantumList && timeQuantumList.length > 0
                ? timeQuantumList.map((timeItem: any, timeIndex: any) => {
                    return (
                      <View
                        key={timeIndex}
                        className={
                          timeItem?.active
                            ? `${styles.timeItem} ${styles.activeTimeItem}`
                            : `${styles.timeItem}`
                        }
                        onClick={() => {
                          GPage.DoWXCall(
                            "timeQuantumClick",
                            timeItem,
                            timeIndex
                          );
                        }}
                      >
                        {timeItem.title}
                      </View>
                    );
                  })
                : ""}
            </View>
          </View>
        </View>
        {/* 菜品列表 */}
        <View className={styles.commodityListArea}>
          <View className={styles.typeLeft}>
            {commodityList && commodityList.length > 0
              ? commodityList.map((comItem: any, comIndex: any) => {
                  return (
                    <View
                      key={comIndex}
                      className={
                        selectTypeArr[comIndex]
                          ? `${styles.typeItem} ${styles.typeItemActive}`
                          : `${styles.typeItem}`
                      }
                      onClick={() => {
                        let selectArr = [...selectTypeArr];
                        for (let i = 0; i < selectArr.length; i++) {
                          selectArr[i] = false;
                        }
                        selectArr[comIndex] = true;
                        setSelecTypeArr(selectArr);
                        setCurrentIndex(comIndex);
                        setCurrentComCList(commodityList[comIndex].content);
                      }}
                    >
                      {comItem?.icon ? (
                        <Image src={comItem.icon} className={styles.typeICON} />
                      ) : (
                        ""
                      )}

                      <Text
                        className={styles.typeTitle}
                        dangerouslySetInnerHTML={{ __html: comItem.type }}
                      ></Text>
                    </View>
                  );
                })
              : ""}
          </View>
          <View className={styles.contentRight}>
            {currentComCList && currentComCList.length > 0
              ? currentComCList.map(
                  (commodityItem: any, commodityIndex: any) => {
                    let obj = JSON.parse(JSON.stringify(commodityItem));
                    return (
                      <View
                        key={commodityIndex}
                        className={styles.commodityItem}
                        onClick={() => {
                          setModalOpen(true);
                          setCurrentComItem(commodityItem);
                          setCurrentComIndex(commodityIndex);
                        }}
                      >
                        {createCommodityCard(obj, commodityIndex)}
                      </View>
                    );
                  }
                )
              : ""}
          </View>
        </View>
        <View className={styles.SettlementArea}>{createOrderBtn()}</View>
        {/* 底部导航 */}
        <Comp_Nav config={navData} type={"normal"} className={styles.nav} />
        {/* 已选项目的活动面板弹窗 */}
        <AtFloatLayout
          isOpened={floatOpen}
          onClose={() => {
            setFloatOpen(false);
          }}
          className={styles.floatMain}
        >
          <View className={styles.floatHeader}>
            <View className={styles.headerLeft}>已选商品</View>
            <View
              className={styles.headerRight}
              onClick={() => {
                clearFoodBasket();
              }}
            >
              <Image
                src={GPage.Data.assets.clear}
                className={styles.clearICON}
              />
              清空餐篮
            </View>
          </View>
          <View className={styles.floatContent}>
            {currentSelectComCList && currentSelectComCList.length > 0 ? (
              currentSelectComCList.map(
                (commodityItem: any, commodityIndex: any) => {
                  if (commodityItem.hasOwnProperty("spec")) {
                    return commodityItem.spec.map((item, index) => {
                      if (item?.number > 0) {
                        return (
                          <View key={index} className={styles.commodityItem}>
                            <View className={styles.CommodityCard}>
                              <Image
                                src={commodityItem.pic}
                                className={styles.pic}
                              />
                              <View className={styles.infoTextArea}>
                                <View className={styles.title}>
                                  {commodityItem.title}
                                </View>
                                <View className={styles.specInfo}>
                                  {item.title}
                                </View>
                                {item?.price && (
                                  <View className={styles.price}>
                                    ¥{item.price}
                                  </View>
                                )}
                              </View>
                              <View className={styles.numberBtnArea}>
                                <View className={styles.numberBtnLeft}>
                                  <Image
                                    src={GPage.Data.assets.subtract}
                                    className={styles.activeBtn}
                                    style={{
                                      display: item.number ? "" : "none"
                                    }}
                                    onClick={e => {
                                      if (e && e.stopPropagation)
                                        e.stopPropagation();
                                      else window.event.cancelBubble = true;

                                      modalChangeNumber(
                                        "-",
                                        commodityIndex,
                                        item.title
                                      );
                                    }}
                                  />
                                </View>
                                <View className={styles.currentNumber}>
                                  {item.number}
                                </View>
                                <Image
                                  src={GPage.Data.assets.plus}
                                  className={styles.activeBtn}
                                  onClick={e => {
                                    if (e && e.stopPropagation)
                                      e.stopPropagation();
                                    else window.event.cancelBubble = true;

                                    modalChangeNumber(
                                      "+",
                                      commodityIndex,
                                      item.title
                                    );
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        );
                      }
                    });
                  }
                  return (
                    <View key={commodityIndex} className={styles.commodityItem}>
                      <View className={styles.CommodityCard}>
                        <Image src={commodityItem.pic} className={styles.pic} />
                        <View className={styles.infoTextArea}>
                          <View className={styles.title}>
                            {commodityItem.title}
                          </View>
                          {commodityItem?.spec && (
                            <View className={styles.specInfo}>
                              {
                                commodityItem?.spec.find(
                                  v => v.default === true
                                ).title
                              }
                            </View>
                          )}
                          {commodityItem?.price && (
                            <View className={styles.price}>
                              ¥{commodityItem.price}
                            </View>
                          )}
                        </View>
                        <View className={styles.numberBtnArea}>
                          <View className={styles.numberBtnLeft}>
                            <Image
                              src={GPage.Data.assets.subtract}
                              className={styles.activeBtn}
                              style={{
                                display: commodityItem?.number ? "" : "none"
                              }}
                              onClick={e => {
                                if (e && e.stopPropagation) e.stopPropagation();
                                else window.event.cancelBubble = true;

                                modalChangeNumber("-", commodityIndex);
                              }}
                            />
                          </View>
                          <View className={styles.currentNumber}>
                            {commodityItem?.number ? commodityItem?.number : ""}
                          </View>
                          <Image
                            src={GPage.Data.assets.plus}
                            className={styles.activeBtn}
                            onClick={e => {
                              if (e && e.stopPropagation) e.stopPropagation();
                              else window.event.cancelBubble = true;

                              modalChangeNumber("+", commodityIndex);
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  );
                }
              )
            ) : (
              <View className={styles.result}>
                <Comp_Result config={resultData} type="01" />
              </View>
            )}
          </View>
          <View
            className={styles.packArea}
            style={{
              display:
                packData.isShow && currentSelectComCList.length > 0
                  ? ""
                  : "none"
            }}
          >
            <Image src={GPage.Data.assets.pack} className={styles.packIcon} />
            <View className={styles.txt}>
              <View className={styles.title}>打包费</View>
              <View className={styles.money}>{packData.money}</View>
            </View>
            <View className={styles.packNumber}>×{getTotalNumber()}</View>
          </View>
          <View className={styles.floatFooter}>{createOrderBtn()}</View>
        </AtFloatLayout>
        {/* 项目简介模态框 */}
        <AtModal
          isOpened={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          className={styles.modalMain}
        >
          <AtModalContent>
            <View className={styles.modalContent}>
              <View className={styles.modalTitle}>{currentComItem?.title}</View>
              <Image src={currentComItem?.pic} className={styles.modalImg} />
              <View className={styles.modalIntro}>{currentComItem?.intro}</View>
              {currentComItem?.spec &&
                isArray(currentComItem?.spec) &&
                currentComItem?.spec.length > 0 && (
                  <View className={styles.spec}>
                    <Text className={styles.specTitle}>规格</Text>
                    <View className={styles.specBtn}>
                      {currentComItem?.spec.map((v, i) => (
                        <Button
                          key={i}
                          className={`${styles.specBtnItem} ${v?.default &&
                            styles.specBtnActive}`}
                          onClick={() => {
                            let obj = { ...currentComItem };
                            for (let j = 0; j < obj?.spec.length; j++) {
                              if (obj?.spec[j]?.default)
                                obj.spec[j].default = false;
                            }
                            obj.spec[i].default = true;
                            setCurrentComItem(obj);
                          }}
                        >
                          {v.title}
                        </Button>
                      ))}
                    </View>
                  </View>
                )}
              <View className={styles.modalFooter}>
                {currentComItem?.price && (
                  <View className={styles.price}>
                    <Image
                      className={styles.priceIcon}
                      src={GPage.Data.assets.money_1}
                    />
                    <Text>{currentComItem?.price}</Text>
                  </View>
                )}
                {currentComItem?.spec && (
                  <View className={styles.price}>
                    <Image
                      className={styles.priceIcon}
                      src={GPage.Data.assets.money_1}
                    />
                    <Text>
                      {currentComItem?.spec?.find(v => v.default)?.price ||
                        currentComItem?.spec[0].price}
                    </Text>
                  </View>
                )}
                {currentComItem?.spec?.find(
                  v => v?.default && v?.number > 0
                ) ? (
                  <View className={styles.numberBtnArea}>
                    <View className={styles.numberBtnLeft}>
                      <Image
                        src={GPage.Data.assets.subtract}
                        className={styles.activeBtn}
                        style={{
                          display: currentComItem?.spec?.find(
                            v => v.default && v?.number
                          )?.number
                            ? ""
                            : "none"
                        }}
                        onClick={e => {
                          if (e && e.stopPropagation) e.stopPropagation();
                          else window.event.cancelBubble = true;
                          changeComNumber(
                            "-",
                            currentComItem,
                            currentComIndex,
                            true
                          );
                        }}
                      />
                    </View>
                    <View className={styles.currentNumber}>
                      {
                        currentComItem?.spec?.find(v => v.default && v?.number)
                          ?.number
                      }
                    </View>
                    <Image
                      src={GPage.Data.assets.plus}
                      className={styles.activeBtn}
                      onClick={e => {
                        if (e && e.stopPropagation) e.stopPropagation();
                        else window.event.cancelBubble = true;
                        changeComNumber(
                          "+",
                          currentComItem,
                          currentComIndex,
                          true
                        );
                      }}
                    />
                  </View>
                ) : (
                  <Button
                    style={{
                      display: currentComItem?.hasOwnProperty("spec")
                        ? ""
                        : "none"
                    }}
                    className={`${styles.modalPlus} ${
                      currentComItem?.spec?.find(v => v.default)
                        ? ""
                        : styles.disabledBgc
                    }`}
                    onClick={() => {
                      if (currentComItem?.spec?.find(v => v.default)) {
                        changeComNumber(
                          "+",
                          currentComItem,
                          currentComIndex,
                          true
                        );
                      }
                    }}
                  >
                    {currentComItem?.spec?.find(v => v.default) ? (
                      <Text>
                        <AtIcon value="add" color="#fff" size={10} />
                        加入购物车
                      </Text>
                    ) : (
                      "请选择规格"
                    )}
                  </Button>
                )}
              </View>
            </View>
          </AtModalContent>
        </AtModal>
      </View>
    </Root>
  );
}
