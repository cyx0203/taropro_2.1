import { useState, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Root,CPSLB } from '@/GGCompLibBase';
import './style/index.scss';
import { AtButton, AtDivider, AtIcon } from 'taro-ui';
const CPSNAME = 'comp_table_02';
const Comp_Table_02 = (props: any) => {
    //数据
    const data = props.config;
    const onItemClick = props.onClick;

    useEffect(() => {
        return () => { };
    }, []);

    // 卡片每列列明
    const itemlist = Object.keys(data.body[0])

    const wid=(item)=>{
        let str =  item.ratio?100*item.ratio+'%':'';
        // console.log(str)
        return str;
    }

    return <Root className={props.className} cpsName={CPSNAME}>
        <View className='table'>
        <View className='at-row cardhead breakWord'>
        {
          data.head.map((item,index)=>{
            return(
              <View className='tableBorder' style={{display:'flex',justifyContent:item.align?item.align:'',width:wid(item)}} key={index} dangerouslySetInnerHTML={{__html:item.title?item.title:'按钮'}}></View>
            )
          })
        }
        </View>
      <View className='cardcontent'>
      {
          data.body.map((item,index)=>{
            return(
              <View key={index}>
                  <View className='at-row flexCenter'>
                  {
                      data.optBtns?
                      data.head.slice(0,data.head.length-1).map((t,i)=>{
                          return(
                                <View key={i} className='breakWord tableBorder' style={{display:'flex',justifyContent:t.align?t.align:'',width:wid(t)}} dangerouslySetInnerHTML={{__html:item[itemlist[i]]}}></View>
                          )
                      }):data.head.map((t,i)=>{
                        return(
                              <View key={i} className='breakWord tableBorder' style={{display:'flex',justifyContent:t.align?t.align:'',width:wid(t)}} dangerouslySetInnerHTML={{__html:item[itemlist[i]]}}></View>
                        )
                    })
                  }
                  {
                      data.optBtns?
                      <View className='tableBorder' style={{display:'grid',justifyContent:data.head[data.head.length-1].align?data.head[data.head.length-1].align:'',width:wid(data.head[data.head.length-1])}}>
                      <AtButton className='btn'  onClick={()=>{
                        let fun = onItemClick;
                        if(fun) fun(item,index)
                      }} type='primary'>{data.optBtns[0].text}</AtButton>
                      </View>:''
                  }
              </View>
              
              </View>
            )
          })
        }
      </View>
        </View>
    </Root>
}

export { Comp_Table_02 }