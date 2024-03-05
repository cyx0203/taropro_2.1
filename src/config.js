//项目分支配置名称
const PRONAME='IH';
//项目配置
export default {
  proName: PRONAME,
  mode: "DEBUG",
  mockName:'h5/mock/IH/drawboard/appointment.js',
  initFlw:'main',
  resUrl: `https://wx.ggzzrj.cn/mini/${PRONAME === '' ? '' : (PRONAME+'/')}`
};

