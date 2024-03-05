import { useState, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Root,CPSLB } from '@/GGCompLibBase';
import './style/index.scss';
import { AtButton, AtDivider, AtIcon } from 'taro-ui';
const CPSNAME = 'comp_cardlist_normal';
const Comp_CardList_Normal = (props: any) => {
    //数据
    const data = props.config;
    const onItemClick = props.onClick;
    const onItemClick2 = props.onClick2;
    const onItemFooterClick = props.onFooterClick;
    const onCardClick = props.onCardClick

    useEffect(() => {
        console.error(props.className);
        // console.log('data',data)
        return () => { };
    }, []);

    return <Root className={props.className} cpsName={CPSNAME}>
        <View className='cardlist'>
            {
                data.listData.map((t,i)=>{
                    return(
                        <View className='card' key={i}
                        onClick={()=>{
                            let fun = onCardClick
                            if(fun) fun(t,i)
                        }}
                        >
            <View className='cardTop at-row flexCenter'>
                {
                    t.titleIcon?<View className='cardTop_icon flexCenter'><Image className='icon' src={t.titleIcon?t.titleIcon:''}></Image></View>:''
                }
                {/* <View className='cardTop_content'> */}
                <View className='fontClass-title'>{t.title?t.title:''}</View>
                {
                    t.titleRight?<View className='fontClass-sm'>{t.titleRight?t.titleRight:''}</View>
                    :''
                }
                
                {/* </View> */}
            </View>
            <View className='cardBottom'>
                <View className='at-row'>
                {/* <View className='at-col at-col-8'> */}
                <View>
                {
                    t.contents.map((item,index)=>{
                        return(
                            <View className='at-row fontClass-content' key={index}>
                                <View className='label' dangerouslySetInnerHTML={{__html:item.label?item.label:''}}></View>
                                <View className='value' dangerouslySetInnerHTML={{__html:item.value?item.value:''}}></View>
                            </View>
                        )
                    })
                }</View>
                {
                    data.hasOwnProperty('arrow')&&data.arrow===true?
                    <View className='at-col at-col-4 arrow' style={{}}>
                        <AtIcon className='iconSize' value='chevron-right' customStyle={{}}></AtIcon>
                    </View>:
                    t.btns&&t.btns.length>0?
                        <View className='at-col at-col-4 gridCenter' style={{'display':t?.btns?'':'none'}}>
                    {
                            t.btns.map((item,index)=>{
                                return(
                                <View className='btn' key={index}>
                                    <AtButton type='primary' size='small' onClick={(e)=>{
                                        if ( e && e.stopPropagation ) 
                                        //因此它支持W3C的stopPropagation()方法 
                                        e.stopPropagation(); 
                                    else { 
                                        //否则，我们需要使用IE的方式来取消事件冒泡 
                                        window.event.cancelBubble = true;
                                      }


                                        if(index===0){
                                        let fun = onItemClick
                                        if(fun) fun(t,i,item)}
                                        else {
                                            let fun = onItemClick2
                                            if(fun) fun(t,i,item)
                                        }
                                    }
                                    }
                                    >{item.btnName}</AtButton>
                                </View>
                                )
                            })
                    }</View>:''
                    
                    // <View className='at-col at-col-4 gridCenter' style={{'display':t?.btns?'':'none'}}>
                    // {
                    //         t.btns?
                    //         t.btns.map((item,index)=>{
                    //             return(
                    //             <View className='btn' key={index}>
                    //                 <AtButton type='primary' size='small' onClick={(e)=>{
                    //                     if ( e && e.stopPropagation ) 
                    //                     //因此它支持W3C的stopPropagation()方法 
                    //                     e.stopPropagation(); 
                    //                 else { 
                    //                     //否则，我们需要使用IE的方式来取消事件冒泡 
                    //                     window.event.cancelBubble = true;
                    //                   }


                    //                     if(index===0){
                    //                     let fun = onItemClick
                    //                     if(fun) fun(t,i,item)}
                    //                     else {
                    //                         let fun = onItemClick2
                    //                         if(fun) fun(t,i,item)
                    //                     }
                    //                 }
                    //                 }>{item.btnName}</AtButton>
                    //             </View>
                    //             )
                    //         })
                    //         :''
                    // }
                    
                // </View>
                }
                </View>
                {
                    props.children?
                    <View key={i} onClick={
                        (e)=>{
                            if ( e && e.stopPropagation ) 
                                  //因此它支持W3C的stopPropagation()方法 
                                  e.stopPropagation(); 
                              else { 
                                  //否则，我们需要使用IE的方式来取消事件冒泡 
                                  window.event.cancelBubble = true;
                                }
                        let fun = onItemFooterClick
                        if(fun) fun(t,i)}} className='card_footer'>{props.children}</View>:''
                }
            </View>
            </View>
                    )
                })
            }
            
        </View>
    </Root>
}

export { Comp_CardList_Normal }