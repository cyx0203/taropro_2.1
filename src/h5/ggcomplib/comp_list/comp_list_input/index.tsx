import { useState, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { AtDivider,AtInput } from 'taro-ui';
import { Root } from '@/GGCompLibBase';
import './style/index.scss';
const CPSNAME = 'comp_list_input';
const Comp_List_Input = (props: any) => {
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
        return props.config.center?'at-col at-col-9':'at-col at-col-9 rightCol'
      }

    return <Root className={props.className} cpsName={CPSNAME}>
        {
            list ? list.map((item: any, index: any) => {
                return (
                    <View className='GGList'>
                        <View>
                        <View className='at-row' style={{alignItems:'center'}}>
                          <View className='at-col at-col-3' style={{paddingLeft:'10px'}}>{props.inputTitle}</View>
                          <View className={rightClass()} style={{paddingRight:'10px'}}><AtInput name='' onChange={(value)=>{}} value='' placeholder='请输入'></AtInput></View>
                        </View>
                        {
                          !props.divider?'':
                          <AtDivider customStyle={{height:'0px'}}></AtDivider>
                        }
                        </View>
                    </View>
                )
            }) : '导航组件数据出错!'
        }
    </Root>
}

export { Comp_List_Input }