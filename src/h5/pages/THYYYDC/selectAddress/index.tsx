import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtButton, AtIcon,AtList, AtListItem,AtDivider  } from "taro-ui";
//原生组件
import { View, Picker  } from "@tarojs/components";


//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_THYYYDC_selectAddress_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.addressList],
        () => {
          setList(nda.addressList);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.buttonTxt],
        () => {
          setButtonTxt(nda.buttonTxt);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.default_index],
        () => {
          setDIndex(nda.default_index);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  //定义state
  const [addressList, setList] = useState<any>(GPage.Data.addressList?GPage.Data.addressList:'');

  const [default_index, setDIndex] = useState<Number>(GPage.Data.default_index?GPage.Data.default_index:0);

  const [buttonTxt,setButtonTxt] = useState(GPage.Data.buttonTxt?GPage.Data.buttonTxt:'')

  useEffect(() => {
    
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  return (
    <Root hashData={styles}>
      <View className={styles.selectAddress}>
        <View className={styles.addressList}>
        {
          addressList.map((item,index)=>{
            return(
              <View className={styles.block} 
              // style={{backgroundColor:index===default_index?'powderblue':'#fff'}}
              style={{backgroundColor:'#fff'}}
              >
                <View className={'at-row'}
                onClick={()=>{
                  GPage.DoWXCall('onContentClick',item,index)
                }}>
                <View className={'at-col at-col-12'}
                >
                  <View className={styles.content_row1}>{item.address?item.address:''}</View>
                  <View className={styles.content_row2}>{item.name?item.name:''}&emsp;{item.sex?item.sex:''}&emsp;{item.phone?item.phone:''}</View>
                </View>
                </View>
                  
                <AtDivider lineColor={'darkgray'} customStyle={{height:'15px'}}></AtDivider>
                <View className={styles.content_bottom+' at-row'}>
                  <View className={styles.bottom_col1+" at-col at-col-9"}
                  onClick={()=>{
                    GPage.DoWXCall('onSelectClick',item,index)
                  }}
                  >
                  {
                    index===default_index?
                    <AtIcon value='star-2' color='#FAD203'></AtIcon>
                    :<AtIcon value='star'></AtIcon>
                  }
                  {
                    index===default_index?
                    <View>&emsp;默认地址</View>
                    :<View>&emsp;设为默认地址</View>
                  }
                  </View>
                  <View className={styles.bottom_icon+' at-col at-col-3'}>
                  <AtIcon value='edit' 
                    onClick={()=>{
                      GPage.DoWXCall('onEditClick',item,index)
                    }}></AtIcon>
                  <AtIcon value='subtract-circle'
                    onClick={()=>{
                      GPage.DoWXCall('onDeleteClick',item,index)
                    }}
                  ></AtIcon>
                </View>
                </View>
              </View>
            )
          })
        }
        </View>

        <View style={{display:'flex',justifyContent:'center'}}>
        <AtButton className={styles.footer} type='primary' size='small' circle
          onClick={()=>{
            GPage.DoWXCall('addAdressClick')
          }}
        >{buttonTxt}</AtButton>
        </View>

      </View>
    </Root>
  );
}
