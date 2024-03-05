import React, { useEffect, useState } from "react";

import { AtButton } from "taro-ui";
import { View, Text, Image } from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import {
  Comp_Menu,
  Comp_MenuTab,
  Comp_UserInforCard,
  Comp_Indexes,
  Comp_Nav,
  Comp_BtnList,
  Comp_UserECard,
  Comp_Tips
} from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import "./style/index.scss";
import { Root } from "../../../core/root";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_SCWJYY_payment_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.payment],
        () => {
          setPayment(nda.payment);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.warmPrompt],
        () => {
          setWarmPrompt(nda.warmPrompt);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  const [payment, setPayment] = useState(GPage.Data.payment);
  const [warmPrompt,setWarmPrompt] = useState(GPage.Data.warmPrompt)
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
      <View className="payment">
        <View className="content">
          <View className="payMoney">{payment.money}元</View>
          <View className="payType">应付金额</View>
          <View className="paymentResult">
            <Text>账单金额</Text>
            <Text>{payment.money}元</Text>
          </View>
          {GPage.Map(
            payment.paymentInfo,
            (item: any, index: any) => {
              return (
                <View className="item">
                  <View className="label">{item.label}</View>
                  <View className="value">{item.value}</View>
                </View>
              );
            },
            ""
          )}
        </View>
        {/* 温馨提示 */}
        <Comp_Tips type="02" config={warmPrompt} />
        <View className="footer">
          <View className="paySum">
            <Text>合计：</Text>
            <Text className="money">{payment.money}</Text>
            <Text>元</Text>
          </View>
          <View className="payBtn" onClick={() => GPage.DoWXCall('paymentOnClick')}>
            {payment.btnText}
          </View>
        </View>
      </View>
    </Root>
  );
}
