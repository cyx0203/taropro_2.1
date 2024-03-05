import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from '@/GGCore/mjcommon';

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_Index = class {
    static data() {
        setTimeout(() => {
            UpateCurrentPageData({
                // searchPlaceholder: '???????'
            });
        }, 3000);
        return {
            type: "flex",
            config: {
                mod: "h5/pages/SCWJYY/index/index",
                title: "首页",
                wxcall: {
                    // [登录] 按钮
                    loginOnClick: () => {
                        console.log('##loginOnClick##');
                    },
                    // [底部导航] 按钮
                    navOnClick: (item, index) => {
                        console.log('##navOnClick##');
                        console.log(item);
                        console.log(index);
                    },
                    // [主菜单] 按钮
                    mainOnClick: (item, index) => {
                        console.log('##mainOnClick##');
                        console.log(item);
                        console.log(index);
                    },
                    // [子菜单] 按钮
                    subOnClick: (item, index) => {
                        console.log('##subOnClick##');
                        console.log(item);
                        console.log(index);
                    },
                    // [搜索框] 搜索按钮
                    searchOnClick: (value) => {
                        console.log('##searchOnClick##');
                        console.log(value);
                    }
                },
                data: {
                    // loginText:'登录扽古',
                    //[新增搜索条配置]  如果是fasle将整条隐藏
                    needSearch: true,
                    // 搜索框的默认文案
                    searchPlaceholder: '搜索医生',
                    // 顶部广告图片
                    adImg: `${RES}/assets/ad/ad01.png`,
                    // 主菜单数据
                    mainMenu: [
                        {
                            title: '预约挂号',
                            icon: `${RES}/assets/icon/main-menu-01.png`
                        },
                        {
                            title: '门诊缴费',
                            icon: `${RES}/assets/icon/main-menu-02.png`
                        },
                        {
                            title: '排队查询',
                            icon: `${RES}/assets/icon/main-menu-03.png`
                        },
                        {
                            title: '住院预交    ',
                            icon: `${RES}/assets/icon/main-menu-04.png`
                        }
                    ],
                    // 子菜单数据
                    subMenu: [
                        {
                            // 按钮文字
                            title: '核算预约',
                            // 按钮ICON
                            icon: `${RES}/assets/icon/sub-menu-01.png`
                        },
                        {
                            title: '检查预约',
                            icon: `${RES}/assets/icon/sub-menu-02.png`
                        },
                        {
                            title: '体检预约',
                            icon: `${RES}/assets/icon/sub-menu-03.png`
                        },
                        {
                            title: '医院简介',
                            icon: `${RES}/assets/icon/sub-menu-04.png`
                        },
                        {
                            title: '科室分布',
                            icon: `${RES}/assets/icon/sub-menu-05.png`
                        },
                        {
                            title: '来院导航',
                            icon: `${RES}/assets/icon/sub-menu-06.png`
                        },
                        {
                            title: '意见调查',
                            icon: `${RES}/assets/icon/sub-menu-07.png`
                        },
                        {
                            title: '个人中心',
                            icon: `${RES}/assets/icon/sub-menu-08.png`
                        },
                        {
                            title: '健康知识',
                            icon: `${RES}/assets/icon/sub-menu-09.png`
                        },
                    ],
                    // 底部导航按钮数据
                    navData: [
                        {
                            // 按钮未点击状态
                            normal_img_url: `${RES}/assets/icon/nav_1_1.png`,
                            // 按钮点击后状态
                            active_img_url: `${RES}/assets/icon/nav_1_2.png`,
                            // 按钮文字
                            text: '首页',
                            // 是否被点击
                            active: true
                        },
                        {
                            normal_img_url: `${RES}/assets/icon/nav_2_1.png`,
                            active_img_url: `${RES}/assets/icon/nav_2_2.png`,
                            text: '个人'
                        }
                    ],
                }
            }
        }
    }
}