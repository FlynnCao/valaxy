---
title: JavaScript中闭包和this指向问题
date: 2020-09-20
updated: 2020-09-20
tag:
  - frontend
  - javascript
categories:
  - blog
---

# JavaScript中闭包和this指向问题


**——当作为对象的方法调用时，这个函数里的this绑定到这个对象上面，
当作为函数调用时，这个函数里的this绑定到全局对象上面**

要求说出以下两段代码在控制台的最终输出结果：
（1）
```js
const name = 'The Window'
const object = {
  name: 'my object',
  getNameFunc() {
    console.log(this)
    return function () {
      console.log(this)
      return this.name
    }
  }
}
console.log(object.getNameFunc()())
```
（2） 
```js
const name = 'The Window'
const object = {
  name: 'My Object',
  getNameFunc() {
    const that = this
    return function () {
      return that.name
    }
  }
}
console.log(object.getNameFunc()())
```


《JavaScript高级程序设计》上讲到匿名函数时大概有这么一句话：”匿名函数的this通常指向全局window“，为什么这么说呢？比如题目中返回的那个匿名函数，你是无法使用object.func()这样的形式调用它的，因为它没有函数名。也就是说你只能通过某种途径在某个位置调用它，却无法令某一个对象调用它。因此它通常只有指向window。

## 第一种情况
```js
const name = 'The Window'
const object = {
  name: 'my object',
  getNameFunc() {
    console.log(this)
    return function () {
      console.log(this)
      return this.name
    }
  }
}
console.log(object.getNameFunc()())
```
全局的变量和函数都会存储在`window`对象中，对于第一种情况，由于在`getNameFunc`函数中不存在变量的存储，因此未形成闭包。
getNameFunc函数在函数外被object调用，然而其返回的匿名函数在使用`()`调用时并没有明显的调用者（直接作为函数来调用），因此向上追溯到`window`作为调用对象，此时this指向`window`对象。控制台最终的输出结果为My Window


## 第二种情况
在JavaScript的CDN中有如下描述

*闭包是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用
域内的任何局部变量。在本例子中，myFunc 是执行 makeFunc 时创建的 displayName 函数实例的引用。displayName 的实例维持了一个对它的词法环境（变量 name 存在于其中）的引用。因此，当 myFunc 被调用时，变量 name 仍然可用，其值 Mozilla 就被传递到alert中。*


可以看出，需要使用另外一个变量名来指向执行完函数的那段内存空间，这个内存空间保留了函数执行完毕后各个变量的值，让它的生命周期得以延续，这个大义凛然的变量名称为函数状态的引用，因此可以直接用`变量名()`来调用函数副本。


```js
const name = 'The Window'
const object = {
  name: 'My Object',
  getNameFunc() {
    const that = this
    return function () {
      return that.name
    }
  }
}
console.log(object.getNameFunc()())
```
在`console,log`的执行过程中，首先使用object对象来调用getNameFunc，显然在`var that  = this`这条语句中this指向调用者object，形成闭包，和匿名函数体一道保存下来，再次调用匿名函数，that在匿名函数的作用域中可见，因此可以打印出`that.name`为object作用域中的name属性，结果为My Object。

## 新解
可以把`console.log`执行过程化为下述**显性代码**，更容易理解
```js
const a = object.getNameFunc()
const b = a()
console.log(b)
```
可以得出以下结论：

第一种情况中，由于getNameFunc只有返回匿名函数体，因此在此函数被调用结束后没有形成闭包，a直接成为匿名函数体的引用。直接以函数方式调用a，this的调用者为`window`，最终结果为My Window。

第二种情况中，由于`getNameFunc`中存在了名为that的变量，因此在此函数被调用结束后形成了闭包，在此闭包中，变量that存储了当时的this指向（它的调用者object对象），在执行结束后，返回了一个匿名函数以及其变量that，而变量a成为了此函数状态的引用。直接以函数方式调用a，that存活在引用a的作用域中，此时输出`that.name`相当于输出`object.name`，最终结果为My Object。

## 拓展延伸
那么如何在不修改代码的情况下输出My Object呢？这时要借助Function原型对象内建的call方法来修改函数的调用者，代码如下
```js
console.log(object.getNameFunc().call(object))
```
给匿名函数指定调用者为object，this也就指向它，最终打印输出object作用域中的name，结果为My Object。
