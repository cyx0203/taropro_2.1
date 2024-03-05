import React, { useEffect, useState } from "react";
import { View, Image, Text, Input, Textarea } from "@tarojs/components";
import {
  AtDivider, AtImagePicker, AtButton,AtFloatLayout,AtIcon,AtTextarea,AtModal,AtModalHeader, AtModalContent, AtModalAction
} from "taro-ui";
import { useReady, useDidShow, useDidHide } from "@tarojs/taro";
import Taro from '@tarojs/taro';
import { GGWingBlank, GGWhiteSpace, GGCPS_TopBar } from "@/GGCPS";
// import BASE from "@/GGPageBase";
//模板开发中需首先引入该自定义Hooks，以用来调用封装好的各个功能
import { usePage } from "@/GGH5/core/pageHooks";
import { Root } from "@/GGPageRoot";
import styles from "./style/index.module.scss";
// import "~taro-ui/dist/style/index.scss";

//模板主体
export default function main() {
  //GPage对象必须在最前定义和设置
  const GPage = usePage({
    //定义该模版独有的pageName，命名规则：该模版所在相对路径地址，以下划线分割
    pageName: "h5_pages_IH_drawboard_appointment_index",
    //用于接收外部发送的更新数据的事件
    ndaExcute: (nda: any) => {
      //对需要接受被动数据更新的结点（状态机）进行处理
      GPage.SetState(
        [nda.userInfoArray],
        () => {
          setUIA(nda.userInfoArray)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.userInfo],
        () => {
          setUI(nda.userInfo)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.docInfo],
        () => {
          setDI(nda.docInfo)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.files],
        () => {
          setFiles(nda.files)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.valueFZ],
        () => {
          setVFZ(nda.valueFZ)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.valueBQ],
        () => {
          setVBQ(nda.valueBQ)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.symptomList],
        () => {
          setSPL(nda.symptomList)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.symptomIndex],
        () => {
          setSPI(nda.symptomIndex)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.inputValue],
        () => {
          setIV(nda.inputValue)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.fileShow],
        () => {
          setFS(nda.fileShow)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.focusIndex],
        () => {
          setFI(nda.focusIndex)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.checkedList],
        () => {
          setCL(nda.checkedList)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      // GPage.SetState(
      //   [nda.layIndex],
      //   () => {
      //     setLI(nda.layIndex)
      //   },
      //   () => {
      //     console.error("NDA设置出错");
      //   }
      // );
      GPage.SetState(
        [nda.patientinfor],
        () => {
          setPI(nda.patientinfor)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.placeholderArray],
        () => {
          setPA(nda.placeholderArray)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
      GPage.SetState(
        [nda.textList],
        () => {
          setTL(nda.textList)
        },
        () => {
          console.error("NDA设置出错");
        }
      );
    }
  });
  
    const [viewHeight,setView] = useState(1200);
    const [patientinfor,setPI] = useState(GPage.Data.patientinfor);
    const [userInfoArray,setUIA] = useState(['就诊人','身份证','手机号'])
    const [userInfo,setUI] = useState(GPage.Data.userInfo)
    const [docInfo,setDI] = useState(GPage.Data.docInfo)
    const [files,setFiles] = useState([])
    const [valueFZ,setVFZ] = useState('')
    const [valueBQ,setVBQ] = useState('')
    const maxLength = 200
    const [symptomList,setSPL] = useState(GPage.Data.symptomList)
    const [symptomIndex,setSPI] = useState([])//控制打开症状列表
    const [checkedList,setCL] = useState(GPage.Data.symptomList_value.checkedList||[]) // 选择按钮的值
    const [inputValue,setIV] = useState(GPage.Data.symptomList_value.inputValue||[])  // 输入框的值
    const [focusIndex,setFI] = useState([]) // 选中按钮并需要变色的index数组
    const [layIndex,setLI] = useState(-1)//判断为哪一行症状
    const [fileShow,setFS] = useState(true)
    const [placeholderArray,setPA] = useState(GPage.Data.placeholderArray||[])
    const [textList,setTL] = useState(GPage.Data.textList||{})
    const [selectedIndex,setSI] = useState(-1) // 控制初诊复诊相关功能按钮
    const [isModal,setIM] = useState(false)

  useEffect(() => {
    if (Taro.getEnv() === "WEAPP") {
      let windowHeight = wx.getSystemInfoSync().windowHeight;
      setView(windowHeight - 100 );//70
    }

    let temp = [...symptomIndex]
    let temp1 = [...checkedList]
    let temp2 = [...inputValue]
    let temp3 = [...focusIndex]
    
    if(temp.length<1) temp = Array(symptomList.length).fill(false)
    if(temp1.length<1) { // 单独处理，不能Array赋值，否则出现数组同时赋值问题
      // temp1 = Array(symptomList.length).fill([])
      for(let i=0;i<symptomList.length;i++){
        temp1.push([])
      }
    }
    if(temp2.length<1) temp2 = Array(symptomList.length).fill('')
    temp3 = Array(symptomList.length).fill([])

      for(let i=0;i<symptomList.length;i++){ // 互斥行当有文本时删除按钮选项结果
        if(symptomList[i].mutualExclusion) {
          if(temp2[i]&&temp2[i]!='') temp1[i] = []
        }
      }
      setSPI(temp)
      setCL(temp1)
      setIV(temp2)
      setFI(temp3)
      // console.log(focusIndex);
      
    return () => {};
  }, []);

  //对应：onReady
  useReady(() => {});

  //对应：onShow
  useDidShow(() => {});

  //对应：onHide
  useDidHide(() => {});

  //上传图片方法
  const onChange=(files)=>{
    if(files.length>=3) {
      setFS(false)
      files = files.slice(0,3)
    }
    else setFS(true)
    setFiles(files)
    console.log('files为:')
    console.log(JSON.stringify(files))
    
  }
  const onFail=(mes)=>{
    console.log(mes)
  }
  const onImageClick=(index, file)=>{
    console.log(index, file)
  }

  const handleChangeInput=(value,index,item)=>{
    console.log('值为:'+value)
    let temp = inputValue
    temp[index] = value
    if(item.mutualExclusion) { // 文本与按钮互斥
      let temp1 = checkedList
      let temp2 = [...focusIndex]
      console.log(temp2)
      temp1[index] = []
      setCL(temp1) // 清除选中按钮
      setFI(temp2) // 控制选中按钮显示
    }
  }

  const valueChange=(e)=>{
    setVBQ(e)
  }

  const valueChange1=(e)=>{
    setVFZ(e.target.value)
  }

  const close=(index)=>{
      let temp = symptomIndex
      temp[index] = false
      setFI([])
      setSPI(temp)
      console.log('sym为'+JSON.stringify(symptomIndex))
  }

  const func1 = (index,i)=> {
    let temp = checkedList
    console.log(temp)
        if(temp[index].includes(i)==false){
        temp[index].push(i)
      }else{
        for(let a=0;a<temp[index].length;a++){
          if(temp[index][a]==i){
            console.log('a为'+a)
            temp[index].splice(a,1);
            break;
          }
        }
      }
    let temp1 = [...focusIndex]
      setCL(temp)
      setFI(temp1)
  }

  const func2 = (index,i)=> {
    let temp = checkedList;
    // 选择按钮间互斥
    temp[index] = [];
    temp[index][0] = i;

    // 输入框与选择按钮互斥
    let temp2 = inputValue
    temp2[index] = ''
    
    // 继续选择按钮
    let temp1 = [...focusIndex]

    setCL(temp)
    setFI(temp1)
    setIV(temp2)
  }

  return (
    <Root hashData={styles}>
        <GGCPS_TopBar mode="patientInfor"
          className=""
          patientInfor={patientinfor}
          />
          {/* <GGWhiteSpace />
          <GGWingBlank> */}
      <View className={styles.GGWhiteSpace} />
      <View className={styles.GGWingBlank}>
      <View className={styles.appointment_main} style={{ height: viewHeight }}>
        
        <View className={styles.firstcontainer}>
          {/* 第一部分 */}
          <View className='at-row'>
            <View className='at-col at-col-3'>
              <Image className={styles.icoImg} src={docInfo.icon} />
            </View>
            <View className='at-col at-col-9 at9'>
              <View className={"at-row "+styles.nj}>
                <View>{docInfo.name}</View>
                <View>{docInfo.job}</View>
              </View>
              <View className='at-row'>
                <View className={styles.sub}>{docInfo.tTitle}</View>
              </View>
            </View>
          </View>

          {/* 第二部分 */}
          <View>
            {
              userInfoArray.map((item,index)=>{
                return(
                  // 分割线
                  <View key={index}>
                    <AtDivider customStyle={{height:'20px'}} content='' />
                    <View className='at-row'>
                      <View className={'at-col '+styles.padleft+' '+styles.mainTitle}>{item}</View>
                      <View className={'at-col '+styles.textColor} style={{textAlign:'right',paddingRight:'20px'}}>{index===0?userInfo.name:(index===1?userInfo.id:userInfo.phone)}</View>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>

        <View className={styles.firstcontainer}>
          <Text className={styles.padleft+' '+styles.mainTitle+' '+styles.textBold}>问诊类型<Text style={{color:"red"}}>（&ensp;请点击选择&ensp;初诊&ensp;或者&ensp;复诊&ensp;）</Text></Text>
          <AtDivider customStyle={{height:'30px'}} lineColor='#C9C9C9' content='' />
          <View className='at-row'>
            {
              textList.buttonText_1?
              textList.buttonText_1.map((item,index)=>{
                return(
                  <View key={index} className={selectedIndex===index?styles.buttonContainer_selected:styles.buttonContainer} style={{marginRight:index===0?'10px':'0'}}
                    onClick={()=>{
                      setSI(index);
                      if(index===0&&selectedIndex!==0) setIM(true);
                      GPage.DoWXCall(index===0?'firstVistClick':'returnVistClick',index===0?'初诊':(index===1?'复诊':'未选择'))
                    }}
                  >
              <View className={styles.justifyCenter+' '+styles.buttonRow1}>{item[0]}</View>
              <View className={styles.justifyCenter}>{item[1]}</View>
            </View>
                )
              })
              :''
            }
            {/* <View className={selectedIndex===0?styles.buttonContainer_selected:styles.buttonContainer} style={{marginRight:'10px'}}
              onClick={()=>{
                setSI(0)
                if(selectedIndex!==0) setIM(true);
              }}
            >
              <View className={styles.justifyCenter+' '+styles.buttonRow1}>初诊</View>
              <View className={styles.justifyCenter}>无到院就诊记录</View>
            </View>
            <View className={selectedIndex===1?styles.buttonContainer_selected:styles.buttonContainer}
              onClick={()=>{
                setSI(1)
              }}
            >
              <View className={styles.justifyCenter+' '+styles.buttonRow1}>复诊</View>
              <View className={styles.justifyCenter}>近期在我院或其他医疗机构有就诊记录</View>
            </View> */}
          </View>
          <AtModal
            isOpened={isModal}
            onClose={()=>{setIM(false)}}
            onCancel={()=>{setIM(false)}}
            onConfirm={()=>{setIM(false)}}
          >
            <AtModalHeader><Text style={{fontWeight:'bold'}}>注意事项</Text></AtModalHeader>
              <AtModalContent>
                <View style={{fontWeight:'bold'}} dangerouslySetInnerHTML={{__html:textList.modalContent||''}}>
                  {/* &emsp;&emsp;<Text style={{color:'red'}}>初诊不能开药，仅能咨询</Text><Text>，建议初诊患者线下面诊。</Text> */}
                </View>
              </AtModalContent>
              <AtModalAction><AtButton full customStyle={{color:"cornflowerblue"}} onClick={()=>{setIM(false)}}>确定</AtButton></AtModalAction>
          </AtModal>
        </View>

        <View className={styles.firstcontainer} style={{display:selectedIndex>=0?'':'none'}}>
            <View>
              <Text className={styles.padleft+' '+styles.mainTitle}><Text style={{color:"red"}}>*</Text>问诊主题<Text style={{color:"red"}}>（必填）</Text></Text>
              
              <View style={{padding:'10px 0',width:'100%'}} className='at-row'>
              <View  style={{paddingLeft:'15px',width:'80%'}}>
                <Input type='text' placeholderStyle={"color:#C9C9C9"} placeholder={placeholderArray[0]||'请填写问诊病症'} value={valueFZ} onInput={(e)=>{valueChange1(e)}} maxlength={50} />
              </View>
              <View  style={{textAlign:'right',width:'20%'}}><Text style={{fontSize:'14px',color:'#C9C9C9'}}>&emsp;{valueFZ.length}/50</Text></View>
              </View>

              <AtDivider customStyle={{height:0,marginBottom:'20px'}} content='' />
            </View>

            <View>
              <Text className={'at-row '+styles.padleft+' '+styles.mainTitle}><Text style={{color:"red"}}>*</Text>病情描述<Text style={{color:"red"}}>（必填）</Text></Text>
              <View style={{padding:'10px 0px'}} className='at-row'>
              <View className='at-col at-col-10'>
                <AtTextarea
                  count
                  customStyle={{border:'solid 1px #C5D9E8',width:'120%'}}
                  placeholder={placeholderArray[1]||'请填写病情描述详细信息'} value={valueBQ} onChange={(e)=>{valueChange(e)}} maxLength={200} />
              </View>
              {/* <View className='at-col at-col-2'><Text style={{fontSize:'10px',color:'darkgray'}}>&emsp;{valueBQ.length}/200</Text></View> */}
              </View>
              <AtDivider customStyle={{height:0,marginBottom:'20px'}} content='' />
            </View>

            <View style={{margin:'0 0 40rpx 0'}}>
            <Text className={'at-row '+styles.padleft+' '+styles.mainTitle} style={{margin:'0 0 20rpx 0'}}>其他信息补充</Text>
            <View className={styles.sympotom}>
              {
                symptomList.map((item,index)=>{
                  return(
                    <View key={index}>
                    <AtDivider customStyle={{height:'20px',display:index===0?'none':''}} content='' />
                    <View onClick={()=>{
                      let temp = [...symptomIndex]
                      temp[index] = true

                      //每次重新进入选择都置空
                      // let temp1 = checkedList
                      // temp1[index] = []

                      let temp2 = inputValue
                      // temp2[index] = ''
                      setSPI(temp)
                      // setLI(index)
                      // setCL(temp1)
                      setIV(temp2)
                    }} className='at-row'>
                      <View className={'at-col '+styles.padleft+' '+styles.mainTitle}>{item.label}</View>
                      <View className={'at-col '+styles.textColor+' '+styles.tTitle} style={{textAlign:'right',paddingRight:'20px'}}>{checkedList[index]+(inputValue[index]?' '+inputValue[index]:'')}</View>
                      <AtIcon value='chevron-right' size='25' color='gray'></AtIcon>                    
                    </View>
                    

            <AtFloatLayout isOpened={symptomIndex[index]} title={item.label} 
              onClose={()=>{
                close(index)
              }}
            >
              <View className={styles.symButton}>
              {
                item.value.map((i,k)=>{
                  return(
                    <AtButton key={k}
                      type={checkedList[index]?(checkedList[index].includes(i)?'primary':undefined):undefined}
                      onClick={()=>{
                        item.mutualExclusion?func2(index,i):func1(index,i)
                    }}customStyle={{margin:'5px'}}>{i}</AtButton>
                  )
                })
              }
              <View className='at-row'>
                {
                  symptomIndex[index]?
                  <AtTextarea
                    customStyle={{border:'solid 1px #C5D9E8',width: '75%',height: '80%'}}
                    value={inputValue[index]}
                    onChange={(value,event)=>handleChangeInput(value,index,item)}
                    maxLength={maxLength}
                    count={false}
                    placeholder='自定义输入'
                  />
                  :''
                }
              
                {/* <Input style={{margin:'12px',fontSize:'16px'}} type='text' placeholder='自定义输入' value={inputValue[index]} onInput={e=>handleChangeInput(e,index)} /> */}
                <AtButton type='primary' 
                  onClick={()=>{close(index)}}>确认</AtButton></View>
              </View>
            </AtFloatLayout>
                  </View>
                  )
                })
              }
              </View>
            </View>



            {/* 图片 */}
            <View>
              <View className={styles.padleft+' '+styles.mainTitle}>
                {
                  selectedIndex===0?<Text>添加图片</Text>
                  :<View><Text style={{color:"red"}}>*</Text>添加图片<Text style={{color:"red"}}>（必填）</Text></View>
                }
                {/* <Text style={{color:"red"}}>*</Text>添加图片<Text style={{color:"red"}}>（必填）</Text> */}
                <View>
                {
                  selectedIndex===0?<Text style={{color:"darkgray"}}>{textList.imgTips.firstTips||''}</Text>
                  :selectedIndex===1?<Text style={{color:"darkgray"}}>{textList.imgTips.returnTips||''}</Text>
                  :''
                }
                </View>
              </View>
              <AtImagePicker
                count={5}
                files={files}
                onChange={onChange.bind(this)}
                showAddBtn={fileShow}
              />
            </View>

            <AtButton type='primary'
              onClick={()=>{
              GPage.DoWXCall('confirmClick',docInfo,userInfo,selectedIndex===0?'初诊':(selectedIndex===1?'复诊':'未选择'),valueFZ,valueBQ,checkedList,inputValue,files)
            }} 
              className={styles.bottombt}
            >确认信息</AtButton>
        </View>

      </View>
      {/* </GGWingBlank> */}
      </View>
    </Root>
  );
}
