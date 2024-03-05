import { UpateCurrentPageData } from "../../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/index/index4_2/index",
        title: "首页",
        wxcall: {
            //消息列表点击对象事件处理（暂不使用）
            //item……点击对象全量数据
            //index……点击对象索引号
            noticListOnClick: (item, index) => {
                console.log('::noticListOnClick::');
                console.log(item, index);
            },
            lv1_menu_list_onClick: (item, index) => {
                console.log('::lv1_menu_list_onClick::');
                console.log(item, index);
            },
            //点击的BANNER事件处理
            //item……点击对象全量数据
            //index……点击对象的索引号
            bannerListOnClick: (item, index) => {
                console.log('::bannerListOnClick::');
                console.log(item, index);
            },
            //二级功能点击对象的事件处理
            //item……点击对象的全量数据
            //index……点击对象的tab索引号
            //index2……点击对象的tab中的索引号
            lv2_menu_list_onClick: (item, index, index2) => {
                console.log('::lv2_menu_list_onClick::');
                console.log(item, index, index2);
            },
            //三级功能点击对象的事件处理
            //item……点击对象的全量数据
            //index……点击对象的tab索引号
            //index2……点击对象的tab中的索引号
            lv3_menu_list_onClick: (item, index, index2) => {
                console.log('::lv3_menu_list_onClick::');
                console.log(item, index, index2);
            },
            tabNavClick: (item, index) => {
                console.log('tabNavClick')
                console.log(item, index)
                // return 1;
            },
            search_onClick:(value)=> {
                console.log("::search-click::");
                console.log(value);
            },
            userinfor_onClick: () => {
                console.log("::userinfor-click::");
                console.log('点击了左上角的头像图标')
            },
            userExtra_onClick: (icon) => {
                console.log("::userExtra-click::");
                //控制用户信息面板显示与否
                if (icon === `${RES}/assets/img/qrcode.svg`) {
                    UpateCurrentPageData({ inforPanelShow: true })
                }
            },
            item_extra_onClick: (item) => {
                console.log("::userPanel-inforList-extra-click::");
                console.log(item);
            }
        },
        data: {
          //我的助手功能（未开放）
          robot: {
            open: false,
            // icon: super.BASE_RES('index/robot.gif'),
            tipList: ['我的助手', '快捷功能', '一应俱全', '快速高效'],
            tipFrequency: 2000,
        },
        //用户信息底部推送面板配置
        userPanel: {
            //面板标题
            title: '我的健康码',
            //二维码数据
            qrcode: '测试test',
            //条码数据
            barcode: '0000000000111',
            //用户信息列表
            inforList: [
                {
                    //标题
                    title: '姓名',
                    //数据
                    value: '张晓明',
                },
                {
                    title: '健康卡',
                    value: '000000000000011'
                },
                {
                    title: '住院号',
                    value: '22222222222222',
                    //附加按钮配置
                    extra: {
                        //按钮文字内容
                        text: '修改',
                        text2: '修改完成',
                        //按钮触发事件
                        onClick: (item) => {
                            console.log("::userPanel-inforList-extra-click::");
                            console.log(item);
                        }
                    }
                }
            ]
        },
        //顶部背景（暂不用）
        // topbg: `${RES}/assets/img/topbg.jpg`,
        //用户信息
        userinfor: {
            //ICON
            icon: `${RES}/assets/img/user.svg`,
            //用户姓名
            name: '陈玉', //'新用户',
            //用户信息块点击事件处理
            onClick: () => {
                console.log("::userinfor-click::");
                console.log('点击了左上角的头像图标')
            }
        },
        //用户区块额外功能区
        userExtra: {
            //ICON
            //添加の图标：index/add.svg
            //二维码の图标：index/qrcode.svg
            icon: `${RES}/assets/img/qrcode.svg`,//index/add.svg|index/qrcode.svg
            // icon:'',
            //点击事件处理
            
            
        },
        //顶部背景（暂不用）
        // topbg: `${RES}/assets/img/qrcode.svg`,
        //用户信息
        userinfor: {
            //ICON
            icon: `${RES}/assets/img/user.svg`,
            //用户姓名
            name: '陈玉', //'新用户',
            //用户信息块点击事件处理
            onClick: () => {
                console.log("::userinfor-click::");
                console.log('点击了左上角的头像图标222');
                // super.BASE_MOD('','BACKSPACE_TO_PREPAGE');
            }
        },
        //用户区块额外功能区
        userExtra: {
            //ICON
            //添加の图标：index/add.svg
            //二维码の图标：index/qrcode.svg
            icon: `${RES}/assets/img/qrcode.svg`,//index/add.svg|index/qrcode.svg
            //点击事件处理
            onClick: () => {
                console.log("::userExtra-click::");

                //控制用户信息面板显示与否
                // UpateCurrentPageData({ inforPanelShow: true })
            }
        },
        //1级主功能列表（横向布局，目前最多仅支持5个）
        // lv1_menu_list: [
        //     {
        //         //文字内容
        //         text: '当日挂号',
        //         //ICON
        //         icon: super.BASE_RES('index/lv1_menu/drgh.svg')
        //     },
        //     {
        //         text: '预约挂号',
        //         icon: super.BASE_RES('index/lv1_menu/yygh.svg')
        //     },
        //     {
        //         text: '门诊缴费',
        //         icon: super.BASE_RES('index/lv1_menu/mzjf.svg')
        //     },
        //     {
        //         text: '住院预交',
        //         icon: super.BASE_RES('index/lv1_menu/zyyj.svg')
        //     },
        //     {
        //         text: '我的就诊人',
        //         icon: super.BASE_RES('index/lv1_menu/sfz.svg')
        //     },
        // ],
        //1级主功能列表点击事件处理
        //item……点击对象全量数据
        //index……点击对象索引号
        // lv1_menu_list_onClick: (item, index) => {
        //     console.log('::lv1_menu_list_onClick::');
        //     console.log(item, index);
        //     if (index===0){
        //         super.BASE_MOD('flw_webview');
        //         return;
        //     }
        //     else{
        //         super.BASE_MOD('flw_usercenter2');
        //         return;
        //     }                    
        // },
        //搜索区
        search: {
            //默认显示信息
            defaultText: '搜索医生、科室',
            //搜索按钮点击事件处理
            //value……搜索输入框传入内容
            
        },
        //消息列表（每两组内容一轮显示）
        noticList: [
            //第一轮数据
            //text……消息内容
            //time……时间内容
            // [
            //     { text: '您有一笔未支付订单', time: '20分钟前' },
            //     { text: '您有一笔未支付订单', time: '2021-03-08 03:08' },
            // ],
            //第二轮轮数据
            // [
            //     { text: '您有一笔未支付订单', time: '1个月前' }
            // ]


            //无消息时设置
            [
                { text: '暂无消息', time: '' },
            ]
        ],
        
        //消息列表“更多”图标点击事件处理
        noticMore: {
            icon: `${RES}/assets/icon/more.svg`,
            onClick: () => {
                console.log('::noticMore OnClick::');
            }
        },
        //BANNER列表
        //每项均是图片路径
        lv1_menu_list: [
            {
                title: '标题1',
                subTitle: '副标题1',
                backimg: `${RES}/assets/img/btn1.svg`
            },
            {
                title: '标题2',
                subTitle: '副标题2',
                backimg: `${RES}/assets/img/btn2.svg`
            },
            {
                title: '标题3',
                subTitle: '副标题3',
                backimg: `${RES}/assets/img/btn3.svg`
            },
        ],
        bannerList: [
            `${RES}/assets/ad/ad01.svg`,
            `${RES}/assets/ad/ad02.svg`
        ],
        
        //二级功能列表-TAB定义
        //title……标题内容
        lv2_menu_tab: [
            { title: '常用功能' },
            { title: '常用功能2'}
        ],
        //二级功能列表数据
        //image……ICON
        //value……文字内容
        lv2_menu_list: [
            [
                { image: `${RES}/assets/icon/zjjs.svg`, value: '问诊记录' },
                { image: `${RES}/assets/icon/yyjs.svg`, value: '检验预约' },
                { image: `${RES}/assets/icon/yygh.svg`, value: '报告查询' },
                { image: `${RES}/assets/icon/xw.svg`, value: '检查预约' }
            ],
            [
                { image: `${RES}/assets/icon/jybg.svg`, value: '检验报告' },
                { image: `${RES}/assets/icon/jcbg.svg`, value: '检查报告' }
            ]

        ],
        
        //三级功能列表-TAB定义
        //title……标题内容
        lv3_menu_tab: [
            { title: '药品物流' },
            { title: '药品物流2' },
        ],
        //三级功能列表数据
        //image……ICON
        //value……文字内容
        lv3_menu_list: [
            [
                { image: `${RES}/assets/icon/zjjs.svg`, value: '处方缴费' },
                { image: `${RES}/assets/icon/yyjs.svg`, value: '配送查询' },
                { image: `${RES}/assets/icon/yygh.svg`, value: '收货地址' },
                { image: `${RES}/assets/icon/xw.svg`, value: '药房配药' },
            ],
            [
                { image: `${RES}/assets/icon/jybg.svg`, value: '检验报告' },
                { image: `${RES}/assets/icon/jcbg.svg`, value: '检查报告' }
            ]

        ],
        
        //底部导航栏定义
        tabNav: [
            {
                title: '首页',
                image: `${RES}/assets/icon/nav_1_1.svg`,
                selectedImage: `${RES}/assets/icon/nav_1_2.svg`,
                //默认选中

            },
            {
                title: '问诊订单',
                image: `${RES}/assets/icon/nav_2_1.svg`,
                selectedImage: `${RES}/assets/icon/nav_2_2.svg`
                // text: 'new'
                // selected:true
            },
            {
                title: '消息',
                image: `${RES}/assets/icon/nav_3_1.svg`,
                selectedImage: `${RES}/assets/icon/nav_3_2.svg`,
                selected: true
                // text: 'new'
            },
            {
                title: '个人中心',
                image: `${RES}/assets/icon/nav_4_1.svg`,
                selectedImage: `${RES}/assets/icon/nav_4_2.svg`,
                // text: 'new'
            }
        ],
        
        }
      }
    };
  }
};
