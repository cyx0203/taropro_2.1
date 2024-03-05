import { View, Text, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtIcon } from "taro-ui";
import styles from "./style/index.module.scss";
import { noop, repeat } from "lodash/fp";
import { Root } from "../../core/root";

interface GridBtnProps {
  /**
   * 数据源
   */
  config: Array<{
    icon?: string;
    image?: string;
    value: string;
    active?: boolean;
  }>;
  /**
   * 每一行多少个
   * @default 3
   */
  rowNum?: number;
  /**
   * 点击事件
   */
  onItemClick?: (item: Object, index?: Number, e?: any) => void;

  /**
   *是否支持展开
   * 默认 false
   */
  expansion: boolean;
}

function GridBtn(props: GridBtnProps) {
  const { config, rowNum, expansion } = props;
  const [showData, setShowData] = useState(props.config || []);
  const [activeBtn, setActiveBtn] = useState({ value: "查看全部" });
  const [itemNum] = useState(rowNum * 2);

  useDidShow(() => {
    if (expansion) {
      if (
        props.config &&
        props.config.length > 0 &&
        props.config.length > itemNum
      ) {
        let hanArr = props.config.slice(0, itemNum - 1);
        hanArr.push({ value: "查看全部" });
        setShowData(hanArr);
      } else {
        setShowData(props.config);
      }
    }
  });

  useEffect(() => {
    if (expansion) {
      if (
        props.config &&
        props.config.length > 0 &&
        props.config.length > itemNum
      ) {
        let hanArr = props.config.slice(0, itemNum - 1);
        hanArr.push(activeBtn);
        setShowData(hanArr);
      } else {
        setShowData(props.config);
      }
    }
  }, [props]);

  return (
    <Root hashData={styles}>
      <View
        className={styles.GridBtn}
        style={{ gridTemplateColumns: `${repeat(props.rowNum, "auto ")}` }}
      >
        {showData &&
          showData.length > 0 &&
          showData.map((item: any, index) => {
            return (
              <View
                key={`girdbtn--${index}`}
                className={`${styles.btnItem} ${
                  item?.active ? styles.active : ""
                } ${item?.disabled ? styles.btnDisabled : ""}`}
                onClick={e => {
                  e.stopPropagation();
                  // 禁用
                  if (item.disabled) {
                    return;
                  }

                  let arr = [...showData];
                  for (let i = 0; i < arr.length; i++) {
                    arr[i].active = false;
                  }
                  arr[index].active = true;
                  setShowData(arr);

                  if (item.value === "查看全部") {
                    setShowData([...config, { value: "收起" }]);
                    setActiveBtn(pre => {
                      pre = { value: "收起" };
                      return pre;
                    });
                  } else if (item.value === "收起") {
                    setShowData([
                      ...config.slice(0, itemNum - 1),
                      { value: "查看全部" }
                    ]);
                  } else {
                    props?.onItemClick &&
                      props.onItemClick !== noop &&
                      props.onItemClick(item, index, e);
                  }
                }}
              >
                {/* 暂时没碰到有图标的场景 */}
                {item?.icon && (
                  <AtIcon
                    value={item?.icon}
                    className={styles.btnIcon}
                    size={12}
                  />
                )}
                {item?.image && (
                  <Image src={item?.image} className={styles.btnImg} />
                )}
                {item.value === "查看全部" || item.value === "收起" ? (
                  <Text className={styles.btnTxt2}>{item.value}</Text>
                ) : (
                  <Text className={styles.btnTxt}>{item.value}</Text>
                )}

                {item?.active && (
                  <View className={styles.selected}>
                    <AtIcon
                      value="check"
                      color="#fff"
                      customStyle={{ fontSize: "10px" }}
                      className={styles.selectedIcon}
                    />
                  </View>
                )}

                {item.disabled && (
                  <View className={styles.masking_class}>无号</View>
                )}
              </View>
            );
          })}
      </View>
    </Root>
  );
}

GridBtn.defaultProps = {
  rowNum: 3,
  expansion: false
};

export default GridBtn;
