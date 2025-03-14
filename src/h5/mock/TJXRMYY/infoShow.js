import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/infoShow/index",
        title: "信息展示",
        wxcall: {
        },
        data: {
          mainImg:`${RES}/assets/img/mainImg.png`,
          // doctorCard:{
          //   pic:`${RES}/assets/img/doctor01.png`,
          //   name:'王杰',
          //   dept:'骨科|主任医师',
          //   position:'党委副书记|副院长'
          // },
          infoShowList:[
            {
              title:'医院简介',
              content:'<span style="font-size:40px"><strong>威宁县中医医院国医堂</strong></span>威宁县中医医院国医堂成立于2016年，现有主任医师1人，副主任医师2人，高年资住院医师2人。目前开设有国医堂一诊室、二诊室、三诊室及小儿推拿室。科室医师中医功底深厚，擅长辨证论治，注重整体观，勤于学习，对中医心病、肺病、脾胃病、肝胆病、肾病、脑病、内分泌病、肿瘤病、血液病、老年病、风湿病、男科病、皮肤病、乳腺病、肛肠病、骨伤病、妇科病、儿科病、眼科病及耳鼻喉病等各系统疾病均有较为深入研究，并有良好的临床效果，临证谨记大医精诚，深受广大患者信任。威宁县中医医院国医堂成立于2016年，现有主任医师1人，副主任医师2人，高年资住院医师2人。目前开设有国医堂一诊室、二诊室、三诊室及小儿推拿室。科室医师中医功底深厚，擅长辨证论治，注重整体观，勤于学习，对中医心病、肺病、脾胃病、肝胆病、肾病、脑病、内分泌病、肿瘤病、血液病、老年病、风湿病、男科病、皮肤病、乳腺病、肛肠病、骨伤病、妇科病、儿科病、眼科病及耳鼻喉病等各系统疾病均有较为深入研究，并有良好的临床效果，临证谨记大医精诚，深受广大患者信任。威宁县中医医院国医堂成立于2016年，现有主任医师1人，副主任医师2人，高年资住院医师2人。目前开设有国医堂一诊室、二诊室、三诊室及小儿推拿室。科室医师中医功底深厚，擅长辨证论治，注重整体观，勤于学习，对中医心病、肺病、脾胃病、肝胆病、肾病、脑病、内分泌病、肿瘤病、血液病、老年病、风湿病、男科病、皮肤病、乳腺病、肛肠病、骨伤病、妇科病、儿科病、眼科病及耳鼻喉病等各系统疾病均有较为深入研究，并有良好的临床效果，临证谨记大医精诚，深受广大患者信任。'
            },
            {
              title:'医院地址',
              content:'地址:贵州省毕节地区威宁彝族回族苗族自治县威宁县中医院。',
              img:''
            }
          ]
        }
      }
    };
  }
};
