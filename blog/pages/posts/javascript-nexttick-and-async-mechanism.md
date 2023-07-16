---
title: Vue的nextTick函数及JavaScript异步原理
date: 2021-08-06
updated: 2021-08-06
tags:
  - vue
  - frontend
  - javascript
categories:
  - blog
---


在vue环境下，对于某一个确定的函数内，可以按优先级分为以下三种：



1、同步任务

2、伪同步任务(nextTick)

3、异步任务（setTimeout、promise（microtask queue）、setTimeout、MutationObserver、DOM事件、Ajax等）



相关材料：[vue nextTick深入理解－vue性能优化、DOM更新时机、事件循环机制 - 蒲公英tt - 博客园 (cnblogs.com)](https://www.cnblogs.com/hity-tt/p/6729118.html)

这个例子中在控制台的输出结果如图：



系统总会先执行某一个上下文中的同步任务，然后再考虑伪同步任务和异步任务，

![](https://img2020.cnblogs.com/blog/2282342/202108/2282342-20210806180715143-861308543.png)


另外，总结的规则如下：

　　　　　　a、在同一事件循环中，只有所有的数据更新完毕，才会调用nextTick；

　　　　　　b、仅在同步执行环境数据完全更新完毕，DOM才开始渲染，页面才开始展现；

　　　　　　c、在同一事件循环中，如果存在多个nextTick，将会按最初的执行顺序进行调用；

　　　　从用例1+用例4得出：

　　　　　　d、从同步执行环境中的四个tick对应的‘li’数量均为30000可看出，同一事件循环中，nextTick所在的视图是相同的；

　　　　从用例2得出：

　　　　　　e、只有同步环境执行完毕，DOM渲染完毕之后，才会处理异步callback

　　　　从用例3得出：

　　　　　　f、每个异步callback最后都会处在一个独立的事件循环中，对应自己独立的nextTick;

　　　　从用例1结论中可得出：

　　　　　　g、这个事件环境中的数据变化完成，在进行渲染［视图更新］，可以避免DOM的频繁变动，从而避免了因此带来的浏览器卡顿，大幅度提升性能；

　　　　从b可以得出：

　　　　　　h、在首屏渲染、用户交互过程中，要巧用同步环境及异步环境；首屏展现的内容，尽量保证在同步环境中完成；其他内容，拆分到异步中，从而保证性能、体验



> 迁移自我的博客园，[原文](https://www.cnblogs.com/caozhenfei/p/15109874.html)
