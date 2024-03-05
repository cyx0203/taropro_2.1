//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
import {
  AtTabBar,
  AtSearchBar,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton,
  AtBadge,
  AtList,
  AtListItem,
  AtRadio,
  AtIcon,
  AtDivider,
  AtInput
} from "taro-ui";
import { View, Image, Label, Text } from "@tarojs/components";
import React, { useState, useEffect, useImperativeHandle, useRef } from "react";
import { isEmpty } from "lodash";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;
const GGUtil_NAN_DATA_EXCUTE = (dt, dt2) => {
  if (dt !== undefined && dt !== null) return dt;
  return dt2;
};
// const RES_MAP: any = [
//     { in: '@fail', out: 'fail.svg' },
//     { in: '@empty', out: 'empty.svg' },
//     { in: '@success', out: 'success.svg' }
// ]
// //获取ICON当前要展示的资源真实路径
// const getIconRes = (data) => {
//   if (data.hasOwnProperty('icon')) return CPSLB.CpsRes(data.icon, props.CPS_FULL_NAME, RES_MAP);
// }

const GGCPS_TopBar = React.forwardRef((props: any, ref: any) => {
  const [state, setState] = useState({
    mode: GGUtil_NAN_DATA_EXCUTE(props.mode, ""),
    inforContent: GGUtil_NAN_DATA_EXCUTE(props.inforContent, ""),
    searchValue: GGUtil_NAN_DATA_EXCUTE(props.searchValue, ""),
    searchPlaceholder: GGUtil_NAN_DATA_EXCUTE(props.searchPlaceholder, "搜索"),
    searchOnclick: GGUtil_NAN_DATA_EXCUTE(props.searchOnclick, () => {}),
    doctorInfor: GGUtil_NAN_DATA_EXCUTE(props.doctorInfor, {})
  });
  useEffect(() => {
    return () => {};
  }, []);
  useImperativeHandle(ref, () => ({}));
  const onChange = value => {
    setState({
      ...state,
      searchValue: value
    });
  };

  return (
    <Root hashData={styles}>
      <View
        className={`${styles.gpage_topbar_block} ${
          props.className ? props.className : ""
        }`}
        style={{
          display: state.mode && !isEmpty(state.mode) ? "flex" : "none"
        }}
      >
        {/* 模式：search */}
        {state.mode === "search" ? (
          <AtSearchBar
            className={styles.searchBar}
            placeholder={state.searchPlaceholder}
            value={state.searchValue}
            onChange={value => onChange(value)}
            onActionClick={() => {
              setState({
                ...state,
                searchValue: ""
              });
              state.searchOnclick(state.searchValue);
            }}
          />
        ) : (
          ""
        )}
        {/* 模式：user */}
        {state.mode === "infor" ? (
          <View className={styles.gpage_infor}>{state.inforContent}</View>
        ) : (
          ""
        )}
        {/* doctorInfor数据，此处因为要再次覆盖数据修改，因此用props */}
        {state.mode === "doctorInfor" ? (
          <View className={styles.gpage_doctor_main}>
            <Image
              src={props.doctorInfor.pic}
              className={styles.gpage_doctor_img}
            />
            <View className={styles.gpage_doctor_infor_block}>
              <View className={styles.gpage_doctor_infor}>
                <View className={styles.gpage_doctor_infor_name}>
                  {props.doctorInfor.name}
                </View>
                <View className={styles.gpage_doctor_infor_identity}>
                  {props.doctorInfor.identity}
                </View>
              </View>
              <View className={styles.gpage_doctor_identification_block}>
                <Image
                  src={`${RES}/assets/icon/identification.svg`}
                  className={styles.gpage_identification}
                />
                <View>已认证</View>
              </View>
            </View>

            {props.doctorInfor.msg ? (
              <View
                className={styles.gpage_doctor_msg}
                onClick={() => {
                  const func = props.doctorInfor.msg.onClick;
                  if (func) func();
                }}
              >
                <AtBadge dot={props.doctorInfor.msg.state}>
                  <Image
                    className={styles.header_right_img}
                    src={`${RES}/assets/icon/message_prue_white.svg`}
                  />
                </AtBadge>
              </View>
            ) : (
              ""
            )}
          </View>
        ) : (
          ""
        )}
        {state.mode === "patientInfor" ? (
          <View className={styles.gpage_patient_main}>
            <Image
              src={props.patientInfor.pic}
              className={styles.gpage_patient_img}
            />
            <View className={styles.gpage_patient_infor_block}>
              <View className={styles.gpage_patient_infor}>
                <View className={styles.gpage_patient_infor_name}>
                  {props.patientInfor.name}
                </View>
                <View className={styles.gpage_patient_infor_extra1}>
                  {props.patientInfor.extra1}
                </View>
              </View>
              <View className={styles.gpage_doctor_identification_block}>
                <View className={styles.gpage_patient_infor_extra2}>
                  {props.patientInfor.extra2}
                </View>
              </View>
            </View>
          </View>
        ) : (
          ""
        )}
      </View>
    </Root>
  );
});
const GGCPS_Switch = React.forwardRef((props: any, ref: any) => {
  const [state, setState] = useState({
    status: false,
    blockTxt: ""
  });

  const mainClx = useRef<string>();
  const blockClx = useRef<string>();
  const onClick = useRef<Function>();
  const content = props.content;
  useEffect(() => {
    console.log(styles);
    mainClx.current = "main_close";
    blockClx.current = "block_close";
    setState({
      status: false,
      blockTxt: content[0].txt
    });
    return () => {};
  }, []);

  return (
    <Root hashData={styles}>
      <View
        className={`${styles.gpage_switch} ${
          props.className ? props.className : ""
        }`}
        onClick={() => {
          if (state.status) {
            mainClx.current = "main_close";
            blockClx.current = "block_close";
            onClick.current = props.onClick(false, content[0], 0);
            setState({
              status: false,
              blockTxt: content[0].txt
            });
          } else {
            mainClx.current = "main_open";
            blockClx.current = "block_open";
            onClick.current = props.onClick(true, content[1], 1);
            setState({
              status: true,
              blockTxt: content[1].txt
            });
          }
        }}
      >
        <View className={styles[mainClx.current]}></View>
        <View className={styles[blockClx.current]}>{state.blockTxt}</View>
      </View>
    </Root>
  );
});

