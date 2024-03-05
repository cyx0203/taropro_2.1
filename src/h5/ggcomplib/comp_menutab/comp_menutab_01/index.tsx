import { useState, useEffect, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Root,CPSLB } from '@/GGCompLibBase';
import './style/index.scss';
import { AtTabs,AtTabsPane,AtGrid } from 'taro-ui';
const CPSNAME = 'comp_menutab_01';
const Comp_MenuTab_01 = (props: any) => {
    //数据
    const data = props.config;
    const type = props.type;
    const onItemClick = props.onClick;
    const onTabClick = props.onTabClick;

    const [current,setCurrent] = useState(data.active)
    const [list,setList] = useState(data.menuList)

    useEffect(() => {
        getIconRes();
        return () => { };
    }, []);

    //获取ICON当前要展示的资源真实路径
    const getIconRes = () => {
      let temp = list;
      for(let i=0;i<temp.length;i++){
        for(let j=0;j<temp[i].length;j++){
          temp[i][j].image = CPSLB.CpsRes(list[i][j].image, props.CPS_FULL_NAME);
        }
      }
      setList(temp);
    }

    return <Root className={props.className} cpsName={CPSNAME}>
        <View className='container'>

        <View 
        className='index-menu-block'
        >
          <AtTabs
            current={current}
            // scroll
            tabList={data.tabs}
            onClick={(value) => {
                setCurrent(value)
                let fun = onTabClick;
                if(fun) fun(data.tabs[value],value)}}
          >
            {
              list.map((item, index) => {
                return <AtTabsPane current={current} index={index} key={index}>
                  <View className='index-menu-tabcontainer'>
                    <AtGrid data={item} columnNum={4} hasBorder={false} onClick={(item, index) => {
                      let func = onItemClick;
                      if (func) func(item,current,index);
                    }}
                    />
                  </View>
                </AtTabsPane>
              })
            }
          </AtTabs>
        </View>

        </View>
    </Root>
}

export { Comp_MenuTab_01 }