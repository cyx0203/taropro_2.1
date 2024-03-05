import { useState, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Root,CPSLB } from '@/GGCompLibBase';
import './style/index.scss';
import { AtButton, AtDivider, AtIcon } from 'taro-ui';
const CPSNAME = 'comp_btnlist_normal';
const Comp_BtnList_Normal = (props: any) => {
    //数据
    const data = props.config;
    const type = props.type;
    const onItemClick = props.onClick;

    useEffect(() => {
        return () => { };
    }, []);

    return <Root className={props.className} cpsName={CPSNAME}>
        <View className='container'>
        <View className='at-row flexCenter'>
            {
              data.title?(
            data.titleIcon?
            <View className='at-col at-col-1 flexCenter'>
              {
                  data.titleIcon!='line'?<Image className='icon' src={data.titleIcon}></Image>
                  :(<View className='line'></View>)
              }
          </View>:''):''
            }
            {/* <View className='at-col at-col-1'></View> */}
            <View className='at-col' dangerouslySetInnerHTML={{__html:data.title}}></View>
        </View>
        <View className='btnBorder'>
        {
            data&&data.listData ?
                data.listData.map((item,index)=>{
                    return(
                    <View className='GGBtnList'>
                    <View className='btnlist at-row' onClick={()=>{
                        let fun = onItemClick;
                        if(fun) fun(item,index)
                    }}>
                        <View className='at-col at-col-2 flexCenter'>{item.icon?<Image className='icon' src={item.icon}></Image>:''}</View>
                        <View className='at-col at-col-6 fontClass'>{item.label}</View>
                        <View className='at-col at-col-2'>{data.btn?<AtButton customStyle={{}} circle size='small' type='secondary'>{data.btn}</AtButton>:''}</View>
                        <View className='at-col at-col-2'>{data.hasOwnProperty('arrow')&&data.arrow===true?<AtIcon value='chevron-right'></AtIcon>:''}</View>
                    </View>
                    {
                        index===data.listData.length-1?'':<View className='dividerCenter'><AtDivider></AtDivider></View>
                    }
                    </View> 
                    )
                })
            : '导航组件数据出错!'
        }
        </View>
        </View>
    </Root>
}

export { Comp_BtnList_Normal }