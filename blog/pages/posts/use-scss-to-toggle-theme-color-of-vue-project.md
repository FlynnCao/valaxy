---
title: 利用SASS/SCSS切换Vue项目主题
date: 2021-04-17
updated: 2021-04-17
tags:
  - frontend
  - vue
  - css
  - scss
categories:
  - blog
---

最近在做的项目使用到了主题切换，我也趁此机会学习了一下SCSS/SASS这门CSS编译型语言，特此研究并带实现一个Vue Demo中实现主题切换。

>  SCSS是SASS兼容CSS的版本，本文内全部使用SCSS一称。

:pencil2:大体思路如下：

1.使用vuex全局执行命令切换主题 (state - mutations 无须异步)

2.遍历主题色并设置混合，在需要的地方插入混合，使用方法查找对应颜色，生成嵌套，写全局类

3.利用VueX和v-bind:class语法将应用到全局

4.需要的时候直接在对应元素加上全局类即可

> 某些组件库强制固定了样式，也可以使用此方法修改默认颜色

## 新建一个Vue demo

Vue Cli版本为 `4.5.11`， 在任意文件夹下打开终端，键入`vue create thememo`命令创建一个脚手架，这里选用Vue2.x版本，特性选用`babel+router+vuex+css Pre-processors`，sass编译器使用`dart-sass` ，路由使用历史记录模式

