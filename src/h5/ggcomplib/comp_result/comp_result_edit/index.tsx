import { useState, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { AtButton, AtDivider,AtIcon } from 'taro-ui';
import { Root } from '@/GGCompLibBase';
import './style/index.scss';
const CPSNAME = 'comp_result_edit';
const Comp_Result_Edit = (props: any) => {
    //导航栏数据
    const [data] = useState(props.config);

    useEffect(() => {
        return () => { };
    }, []);

    

    return <Root className={props.className} cpsName={CPSNAME}>
        {
            data ? 
            <View className='GGResult'>
                <View className='imgContainer flexCenter'><Image className='img' src={data.icon}></Image></View>
                <View className='at-row flexCenter title'>{data.title?data.title:'默认主标题'}</View>
                <View className='at-row flexCenter subTitle'>{data.subTitle?data.subTitle:'默认副标题'}</View>
            </View> : 'Result组件数据出错!'
        }
    </Root>
}

export { Comp_Result_Edit }