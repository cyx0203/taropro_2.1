import React, { useEffect, useState, useRef } from 'react'
import { useReady, useDidShow, useDidHide } from '@tarojs/taro';
import GPage from '@/GGCore/page';
import H5Config from '../config.js';
import { Root } from './root';
export {  Root }
export const usePage = (props: any) => {
    // console.error('#####GGHooks usePage#####');
    const compConfigs = useRef(GPage.PageData[props.pageName]);
    // console.error(`pageName=${props.pageName}`);
    // console.error(compConfigs);
    useEffect(() => {
        GPage.EventCenter({
            configs: compConfigs.current,
            success: (nda: any) => {
                props.ndaExcute(nda);
            }
        });
        return () => {
            // console.error('>>usePage:useEffect:DoExit<<');
            GPage.DoExit(compConfigs.current);
            // console.error('🗑>>PageHooks Uninstall <<🗑');
        }
    }, []);

    // 对应 onReady
    useReady(() => {
    })

    // 对应 onShow
    useDidShow(() => {
        GPage.DoLoad(compConfigs.current);
    })

    // 对应 onHide
    useDidHide(() => {
        console.error('>>usePage:useDidHide<<');
    })

    /**
     * 进化版本的Map方法
     * @param data ……需要循环渲染的数据
     * @param render ……需要循环渲染的DOM结构
     * @param nullRender ……数据无效时，自定义需要渲染的DOM结构
     * @returns 
     */
    const Map = (data: any, render: Function, nullRender: any) => {
        if (!data) return nullRender ? nullRender : '';
        if (!render) return nullRender ? nullRender : '';
        return data.map((item: any, index: any) => {
            return render(item, index);
        })
    }

    /**
     * 进化版本的SetState方法
     * @param conditions ……需要校验的数据列表[必传，但可为空数组]（可以一次性多个校验，校验链式：AND）
     * @param successFunc ……校验成功后执行的函数[必传]
     * @param exceptionFunc ……校验成功后执行的函数[非必传]
     */
    const SetState = (conditions: any, successFunc: Function, exceptionFunc: Function = null) => {
        console.error('>>SetState<<');
        let verify = true;
        console.log(conditions);
        for (let i = 0; i < conditions.length; i++) {
            const cond: any = conditions[i];
            console.log(`COND=${i}`);
            console.log(cond);
            if (cond === undefined || cond === null) {
                verify = false;
                break;
            }
        }
        console.error(`>>verify<<  ${verify}`);
        if (verify) {
            if (successFunc) successFunc();
        }
        else {
            if (exceptionFunc) exceptionFunc();
        }
    }

    /**
     * 可自动完成对wxcall下指定节点的非空判断，
     * 仅在有配置该key的情况下才会自动执行挂在在该key下的方法
     * @param funcKey ……wxcall节点下的某个key
     * @param params ……入参数据
     */
    const DoWXCall = (funcKey,...params)=>{
        const wxcall:any = compConfigs.current.config.wxcall;
        if (wxcall){
            const func: any = wxcall[funcKey];
            if (func){
                func(...params);
            }
            else{
                console.error(`DoWXCall Error:wxcall下未配置节点->${funcKey}`);
            }
        }
        else{
            console.error(`DoWXCall Error:未配置wxcall`);
        }
    }

    return {
        // EventCenter: GPage.EventCenter({
        //     configs: compConfigs.current,
        //     success: (nda: any) => {
        //         props.ndaExcute(nda);
        //     }
        // }),

        //原始的GPage整体对象
        GPage: GPage,
        //原始的GPage中的DoLoad功能，但无需入参
        DoLoad: () => { GPage.DoLoad(compConfigs.current) },
        //原始的GPage中的DoExit功能，但无需入参
        DoExit: () => { GPage.DoExit(compConfigs.current) },
        //获取当前页面中上层流程中定义的数据体中的config节点
        Config: compConfigs.current.config,
        //获取当前页面中上层流程中定义的数据体中的wxcall节点
        WXCall: compConfigs.current.config.wxcall,
        //获取当前页面中上层流程中定义的数据体中的data节点
        Data: compConfigs.current.config.data,
        //获取静态资源的全路径
        Res: (url: string) => {
            return `${H5Config.resUrl}${url}`;
        },
        //进化后的Map方法
        Map: Map,
        SetState: SetState,
        DoWXCall: DoWXCall
    };
}