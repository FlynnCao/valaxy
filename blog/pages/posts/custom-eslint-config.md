---
title: Customise your ESLint config, step by step | 自定义ESLint Config手把手
date: 2023-07-18
updated: 2023-07-18
hide: true
tags:
  - eslint
  - formatter
categories:
  - blog
---
::en
## Starter
~~I browsed several youtube videos but no one give me right guidance and finally I find a tutorial in (掘金)['https://juejin.cn/post/7130277872412917797/'].~~

Unfortunately, tutorials related to this topic are rare and I cannot even find a new suitable one, in which I recommend official [ESLint customize tutorial](https://eslint.org/docs/latest/use/configure/plugins).


## AST
I won't talk much about this, the basic of ESLint is to parse and check the page of code as a tree, which we call it AST, you can explorer it here:

https://astexplorer.net/


## Configs of Plugin

Example: https://github.com/vuejs/eslint-plugin-vue

As we are talking about plugins, it's obvious that even one kind of plugin like `eslint-plugin-vue` would consider different aspects of users, thus it has the following presets(configs):

The core module of this repository is [lib](https://github.com/vuejs/eslint-plugin-vue/tree/master/lib), where all rules, configs and utils are stored here: 

So here it is:

![20230721134006](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230721134006.png)
::

