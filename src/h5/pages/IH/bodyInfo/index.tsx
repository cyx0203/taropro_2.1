import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtSwitch } from "taro-ui";
//原生组件
import { View, Image, Button } from "@tarojs/components";
import { GGCPS_Switch } from "@/GGCPS";
//自定义组件
import { Comp_Result } from "@/GGCompLib";
//模板主体
export default function main() {
  const male_body_1 = [
    ["头部", "腹部", "四肢"],
    ["颈部", "胸部", "生殖部"]
  ];
  const male_body_2 = [
    ["头部", "腰部", "四肢"],
    ["颈部", "背部", "臀部"]
  ];
  const famale_body_1 = [
    ["头部", "腹部", "四肢"],
    ["颈部", "胸部", "生殖部"]
  ];
  const famale_body_2 = [
    ["头部", "腰部", "四肢"],
    ["颈部", "背部", "臀部"]
  ];
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_IH_bodyInfo_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.imgURLList],
        () => {
          setImgURLList(nda.imgURLList);
        },
        () => {
          console.log("Fail");
        }
      );
    }
  });
  const [genderValue, setGender] = useState('男');
  const [directionValue, setDirection] = useState('正');
  const [currentBody, setCurrentBody] = useState(male_body_1);
  const [currentImg, setCurrentImg] = useState(GPage.Data.imgURLList[0]);
  const [imgURLList, setImgURLList] = useState(GPage.Data.imgURLList);
  useEffect(() => {
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});
  const changeShowData = (gen, des) => {
    if (gen === "男") {
      if (des === "正") {
        setCurrentImg(imgURLList[0]);
        setCurrentBody(male_body_1);
      } else {
        setCurrentImg(imgURLList[1]);
        setCurrentBody(male_body_2);
      }
    } else if (gen === "女") {
      if (des === "正") {
        setCurrentImg(imgURLList[2]);
        setCurrentBody(famale_body_1);
      } else {
        setCurrentImg(imgURLList[3]);
        setCurrentBody(famale_body_2);
      }
    }
  };
  return (
    <Root hashData={styles}>
      <View className={styles.bodyInfo}>
        <View className={styles.switchArea}>
          <View className={styles.gender}>
            <GGCPS_Switch
              content={[
                { txt: "正" },
                { txt: "背"},
              ]}
              onClick={(sw, item, index) => {
                console.log(sw,item,index)
                changeShowData(genderValue,item.txt)
                setDirection(item.txt)
              }}
            />
          </View>
          <View className={styles.gender}>
            <GGCPS_Switch
              content={[
                { txt: "男" },
                { txt: "女"},
              ]}
              onClick={(sw, item, index) => {
                console.log(sw,item,index);
                changeShowData(item.txt,directionValue)
                setGender(item.txt)
              }}
            />
          </View>
        </View>
        <View className={styles.bodyPartArea}>
          <View
            className={styles.bodyImg}
            style={{ backgroundImage: `url(${currentImg})` }}
          ></View>
          <View className={styles.bodyPartName}>
            <View className={styles.nameLeft}>
              {currentBody[0].map((item, index) => {
                return (
                  <Button
                    className={styles.bodyBtn}
                    key={index}
                    onClick={() => {
                      GPage.DoWXCall("selectPart", genderValue, item);
                    }}
                  >
                    {item}
                  </Button>
                );
              })}
            </View>
            <View className={styles.nameRight}>
              {currentBody[1].map((item, index) => {
                return (
                  <Button
                    className={styles.bodyBtn}
                    key={index}
                    onClick={() => {
                      GPage.DoWXCall("selectPart", genderValue, item);
                    }}
                  >
                    {item}
                  </Button>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </Root>
  );
}
