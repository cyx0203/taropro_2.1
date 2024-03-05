import { useState, useEffect, useRef } from "react";
import { View, Image, Text } from "@tarojs/components";
import { Root, CPSLB } from "@/GGCompLibBase";
import "./style/index.scss";
import { AtButton, AtDivider, AtIcon } from "taro-ui";
const CPSNAME = "comp_menu_01";
const Comp_Menu_01 = (props: any) => {
  //数据
  const data = props.config;
  const type = props.type;
  const onItemClick = props.onClick;

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Root className={props.className} cpsName={CPSNAME}>
      <View className="container">
        {data.hasOwnProperty("layout") && data.layout === "02" ? (
          <View
            className="GGMenu"
            onClick={() => {
              let fun = onItemClick;
              if (fun) fun(data);
            }}
          >
            <View className="at-row">
              <View className="at-col at-col-4 flexCenter">
                <Image className="icon" src={data.icon}></Image>
              </View>
              <View className="at-col at-col-8 gridCenter">
                <View className="at-row fontClass">{data.title}</View>
                <View
                  className="at-row fontClass-sm"
                  dangerouslySetInnerHTML={{
                    __html: data.subtitle ? data.subtitle : ""
                  }}
                ></View>
              </View>
            </View>
          </View>
        ) : (
          <View
            className="GGMenu"
            onClick={() => {
              let fun = onItemClick;
              if (fun) fun(data);
            }}
          >
            <View className="at-row">
              <View className="at-col at-col-8 gridCenter">
                <View className="at-row fontClass">{data.title}</View>
                <View
                  className="at-row fontClass-sm"
                  dangerouslySetInnerHTML={{
                    __html: data.subtitle ? data.subtitle : ""
                  }}
                ></View>
              </View>
              <View className="at-col at-col-4 flexCenter">
                <Image className="icon" src={data.icon}></Image>
              </View>
            </View>
          </View>
        )}
      </View>
    </Root>
  );
};

export { Comp_Menu_01 };
