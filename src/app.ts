import { Component } from 'react'
import './app.scss'
import Taro from '@tarojs/taro';
import "./core/fix";
import GGCFG from './config';
import mjcom from '@/GGCore/mjcommon';
import "taro-ui/dist/style/index.scss";

// 这个开启后会启动VConsole
// import VConsole from 'vconsole';
// const vconsole = new VConsole(); 

class App extends Component {
  /**
   * 定义入口页白名单，白名单内的页面，可以通过直接uri路由访问获得
   * 例如：http://192.168.2.212:10086/#/h5/pages/users/index
   * 可以直接访问
   */
  safePages = [
    {page: "/h5/pages/main/index", sheetId: "start", pageId: "_G0"},
    {page: "/h5/pages/users/index", sheetId: "sMain", pageId: "_G2"},
    {page: "/h5/pages/msgs/index", sheetId: "sMsgs", pageId: "_G1"}
  ];


  v1_safePages = [
    {page: "/h5/pages/main/index", namespace: "v1flex", funcName: "V1_Page_Main_Index"},
    {page: "/h5/pages/users/index", namespace: "v1flex", funcName: "V1_Page_Main_User"},
    {page: "/h5/pages/msgs/index", namespace: "v1flex", funcName: "V1_Page_Main_Msgs"}
  ];
  componentDidMount () {
    console.log('-------------')
    // 加载第一个页面
    // step1. 加载所有自定义文件内容
    mjcom.init.doAppInit({}, {
      success:()=>{
        if(GGCFG.mode==='DEBUG') mjcom.GotoMockPage(GGCFG.mockName, GGCFG.initFlw) 
        
        if(GGCFG.mode==='PROD') {
          // this.doV1Deal();
          this.doV3Deal();
        }
      }
    });
  }

  doV1Deal(){
    const spgs = this.v1_safePages;
    const spg0 = spgs[0];
    if (Taro.getEnv() === 'WEB') {
      mjcom.scache().RequestsParam = mjcom.init.GetRequests();
      const hs = location.hash;
      let s = location.href;
      if(mjcom.contains(hs, "#/h5/pages")){
        // 如果uri是在白名单里面的不进行刷新
        for(let i in spgs){
          let e = spgs[i];
          if(mjcom.contains(hs, e.page)){
            mjcom.RealGotoMainPage(e.namespace, e.funcName);
            return;
          }
        }
        const ns = s.replace(location.hash, "");
        location.href = ns;
        return;
      }
      mjcom.RealGotoMainPage(spg0.namespace, spg0.funcName);
    } else {
      mjcom.RealGotoMainPage(spg0.namespace, spg0.funcName);
    }
  }

  /**
   * 按v3.0业务逻辑处理
   */
  doV3Deal() {
    if (Taro.getEnv() === 'WEB') {
      this.doWebDeal({
        gotoPage: (sheetId: string, pageId: string) => {
          mjcom.GotoPage(sheetId, pageId, "Main");
        }
      });
    } else {
      const pgs = this.safePages;
      mjcom.GotoPage(pgs[0].sheetId, pgs[0].pageId, "Main");
    }
  }


  doWebDeal(func:any) {
      mjcom.scache().RequestsParam = mjcom.init.GetRequests();
      const hs = location.hash;
      let s = location.href;
      mjcom.logger.log('current href = ', s);
      // 如果在进入主入口的页面url中包含动态路由，就认为是非法的，直接刷新
      const spgs = this.safePages;
      if(mjcom.contains(hs, "#/h5/pages")){
        // 如果uri是在白名单里面的不进行刷新
        for(let i in spgs){
          let e = spgs[i];
          if(mjcom.contains(hs, e.page)){
            func.gotoPage(e.sheetId, e.pageId);
            return;
          }
        }
        const ns = s.replace(location.hash, "");
        location.href = ns;
        return;
      }
      func.gotoPage(spgs[0].sheetId, spgs[0].pageId);
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
