import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from '@/GGCore/mjcommon';

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_PaymentInfo = class {
    static data() {
        setTimeout(() => {
            UpateCurrentPageData({
                paymentInfo:[
                    {label:'缴费项目11',value:'武警四川省总队医院挂号缴费'},
                    {label:'收费单位1',value:'中国人民武装警察部队四川省总队医院2222'},
                    {label:'订单流水号',value:'34355654343566754'}, 
                ],
                infoText:'下一步11',
            });
          }, 3000);
        return {
            type: "flex",
            config: {
                mod: "h5/pages/SCWJYY/paymentInfo/index",
                title: "缴费信息",
                wxcall: {
                    paymentClick:() => {
                        console.log('==下一步==')
                    }
                },
                data: {
                    paymentInfo:[
                        {label:'缴费项目',value:'武警四川省总队医院挂号缴费'},
                        {label:'收费单位',value:'中国人民武装警察部队四川省总队医院'},
                        {label:'订单流水号',value:'34355654343566754'}, 
                    ],
                    infoText:'下一步',
                }
            }
        }
    }
}