![image-20210417183252616](https://image-1256777099.cos.ap-beijing-fsi.myqcloud.com/image-20210417183252616.png)



等待包加载完成后，使用`cd themedemo` -> `npm run serve`热部署

假设我们先配置两种颜色 `蓝色` 和 `红色`，首先需要为每种主题添加同名但不同`值`的颜色变量

`varible.scss` 常用颜色变量表

`themeVarible.scss` 不同主题下的颜色列表

`themeMixin.scss` 工具

`themify.scss` 混合及混合应用

这些文件均放置在 `src/assets/css/theme`目录下

**提示：按钮是特殊的，除了主题色还要有default、info等颜色，所以需要单独定义出来，其他的组件直接借用主题色即可**

## 定义颜色

scss提供了类似JS中对象语法的集合map用存储键值对，它和JS一样是弱类型语言

> map的键值可以是任何scss类型

主题色是我们使用最多的颜色，重复书写不方便修改，我们先创建一个 `variable.scss`来存储

```scss
$blove-color: #1684fc;
$flammulated-color: #f74248;
```

然后再新建一个`themeVariable.scss`来精准确定主题的变化色，接下来会反复遍历这个集合

```scss
@import './variable.scss'; //导入常用颜色变量
$themes:(blove:( //主题 蓝
        //布局
        basis-color: $blove-color,
        menu-hover-color: #FFFFFF,
        them-title-background:#D2D8EA,
        them-title-color: #1684FC,
        // 按钮
        btn-primary-background: $blove-color,
        btn-primary-boder: 1px solid $blove-color,
        btn-primary-color: #FFFFFF,
        btn-primary-background-hover:#409eff,
        btn-primary-boder-hover: 1px solid #409eff,
        btn-primary-color-hover: #FFFFFF,
    ),
    flammulated:( //主题 红 
        // 布局
        basis-color: $flammulated-color,
        menu-hover-color: #FFFFFF,
        them-title-background: #EAD2D2,
        them-title-color: #E33F3F,
        // 按钮
        btn-primary-background: $flammulated-color,
        btn-primary-boder: 1px solid $flammulated-color,
        btn-primary-color: #FFFFFF,
        btn-primary-background-hover: #f86065,
        btn-primary-boder-hover: 1px solid #f86065,
        btn-primary-color-hover: #FFFFFF,
    ))
```

然后我们来写方法和混合以取出`themeVariable.scss`中的值，根据SCSS的语法：

@mixin定义一个混合，然后可以使用@include使用这个混合

@minxin可以使用参数，但是不能返回值

`#{}` 用来插值参数，可以用来动态修改名称

@each 来遍历一个map  每次循环第一个取出的为键 每次第二个取出的为值



## 使用混合和函数生成嵌套组

新建一个文件`mixin.scss`用来存放先决混合和取值方法



`themify`定义了一种混合，遍历themeVariable.scss 中map的第一层来生成数个className

这个案例中至多会生成`.theme-blove` `.theme-flammulated`和`theme-button`三种类

使用`@content`可以定义使用混用时的对象位置，以这样的方式将刚才的方法引入到每个使用themify函数的位置，从而营造出全局主题类 



而themed则供外部类调用，每次调用

```scss
@import './themeVariable.scss'; //导入颜色列表

//取出主题色
@mixin themify($themes) {
    @each $theme-name,
    $map in $themes {
        $myMap: $map !global; //全局变量供函数调用
        //新定义一个类
        .theme-#{$theme-name} {
            @content; //插入位置
        }
    }
}

//从主题色map中取出对应颜色
@function themed($key) {
    @return map-get($myMap, $key)
}
```





```scss
@import './variable.scss';
@import './mixin.scss';

//按钮混合
@mixin button($value:default) {
    background-color: themed('btn-#{$value}-background');
    border:themed('btn-#{$value}-color');
    color:themed('btn-#{value}-color');
    border: 1px solid;
    width:100px;
    height:50px;
    border-radius: 10px;

    &:hover {
        background-color: themed('btn-#{$value}-background-hover');
        border:themed('btn-#{$value}-border-hover');
        color:themed('btn-#{$value}-color-hover');
    }


}

//全局类 使用混合方法
@include themify($themes) {

    //标题类
    .them_title {
        width: 100%;
        height: 40px;
        //因为在这个位置已经包含了$theme-map，例如blove(...)所以直接用方法取出对应变量即可
        background-color: themed('them-title-background');
        color: themed('them-title-color');
    }

    ;

    //按钮类
    .them-btn-default {
        @include button;
    }

    .them-btn-primary {
        @include button('primary');
    }

    .them-btn-info {
        @include button('info');
    }

}
```







## :star:流程模拟

> **官方文档：** 当 `@content` 在指令中出现过多次或者出现在循环中时，额外的代码将被导入到每一个地方。

注意到我们使用了两次混合

```scss
 .them-btn-primary {
        @include button('primary');
    }

```

对于使用`@include button('primary')`的语法，因为先决使用了@include包含，所以默认将

```scss
	.el-button--default {
		@include button;
	}

	.el-button--primary {
		@include button('primary');
	}

	.el-button--info {
		@include button('info');
	}

```

都嵌套进了themify混合中生成大类

而对于` button('primary')`自身得情况，可以看做进行了如下的嵌套

```scss
@import './themeVariable.scss'; //导入颜色列表

//取出主题色
@mixin themify($themes) {

    @each $theme-name,
    $map in $themes {
        $myMap: $map !global;

        //新定义一个类
        .theme-#{$theme-name} {
            // 表示包含 下面函数 themed()
           .them-btn-primary {
            background-color: themed('btn-primary-background');
            border:themed('btn-primary-color');
            color:themed('btn-primary-color');
            border: 1px solid;
            width: 100px;
            height: 50px;
            border-radius: 10px;

            &:hover {
                background-color: themed('btn-primary-background-hover');
                border:themed('btn-primary-border-hover');
                color:themed('btn-primary-color-hover');
            }
            }    
        }
    }
}

//从主题色map中取出对应颜色
@function themed($key) {
    @return map-get($myMap, $key)
}
```

第一层生成 ： `.theme-button` `.theme-blove`和`theme-flammulated`

第二层反复调用themed方法取出需要的颜色值，

但不是所有`$myMap`都包含basis-color这个键，**SCSS规定值为null的样式会被编译器自动忽略**，因此遍历完成会最后在css中会以这样的形式呈现：

```css
.theme-blove {
    .them-btn-primary {
        background-color: $blove-color;
        border: $blove-color;
        color: $blove-color;
        border: 1px solid;
        width: 100px;
        height: 50px;
        border-radius: 10px;

        &:hover {
            background-color: $blove-color;
            border: $blove-color;
            color: $blove-color;
        }
    }
}
```

> 将SCSS变量替换为variable.scss中的对应颜色值就是这个文件编译成css的结果

:bulb:如果是被插入的是`button('info')`则为

```scss
.theme-blove {
    .them-btn-primary {
        background-color: #FFFFFF;
        border: 1px solid #666666;
        color: #000000;
        border: 1px solid;
        width: 100px;
        height: 50px;
        border-radius: 10px;

        &:hover {
            background-color: #e6e6e6;
            border: 1px solid #666666;
            color: #000000;
        }
    }
```



## 全局管理和应用主题切换

使用VueX可以异步或同步地在全局范围内定义变量并且修改，具体写法如下

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'blove'
  },
  mutations: {
    THEME_CHANGE(state, theme) {
      state.theme = theme
    }
  },
  actions: {
    themeChange({
      commit
    }, theme) {
      commit('THEME_CHANGE', theme)
    }
  },
  modules: {}
})
```

当需要切换主题时，只需要在方法体内执行`this.$store.dispatch('themeChange','主题名')`即可



在`App.vue`中引入SCSS并将主题方案存储在本地防止丢失

```html
<template>
  <div id="app" :class="themeClass" class="theme-button">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  watch: {
    //主题变化存储在本地
    themeClass() {
      localStorage.theme = this.$store.state.theme;
    },
  },
  //创建时读取本地主题
  created() {
    if (localStorage.theme) {
      this.$store.dispatch("themeChange", localStorage.theme);
    } else {
      localStorage.theme = this.$store.state.theme;
    }
  },
  //主题色类名获取
  computed: {
    themeClass() {
      return `theme-${this.$store.state.theme}`;
    },
  },
};
</script>
<style lang="scss">
@import "./assets/css/theme/themify.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

```

在作为展示页的`About.vue`，点击按钮切换主题只需要使用dispatch方法就可以命令ACTIONS调用MUTATIONS修改vuex中和本地存储的主题名，从而生成不同的主题类名

```html
<template>
  <div class="about">
    <button @click="redTheme">红色主题</button>
    <button @click="blueTheme">蓝色主题</button>
    <hr />
    <h1 class="them_title">This is an about page</h1>
    <button class="them-btn-default">默认</button>
    <button class="them-btn-primary">主要</button>
    <button class="them-btn-info">提示</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    blueTheme() {
      this.$store.dispatch("themeChange", "blove");
    },
    redTheme() {
      this.$store.dispatch("themeChange", "flammulated");
    },
  },
};
</script>
```

 ## 效果

![20230716015741](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716015741.png)


> 搬运自我的博客园，[原文](https://www.cnblogs.com/caozhenfei/p/14672473.html)
