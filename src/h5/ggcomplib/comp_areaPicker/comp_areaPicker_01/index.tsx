import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Image, Text, Picker } from '@tarojs/components';
import { Root, CPSLB } from '@/GGCompLibBase';
import './style/index.scss';
import { AtList, AtListItem } from 'taro-ui';
const CPSNAME = 'comp_areaPicker_01';
const Comp_AreaPicker_01 = forwardRef((props: any, ref) => {

  useImperativeHandle(ref, () => ({
    setPickerArea() {
      // console.log('init',props.config.area)
      getProviceList();
    }
  }))



  //数据
  const data = props.config;
  const type = props.type;
  const onItemClick = props.onClick;

  const [State, setSt] = useState({
    selectIndexList: [0, 0, 0],
    provice: [],
    city: [],
    area: [],
    combo: [[], []],
    allDt: [],
  })


  const areadata = (
    props.config.area ?
      props.config.area :
      {
        two: [
          {
            "label": "北京市",
            "value": "110000",
            "pcode": "000000",
            "children": [
              {
                "pcode": "110000",
                "label": "北京市",
                "value": "110100"
              }
            ],

          },
        ],
        tree: [
          {
            "pcode": "000000",
            "children": [
              {
                "pcode": "110000",
                "children": [
                  {
                    "pcode": "110100",
                    "label": "东城区",
                    "value": "110101"
                  },
                  {
                    "pcode": "110100",
                    "label": "西城区",
                    "value": "110102"
                  },
                  {
                    "pcode": "110100",
                    "label": "南城区",
                    "value": "110103"
                  },
                ],
                "label": "北京市",
                "value": "110100"
              },
            ],
            "label": "北京市",
            "value": "110000"
          }
        ]
      }
  );
  const [selectedTxt, setSelect] = useState('');


  useEffect(() => {
    // setArea();
    console.log('进入了area_picker')
    console.log(data)
    getProviceList();
  }, []);

  // 三级地区选择

  const getProviceList = () => {
    // console.log('a:', areadata.two)
    if (!areadata || !areadata.two || areadata.two.length < 1) {
      console.log('暂无areadata');
      return;
    }
    let allDt: any = areadata.two;
    // console.log('dt:' + JSON.stringify(areadata.two))
    // let allDt: any = dt.two

    let p: any = [];
    let c: any = [];
    for (let i = 0; i < allDt.length; i++) {
      let _p: any = allDt[i];
      p.push(_p.label);
      let _c: any = [];
      if (_p.children && _p.children.length > 0) {
        for (let j = 0; j < _p.children.length; j++) {
          _c.push(_p.children[j].label);
        }
        c.push(_c);
      }
      else {
        c.push([]);
      }
    }

    let temp = { ...State }
    temp.allDt = allDt
    temp.provice = p
    temp.city = c
    temp.combo = [p, c[0], getAreaList(allDt[0].value, allDt[0].children[0].value)]
    setSt(temp)
  }

  const getAreaList = (pcode, ccode) => {
    // let areasDt = data.tree;
    let areasDt = areadata.tree;
    let data1: any = [];
    for (let i = 0; i < areasDt.length; i++) {
      if (areasDt[i].value === pcode) {
        data1 = areasDt[i].children;
        break;
      }
    }

    let data2: any = [];
    for (let i = 0; i < data1.length; i++) {
      if (data1[i].value === ccode) {
        data2 = data1[i].children;
        break;
      }
    }

    let ret: any = [];
    for (let i = 0; i < data2.length; i++) {
      ret.push(data2[i].label);
    }

    return ret;
  }

  const getCombo = (pIndex) => {
    let cDt = State.city[pIndex];
    let temp = { ...State }
    temp.combo = [State.provice, cDt, getAreaList(State.allDt[pIndex].value, State.allDt[pIndex].children[0].value)]
    temp.selectIndexList = [pIndex, 0, 0]
    setSt(temp);
  }

  const getCombo2 = (dt, indexList) => {
    let temp = { ...State }
    temp.combo = [
      State.combo[0],
      State.combo[1],
      dt
    ];
    temp.selectIndexList = indexList;
    setSt(temp)
    console.log(temp);

  }


  return <Root className={props.className} cpsName={CPSNAME}>
    <Picker
      className='GGPicker'
      mode='multiSelector'
      value={State.selectIndexList} range={State.combo} onChange={(dt: any) => {
        // if (selectedTxt === '') {
        let temp = { ...State }
        // temp.selectIndexList = [0, 0, 0]
        temp.selectIndexList = dt.detail.value
        setSt(temp);
        let val = State.combo[0][State.selectIndexList[0]] + ' ' + State.combo[1][State.selectIndexList[1]] + ' ' + State.combo[2][State.selectIndexList[2]]
        setSelect(val)
        let fun = onItemClick;
        if (fun) fun(val)

        //  console.log(val);
        // }
      }}
      onColumnChange={
        (dt: any) => {
          //  console.log(dt);
          if (dt.detail.column === 0) {//第一列省
            getCombo(dt.detail.value);
          }
          if (dt.detail.column === 1) {//第二列市
            let pIndex = State.selectIndexList[0];
            let cIndex = dt.detail.value;
            let allDt = State.allDt;

            let pCode = allDt[pIndex].value;
            let cCode = allDt[pIndex].children[cIndex].value;
            // console.log(pCode, cCode)
            let ret = getAreaList(pCode, cCode);

            let temp = { ...State }
            temp.selectIndexList = [pIndex, dt.detail.value, 0];
            getCombo2(ret, temp.selectIndexList);
            // setSt(temp)
          }
          if (dt.detail.column === 2) {//第三列区
            // console.log('selectIndexList[2]为' + State.selectIndexList[2])

            let pIndex = State.selectIndexList[0];
            let cIndex = State.selectIndexList[1];
            let temp = { ...State }
            temp.selectIndexList = [pIndex, cIndex, dt.detail.value]
            setSt(temp)
            // setSelect(State.combo[0][State.selectIndexList[0]] + ' ' + State.combo[1][State.selectIndexList[1]] + ' ' + State.combo[2][State.selectIndexList[2]])

          }
        }
      }>
      <AtList className='atlist'>
        <AtListItem
          className='atlistItem'
          arrow='right'
          // customStyle={{ width: '100%' }}
          // title={selectedTxt ? '' : '请选择家庭地址所在区'}
          extraText={selectedTxt ? selectedTxt : data.defaultTxt}
        />
      </AtList>
    </Picker>

  </Root>
})

export { Comp_AreaPicker_01 }
