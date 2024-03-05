import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { CPSLB } from '@/GGCompLibBase';
//引入真实组件 ## Comp_Nav_Normal ##
import { Comp_DateBar_Normal } from './comp_datebar_normal/index';
import { Comp_DateBar_02 } from './comp_datebar_02/index';
import { Exception } from '../core/exception';

/**
 * 组件主体：Comp_DateBar
 * 组件说明：/
 * 组件开发：Xpp
 * 
 * 类型说明：
 *        normal…… 统一版本横向日期
 */
 const CPS_ROOT_NAME:string ='comp_datebar';

const Comp_DateBar = React.forwardRef((PROPS: any, REF: any) => {
    //组件调用失败时显示
    // const DEFAULT_DOM = <View dangerouslySetInnerHTML={{ __html: CPSLB.ErrorDom() }} />;
    const DEFAULT_DOM = <Exception compName={CPS_ROOT_NAME}/>;

    //组件配置中主要KEY校验
    const ISPASS: boolean = CPSLB.HasPrimeKey([
        { data: PROPS, key: 'config' },
        { data: PROPS, key: 'type' },
        // { data: PROPS.config, key: 'title' },
        // { data: PROPS.config, key: 'titleIcon' },
        { data: PROPS.config, key: 'listData' },
        { data: PROPS.config, key: 'onItemClick' }
    ]);
    if (!ISPASS) return DEFAULT_DOM;

    //按传入type类型来引用指定的真实组件
    if (PROPS.type === '01') {
        //真实组件名称
        //用于真实组件中样式名的匹配
        const CPS_NAME: string = 'comp_datebar_normal';

        //组件全称：组件大类+组件细分类
        //用于组件内置静态资源的相对路径寻址
        // const CPS_FULL_NAME: string = `${CPS_ROOT_NAME}/${CPS_NAME}`;
        const CPS_FULL_NAME: string = `${CPS_ROOT_NAME}`;
        return <Comp_DateBar_Normal config={PROPS.config} className={PROPS.className} CPS_FULL_NAME={CPS_FULL_NAME} CPS_NAME={CPS_NAME}/>;
    }
    if (PROPS.type === '02') {
        //真实组件名称
        //用于真实组件中样式名的匹配
        const CPS_NAME: string = 'comp_datebar_02';

        //组件全称：组件大类+组件细分类
        //用于组件内置静态资源的相对路径寻址
        // const CPS_FULL_NAME: string = `${CPS_ROOT_NAME}/${CPS_NAME}`;
        const CPS_FULL_NAME: string = `${CPS_ROOT_NAME}`;
        return <Comp_DateBar_02 config={PROPS.config} className={PROPS.className} CPS_FULL_NAME={CPS_FULL_NAME} CPS_NAME={CPS_NAME}/>;
    }

    useEffect(() => {
        return () => { };
    }, []);
    return DEFAULT_DOM
})

export { Comp_DateBar }