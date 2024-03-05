import React, { useEffect } from 'react';
// import { View } from '@tarojs/components';
import { CPSLB } from '@/GGCompLibBase';
//引入真实组件 ## Comp_Nav_Normal ##
import { Comp_Nav_Normal } from './comp_nav_normal/index';
import { Exception } from '../core/exception';

/**
 * 组件主体：Comp_Nav
 * 组件说明：底部导航栏
 * 开发人员：Woo
 * 
 * 类型说明：
 *        normal…… 统一版本底部导航
 */

const CPS_ROOT_NAME:string ='comp_nav';

const Comp_Nav = React.forwardRef((PROPS: any, REF: any) => {
    //组件调用失败时显示
    // const DEFAULT_DOM = <View dangerouslySetInnerHTML={{ __html: CPSLB.ErrorDom() }} />;
    const DEFAULT_DOM = <Exception compName={CPS_ROOT_NAME}/>;
    //组件配置中主要KEY校验
    const ISPASS: boolean = CPSLB.HasPrimeKey([
        { data: PROPS, key: 'config' },
        { data: PROPS, key: 'type' },
        { data: PROPS.config, key: 'list' },
        { data: PROPS.config, key: 'onClick' }
    ]);
    if (!ISPASS) return DEFAULT_DOM;

    //按传入type类型来引用指定的真实组件
    if (PROPS.type === 'normal') {
        //真实组件名称
        //用于真实组件中样式名的匹配
        const CPS_NAME: string = 'comp_nav_normal';

        //组件全称：组件大类+组件细分类
        //用于组件内置静态资源的相对路径寻址
        const CPS_FULL_NAME: string = `${CPS_ROOT_NAME}/${CPS_NAME}`;
        return <Comp_Nav_Normal config={PROPS.config} className={PROPS.className} CPS_FULL_NAME={CPS_FULL_NAME} CPS_NAME={CPS_NAME}/>;
    }

    useEffect(() => {
        return () => { };
    }, []);
    return DEFAULT_DOM
})

export { Comp_Nav }