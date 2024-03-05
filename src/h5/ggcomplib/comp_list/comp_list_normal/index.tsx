import { useState, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { AtButton, AtDivider,AtIcon } from 'taro-ui';
import { Root } from '@/GGCompLibBase';
import './style/index.scss';
const CPSNAME = 'comp_list_normal';
const Comp_List_Normal = (props: any) => {
    //导航栏数据
    const [list] = useState(props.config.list);
    //点击事件
    const onClickHandle: any = useRef<Function>();

    //获取ICON当前要展示的资源真实路径
    // const getIconRes = (item: any) => {
    //     if (item && item.hasOwnProperty('active') && item.active === true) return item.active_img_url;
    //     return item.normal_img_url;
    // }

    useEffect(() => {
        onClickHandle.current = props.config.onClick;
        return () => { };
    }, []);

    const rightClass=()=>{
        // let cn = ''
        if(props.config.btntxt) return 'at-col at-col-3'
        return props.config.center?'at-col at-col-9':'at-col at-col-9 rightCol'
      }

    return <Root className={props.className} cpsName={CPSNAME}>
        {
            list ? list.map((item: any, index: any) => {
                return (
                    <View className='GGList'>
                        <View  key={index}>
                        <View className='at-row' style={{alignItems:'center'}}>
                          <View className={props.config.btntxt?'at-col at-col-6':'at-col at-col-3'} style={{paddingLeft:'10px'}}>{item.label}</View>
                          <View className={rightClass()} style={{paddingRight:'10px'}}>
                            <View dangerouslySetInnerHTML={{__html:item.value}}></View>
                            </View>
                            <View className='at-col at-col-3'><AtButton circle type='primary' size='small'
                                onClick={() => {
                                    if (onClickHandle) onClickHandle.current(item, index);
                                }}>{props.config.btntxt}</AtButton></View>
                        </View>
                        {
                          !props.config.divider?'':(index===list.length-1?'':
                          <AtDivider customStyle={{height:'20px'}}></AtDivider>)
                        }
                        </View>
                    </View>
                )
            }) : '导航组件数据出错!'
        }
    </Root>
}

export { Comp_List_Normal }