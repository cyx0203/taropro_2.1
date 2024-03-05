import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

//获取平台信息
const platform: string = Taro.getEnv();
//创建组件根结点元素
const Root = (props: any) => {
  //root结点上的样式名：
  //====格式：root-端名（全小写）-组件名 额外样式名1 额外样式名2
  // const cls: string = `root-${platform.toLowerCase()}-${props.cpsName}` + ` ${props.className}`;
  //暂时定义如下样式命名结构
  const cls: string = `root-${platform.toLowerCase()}`;
  return <View className={props.hashData[cls]}>{props.children}</View>;
};

export { Root };
