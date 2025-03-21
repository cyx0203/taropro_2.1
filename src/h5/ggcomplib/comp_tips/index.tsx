import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { CPSLB } from '@/GGCompLibBase';
//引入真实组件 ## Comp_Nav_Normal ##
import { Comp_Tips_Normal } from './comp_tips_normal/index';
import { Comp_Tips_Horizontal } from './comp_tips_horizontal/index';
import { Exception } from '../core/exception';

/**
 * 组件主体：Comp_Nav
 * 组件说明：/
 * 组件开发：Woo
 * 
 * 类型说明：
 *        normal…… 统一版本底部导航
 */

const CPS_ROOT_NAME:string ='comp_tips';

const Comp_Tips = React.forwardRef((PROPS: any, REF: any) => {
    //组件调用失败时显示
    const DEFAULT_DOM = <Exception compName={CPS_ROOT_NAME}/>;
    //组件配置中主要KEY校验
    const ISPASS: boolean = CPSLB.HasPrimeKey([
        { data: PROPS, key: 'config' },
        { data: PROPS, key: 'type' },
    ]);
    if (!ISPASS) return DEFAULT_DOM;

    //按传入type类型来引用指定的真实组件
    if (PROPS.type === '01') {
        const CPS_NAME: string = 'comp_tips_normal';
        //组件全称：组件大类+组件细分类
        //用于组件内置静态资源的相对路径寻址
        const CPS_FULL_NAME: string = `${CPS_ROOT_NAME}/${CPS_NAME}`;
        return <Comp_Tips_Normal config={PROPS.config} className={PROPS.className} CPS_ROOT_NAME={CPS_ROOT_NAME} CPS_FULL_NAME={CPS_FULL_NAME} CPS_NAME={CPS_NAME}/>;
    } else if(PROPS.type === '02') {
        const CPS_NAME: string = 'comp_tips_horizontal';
        const CPS_FULL_NAME: string = `${CPS_ROOT_NAME}/${CPS_NAME}`;
        return <Comp_Tips_Horizontal config={PROPS.config} className={PROPS.className} CPS_ROOT_NAME={CPS_ROOT_NAME} CPS_FULL_NAME={CPS_FULL_NAME} CPS_NAME={CPS_NAME}/>;
    }

    useEffect(() => {
        return () => { };
    }, []);
    return DEFAULT_DOM
})

export { Comp_Tips }