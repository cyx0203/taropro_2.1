import { useState, useEffect, useRef } from 'react';
import { View, Image, Text, Radio } from '@tarojs/components';
import { Root,CPSLB } from '@/GGCompLibBase';
import './style/index.scss';
import { AtButton, AtDivider, AtIcon,AtModal,AtModalContent } from 'taro-ui';
const CPSNAME = 'comp_userEcard_01';
const Comp_UserECard_01 = (props: any) => {
    //数据
    const data = props.config;
    const type = props.type;
    const onItemClick = props.onClick;
    const onDefaultClick = props.onDefaultClick;
    const onAddClick = props.onAddClick;

    const [cardCheck,setCardCheck] = useState(new Array(data.list.length).fill(false));

    useEffect(() => {
        setRadio();
        return () => {};
    }, [data.card.defaultIndex]);

    const setRadio=()=>{
        let temp = new Array(data.list.length).fill(false);
        temp[data.card.defaultIndex] = true;
        setCardCheck(temp);
        // console.log('c',cardCheck)
    }

    const getClass=(index)=>{
        if(index===0) return 'firstRow';
        else return 'otherRow'
    }

    //获取ICON当前要展示的资源真实路径
    const getIconRes = (typ,url) => {
        return CPSLB.CpsRes(url, props.CPS_FULL_NAME);
    }

    const rClick=(index)=>{
        let temp = new Array(cardCheck.length).fill(false);
        temp[index] = true;
        setCardCheck(temp);
        let fun = onDefaultClick;
        if(fun) fun(data.list[index],index)
    }

    const ctClick=(index)=>{
        let fun = onItemClick;
        if(fun) fun(data.list[index],index)
    }

    return <Root className={props.className} cpsName={CPSNAME}>
        {
            data.list.map((t,i)=>{
                
                return(
                    <View className='card' key={i}>
            <View className='cardTop'
              style={{
                    backgroundImage: cardCheck[i]?`url(${getIconRes('active',data.card.activeCardBg)})`:`url(${getIconRes('inactive',data.card.inactiveCardBg)})`,
                    // backgroundSize:'cover',
                    // zIndex:'1',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    // filter:"grayscale(100%)",
                }}
              onClick={()=>ctClick(i)} 
            >
                <View className='cardTxt'>
                {
                    t.map((item,index)=>{
                        return(
                            <View className={getClass(index)} key={index}>{item.key?item.key:''}{item.key!=''?':':''}{item.value?item.value:''}</View>
                        )
                    })
                }</View>
                {
                    props.children?
                    <View key={i} className='ECard_content'>{props.children}</View>:''
                }
            </View>
            <View className='cardBottom' onClick={()=>rClick(i)}><Radio className='cardRadio' style={{display:'flex',alignItems:'center'}} checked={cardCheck[i]}></Radio>{cardCheck[i]?data.card.activeText:data.card.inactiveText}</View>
            {
               t.extend?
               <View className='card_extend'>{t.extend}</View>:''
            }
        </View>
                )
            })
        }
        {
            data.addBtn?<View style={{}}>
            <AtButton
              disabled={data.addBtn.enable?!data.addBtn.enable:true}
              type='primary'
              onClick={() => {
                let func = onAddClick;
                if (func) func();
              }}
              className='bottombt'
            >
                <View className='flexCenter'>
                  {
                      data.addBtn.icon?<Image className='img' src={getIconRes('icon',data.addBtn.icon)}></Image> :''
                  }
              {data.addBtn.text?data.addBtn.text:''}
              </View>
            </AtButton>
            </View>:''
        }
        
    </Root>
}

export { Comp_UserECard_01 }