import React, { useEffect, useRef, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
import {
  Button,
  View,
  WebView,
  Image,
  Picker,
  Input,
  Text
} from "@tarojs/components";
import { Current } from "@tarojs/taro";
import { Comp_Result } from "@/GGH5/ggcomplib";
import {
  AtIcon,
  AtTabs,
  AtTabsPane,
  AtTextarea,
  AtImagePicker,
  AtButton,
  AtToast
} from "taro-ui";
import _ from "lodash";
export default function main() {
  const GPage = usePage({
    pageName: "h5_pages_IH_advise_index",
    ndaExcute: (nda: any) => {
      // GPage.SetState(
      //   [nda.resultData],
      //   () => {
      //     setResultData(nda.resultData);
      //   },
      //   () => {
      //     console.error("NDA设置出错");
      //   }
      // );
    }
  });
  const [tabCurrent, setTabCurrent] = useState(GPage.Data.tabCurrent || 0);
  const [typeSelected, setTypeSelected] = useState(GPage.Data.adviseType[0]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [text, setText] = useState("");
  const [imgFiles, setImgFiles] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  useEffect(() => {
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  const tidySelectorData = (data: Array<{ label?: string }>) => {
    let arr = [];
    if (data) {
      for (let i = 0; i < data.length; i++) arr[i] = data[i].label;
    }

    return arr;
  };
  return (
    <Root hashData={styles}>
      <View className={styles.advise}>
        <AtTabs
          current={tabCurrent}
          tabList={GPage.Data.tabList}
          onClick={e => {
            setTabCurrent(e);
          }}
        >
          <AtTabsPane current={0} index={0}>
            <Picker
              mode="selector"
              range={tidySelectorData(GPage.Data.adviseType)}
              onChange={e => {
                setTypeSelected(GPage.Data.adviseType[e.detail.value]);
              }}
            >
              <View className={styles.adviseFormItem}>
                <View className={styles.label}>信件类型：</View>
                <View className={styles.value}>
                  {typeSelected.label}
                  <AtIcon value="chevron-right" size={18} />
                </View>
              </View>
            </Picker>
            <View className={styles.adviseFormItem}>
              <View className={styles.label}>姓名：</View>
              <Input
                className={styles.formInput}
                onInput={e => {
                  setName(e.detail.value);
                }}
                value={name}
              />
            </View>
            <View className={styles.adviseFormItem}>
              <View className={styles.label}>联系电话：</View>
              <Input
                className={styles.formInput}
                onInput={e => {
                  setNumber(e.detail.value);
                }}
                value={number}
              />
            </View>
            <View className={styles.formBlock}>
              <View className={styles.blockLable}>
                <View className={styles.line} />
                写信
              </View>
              <AtTextarea
                className={styles.textarea}
                value={text}
                onChange={e => {
                  setText(e);
                }}
                maxLength={120}
                placeholder="请填入你想说的话"
              />
            </View>
            {GPage.Data.hasUpDateImg && (
              <View className={styles.formBlock}>
                <View className={styles.blockLable}>
                  <View className={styles.line} />
                  上传图片
                </View>
                <AtImagePicker
                  files={imgFiles}
                  onChange={e => {
                    setImgFiles(e);
                  }}
                />
              </View>
            )}

            <AtButton
              className={styles.submitBtn}
              onClick={() => {
                let flag = false;
                let result = {
                  name,
                  text,
                  number,
                  type: typeSelected,
                  imgFiles
                };
                !GPage.Data.hasUpDateImg && delete result.imgFiles;
                for (const key in result) {
                  if (_.isEmpty(result[key])) {
                    setToastOpen(true);
                    flag = false;
                    break;
                  } else {
                    flag = true;
                  }
                }
                flag && GPage.DoWXCall("submitClick", result);
              }}
            >
              提交
            </AtButton>
          </AtTabsPane>
          <AtTabsPane current={1} index={1}>
            {GPage.Map(
              GPage.Data.adviseDataList,
              (item, index) => {
                return (
                  <View
                    className={styles.adviseCard}
                    key={`advise-key-${index}`}
                  >
                    <View className={styles.head}>
                      <Text>{item.title}</Text>
                      <Text className={styles.status}>{item.status}</Text>
                    </View>
                    <View className={styles.content}>
                      <View className={styles.text}>
                        {GPage.Map(
                          item.info,
                          val => {
                            return (
                              <View className={styles.infoItem}>
                                <Text>{val.label}:</Text>
                                <Text>{val.value}</Text>
                              </View>
                            );
                          },
                          null
                        )}
                      </View>
                      <View className={styles.btn}>
                        {GPage.Map(
                          item.btns,
                          (btn, btnIndex) => {
                            return (
                              <AtButton
                                className={styles.btnItem}
                                onClick={() => {
                                  GPage.DoWXCall(
                                    "checkClick",
                                    item,
                                    index,
                                    btn,
                                    btnIndex
                                  );
                                }}
                              >
                                {btn.txt}
                              </AtButton>
                            );
                          },
                          null
                        )}
                      </View>
                    </View>
                  </View>
                );
              },
              null
            )}
          </AtTabsPane>
        </AtTabs>
        <AtToast
          isOpened={toastOpen}
          onClose={() => {
            setToastOpen(false);
          }}
          text="请将内容填写完整！"
          icon="alert-circle"
          duration={1500}
        />
      </View>
    </Root>
  );
}
