import { useState, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Root,CPSLB } from '@/GGCompLibBase';
import './style/index.scss';
const CPSNAME = 'comp_menu_02';
const Comp_Menu_02 = (props: any) => {
    //数据
    const data = props.config;
    const type = props.type;
    const onItemClick = props.onClick;

    useEffect(() => {
        return () => { };
    }, []);

    return <Root className={props.className} cpsName={CPSNAME}>
        <View className='container flexCenter'>
            <View className='GGMenu flexCenter' onClick={()=>{
                    let fun= onItemClick
                    if(fun) fun(data)
                }}>
                <Image mode='widthFix' className='icon' src={data.icon}></Image>
            </View>
            <View className='fontClass flexCenter'>{data.title}</View>
        </View>
    </Root>
}

export { Comp_Menu_02 }