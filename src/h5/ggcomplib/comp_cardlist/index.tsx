import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { CPSLB } from '@/GGCompLibBase';
//引入真实组件 ## Comp_Nav_Normal ##
import { Comp_CardList_Normal } from './comp_cardlist_normal/index';
import { Comp_CardList_02 } from './comp_cardlist_02/index';
import { Exception } from '../core/exception';

const CPS_ROOT_NAME:string ='comp_cardlist';

const Comp_CardList = React.forwardRef((PROPS: any, REF: any) => {
    //组件调用失败时显示
    const DEFAULT_DOM = <Exception compName={CPS_ROOT_NAME}/>;
    //组件配置中主要KEY校验
    const ISPASS: boolean = CPSLB.HasPrimeKey([
        { data: PROPS, key: 'config' },
        { data: PROPS.config, key: 'listData' },
        // { data: PROPS.config.listData, key: 'label' },
        { data: PROPS, key: 'type' },
    ]);
    if (!ISPASS) return DEFAULT_DOM;

    //按传入type类型来引用指定的真实组件
    if (PROPS.type === '01') {
        const CPS_NAME: string = 'comp_cardlist_normal';
        //组件全称：组件大类+组件细分类
        //用于组件内置静态资源的相对路径寻址
        const CPS_FULL_NAME: string = `${CPS_ROOT_NAME}/${CPS_NAME}`;
        return <Comp_CardList_Normal config={PROPS.config} className={PROPS.className} CPS_FULL_NAME={CPS_FULL_NAME} CPS_NAME={CPS_NAME} 
        onClick={PROPS.onItemClick} onClick2={PROPS.onItemClick2} onFooterClick={PROPS.onItemFooterClick} onCardClick={PROPS.onCardClick}>{PROPS.children}</Comp_CardList_Normal>;
    } else if(PROPS.type === '02') {
        const CPS_NAME: string = 'comp_cardlist_02';
        const CPS_FULL_NAME: string = `${CPS_ROOT_NAME}/${CPS_NAME}`;
        return <Comp_CardList_02 config={PROPS.config} className={PROPS.className} CPS_FULL_NAME={CPS_FULL_NAME} CPS_NAME={CPS_NAME} 
        onClick={PROPS.onItemClick} onExtraItemClick={PROPS.onExtraItemClick} onFooterClick={PROPS.onItemFooterClick} onCardClick={PROPS.onCardClick}>{PROPS.children}</Comp_CardList_02>;
    }
    useEffect(() => {
        return () => { };
    }, []);
    return DEFAULT_DOM
})

export { Comp_CardList }