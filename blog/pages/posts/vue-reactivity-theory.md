---
title: Vue2数据响应式原理
date: 2021-11-21
updated: 2021-11-21
tags:
  - vue
  - frontend
categories:
  - blog
---
![20230716014827](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716014827.png)

## 概述

* MVVM

模板->  数据变化   ->  数据变化引起视图自动变化

**model   <-  view-model   ->view**

* 侵入式和非侵入式

Vue的数据变化为非侵入式变化，即直接调用变量自身，而不使用额外的api

React和小程序的变化需要调用额外的api 

> this.a = 1直接改变变量自身，等于改变了视图 

* 上帝的钥匙

`Object.defineProperty()`利用JS引擎来检测对象的属性变化

## Object.defineProperty

### 简介

方法含义：直接在对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象

```js
const obj = {}
Object.defineProperty(obj, 'a', {
  value: 3
})
Object.defineProperty(obj, 'b', {
  value: 5
})
console.log(obj) // -> obj{a:3,b:5}
console.log(obj.a) // -> 3
console.log(obj.b) // -> 5
```

### 描述器 

descriptor是`Object.defineProperty`的第三个参数，除了`value`之外还具有以下关键字：

* writable

`writable:true `表示则此属性可以被修改，默认不可修改

![image-20211121155812523](https://image-1256777099.cos.ap-beijing-fsi.myqcloud.com/img/image-20211121155812523.png)

* enumberable

`enumerable:true` 则此属性可以被`for in `等循环枚举，默认不可被枚举

* get和set方法

```js
const obj = {}
Object.defineProperty(obj, 'a', {
  get() {
    console.log('你正在试图访问obj的a属性')
    return 111
  },
  set(val) {
    console.log('你正在试图改变obj的a属性', val)
  }
})
obj.a++ // ->
```

当对属性a进行修改时，会先调用get函数 再触发set函数 

get返回值会被当做属性的值，因此不能和`value`描述共存

set函数会传入一个参数，是要赋的新值

:star:例子：通过临时变量周转，用getter getter改变属性的值

```js
let temp
Object.defineProperty(obj, 'a', {
  get() {
    console.log('你正在试图访问obj的a属性')
    return temp
  },
  set(newValue) {
    console.log('你正在试图改变obj的a属性', newValue)
    temp = newValue
  }
})

obj.a = 9
obj.a++
```

## defineReactive函数

通过闭包，可以将val变量作为只存在于defineReactive函数内而可被get set访问的中间变量，从而实现用get set动态修改对象的属性

> http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html

**./defineReactive.js**

```js
export default function defineReactive(data, key, val) {
// debugger
  Object.defineProperty(data, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可配置
    get() { // getter
      return val
    }, // setter
    set(newValue) { // @newValue 要改变的值
      if (val == newValue)
        return

      val = newValue
    }
  })
}

defineReactive(obj, 'a', 10)
console.log('obj.a :>> ', obj.a)
obj.a++
console.log('obj.a :>> ', obj.a)
obj.a += 10
console.log('obj.a :>> ', obj.a)
```

从此，可以使用`defineReactive`给对象定义一个可以自由更改的属性

### Observer类

Observe函数会将对象的每一层的每一个属性都转化成响应式的（可以被侦测）

**./Observer.js**

![image-20211121171307173](https://image-1256777099.cos.ap-beijing-fsi.myqcloud.com/img/image-20211121171307173.png)

* 遍历

Observer的构造首先判断有没有`__Ob__`属性（响应式标记），如果没有则增加此标记，然后给这一层的每一个属性都`defineReactive`增加响应式处理

```js
import utils, {
  def
} from './utils.js'
import defineReactive from './defineReactive.js'

export default class Observer {
  constructor(value) {
    console.log('我是Observer构造器')
    // 给实例 构造函数中的this只代表实例
    // 添加了一个__ob__属性 值是这次new的实例
    def(value, '__ob__', this, false)
    this.walk(value)
  }

  // 遍历
  walk(value) {
    console.log('value :>> ', value)
    for (const key in value)
      defineReactive(value, key)

  }
}
```

### Observe 方法

**./observe.js**

```js
import Observer from './Observer'

export default function (value) {
  if (typeof value != 'object')
    return
	 // 如果value不是对象 什么都不做
  // 定义ob ; __ob__仅仅代表这一层定义过了响应式
  let ob
  if (typeof value.__ob__ !== 'undefined')
    ob = value.__ob__

  else
    ob = new Observer(value)

  return ob
}
```

### defineReactive再改造

**./defineReactive.js**

```js
import observe from './observe'

export default function defineReactive(data, key, val) {
  if (arguments.length == 2)
    val = data[key] // 如果key名字=val 如此处理

  console.log('我是define reactive :>> ', key)
  let childOb = observe(val) // 在这里把此对象的子属性的也给观察了 递归
  Object.defineProperty(data, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可配置
    get() { // getter
      console.log('get')
      return val
    }, // setter
    set(newValue) { // @newValue 要改变的值
      console.log('set')
      if (val == newValue)
        return

      val = newValue
      childOb = observe(newValue) // 设置了新值 原来的地址失效 新值也要被observe；基础数据类型无所谓，但是变量和数组需要重新来
    }
  })
}
```

在循环遍历对象的属性，给其添加响应式时，给每一个属性也添加观察（调用observe），相当于向下递归调用了observe方法，直到元素不包含属性（即undefined)为止，同时在set赋值新变量时，及时更新响应式，这样就完成了对每一层的响应式添加。

### 最终效果

**index.js**

```js
import observe from './observe.js'

const obj = {
  a: {
    m: {
      n: 5
    }
  },
  b: 10
}
observe(obj) // 初始化，开始观察
console.log('obj :>> ', obj)
```

可以看到变量obj每一层的属性都添加了getter和setter

![image-20211121184649342](https://image-1256777099.cos.ap-beijing-fsi.myqcloud.com/img/image-20211121184649342.png)

当改变obj的最内层n变量为新值时，新值也会自动添加响应式

```js
obj.m.n = 'abc'
```

![image-20211121184155219](https://image-1256777099.cos.ap-beijing-fsi.myqcloud.com/img/image-20211121184155219.png)

## 数组的响应式处理

Vue为了能够对数组也添加响应式，改写了数组的部分方法

包括：push、pop、shift、unshift、splice、sort、reverse

> 这几个方法将改变数组自身，而不更改地址的方法

![image-20211121192157091](https://image-1256777099.cos.ap-beijing-fsi.myqcloud.com/img/image-20211121192157091.png)



首先对`Observer.js`进行开刀，如果属性是数组，特殊处理之，方法为

```js
	//遍历数组
	dealArray(arr) {
		for (let i = 0, len = arr.length; i < len; i++) {
			//逐项进行observe拆解，直到目标元素非数组 
			observe(arr[i])
		}
	}
```

使用上述方法在observe进行处理时，可以发现数组一定是作为对象的某个属性存在的，因此次属性，如g先天存在`__ob__`属性

![image-20211121195406808](https://image-1256777099.cos.ap-beijing-fsi.myqcloud.com/img/image-20211121195406808.png)

在目录中新建`array.js`作为新原型的存储位置



对于这个原型，需要有以下几个注意点：

* 新的prototype将会继承Array.prototype原型，在他的基础上进行修改

* 而由于 push splice unshit能够插入新项，所以每次都需要把新的项也递归处理成响应式的

**./array.js**

```js
// 得到Array的原型
import utils, {
  def
} from './utils.js'

const arrayPrototype = Array.prototype
console.log('arrayPrototype :>> ', arrayPrototype)
// 以ArrayPrototype为原型创建arrayMethodsProp对象
export const arrayMethodsProp = Object.create(Array.prototype)
console.log('arrayMethodsProp :>> ', arrayMethodsProp)
const methodNeedChange = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

methodNeedChange.forEach((methodName) => {
  const original = arrayPrototype[methodName] // 备份原始方法
  def(arrayMethodsProp, methodName, function () {
    const ob = this.__ob__
    const args = [...arguments]
    let inserted = []
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted)
      ob.dealArray(inserted)

    console.log('数组更改接口')
    const result = original.apply(this, args) // 调用原始方法
    return result
  }, false)
})
```

> arguments（函数的参数们）是类数组，需要先转化为数组才能使用slice方法

### 最终效果

经过以上改造，当我们再对obj中的g属性进行push、split等操作时，可以发现`__ob__`始终存在，且能够打印出`数组更改接口`，而且原有的功能一切正常

**index.js**

```js
const obj = {
  a: {
    m: {
      n: 5
    }
  },
  b: 10,
  g: [1, 2, 3]
}
observe(obj)
console.log('obj :>> ', obj)
obj.g.push(10)
obj.g = [10, 20, 30]
obj.g.splice(0, 1) // 删除第一个元素
```



![image-20211121202641016](https://image-1256777099.cos.ap-beijing-fsi.myqcloud.com/img/image-20211121202641016.png)

>  这篇文章的Demo代码：https://github.com/FlynnCao/vue2reactiveTheory

> 转载自我的博客园，原文：https://www.cnblogs.com/caozhenfei/p/15585764.html
