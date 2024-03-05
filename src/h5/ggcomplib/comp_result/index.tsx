import React, { useEffect } from 'react';
import { View,Image } from '@tarojs/components';
import { CPSLB } from '@/GGCompLibBase';
//引入真实组件 ## Comp_Nav_Normal ##
import { Comp_Result_Normal } from './comp_result_normal/index';
import { Comp_Result_Edit } from './comp_result_edit/index';
import { Exception } from '../core/exception';

/**
 * 组件主体：Comp_Nav
 * 组件说明：/
 * 组件开发：Woo
 * 
 * 类型说明：
 *        normal…… 统一版本底部导航
 */

const CPS_ROOT_NAME:string ='comp_result';

const Comp_Result = React.forwardRef((PROPS: any, REF: any) => {
    //组件调用失败时显示
    const DEFAULT_DOM = <Exception compName={CPS_ROOT_NAME}/>;
    //组件配置中主要KEY校验
    const ISPASS: boolean = CPSLB.HasPrimeKey([
        { data: PROPS, key: 'config' },
        { data: PROPS, key: 'type' },
    ]);
    if (!ISPASS) return DEFAULT_DOM;

    useEffect(() => {
        return () => { };
    }, []);

    //按传入type类型来引用指定的真实组件
    if (PROPS.type==='01') {
        const CPS_NAME: string = 'comp_result_normal';
        //组件全称：组件大类+组件细分类
        //用于组件内置静态资源的相对路径寻址
        const CPS_FULL_NAME: string = `${CPS_ROOT_NAME}/${CPS_NAME}`;
        return <Comp_Result_Normal config={PROPS.config} className={PROPS.className} CPS_FULL_NAME={CPS_FULL_NAME} CPS_NAME={CPS_NAME}/>;
        // return <Comp_Result_Normal config={PROPS.config} type={PROPS.type} className={PROPS.className}/>;
    }
    else {};

    
    // return DEFAULT_DOM
})

export { Comp_Result }