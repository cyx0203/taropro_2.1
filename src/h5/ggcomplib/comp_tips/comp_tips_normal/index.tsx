import { useState, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Root,CPSLB } from '@/GGCompLibBase';
import './style/index.scss';
const CPSNAME = 'comp_tips_normal';
const Comp_Tips_Normal = (props: any) => {
    //数据
    const data = props.config;
    const type = props.type;

    useEffect(() => {
        return () => { };
    }, []);

    //内置资源的映射数据
    const RES_MAP: any = [
        { in: '@tip', out: 'tip.svg' },
        { in: '@warn', out: 'warn.svg' },
    ]

    //获取ICON当前要展示的资源真实路径
    const getIconRes = () => {
        if (data.hasOwnProperty('icon')) return CPSLB.CpsRes(data.icon, props.CPS_ROOT_NAME, RES_MAP);
        // return CPSLB.CpsRes(item.normal_img_url, props.CPS_FULL_NAME);
    }

    return <Root className={props.className} cpsName={CPSNAME}>
        {
            data ? <View className='GGTips'>
                <View className='at-row'>
                    {
                        data.icon?<View className='at-col at-col-1 flexCenter'>
                        <Image src={getIconRes()} className='icon' />
                        </View>:''
                    }
                    <Text className='at-col rowCenter' dangerouslySetInnerHTML={{ __html: data.title }} />
                </View>
                <View className='at-row'>
                    {/* {
                        data.icon?<View className='at-col at-col-2'></View>:''
                    } */}
                    <View className='at-col rowCenter2' dangerouslySetInnerHTML={{ __html: data.content }}></View>
                    {/* <View className='at-col at-col-1'></View> */}
                </View>
                </View> : '温馨提示01组件数据出错!'
        }
    </Root>
}

export { Comp_Tips_Normal }