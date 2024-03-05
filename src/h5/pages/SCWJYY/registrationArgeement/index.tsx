import React, { useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "../../../core/root";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import "./style/index.scss";
//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_SCWJYY_registrationArgeement_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.agreeMent],
        () => {
          setAgreeMent(nda.agreeMent);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.img],
        () => {
          setImg(nda.img);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });

  const [agreeMent, setAgreeMent] = useState(GPage.Data.agreeMent);
  const [img, setImg] = useState(GPage.Data.img);
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
    <Root>
      <View className="registrationArgeement">
        <View className="header">
          <Image src={img} className="img"/>
          <View className="title">挂号协议</View>
        </View>
        <View className="content">
          {GPage.Map(
            agreeMent,
            (item: any, index: any) => {
              return (
                <View className="item">{`${index + 1}` + "." + `${item}`}</View>
              );
            },
            ""
          )}
        </View>
        <AtButton
          onClick={() => {
            GPage.DoWXCall("agreeClick");
          }}
        >
          同 意
        </AtButton>
      </View>
    </Root>
  );
}