const GGCPS_NavBar = React.forwardRef((props: any, ref: any) => {
  const [state, setState] = useState({
    tabNav: props.tabNav,
    navIndex: -1,
    tabNavClick: props.tabNavClick
  });

  useEffect(() => {
    for (let i = 0; i < state.tabNav.length; i++) {
      const item = state.tabNav[i];
      if (item.hasOwnProperty("selected") && item.selected === true) {
        setState({
          ...state,
          navIndex: i
        });
      }
    }
    return () => {};
  }, []);

  return (
    <Root hashData={styles}>
      <AtTabBar
        className={styles.gpage_navbar}
        fixed
        backgroundColor="#fff"
        color="#545454"
        tabList={state.tabNav}
        onClick={index => {
          let func = state.tabNavClick;
          if (func) func(state.tabNav[index], index);
        }}
        current={state.navIndex}
      />
    </Root>
  );
});

const GGCPS_Copywriter = (type: string) => {
  let str = "";
  if (type === "result_empty") str = "暂无数据";

  return str;
};
const GGCPS_Result = React.forwardRef((props: any, ref: any) => {
  const emptyImg = `${RES}/assets/img/empty.svg`;
  const successImg = `${RES}/assets/img/success.svg`;
  const failImg = `${RES}/assets/img/fail.svg`;

  const [state, setState] = useState({
    text: props.text,
    cImg: emptyImg,
    cls: "img"
  });

  const type = props.type;
  // _cImg.current = '';
  useEffect(() => {
    let _cImg = "";
    let _text = props.text;

    if (type === "empty") {
      _cImg = emptyImg;
      if (!props.text) {
        _text = GGCPS_Copywriter("result_empty");
      }
    }
    if (type === "success") _cImg = successImg;
    if (type === "fail") _cImg = failImg;

    setState({
      text: _text,
      cls: type === "empty" ? "img2" : "img",
      cImg: _cImg
    });
    return () => {};
  }, []);

  return (
    <Root hashData={styles}>
    <View className={styles.gpage_result}>
      <Image className={styles[state.cls]} src={state.cImg} />
      <View className={styles.text}>{state.text}</View>
    </View>
    </Root>
  );
});

