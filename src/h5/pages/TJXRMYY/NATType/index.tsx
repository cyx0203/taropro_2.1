import React, { useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import { AtCard, AtCountdown, AtNoticebar } from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import { Root } from "../../../core/root";
import { Comp_UserInforCard } from "@/GGCompLib";
import _ from "lodash";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_NATType_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.NATInfo],
        () => {
          setNATInfo(nda.NATInfo);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.tipsContent],
        () => {
          setTipsContent(_.split(nda.tipsContent, "$", 3));
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
    }
  });
  const [NATInfo, setNATInfo] = useState(GPage.Data.NATInfo);
  const [userCard, setUserCard] = useState(GPage.Data.userCard);
  const [tipsContent, setTipsContent] = useState(
    _.split(GPage.Data.tipsContent, "$", 3) || []
  );

  useEffect(() => {
    if (userCard) {
      let obj = { ...userCard };
      obj.pop = {
        isShow: false
      };
      setUserCard(obj);
    }
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
      <View className={styles.NATType}>
        {userCard ? (
          <Comp_UserInforCard
            config={userCard}
            type="01"
            className={styles.userCard}
            onItemClick={(item, state) => {
              GPage.DoWXCall("userCardClick", item, state);
            }}
            onExtraClick={() => {
              GPage.DoWXCall("changePatient");
            }}
          />
        ) : (
          ""
        )}

        <View className={styles.tipsArea}>
          <AtNoticebar>
            {tipsContent && tipsContent.length > 1 ? (
              <>
                {tipsContent[0]}
                <AtCountdown
                  isShowHour={false}
                  minutes={Number(tipsContent[1]) || 10}
                  customStyle={{color:'red'}}
                  onTimeUp={() => {
                    GPage.DoWXCall('countTimeUp')
                  }}
                />
                {tipsContent[2]}
              </>
            ) : (
              tipsContent[0]
            )}
          </AtNoticebar>
        </View>
        {GPage.Map(
          NATInfo,
          (item: any, index: any) => {
            return (
              <AtCard
                key={index}
                className={styles.card}
                onClick={() => {
                  GPage.DoWXCall("onNATTypeClick", item, index);
                }}
              >
                <View className={styles.cardInfo}>
                  <Image src={item.icon} className={styles.card_img} />
                  <View className={styles.NAT_info}>
                    <View className={styles.title}>{item.title}</View>
                    <View>{item.type}</View>
                    <View
                      style={{
                        display: item.hasOwnProperty("money") ? "" : "none"
                      }}
                    >
                      {item.money}
                    </View>
                  </View>
                </View>
              </AtCard>
            );
          },
          ""
        )}
      </View>
    </Root>
  );
}
