//项目分支配置名称
const PRONAME='SCWJYY';
//项目配置
export default {
  proName: PRONAME,
  mode: "DEBUG",
  mockName:'h5/mock/SCWJYY/page_SCWJYY_paymentList.js',
  initFlw:'SCWJYY_PaymentList',
  resUrl: `https://wx.ggzzrj.cn/mini/${PRONAME === '' ? '' : (PRONAME+'/')}`
};