import { useState, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Root, CPSLB } from '@/GGCompLibBase';
import './style/index.scss';

const Comp_DateBar_Normal = (props: any) => {
    //导航栏数据
    const data = props.config;
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

    useEffect(() => {
        onClickHandle.current = props.config.onItemClick;
        return () => { };
    }, []);

    // 横向滚动条转
    const scrollintoView=(e)=>{
        var element = document.elementFromPoint(e.clientX,e.clientY);
        // console.log('e',element)
        element.scrollIntoView({behavior: "smooth",inline:'start'}); // 居中则center
    }

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
                    // console.log('t',e)
                    scrollintoView(e);
                }}>
                    {
                        data.direction&&data.direction==='01'?
                        <View>
                            <Text className='label at-row' dangerouslySetInnerHTML={{ __html: item.date }} />
                            <Text className='label at-row' dangerouslySetInnerHTML={{ __html: item.week }} />
                        </View>
                        :<View>
                            <Text className='label at-row' dangerouslySetInnerHTML={{ __html: item.week }} />
                            <Text className='label at-row' dangerouslySetInnerHTML={{ __html: item.date }} />
                        </View>
                    }
                    
                    {/* <Text className='label' dangerouslySetInnerHTML={{ __html: item.flag }} /> */}
                </View>
            }) : '日期组件数据出错!'
        }
        </View>
    </Root>
}

export { Comp_DateBar_Normal }