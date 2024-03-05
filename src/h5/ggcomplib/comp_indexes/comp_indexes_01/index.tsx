import { useState, useEffect, useRef } from 'react';
import { View, Image, Text, ScrollView } from '@tarojs/components';
import { Root,CPSLB } from '@/GGCompLibBase';
import './style/index.scss';
import { AtTabs,AtTabsPane,AtGrid,AtIndexes,AtSearchBar, AtButton } from 'taro-ui';
const CPSNAME = 'comp_indexes_01';
const Comp_Indexes_01 = (props: any) => {
    //数据
    const data = props.config;
    const type = props.type;
    const onItemClick = props.onClick;

    const list = data;

    useEffect(() => {
        getIconRes();

        setElement();
        
        return () => { };
    }, []);

    // 设置属性
    const setElement=()=>{
      let ele = document.getElementsByClassName('at-indexes__menu-item');
        for(let i=0;i<ele.length;i++) {
          let value = ele[i].innerHTML.substring(7)
          ele[i].setAttribute("id",value)
          document.getElementById(value).onclick=function(){
            let key = value
            scrollIntoView(key)
          }
        }
    }


    //获取ICON当前要展示的资源真实路径
    const getIconRes = () => {
      
    }

    const onClick=(item)=>{
      let fun = onItemClick
      if(fun) fun(item)
    }

    let scrollIntoView=(key)=>{
      if(key==='Top') key = list[0].key;
      let txt = 'at-indexes__list-'+key
      // console.log(txt)
     document.getElementById(txt).scrollIntoView({behavior: "smooth"});
    }

    

    const handleActionClick=(value)=>{
      console.log('value',value)
      scrollIntoView && scrollIntoView(value)
    }

    return <Root className={props.className} cpsName={CPSNAME}>
      
      <AtIndexes
        list={list}
        onClick={onClick.bind(this)}
        // onScrollIntoView={fn => { scrollIntoView = fn }}
      >
        {/* <AtSearchBar onChange={onChange.bind(this)} customStyle={{width:'300px'}} placeholder='跳转到指定Key' onActionClick={handleActionClick.bind(this)} /> */}
        </AtIndexes>

    </Root>
}

export { Comp_Indexes_01 }