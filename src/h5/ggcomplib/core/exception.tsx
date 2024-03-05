// import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

//组件渲染异常时，返显的统一内容
const defaultMsg: string = '组件调用失败';
const Exception = (props: any) => {
    return <View style='color:red;font-size:18px'>
        {`${props.compName}:${props.errorMsg ? props.errorMsg : defaultMsg }`}
    </View>
}

export { Exception }