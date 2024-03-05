import React, { useEffect, useState } from "react";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
//引入模版结点组件
import { Root } from "@/GGPageRoot";
//引入样式
import styles from "./style/index.module.scss";
//TaroUI的组件
import { AtButton, AtBadge, AtDivider,AtList,AtListItem, AtInput,AtIcon  } from "taro-ui";
//原生组件
import { View, Swiper, SwiperItem, Image, Text,Button,Picker,Input } from "@tarojs/components";
//自定义组件
import { Comp_Nav } from "@/GGCompLib";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_THYYYDC_settlement_index",
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.note],
        () => {
          setNote(nda.note);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.selectChecked],
        () => {
          setSelect(nda.selectChecked);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.list],
        () => {
          setList(nda.list);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.delivery],
        () => {
          setDelivery(nda.delivery);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.default_address],
        () => {
          setDefault_address(nda.default_address);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.selector],
        () => {
          setPayment(nda.selector);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.note_tags],
        () => {
          setTags(nda.note_tags);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.tips],
        () => {
          setTips(nda.tips);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.count_price],
        () => {
          setCountPrice(nda.count_price);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.package_price],
        () => {
          setPackagePrice(nda.package_price);
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  //定义state
  const [note, setNote] = useState<any>(GPage.Data.default_notes?GPage.Data.default_notes:'');

  const [list,setList] = useState(GPage.Data.settlement_list?GPage.Data.settlement_list:{})

  const [delivery,setDelivery] = useState(GPage.Data.delivery?GPage.Data.delivery:'')

  const [default_address,setDefault_address] = useState(GPage.Data.default_address?GPage.Data.default_address:'')

  const [selector,setPayment] = useState(GPage.Data.payment?GPage.Data.payment:[])

  const [selectChecked,setSelect] = useState<any>(GPage.Data.default_payment?GPage.Data.default_payment:'')

  const [note_tags,setTags] = useState(GPage.Data.note_tags?GPage.Data.note_tags:[])

  const [tips,setTips] = useState(GPage.Data.tips?GPage.Data.tips:'')

  const [count_price,setCountPrice] = useState(GPage.Data.count_price?GPage.Data.count_price:'')

  const [package_price,setPackagePrice] = useState(GPage.Data.package_price?GPage.Data.package_price:'')

  const [inputFocus,setFocus] = useState(false)

  const onInput=(e)=>{
    setNote(e.detail.value)
  }

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
      <View className={styles.settlement}>
        <View className={styles.head}>
          <View className={styles.head_1+" at-row"}>收货地址</View>
          <View className={styles.head_2}>
            {
              default_address&&JSON.stringify(default_address)!=='{}'?
              <View className='at-row'
              onClick={()=>{
                GPage.DoWXCall('editAdressClick')
              }}
              >
                <View className={styles.head2_content+' at-col at-col-10'}>{default_address.address}<br/>{default_address.name}&emsp;{default_address.phone}</View>
                <View className={styles.head2_icon+' at-col at-col-2'}><AtIcon value='chevron-right'></AtIcon></View>
              </View>
              :<AtButton customStyle={{width:'80%',marginTop:'10px'}} type='primary' size='small' circle
              onClick={()=>{
                GPage.DoWXCall('addAdressClick')
              }}
            >+ 新增收件地址</AtButton>
            }
          </View>
        </View>

        <View className={styles.list}>
          <View className={styles.list_title} dangerouslySetInnerHTML={{__html:list.title}}></View>
         
          <AtDivider customStyle={{height:'10px'}}></AtDivider>
          <View className={styles.list_subtitle}>
            <View className={styles.list_subtitle_line}></View>
            <View>{list.subtitle}</View>
          </View>
          <View className={styles.list_content}>
            {
              JSON.stringify(list)==='{}'?'':
              list.content.map((item,index)=>{
                return(
                  <View className={styles.list_content_item}>
                    <View style={{display:'flex',alignItems:'center'}}>
                    <View style={{display:'flex',marginRight:'10px'}}><Image className={styles.list_img} src={item.img}></Image></View>
                    <View>
                      <View className={styles.list_name} dangerouslySetInnerHTML={{__html:item.name}}></View>
                      <View className={styles.list_num} dangerouslySetInnerHTML={{__html:`x${item.num}`}}></View>
                    </View>
                    </View>
                    <View className={styles.list_price} dangerouslySetInnerHTML={{__html:item.price}}></View>
                  </View>
                )
              })
            }
          </View>
          <AtDivider customStyle={{height:'10px'}}></AtDivider>
          <View className={styles.list_footer_count} dangerouslySetInnerHTML={{__html:`本单共计商品${list.count}件`}}></View>
          <View className={styles.list_footer_price} dangerouslySetInnerHTML={{__html:`总计:${list.count_price}`}}></View>
        </View>

        <View className={styles.foodDelivery}>
          <View>送餐时间</View>
          <View style={{display:'flex'}}>
            <View>{delivery.date}</View>
            <View>&emsp;{delivery.time}</View>
          </View>
        </View>

        <View className={styles.payment}>
              <Picker mode='selector' range={selector} onChange={(e)=>{
                console.log(e.detail.value);
                setSelect(selector[e.detail.value])
              }}>
                <AtList hasBorder={false}>
                  <AtListItem title='支付方式' hasBorder={false} extraText={(selectChecked?selectChecked:'请选择')} />
                </AtList>
              </Picker>
        </View>

        {
          note_tags.length>0?
          <View className={styles.note}>
          <View style={{fontSize:'20px'}}>备注</View>
          <Input className={styles.note_input} name="note" maxlength={50} value={note}
          focus={inputFocus}
          onBlur={()=>setFocus(false)}
          onInput={(e)=>{onInput(e)}}></Input>
          <View style={{display:'flex'}} className={'at-row at-row--wrap'}>
            {
              note_tags.map((item,index)=>{
                return(
                  <AtButton className={styles.note_button} size='small' circle
                    onClick={()=>{
                      setFocus(true)
                      if(!note) setNote(item);
                      else setNote(note+','+item)
                    }}
                  >{item}</AtButton>
                )
              })
            }
          </View>
        </View>
          :''
        }
        

        <View className={styles.tips}>
          <View style={{fontSize:'15px'}}>温馨提示</View>
          <View style={{fontSize:'15px'}} dangerouslySetInnerHTML={{__html:tips}}></View>
        </View>
        <View className={styles.pay+' at-row'}>
            <View className={styles.pay_1+' at-col at-col-9'}>
              <Image className={styles.pay_img} src={GPage.Data.pay_img}></Image>
              <View style={{alignItems:'center',display:'grid'}}>
                <View style={{fontSize:'15px'}}>{count_price}</View>
                <View style={{fontSize:'6px'}}>含打包费{package_price}元</View>
              </View>
            </View>
            <View style={{fontSize:'20px'}} className={styles.pay_2+' at-col at-col-3'}
              onClick={()=>{
                GPage.DoWXCall('onPayClick',
                {
                  list:GPage.Data.settlement_list,
                  date:GPage.Data.delivery.date,
                  time:GPage.Data.delivery.time,
                  payment:selectChecked,
                  note:note
                })
              }}
            >去结算</View>
        </View>
      </View>
    </Root>
  );
}
