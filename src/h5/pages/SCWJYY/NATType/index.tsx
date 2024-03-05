import React, { useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import { AtCard } from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import "./style/index.scss";
import { Root } from "../../../core/root";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_SCWJYY_NATType_index",
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
    }
  });
  const [NATInfo, setNATInfo] = useState(GPage.Data.NATInfo);

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
      <View className="NATType">
        {GPage.Map(
          NATInfo,
          (item: any, index: any) => {
            return (
              <AtCard
                title={item.title}
                className="card"
                onClick={() => {
                  GPage.DoWXCall('onNATTypeClick',item,index)
                }}
              >
                <View className="cardInfo">
                  <Image src={item.icon} className="card_img" />
                  <View className="NAT_info">
                    <View>{item.type}</View>
                    <View style={{'display':item.hasOwnProperty('money')?'':'none'}}>核酸费用：{item.money}</View>
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
