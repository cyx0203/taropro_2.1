import { useState, useEffect, useRef } from "react";
import { View, Image, Text } from "@tarojs/components";
import { Root, CPSLB } from "@/GGCompLibBase";
import "./style/index.scss";
import { AtButton, AtDivider, AtIcon, AtModal, AtModalContent } from "taro-ui";
import { Barcode } from "taro-code";
import QRCode from "qrcode-react";
const CPSNAME = "comp_userinforcard_01";
const Comp_UserInforCard_01 = (props: any) => {
  //数据
  const data = props.config;
  const type = props.type;
  const onItemClick = props.onClick;
  const onExtraClick = props.onExtraClick;

  const [popShow, setPop] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Root className={props.className} cpsName={CPSNAME}>
      {data.empty ? (
        <View
          className="at-row container"
          onClick={() => {
            let fun = onItemClick;
            if (fun) fun(data.empty, "empty");
          }}
        >
          {/* <View className='at-col at-col-4'><Image className='emptyIcon' src={data.empty.icon}></Image></View>
                <View className='at-col at-col-8'>{data.empty.msg}</View> */}
          <Image
            className="emptyIcon"
            src={data.empty.icon ? data.empty.icon : ""}
          ></Image>
          {data.empty.msg ? data.empty.msg : ""}
        </View>
      ) : data.user ? (
        <View
          className="container2"
          onClick={() => {
            let fun = onItemClick;
            if (fun) fun(data.user, "user");
            if (data.pop.isShow) setPop(true);
          }}
        >
          {data.user.icon ? (
            <View className="at-col at-col-3">
              <Image
                className="userIcon"
                src={data.user.icon ? data.user.icon : ""}
              ></Image>
            </View>
          ) : (
            ""
          )}

          <View className="at-col at-col-9">
            {data.user.qricon || data.user.extra ? (
              <View className="at-row row1">
                {data.user.name ? data.user.name : ""}
                {data.user.qricon ? (
                  <Image
                    className="qrIcon"
                    src={data.user.qricon ? data.user.qricon : ""}
                    onClick={e => {
                      if (e && e.stopPropagation)
                        //因此它支持W3C的stopPropagation()方法
                        e.stopPropagation();
                      else {
                        //否则，我们需要使用IE的方式来取消事件冒泡
                        window.event.cancelBubble = true;
                      }
                      let fun = onExtraClick;
                      if (fun) fun(data);
                      if (data.pop.isShow) setPop(true);
                    }}
                  ></Image>
                ) : data.user.extra ? (
                  <View
                    className="extra"
                    onClick={e => {
                      if (e && e.stopPropagation)
                        //因此它支持W3C的stopPropagation()方法
                        e.stopPropagation();
                      else {
                        //否则，我们需要使用IE的方式来取消事件冒泡
                        window.event.cancelBubble = true;
                      }
                      // this.setState({modalOpen:true});
                      let fun = onExtraClick;
                      if (fun) fun(data);
                      if (data.pop.isShow) setPop(true);
                    }}
                  >
                    <Image
                      className="extraIcon"
                      src={data.user.extra.icon ? data.user.extra.icon : ""}
                    ></Image>
                    <Text className="extraTxt">{data.user.extra.text}</Text>
                  </View>
                ) : (
                  ""
                )}
              </View>
            ) : (
              ""
            )}

            <View className="at-row row2">
              {data.user.card ? data.user.card : ""}
            </View>
          </View>
        </View>
      ) : (
        "userInforCard组件出错"
      )}
      <AtModal isOpened={popShow} onClose={() => setPop(false)}>
        <AtModalContent>
          <View className="at-row flexCenter">
            <View>{data.pop.title}</View>
            {data.pop.qrcode ? (
              <QRCode
                size={150}
                value={data.pop.qrcode}
                logo={data.pop.qricon ? data.pop.qricon : ""}
                logoWidth={30}
                logoHeight={30}
              />
            ) : (
              ""
            )}
          </View>
          <View className="at-row flexCenter">
            {data.pop.barcode ? (
              <Barcode
                text={data.pop.barcode}
                width={200}
                height={50}
                scale={4}
              />
            ) : (
              ""
            )}
          </View>
          <View className="">
            {data.pop
              ? data.pop.infoList
                ? data.pop.infoList.map((item, index) => {
                    return (
                      <View className="at-row labelRow" key={index}>
                        {item.label}: {item.value}
                      </View>
                    );
                  })
                : ""
              : "pop未配置"}
          </View>
        </AtModalContent>
      </AtModal>
    </Root>
  );
};

export { Comp_UserInforCard_01 };
