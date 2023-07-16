---
title: CSS中的绝对定位和相对定位
date: 2021-02-14
updated: 2021-02-14 
tags:
  - css
  - frontend
categories:
  - blog
---


:angry: **这篇文章是提醒你。2023年了，别写CSS了！快去用UnoCSS和Tailwind了!**


## css3 position属性
## relative和absolute
1、文档流不同

relative 不脱离文档流，absolute 脱离文档流。

2、分级不同

relative 参考自身静态位置通过 top(上),bottom（下）,left（左）,right（右） 定位，并且可以通过z-index进行层次分级。

absolute通过 top,bottom,left,right 定位。选取其最近的父级定位元素，当父级 position 为 static 时，absolute元素将以body坐标原点进行定位，可以通过z-index进行层次分级。

3、定位不同

* absolute是绝对定位，绝对定位就是相对于**父元素**的定位，不受父元素内其他子元素的影响
* relative是相对定位，相对定位是相对于**同级元素**的定位，也就是上一个同级元素。

> 相对于未设置任何定位前，自身原来应该处于的位置进行偏移

## 补充
CSS中，::before 创建一个伪元素，其将成为匹配选中的元素的第一个子元素。常通过 content 属性来为一个元素添加修饰性的内容。此元素默认为行内元素。
例子：.collect::before将在.box元素下创建一个元素，这时候给.collect设置position:relative属性则可以给生成的伪元素设置absolute属性来相对于.collect元素进行偏移
```css
.collect{
         position:relative;
      }
      .collect::before{
        content:'';
        position: absolute;
        left:0;
        width:14px;
        height:15px;
        top:0;
        background:url('~assets/images/shoucang.png') 0 0/14px 14px;
      }
```

### 挤压
给一个元素设置定位属性会挤压原本的内容大小，比如在
```html
<div class="box-wrapper>
  <div class="box"></div>
</div>
...
<style>
.box-wrapper{
  position:relative;
}
.box{
  position:absolute;
  left:50px;
  top:0px;
}
</style>
```
假设此时屏幕宽度一共300px.则在视图给.box盒子赋值`width:300px`或者`width:100%`将会失效，能设置的最大宽度为 250px。
