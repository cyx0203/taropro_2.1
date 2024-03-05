import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { CPSLB } from '@/GGCompLibBase';
import { Comp_Table_01 } from './comp_table_01/index';
import { Comp_Table_02 } from './comp_table_02/index';
import { Exception } from '../core/exception';

const CPS_ROOT_NAME:string ='comp_table';

const Comp_Table = React.forwardRef((PROPS: any, REF: any) => {
    //组件调用失败时显示
    const DEFAULT_DOM = <Exception compName={CPS_ROOT_NAME}/>;
    //组件配置中主要KEY校验
    const ISPASS: boolean = CPSLB.HasPrimeKey([
        { data: PROPS, key: 'config' },
        { data: PROPS.config, key: 'head' },
        // { data: PROPS.config.head, key: 'title' },
        { data: PROPS.config, key: 'body' },
        { data: PROPS, key: 'type' },
    ]);
    if (!ISPASS) return DEFAULT_DOM;

    //按传入type类型来引用指定的真实组件
    if (PROPS.type === '01') {
        const CPS_NAME: string = 'comp_table_01';
        //组件全称：组件大类+组件细分类
        //用于组件内置静态资源的相对路径寻址
        const CPS_FULL_NAME: string = `${CPS_ROOT_NAME}/${CPS_NAME}`;
        return <Comp_Table_01 config={PROPS.config} className={PROPS.className} CPS_FULL_NAME={CPS_FULL_NAME} CPS_NAME={CPS_NAME} 
        onClick={PROPS.onItemClick} />;
    } else if(PROPS.type === '02') {
        const CPS_NAME: string = 'comp_table_02';
        //组件全称：组件大类+组件细分类
        //用于组件内置静态资源的相对路径寻址
        const CPS_FULL_NAME: string = `${CPS_ROOT_NAME}/${CPS_NAME}`;
        return <Comp_Table_02 config={PROPS.config} className={PROPS.className} CPS_FULL_NAME={CPS_FULL_NAME} CPS_NAME={CPS_NAME} 
        onClick={PROPS.onItemClick} />;
    }
    useEffect(() => {
        return () => { };
    }, []);
    return DEFAULT_DOM
})

export { Comp_Table }