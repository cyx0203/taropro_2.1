# Comp_Nav
>  组件说明：
底部导航栏。

### 参数配置

| 配置值 | 类型 | 说明 |配置|
| -----| ---- | ---- |--------|
| **config** | *object* | 主数据 |/|
| **type** | *string* | 导航类型|normal|
  
<kbd>config (object)</kbd>
```javascript
{
    //主数据
    list: [
        {
            //默认ICON路径
            normal_img_url: '',
            //激活后ICON路径
            active_img_url: '',
            //文本内容
            text: '导航项1',
            //是否是激活状态
            active: true
        },
        {
            normal_img_url: '',
            active_img_url: '',
            text: '导航项2'
        },
        ...
    ],
    //点击事件
    onClick:(item,index)=>{}
}
```

### 样式配置
```less
//ICON尺寸
$icon-size:45px;
//文字大小
$label-size:0.6rem;
//导航栏背景色
$bg-color: #d3f7f7;
//导航栏上部圆角弧度
$bg-radius:30px;
//导航栏上部是否需要阴影
$need-shadow:true;
//导航栏上部阴影颜色
$shadow-color:#60028f;
```


