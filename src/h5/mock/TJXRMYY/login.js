import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from '@/GGCore/mjcommon';
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
    static data() {
        //延迟性模拟测试
        // setTimeout(() => {
        //     UpateCurrentPageData({
        //         //Todo
        //     });
        // }, 3000);
        return {
            type: "flex",
            config: {
                mod: "h5/pages/TJXRMYY/login/index",
                title: "登录",
                wxcall: {
                    loginIn:(item) => {
                        console.log(item);
                    }
                },
                data: {
                    pageData:{
                        title:'请输入您的住院号和姓名',
                        btn:'确定',
                        tips:'请填入信息'
                    },
                    // 默认值
                    defaultValue:{
                        // 住院号
                        number:'134598765343533',
                        name:'张三'
                    }
                }
            }
        }
    }
}