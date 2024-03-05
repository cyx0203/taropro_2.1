import { useDidHide, useDidShow, useReady } from "@tarojs/taro";
import { useEffect, useState } from "react";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtSearchBar ,AtIcon } from "taro-ui";
//原生组件
import { Button, View } from "@tarojs/components";
//自定义组件
import { Comp_Result } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_itemInfo_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.searchPlaceholder],
        () => {
          setSearchPlaceholder(nda.searchPlaceholder);
        },
        () => {
          console.error("Fail");
        }
      );
      GPage.SetState(
        [nda.mainContentData],
        () => {
          setMainContentData(nda.mainContentData);
        },
        () => {
          console.error("Fail");
        }
      );
      GPage.SetState(
        [nda.resultData],
        () => {
          setResultData(nda.resultData);
        },
        () => {
          console.error("Fail");
        }
      );
    }
  });
  //定义state
  // 搜索内容
  const [searchContent, setSearchContent] = useState("");
  // 搜索框内文字
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    GPage.Data.searchPlaceholder
  );
  // 搜索方法
  const searchFunc = val => {
    setSearchContent(val);
  };

  const [mainContentData, setMainContentData] = useState(
    GPage.Data.mainContentData
  );
  const [resultData, setResultData] = useState(GPage.Data.resultData);
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
      <View className={styles.itemInfo}>
        {/* 头部搜索框 */}
        <View className={styles.header}>
          <AtSearchBar
            placeholder={searchPlaceholder}
            value={searchContent}
            onChange={val => searchFunc(val)}
            onActionClick={() => {
              GPage.DoWXCall("searchClick", searchContent);
            }}
          />
          <View className={styles.infoTitle}>
            <View className={styles.left}>项目名称</View>
            <View className={styles.middle}>单价</View>
            <View className={styles.right}>操作</View>
          </View>
        </View>
        {/* 主体内容 */}
        <View className={styles.mainContent}>
          {mainContentData && mainContentData.isEmpty === "N" ? (
            mainContentData.listData.map((item, index) => {
              return (
                <View
                  className={styles.item}
                  key={index}
                  onClick={() => {
                    GPage.DoWXCall("onItemClick", item, index);
                  }}
                >
                  <View className={styles.name}>{item.name}</View>
                  <View className={styles.univalence}>{item.univalence}</View>
                  {item?.btn ? (
                    <Button
                      className={styles.active}
                      onClick={e => {
                        if (e && e.stopPropagation)
                          //因此它支持W3C的stopPropagation()方法
                          e.stopPropagation();
                        else {
                          //否则，我们需要使用IE的方式来取消事件冒泡
                          window.event.cancelBubble = true;
                        }
                        GPage.DoWXCall("activeClick", item, index);
                      }}
                      style={{'backgroundColor':item.active?'red':''}}
                    >
                      {item?.btn}
                    </Button>
                  ) : (
                    ""
                  )}
                </View>
              );
            })
          ) : (
            <View className={styles.result}>
              {resultData ? <Comp_Result config={resultData} type="01" /> : ""}
            </View>
          )}
        </View>
        <Button className={styles.floatBtn} onClick={() => {
          GPage.DoWXCall("floatBtnClick");
        }}><AtIcon  value='shopping-cart' size='45' color='#FFF'></AtIcon></Button>
      </View>
    </Root>
  );
}
