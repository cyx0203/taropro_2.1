import { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import { Root, CPSLB } from '@/GGCompLibBase';
import './style/index.scss';
const CPSNAME = 'comp_result_normal';
const Comp_Result_Normal = (props: any) => {
    //数据
    const data = props.config;
    const DEFAULT_TITLE: string = '默认主标题';
    const DEFAULT_SUBTITLE: string = '默认副标题';

    useEffect(() => {
        return () => { };
    }, []);

    //内置资源的映射数据
    const RES_MAP: any = [
        { in: '@fail', out: 'fail.svg' },
        { in: '@empty', out: 'empty.svg' },
        { in: '@success', out: 'success.svg' }
    ]

    //获取ICON当前要展示的资源真实路径
    const getIconRes = () => {
        if (data.hasOwnProperty('icon')) return CPSLB.CpsRes(data.icon, props.CPS_FULL_NAME, RES_MAP);
    }

    return <Root className={props.className} cpsName={CPSNAME}>
        {
            data ?
                <View className='GGResult'>
                    <View className='imgContainer flexCenter'><Image className='img' src={getIconRes()}></Image></View>
                    <View className='at-row flexCenter title' dangerouslySetInnerHTML={{ __html: data.title ? data.title : DEFAULT_TITLE }}></View>
                    {
                        data.subTitle?<View className='at-row flexCenter subTitle' dangerouslySetInnerHTML={{ __html: data.subTitle ? data.subTitle : DEFAULT_SUBTITLE }}></View>
                        :''
                    }
                    
                </View> : 'Result组件数据出错!'
        }
    </Root>
}

export { Comp_Result_Normal }