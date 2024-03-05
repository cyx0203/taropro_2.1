import { useState, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Root, CPSLB } from '@/GGCompLibBase';
import './style/index.scss';

const Comp_Nav_Normal = (props: any) => {
    //导航栏数据
    const [list] = useState(props.config.list);
    //点击事件
    const onClickHandle: any = useRef<Function>();

    //内置资源的映射数据
    const RES_MAP: any = [
        { in: '@index1', out: 'index_1.svg' },
        { in: '@index2', out: 'index_2.svg' },
        { in: '@uc1', out: 'uc_1.svg' },
        { in: '@uc2', out: 'uc_2.svg' }
    ]

    //获取ICON当前要展示的资源真实路径
    const getIconRes = (item: any) => {
        if (item && item.hasOwnProperty('active') && item.active === true) return CPSLB.CpsRes(item.active_img_url, props.CPS_FULL_NAME, RES_MAP);
        return CPSLB.CpsRes(item.normal_img_url, props.CPS_FULL_NAME);
    }

    useEffect(() => {
        onClickHandle.current = props.config.onClick;
        return () => { };
    }, []);

    return <Root className={props.className} cpsName={props.CPS_NAME}>
        {
            list ? list.map((item: any, index: any) => {
                return <View key={index} className='item' onClick={() => {
                    if (onClickHandle) onClickHandle.current(item, index);
                }}>
                    <Image src={getIconRes(item)} className='icon' />
                    <Text className='label' dangerouslySetInnerHTML={{ __html: item.text }} />
                </View>
            }) : '导航组件数据出错!'
        }
    </Root>
}

export { Comp_Nav_Normal }