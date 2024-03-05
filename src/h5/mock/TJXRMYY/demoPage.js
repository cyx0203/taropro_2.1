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
                mod: "h5/pages/TJXRMYY/demoPage/index",
                title: "首页",
                wxcall: {
                },
                data: {
                }
            }
        }
    }
}