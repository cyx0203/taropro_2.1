import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { CPSLB } from '@/GGCompLibBase';
//引入真实组件 ## Comp_Nav_Normal ##
import { Comp_List_Normal } from './comp_list_normal/index';
import { Comp_List_Input } from './comp_list_input/index';

/**
 * 组件主体：Comp_List
 * 组件说明：/
 * 组件开发：Cyx
 * 
 * 类型说明：
 *        normal…… 统一版本底部导航
 */
const Comp_List = React.forwardRef((PROPS: any, REF: any) => {
    //组件调用失败时显示
    const DEFAULT_DOM = <View dangerouslySetInnerHTML={{ __html: CPSLB.ErrorDom() }} />;
    //组件配置中主要KEY校验
    const ISPASS: boolean = CPSLB.HasPrimeKey([
        { data: PROPS, key: 'config' },
        { data: PROPS, key: 'type' },
        { data: PROPS.config, key: 'list' },
        // { data: PROPS.config, key: 'onClick' }
    ]);
    if (!ISPASS) return DEFAULT_DOM;

    //按传入type类型来引用指定的真实组件
    if (PROPS.type === 'normal') {
        return <Comp_List_Normal config={PROPS.config} className={PROPS.className}/>;
    }
    else if(PROPS.type === 'input') {
        return <Comp_List_Input config={PROPS.config} className={PROPS.className}/>;
    }

    useEffect(() => {
        return () => { };
    }, []);
    return DEFAULT_DOM
})

export { Comp_List }