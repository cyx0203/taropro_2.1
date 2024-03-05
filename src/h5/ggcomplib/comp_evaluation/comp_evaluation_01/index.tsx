import { useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Root,CPSLB } from '@/GGCompLibBase';
import './style/index.scss';
import { AtButton, AtTag } from 'taro-ui';
const CPSNAME = 'comp_evaluation_01';
const Comp_Evaluation_01 = 
forwardRef( 
  (props: any,ref) => {

    useImperativeHandle(ref, () => ({
      value() {
        const value = {imgActive:imgRef.current,subList:subList}
        return value;
      }
    }))
  
    //数据
    const data = props.config;
    const type = props.type;
    const onItemClick = props.onClick;
    const onSubListClick = props.onSubListClick;
    const onButtonClick = props.onButtonClick;

    const [subList,setSub] = useState(data.evaluateData.listData[data.evaluateData.listData.length-1].subList)
    const [imgActive,setImg] = useState(new Array(data.evaluateData.listData.length).fill(0));

    const imgRef:any=useRef(); // 用来同步更新imgActive

    // 初始化Icon评价
    const setImgActive=()=>{
      const temp = data.evaluateData.listData
      let t = [...imgActive]
      for(let i=0;i<temp.length;i++){
        t[i] = temp[i].value;
      }
      imgRef.current=t;
      setImg(t);
      // console.log(t)
      // console.log(imgRef)
    }

    // 点击Icon评价
    const changeImgActive=(index,i,item)=>{
      let t = [...imgActive]
      t[index] = i+1;
      setImg(t);
      imgRef.current=t;
      let fun = onItemClick;
      if(fun) fun(item,index,t)
    }

    useEffect(() => {
        setImgActive();
        return () => { };
    }, []);

    return <Root className={props.className} cpsName={CPSNAME}>
      {
        !data.evaluateData.content?'':
        <View className='mainPart'>
          {
            data.evaluateData.listData.map((item,index)=>{
              return(
                <View className='card' key={index}>
                <View className='card_top' dangerouslySetInnerHTML={{__html:item.label?item.label:''}}/>
                <View className='card_body at-row'>
                  {
                    data.evaluateData.content.map((t,i)=>{
                      return(
                        <View className='card_body_content at-col' key={i}
                        onClick={()=>{
                          changeImgActive(index,i,t);
                          
                        }}>
                        <Image className='card_img' src={(i+1)===imgActive[index]?t.activeIcon:t.inactiveIcon}></Image>
                        <Text className='card_txt' dangerouslySetInnerHTML={{__html:t.text?t.text:''}}/>
                      </View>
                      )
                      
                    })
                  }
                </View>
              </View>
              )
              
            })
          }
        </View>
      }
      {
        !data.evaluateData.listData[data.evaluateData.listData.length-1].subList?'':
        <View className='subPart'>
          {
            data.evaluateData.listData[data.evaluateData.listData.length-1].subList?
            data.evaluateData.listData[data.evaluateData.listData.length-1].subList.map((item,index)=>{
              return(
                <AtTag key={index} name={item.label} active={subList[index].value} circle type='primary'
                onClick={(name,active)=>{
                  let temp = [...subList]
                  temp[index].value = !temp[index].value;
                  setSub(temp)
                  let fun = onSubListClick;
                  if(fun) fun(name,index)
                }}>{item.label}</AtTag>
              )
              
            }):''
          }
        </View>
      }
        
        {
          data.btn?<AtButton type='primary' className='btn'
          onClick={()=>{
            let fun = onButtonClick;
            if(fun) fun(imgActive,subList)
          }}
          >{data.btn.txt}</AtButton>:''
        }
        
    </Root>
}
)

export { Comp_Evaluation_01 }