import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtButton } from "taro-ui";
//原生组件
import { View, Image } from "@tarojs/components";
//自定义组件
import { Comp_Result } from "@/GGCompLib";
//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_TJXRMYY_infoShow_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.mainImg],
        () => {
          setMainImg(nda.mainImg);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.doctorCard],
        () => {
          setDoctorCard(nda.doctorCard);
        },
        () => {
          console.log("Fail");
        }
      );
      GPage.SetState(
        [nda.infoShowList],
        () => {
          setInfoShowList(nda.infoShowList);
        },
        () => {
          console.log("Fail");
        }
      );
    }
  });
  const [mainImg, setMainImg] = useState(GPage.Data.mainImg);
  const [infoShowList, setInfoShowList] = useState(GPage.Data.infoShowList);
  const [doctorCard, setDoctorCard] = useState(GPage.Data.doctorCard);
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
      <View className={styles.infoShow}>
        <View className={styles.mainImgArea}>
          <Image src={mainImg} className={styles.mainImg} />
        </View>
        {doctorCard ? (
          <View className={styles.docCard}>
            <Image
              src={doctorCard?.pic}
              className={styles.docImg}
              id="docImg"
            />
            <View className={styles.docTextArea}>
              <View className={styles.name}>{doctorCard.name}</View>
              <View className={styles.dept}>{doctorCard.dept}</View>
              <View className={styles.position}>{doctorCard.position}</View>
            </View>
          </View>
        ) : (
          ""
        )}
        <View className={styles.mainContent}>
          {doctorCard ? <View className={styles.cardBlank}></View> : ""}

          {infoShowList && infoShowList.length > 0
            ? infoShowList.map((item, index) => {
                return (
                  <View className={styles.content} key={index}>
                    <View className={styles.titleBox}>
                      <View className={styles.title}>【{item.title}】</View>
                      <View className={styles.blank}></View>
                    </View>
                    <View
                      className={styles.contentBox}
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></View>
                    {item.hasOwnProperty("img") ? (
                      <View className={styles.addressImgArea}>
                        <Image src={item?.img} className={styles.addressImg} />
                      </View>
                    ) : (
                      ""
                    )}
                  </View>
                );
              })
            : ""}
        </View>
      </View>
    </Root>
  );
}
