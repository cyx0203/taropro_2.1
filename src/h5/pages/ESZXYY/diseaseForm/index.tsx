import React, { useEffect, useState } from "react";
import {
  AtButton,
  AtIcon,
  AtImagePicker,
  AtInput,
  AtTextarea,
  AtToast
} from "taro-ui";
import {
  View,
  Image,
  Form,
  Input,
  Button,
  Textarea,
  Picker,
  Text,
  RadioGroup,
  Label,
  Radio
} from "@tarojs/components";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import { Root } from "@/GGPageRoot";
import { Comp_Menu, Comp_Nav } from "@/GGCompLib";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import styles from "./style/index.module.scss";
import _ from "lodash";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_ESZXYY_diseaseForm_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      // GPage.SetState(
      //   [nda.agreeMent],
      //   () => {
      //     setagreeMent(nda.agreeMent);
      //   },
      //   () => {
      //     console.error("NDA设置出错");
      //   }
      // );
    }
  });
  const [upDateFileNAT, setFileNAT] = useState([]);
  const [imgArr, setImgArr] = useState([]);
  const [form1, setForm1] = useState("");
  const [form2, setForm2] = useState("");
  const [form3, setForm3] = useState("");
  const [form4, setForm4] = useState("");
  const [form5, setForm5] = useState("");
  const [toastData, setToastData] = useState({});
  useEffect(() => {
    return () => {
    };
  }, []);
  //对应：onReady
  useReady(() => {
  });

  //对应：onShow
  useDidShow(() => {
  });

  //对应：onHide
  useDidHide(() => {
  });

  // const getBase64 = async (img: any) => {
  //   // const reader = new FileReader();
  //   // reader.addEventListener("load", () => callback(reader.result));
  //   // reader.readAsDataURL(img);
  //
  //   let oFileReader = new FileReader();
  //   oFileReader.onloadend = async (e) => {
  //     // base64结果
  //     const base64 = e.target.result;
  //     console.log('11111111', base64)
  //     return base64
  //   };
  //   oFileReader.readAsDataURL(img);
  // };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      let fileResult: any = "";
      reader.readAsDataURL(file); //开始转
      reader.onload = () => {
        fileResult = reader.result;
      }; //转 失败
      reader.onerror = (error) => {
        reject(error);
      }; //转 结束  咱就 resolve 出去
      reader.onloadend = () => {
        resolve(fileResult);
      };
    });
  }

  const patientInfo = GPage.Data.patientInfo;
  return (
    <Root hashData={styles}>
      <View className={styles.diseaseForm}>
        <View
          className={styles.headerArea}
          style={{
            backgroundImage: `url(${GPage.Data.assets.titleBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }}
        >
          <View className={styles.title}>预问诊卡</View>
          <View className={styles.subtitle}>
            <Image className={styles.tipsIcon} src={GPage.Data.assets.tips}/>
            您的信息仅用于医院（带*号的为必填项）
          </View>
        </View>
        <View className={styles.FormArea1}>
          <View className={styles.infoArea}>
            <Image src={GPage.Data.assets.user} className={styles.userImg}/>
            <View className={styles.txtinfo}>
              <Text className={styles.info} style={{textAlign: "left"}}>
                患者：{patientInfo.name}
              </Text>
              <Text className={styles.info} style={{textAlign: "center"}}>
                {patientInfo.gender}
              </Text>
              <Text className={styles.info} style={{textAlign: "right"}}>
                {patientInfo.age}岁
              </Text>
            </View>
          </View>
          <View className={styles.form_label}>
            <View className={styles.formAsterisk}>*</View>
            病情描述：
          </View>
          <AtTextarea value={form1} onChange={e => setForm1(e)}></AtTextarea>
        </View>

        <View className={styles.form_label} style={{marginLeft: "15px"}}>
          <View className={styles.formAsterisk}>*</View>
          其他信息补充
          <Text className={styles.formtip}>（如没有可填写“无”）</Text>
        </View>
        <View className={styles.FormArea2}>
          <View className={styles.formItem}>
            <Text className={styles.formLabel}>既往病史</Text>
            <Input
              value={form2}
              onInput={e => setForm2(e.detail.value)}
              className={styles.formInput}
            />
          </View>
          <View className={styles.formItem}>
            <Text className={styles.formLabel}>过敏史</Text>
            <Input
              value={form3}
              onInput={e => setForm3(e.detail.value)}
              className={styles.formInput}
            />
          </View>
          <View className={styles.formItem}>
            <Text className={styles.formLabel}>家族病史</Text>
            <Input
              value={form4}
              onInput={e => setForm4(e.detail.value)}
              className={styles.formInput}
            />
          </View>
          <View className={styles.formItem}>
            <Text className={styles.formLabel}>不良嗜好</Text>
            <Input
              value={form5}
              onInput={e => setForm5(e.detail.value)}
              className={styles.formInput}
            />
          </View>
        </View>
        <View className={styles.form_label} style={{marginLeft: "15px"}}>
          请上传病症图片
        </View>
        <View className={styles.FormArea3}>
          <View className={styles.upDateArea}>
            <AtImagePicker
              count={3}
              files={upDateFileNAT}
              onChange={(val: any) => {
                if (val.length < 6) {
                  setFileNAT(val);
                } else {
                  let obj = {
                    isOpened: true,
                    text: "最多上传5张图片！",
                    icon: "alert-circle"
                  };
                  setToastData(obj);
                }
              }}
              onFail={() => {
                let obj = {
                  isOpen: true,
                  text: "上传失败",
                  icon: ""
                };
                setToastData(obj);
              }}
            />
          </View>
        </View>
        <AtButton
          className={styles.submitBtn}
          onClick={async () => {

            let obj = {
              allergic_history: form3,
              anamnesis: form2,
              family_medical_history: form4,
              bad_addiction: form5,
              disease: form1,
              imgBase64: []
            };
            for (let i = 0; i < upDateFileNAT.length; i++) {
              let res = await getBase64(upDateFileNAT[i].file.originalFileObj);
              obj.imgBase64.push(res);
              // getBase64(
              //    upDateFileNAT[i].file.originalFileObj,
              //    (imageUrl: any) => {
              //      obj.imgBase64.push(imageUrl);
              //    }
              //  );
            }
            GPage.DoWXCall("submitClick", obj);
          }}
        >
          <Image className={styles.submitIcon} src={GPage.Data.assets.submit}/>
          提交
        </AtButton>
        <AtToast
          isOpened={toastData.isOpened}
          {...toastData}
          onClose={() => {
            setToastData(pre => {
              pre.isOpened = false;
              return pre;
            });
          }}
        ></AtToast>
      </View>
    </Root>
  );
}
