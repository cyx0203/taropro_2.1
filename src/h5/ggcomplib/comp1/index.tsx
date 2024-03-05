import { AtButton} from "taro-ui";
import { View } from '@tarojs/components';
import React, { useState, useEffect, useImperativeHandle, useRef } from 'react';
import { GGUtil_NAN_DATA_EXCUTE } from '@/GGUtil/Common';
import './index.scss';

const BASE_RES = (url: string) => {
  return window.GG.Res(url);
}

const GGCPS_Copywriter = (type: string) => {
  let str:string = '';
  if (type === 'result_empty') str = '暂无数据';

  return str;
}

export {
  GGCPS_Copywriter
}