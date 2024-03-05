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
    pageName: "h5_pages_TJXRMYY_bodyInfo_index",
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
  const [genderValue, setGender] = useState(false);
  const [directionValue, setDirection] = useState(false);
  const [currentBody, setCurrentBody] = useState(male_body_1);
  const [currentImg, setCurrentImg] = useState(
    "http://material.pro220.ggzzrj.com/web/mini/TJXRMYY/assets/img/body-01.png"
  );
  const changeGender = val => {
    setGender(val);
  };
  const changeDirection = val => {
    setDirection(val);
  };
  const [imgURLList, setImgURLList] = useState([
    "http://material.pro220.ggzzrj.com/web/mini/TJXRMYY/assets/img/body-01.png",
    "http://material.pro220.ggzzrj.com/web/mini/TJXRMYY/assets/img/body-02.png",
    "http://material.pro220.ggzzrj.com/web/mini/TJXRMYY/assets/img/body-03.png",
    "http://material.pro220.ggzzrj.com/web/mini/TJXRMYY/assets/img/body-04.png"
  ]);
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
            <AtSwitch checked={directionValue} />
            <View
              className={styles.genderVal}
              onClick={() => {
                changeDirection(!directionValue);
                let gen = "";
                let des = "";
                if (directionValue) {
                  des = "正";
                } else {
                  des = "背";
                }
                if (!genderValue) {
                  gen = "男";
                } else {
                  gen = "女";
                }
                changeShowData(gen, des);
              }}
            >
              <View
                className={styles.male}
                style={{ color: directionValue ? "#3e8af8" : "" }}
              >
                正
              </View>
              <View
                className={styles.female}
                style={{ color: directionValue ? "" : "#3e8af8" }}
              >
                背
              </View>
            </View>
          </View>
          <View className={styles.gender}>
            <AtSwitch checked={genderValue} />
            <View
              className={styles.genderVal}
              onClick={() => {
                changeGender(!genderValue);
                let gen = "";
                let des = "";
                if (genderValue) {
                  gen = "男";
                } else {
                  gen = "女";
                }
                if (!directionValue) {
                  des = "正";
                } else {
                  des = "背";
                }
                changeShowData(gen, des);
              }}
            >
              <View
                className={styles.male}
                style={{ color: genderValue ? "#3e8af8" : "" }}
              >
                男
              </View>
              <View
                className={styles.female}
                style={{ color: genderValue ? "" : "#3e8af8" }}
              >
                女
              </View>
            </View>
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
                      GPage.DoWXCall("selectPart", item);
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
                      GPage.DoWXCall("selectPart", item);
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
