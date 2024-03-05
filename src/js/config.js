/**
 * 基础配置
 */
const Config = {
    Params:{
        midUrl: "http://127.0.0.1:29880",
        midMd5Key: 'ErThh9yIyTjVQKAT14mMZExI7NIqzNYx', // 中台md5key
        resUrl: "https://wx.ggzzrj.cn/mini/internet_hospital/pharmacist",
        // projectId: '1631519542587',     // 项目ID
        // hospitalId: '1631097980349',    // 医院ID
        // hospitalName: "GEIT医院小程序",
        projectId: '1649269104983',     // 项目ID
        hospitalId: '1631097980349',    // 医院ID
        hospitalName: "GEIT医院公众号",
    },
}

// 测试环境配置 在 npm run dev:xxx 下会执行该环境配置
const Config_Dev = {
    Params:{
        ...Config.Params,
        isDebug: true,
        // midUrl: "https://wx.ggzzrj.cn/wxmiddleTest",
        debugOpenId: "oYpPnwE3NQUASKWEVpTXK9tYbKhw",
    }
}

// 生产环境配置 在 npm run build:xxx 下会执行该环境配置
const Config_Pro = {
    Params:{
        ...Config.Params,
        midUrl: "https://wx.ggzzrj.cn/wxmiddleTest",
        isDebug: false,
    }
}

export {Config, Config_Dev, Config_Pro};