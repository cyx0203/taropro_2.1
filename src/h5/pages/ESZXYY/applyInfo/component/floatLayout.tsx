import React, { useEffect, useRef, useState } from "react";
import { AtFloatLayout, AtCheckbox, } from "taro-ui";
import {
  View,
  Image,
  Swiper,
  SwiperItem,
  Radio,
  Picker,
  Text,
  Label,
  Checkbox,
  CheckboxGroup, Button
} from "@tarojs/components";
import styles from "./style/index.module.scss";
import { Root } from "@/GGPageRoot";

var list = [];

export default function floatLayout(props) {
  const [activeList, setActiveList] = useState<any>([]);
  const [checkAllVal, setCheckAllVal] = useState(false);
  const [flag, setFlag] = useState(false);


  useEffect(() => {
    list = props.optionList.map((t, i) => {
      return {
        value: t.id,
        label: `${i + 1}.${t.label}`,
        checked: props.actived.includes(t.value)
      }
    })
    setActiveList(props.actived);
    if (props.actived.length === list.length) {
      setFlag(true);
    }
    return () => {
    };
  }, [props, checkAllVal]);

  // 底部弹框关闭
  const handleClose = (e) => {
    props.close();
  }


  const checkboxAllOnChange = (val) => {
    if (val.detail.value.length > 0) { // 全选了
      setFlag(true);
      // 保存
      var getIds = list.map(t => t.value);
      setActiveList(getIds);
    } else { // 取消全选了
      setFlag(false);
      // 保存
      setActiveList([]);
    }

  }

  // 全选中了 设置反选
  const checkboxOnChange = (val) => {
    setActiveList(val.detail.value);
    setFlag(val.detail.value.length === list.length);
  }


  // 确定
  const toSure = () => {
    props.change(activeList);
  }

  const isChecked = (val) => {
    return activeList.includes(val);
  }


  return (
    <Root hashData={styles}>
      <View className={styles.floatLayout}>
        <AtFloatLayout isOpened={props.isOpen} title="复印内容（可多选）" onClose={handleClose}>
          {/*<AtCheckbox*/}
          {/*  options={list}*/}
          {/*  selectedList={activeList}*/}
          {/*  onChange={atCheckboxChange}*/}
          {/*/>*/}

          {/*<View>---{JSON.stringify(flag)}---</View>*/}

          <CheckboxGroup onChange={checkboxAllOnChange}>
            <Label key={'0'}>
              <Checkbox className='checkbox-list__checkbox' checked={flag}
                        value={'0'}>全套病案</Checkbox>
            </Label>
          </CheckboxGroup>

          <View>
            <CheckboxGroup style={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }} onChange={checkboxOnChange}>
              {
                list.map((item, i) => {
                  return (
                    <Label style={{
                      width: '49%',
                      margin: '5px 0'
                    }} key={i}>
                      <Checkbox value={item.value} checked={isChecked(item.value)}>{item.label}</Checkbox>
                    </Label>
                  )
                })
              }
            </CheckboxGroup>
          </View>


          <View className={styles.foot}>
            <Button className={styles.btn} onClick={toSure}>
              确 认
            </Button>
          </View>

        </AtFloatLayout>
      </View>
    </Root>
  );
}
