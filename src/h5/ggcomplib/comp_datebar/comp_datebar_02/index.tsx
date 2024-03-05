import { useState, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Root, CPSLB } from '@/GGCompLibBase';
import './style/index.scss';

const Comp_DateBar_02 = (props: any) => {
    //导航栏数据
    const list = props.config.listData;
    //点击事件
    const onClickHandle: any = useRef<Function>();

    //内置资源的映射数据
    const RES_MAP: any = [
        { in: '@date', out: 'date.svg' },
        { in: '@doctor', out: 'doctor.svg' },
        { in: '@office', out: 'office.svg' },
    ]

    //获取ICON当前要展示的资源真实路径
    const getIconRes = (url: any) => {
        return CPSLB.CpsRes(url, props.CPS_FULL_NAME, RES_MAP);
    }

    // 横向滚动跳转
    const scrollintoView=(e)=>{
        var element = document.elementFromPoint(e.clientX,e.clientY);
        // console.log('e',element)
        element.scrollIntoView({behavior: "smooth",inline:'start'}); // 居中则center
    }

    useEffect(() => {
        onClickHandle.current = props.config.onItemClick;
        return () => { };
    }, []);

    return <Root className={props.className} cpsName={props.CPS_NAME}>
        {
            props.config.title?
            <View className='titleGp'>
                {props.config.titleIcon&&<Image src={getIconRes(props.config.titleIcon)} className='icon' />}
                <Text className='title' dangerouslySetInnerHTML={{ __html: props.config.title }} />
            </View>
            :''
        }
        
        <View className='barGp'>
        {
            list ? list.map((item: any, index: any) => {
                return <View className={item.hasOwnProperty('active') && item.active === true?'item item-active':'item'} onClick={(e) => {
                    if (onClickHandle) onClickHandle.current(item, index);
                    scrollintoView(e);
                }}>
                    <Text className='label' dangerouslySetInnerHTML={{ __html: item.week }} />
                    <Text className='date' dangerouslySetInnerHTML={{ __html: item.date }} />
                </View>
            }) : '日期组件数据出错!'
        }
        </View>
    </Root>
}

export { Comp_DateBar_02 }