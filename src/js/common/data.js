import { StepNext, UpateCurrentPageData, DataCache, StepContent } from "../../core/engine";


export const Data_Init = class {
    static data(){
        return {
            type: "data",
            load:()=>{
                StepNext(0)
            }
        }
    }
}

export const Data_UpateMsg = class {
    static data(){
        return {
            type: "data",
            load:()=>{
                // UpateCurrentPageData({msg: "李四", msg2:"王超和马汉"})
                UpateCurrentPageData({msg1: "李四", msg:"王超和马汉="+(Math.random()*1000).toFixed(0)})
            }
        }
    }
}


export const Data_GetUserInfo= class {
    static data(){
        return {
            type: "data",
            load:()=>{
                DataCache.CardNo = "122";
                DataCache.Name = (Math.random()*1000).toFixed(0);
                // DataCache.Name = "MyName";
                StepContent.Msg = DataCache.Name;
                // UpateCurrentPageData({name: "lisw"})
                setTimeout(()=>{
                    StepNext(0);
                }, 1000);
            }
        }
    }
}