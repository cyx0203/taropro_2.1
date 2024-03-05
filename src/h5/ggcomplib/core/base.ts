import { Root } from './root';
import H5Config from '../../config.js';
//根对象定义
let CPSLB: any = {};

CPSLB.ErrorDom = () => {
    return `<View style='color:red'>组件调用失败</View>`;
}

/**
 * 获取静态资源
 * @param url (string)……相对路径
 * @returns 
 */
CPSLB.Res = (url: string) => {
    return `${H5Config.resUrl}${url}`;
}


/**
 * 组件库开发中引用静态资源方法
 * @param url ……相对路径（含有@符号时，为内置资源对象）
 * @param cpsFullName ……组件完整的命名（规则：`${CPS_ROOT_NAME}/${CPS_NAME}`）
 * @param mapData ……映射数据（数据示例：[{in:'',out:''}]）   
 *                  in:外部传入带`@`符号的数据 
 *                  out:转换为真实的素材文件名
 * @returns ……返回实际可用的完成URL
 */
CPSLB.CpsRes = (url: string, cpsFullName: string = '', mapData: any = []) => {
    let _url: string = url;
    //表示该路径将使用内置组件默认资源
    if (_url.indexOf('@') > -1) {
        // console.error('@内置启动');
        //检测是否要映射数据处理
        if (mapData && mapData.length > 0) {
            // console.error('>开始映射处理<');
            for (let i: any = 0; i < mapData.length; i++) {
                const IN: string = mapData[i].in;
                const OUT: string = mapData[i].out;
                if (_url === IN) {
                    url = OUT;
                    break;
                }
            }
        }
        //@ts-ignore
        _url = `${H5Config.cpsResUrl}${cpsFullName}/${url}`;
    }
    return _url;
}

CPSLB.CpsResMap = (oDt: string, tDt: string) => {

}

/**
 * 验证主配置key是否存在
 * @param conditionList (array)……查询条件 
 * @returns (boolean)……是否验证通过
 */
CPSLB.HasPrimeKey = (conditionList: Array<object>) => {
    let isPass: boolean = true;
    for (let i: any = 0; i < conditionList.length; i++) {
        //获取每条验证条件数据
        const condition: any = conditionList[i];
        if (condition.data === null || condition.data === undefined) return false;
        //是否在指定数据中包含有指定的KEY
        const ret: boolean = condition.data.hasOwnProperty(condition.key);
        if (!ret) {
            console.error(`[组件调用失败] $${condition.key}:缺失!`);
            isPass = false;
            return false;
        }
    }
    return isPass;
}

export { CPSLB, Root }