const GGCPS_Modal = React.forwardRef((props: any, ref: any) => {
  const defaultFooter = (
    <AtModalAction>
      <View
        className={styles.gpage_modal_default_footer}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "10px",
          marginBottom: "10px"
        }}
      >
        <AtButton
          type="secondary"
          size="normal"
          onClick={() => {
            const func = state.onCancel;
            if (func) func();
            setState({
              ...state,
              show: false
            });
          }}
        >
          取消
        </AtButton>
        <AtButton
          type="primary"
          size="normal"
          onClick={() => {
            const func = state.onConfirm;
            if (func) func();
          }}
        >
          确定
        </AtButton>
      </View>
    </AtModalAction>
  );
  const [state, setState] = useState({
    show: false,
    title: "",
    content: "",
    onCancel: GGUtil_NAN_DATA_EXCUTE(props.onCancel, () => {}),
    onConfirm: GGUtil_NAN_DATA_EXCUTE(props.onConfirm, () => {}),
    footer: GGUtil_NAN_DATA_EXCUTE(props.footer, defaultFooter),
    className: GGUtil_NAN_DATA_EXCUTE(props.className, "")
  });
  useEffect(() => {
    return () => {};
  }, []);
  useImperativeHandle(ref, () => ({
    opt: (show, title, content) => {
      setState({
        ...state,
        title: title,
        content: content,
        show: show
      });
    }
  }));
  return (
    <View className={styles[state.className]} catchMove>
      <AtModal
        isOpened={state.show}
        className={styles[state.className]}
        onClose={() => {
          setState({
            ...state,
            show: false
          });
        }}
      >
        <AtModalHeader>{state.title}</AtModalHeader>
        <AtModalContent>{state.content}</AtModalContent>
        {state.footer}
      </AtModal>
    </View>
  );
});
const GGCPS_DropDown = React.forwardRef((props: any, ref: any) => {
  const SWClick = useRef<Function>();
  const dataList = props.content || [];
  const [current, setCurrent] = useState(dataList[0]?.txt || "未设值");
  const [isShow, setShow] = useState(false);
  useEffect(() => {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].hasOwnProperty("default") && dataList[i].default) {
        setCurrent(dataList[i]?.txt);
      }
    }
    return () => {};
  }, []);

  return (
    <Root hashData={styles}>
      <View
        className={`${styles.gpage_dropdown} ${
          props.className ? props.className : ""
        }`}
      >
        <View
          className={styles.current}
          onClick={() => {
            setShow(!isShow);
          }}
        >
          {current}
          <AtIcon
            value="chevron-down"
            color="#aaa"
            className={isShow ? `${styles.chevronAni}` : `${styles.chevron}`}
          />
        </View>
        <View className={`${styles.dataList} ${isShow ? styles.aniShow : ""}`}>
          {dataList.length > 0
            ? dataList.map((item, index) => {
                return (
                  <View
                    key={index}
                    className={styles.item}
                    onClick={() => {
                      SWClick.current = props.onClick(item, index);
                      setShow(!isShow);
                      setCurrent(item.txt);
                    }}
                  >
                    <Image src={item.icon} className={styles.deptIcon} />
                    <Text>{item.txt}</Text>
                  </View>
                );
              })
            : "未设值"}
        </View>
      </View>
    </Root>
  );
});
export {
  GGCPS_TopBar,
  GGCPS_Switch,
  GGCPS_NavBar,
  GGCPS_Result,
  GGCPS_Modal,
  GGCPS_DropDown
};
