import { useState, useEffect, useRef } from "react";
import { View, Image, Text, Button } from "@tarojs/components";
import { Root, CPSLB } from "@/GGCompLibBase";
import "./style/index.scss";
import { AtButton, AtDivider, AtIcon, AtTag, AtAccordion } from "taro-ui";
const CPSNAME = "comp_cardlist_02";
const Comp_CardList_02 = (props: any) => {
  //数据
  const imgRef = useRef(null);
  const data = props.config;
  const onItemClick = props.onClick;
  const onExtraItemClick = props.onExtraItemClick;
  const onItemFooterClick = props.onFooterClick;
  const onCardClick = props.onCardClick;
  const [accOpen, setOpen] = useState(
    new Array(data.listData.length).fill(false)
  );

  useEffect(() => {
    console.error(props.className);
    // console.log('p:',props.children)
    return () => {};
  }, []);

  return (
    <Root className={props.className} cpsName={CPSNAME}>
      <View className="cardlist">
        {data.listData.map((item, index) => {
          return (
            <View
              key={index}
              className="card"
              onClick={() => {
                let fun = onCardClick;
                if (fun) fun(item, index);
              }}
            >
              <View className="at-row topPart">
                <View className="at-col at-col-2 flexCenter">
                  <Image
                    ref={imgRef}
                    className="icon"
                    src={item.icon}
                    onError={() => {
                      imgRef.current.src = item.defaultIcon;
                    }}
                  ></Image>
                </View>
                <View className="at-col at-col-6 centerRow">
                  <View className="at-row row1">
                    {item.title ? item.title : ""}
                    {item.tag ? (
                      <AtTag
                        onClick={e => {
                          if (e && e.stopPropagation)
                            //因此它支持W3C的stopPropagation()方法
                            e.stopPropagation();
                          else {
                            //否则，我们需要使用IE的方式来取消事件冒泡
                            window.event.cancelBubble = true;
                          }

                          let fun = onExtraItemClick;
                          if (fun) fun(item, index);
                        }}
                        type=""
                        className="tag"
                      >
                        {item.tag ? item.tag[0] : ""}
                      </AtTag>
                    ) : (
                      ""
                    )}
                  </View>
                  <View className="at-row row2">
                    {item.subtitle ? item.subtitle : ""}
                  </View>
                </View>
                <View className="at-col at-col-4 rightRow">
                  {item.extraIcon ? (
                    <View className="at-row flexCenter">
                      <Image className="icon2" src={item.extraIcon} />
                    </View>
                  ) : (
                    ""
                  )}
                  {item.btns ? (
                    <View className="at-row">
                      {item.btns.slice(0, 2).map((bitem, bindex) => {
                        console.log(bitem)
                        
                        return (
                          <AtButton
                            disabled={bitem.disabled}
                            className="btn"
                            key={bindex}
                            onClick={e => {
                              if (e && e.stopPropagation)
                                //因此它支持W3C的stopPropagation()方法
                                e.stopPropagation();
                              else {
                                //否则，我们需要使用IE的方式来取消事件冒泡
                                window.event.cancelBubble = true;
                              }

                              let fun = onItemClick;
                              if (fun && !bitem.disabled)
                                fun(
                                  item,
                                  index,
                                  bitem.btnName ? bitem.btnName : ""
                                );
                            }}
                          >
                            {bitem.btnName ? bitem.btnName : ""}
                          </AtButton>
                        );
                      })}
                    </View>
                  ) : (
                    ""
                  )}
                </View>
              </View>

              <View className="bottomPart">
                {item.hasOwnProperty("contents")
                  ? item.contents.map((t, i) => {
                      return (
                        <View className="at-row labelAndValue" key={i}>
                          <View
                            key={i}
                            className={
                              !accOpen[index] &&
                              data.hasOwnProperty("accordion") &&
                              data.accordion === true
                                ? "wrapper"
                                : ""
                            }
                          >
                            <View
                              className="label"
                              dangerouslySetInnerHTML={{
                                __html: t.label ? t.label + ":" : ""
                              }}
                            ></View>
                            <View
                              className="value"
                              dangerouslySetInnerHTML={{
                                __html: t.value ? t.value : ""
                              }}
                            ></View>
                          </View>
                        </View>
                      );
                    })
                  : ""}
                {data.hasOwnProperty("accordion") && data.accordion === true ? (
                  <View
                    onClick={() => {
                      let t = [...accOpen];
                      t[index] = !t[index];
                      setOpen(t);
                    }}
                    className="accordion"
                  >
                    {accOpen[index] ? "收起" : "展开"}
                    <AtIcon
                      className="accordion_icon"
                      value={accOpen[index] ? "chevron-up" : "chevron-down"}
                    ></AtIcon>
                  </View>
                ) : (
                  ""
                )}
                {props.children ? (
                  <View
                    key={index}
                    onClick={e => {
                      if (e && e.stopPropagation)
                        //因此它支持W3C的stopPropagation()方法
                        e.stopPropagation();
                      else {
                        //否则，我们需要使用IE的方式来取消事件冒泡
                        window.event.cancelBubble = true;
                      }

                      let fun = onItemFooterClick;
                      if (fun) fun(item, index);
                    }}
                    className="card_footer"
                  >
                    {props.children}
                  </View>
                ) : (
                  ""
                )}
              </View>
            </View>
          );
        })}
      </View>
    </Root>
  );
};

export { Comp_CardList_02 };
