---
title: Building a Browser Extension - A Comprehensive Guide | 浏览器插件简易开发指南0
date: 2023-05-04
id: 1689441100
tags:
  - browser-extension
  - frontend
categories:
  - blog
keywords: keyword1,keyword2
description: description
---
:::zh-CN
最近想参与一个开源项目，用于moji词典的点击查询日语单词，比官方的用的顺手一些。用着还不错但发现年久失修。奇怪的是xlog的rss不能和ai总结结合在一起，这下要凑下字数了。

* 项目地址： https://github.com/Yukaii/mojidict-helper
* Chrome商店： https://chrome.google.com/webstore/detail/mojidict-helper/eknkjedaohafedihakaobhjfaabelkem

本篇只展示Vite/Webpack+React在Chrome浏览器中的使用：

你可以在Chrome浏览器地址栏键入`chrome://extensions/`来查看你现在安装的所有插件，

另外请保证右上角的开发者模式是打开的：

![extensions config](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716011203.png)



## 💻 开发环境

### 一般
IDE: Visual Studio Code
React: v18+
Vite: v3+
Vite: v4.2.0
Webpack: v5.76.2

我使用了`pnpm`来管理本机的所有依赖，如果没有或者使用其他包管理工具的可以自行替换`pnpm`为对应命令！

### 其他配合食用的

* TailwindCSS
* TypeScript

## 📦打包工具 （Module Bundler）

### 原生开发 （VanillaJS）

直接参考官方给的这些demo即可：

https://github.com/GoogleChrome/chrome-extensions-samples


### Webpack


https://github.com/lxieyang/chrome-extension-boilerplate-react

### Vite （推荐）

https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite

如何使用这个库？clone后安装包依赖`pnpm install`，然后启动开发模式：

`pnpm dev`: 这是开发模式
`pnpm build`： 这是生产模式

以上命令生成的代码都会在build目录下，因此只需要到`chrome://extension`目录载入一下这个目录就能边开发边看结果了：


![20230716011232](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716011232.png)


## 📑官方文档

https://developer.chrome.com/docs/extensions/


## 👟前置准备

### 生命周期

* onInstalled: 安装、更新或重新加载插件触发
* onSuspend: 插件即将被挂起触发
* onSuspendCanceled: 插件被挂起取消时触发
* onUpdateAvailable：插件可更新时（可以用于提醒用户）触发
* onStartup: Chrome启动并加载扩展时触发
* onConnect事件： 插件与Chrome的另一部分（例如内容脚本）建立连接时，将触发
* onConnectExternal：当来自外部应用程序（例如本机应用程序）的连接建立时触发
* onMessage： 当从Chrome的另一部分（例如内容脚本）接收到消息时，将触发onMessage事件


如何在代码中使用它？

`chrome.runtime.XX` XX为上述对应的一个生命周期名称,如： 

```js
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details.reason)
})
```

### 插件配置 manifest.json

从这点就有很多和manifest v2版本很不同的地方，比较重要的是manifest v2的直接修改don机制被替换成service worker，大意是不用他的时候该service worker会被chrome选择性屏蔽，但我们仍然可以通过其他方式操纵dom。


> 详细解释： https://developer.chrome.com/docs/extensions/mv3/service_workers/

一个不太复杂的manifest配置文件长这样

```json
{
  "manifest_version": 3,
  "name": "Life Helper",
  "version": "1.0.0",
  "description": "The things we must know in our life.",
  "icons": {
    "16": "icon.png",
    "48": "icon.png",
    "128": "icon.png"
  },
  "action": {
    "default_popup": "popup.html",
    "default_title": "Popup"
  },
  "permissions": [
    "scripting",
    "bookmarks"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "options_page": "options.html"
}
```

> `manifest.json`的格式请：https://developer.chrome.com/docs/extensions/mv3/manifest/

我们需要理解的只有

* permissions 开启的权限就对应了你在background.js能够调用的api，如`bookmarks`说明你可以用  [chrome.runtime](https://developer.chrome.com/docs/extensions/reference/runtime/) 下面的方法

* actions 主要规定弹出层窗口的位置名称等
  * popup 点击插件图标弹出的页面
![popup of an extension](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716011318.png)

* background 对应service_worker的承载对象，可以理解为插件后端/服务端
* contentScript 前端脚本的位置，这里直接对应react的程序入口(app.tsx->index.tsx)，之后所有逻辑&样式(popup, options, newTab) 都参照react的组织形式即可



## 开发流程

各模块的分工如下：



![UML](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716011333.png)

简单来说，所有之前交由后端的工作都由`background`来完成，所有之前交由前端的都由`contentScript`负责的`options`, `newTab`, `popup`来完成。

这也意味着，当你想做状态管理时，也能很好地遵循原子性原则组织各自的状态（M）和样式（V）、类型（M）等。

### 通信

通信在这里并没有明确的方向性，甚至也没有文件、模块等限制，需要就用。


但根据我们先前规定各模块大致的工作范畴，作为前端在通讯时最好也是来沟通各组件的样式、API调用、用户事件，而后端在通讯时优先考虑更好地组织数据、构建API或执行外部请求。


基本格式如下：

```js
// 发送消息，并回调
chrome.runtime.sendMessage({ greeting: 'hello' })
  .then(response => console.log(response.farewell))
  .catch(error => console.error(error))

// 接收消息，并回调
chrome.runtime.onMessage.addListener((request, sender) => {
  console.log(sender.tab
    ? `from a content script:${sender.tab.url}`
    : 'from the extension')
  if (request.greeting == 'hello')
    return Promise.resolve({ farewell: 'goodbye' })

})
```

消息发送和接受可以筛选tab id，并指定类型，假设我们想从popup往background发送消息，并指定当前活动标签页：




### 全局状态管理和插件数据存储

快使用Redux Toolkit！

时至今日，原生的Redux不再被推荐，新的Redux Toolkit也可以帮助我们更好结合现有模块作出分工，有类似`pinia`的用法：

我们首先初始化整体的，根据先前我们的分工，这里最好在后端（即background模块）来完成初始化和服务的构建。


```js
// store.ts
import { configureStore } from '@reduxjs/toolkit'
import { slice1, slice2 } from './slices'

export default configureStore({
  reducer: {
    slice1: slice1.reducer,
    slice2: slice2.reducer,
  },
})
export default store
```
对于各自的slice，定义如下：

```js
import { createSlice } from '@reduxjs/toolkit'

// 定义初始值
const initialState1 = {
  value: 0,
}

// 定义第一个slice
export const slice1 = createSlice({
  name: 'slice1',
  initialState: initialState1,
  reducers: {
    increment1: (state) => {
      state.value += 1
    },
    decrement1: (state) => {
      state.value -= 1
    },
  },
})
export default slice1.reducer
```



### 和chrome.storage结合保证状态持久

这里需要安装两个库`redux-persist-storage-chrome`和`redux-persist`，然后做如下改动：

在`store.ts`中改动如下：

```js
import { configureStore } from '@reduxjs/toolkit'
import { chromeStorage } from 'redux-persist-storage-chrome'
import { persistReducer } from 'redux-persist'
import { slice1, slice2 } from './slices'

const persistConfig = {
  key: 'chrome-extension-extended',
  storage: chromeStorage,
}

export const store = configureStore({
  reducer: {
    slice1: persistReducer(persistConfig, slice1.reducer),
    slice2: persistReducer(persistConfig, slice2.reducer),
  },
})

export default store
```


## 调试

如果你使用了HMR或者其他形式的热重载， 应该要关心的就只是background或contentScript本身发出的消息。

* 监视background脚本的方法：

在`chrome://extensions/`页的插件程序直接点击service worker，会弹出单独的调试窗口

![extension dev tools](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716011357.png)

* 监视options, popup或者new tab等页面：

直接在对应的页面`右键->inspect` ，会弹出单独的调试窗口


## 总结

这篇给完全没接触过浏览器插件的小伙伴做一个快速指南，其实我也是刚入门，不过好在官方给了很多sample，网上也有大量的现成教程和boilderplates来上手。


## 预告

~~下篇会尝试研究chrome-extension-boilerplate-react-vite项目的rollup和ws结合过程。（这个已经不属于插件开发的范畴了）~~


下篇会研究其他浏览器的插件与拓展其他boilderplate在Vue3上的使用。

（05/08更新：）

[antfu的浏览器extension模板](https://github.com/antfu/vitesse-webext)很好用。但在firefox上行不通，问题在于web-ext且[Firefox浏览器对manifestV3的支持仍不稳定](https://github.com/mozilla/web-ext/issues/2532)。

（06/01更新：）

经评论区Diy.God推荐了浏览器拓展专用的SDK （用来帮助整合资源和打包的引擎，这样前端写写写就好了）尝试下发现很好用，[plasmo](https://github.com/PlasmoHQ/plasmo) 。可以覆盖上面提到所有boilerplate template的功能le，推荐！

##  🧩参考

https://dev.to/anobjectisa/how-to-build-a-chrome-extension-new-manifest-v3-5edk
:::

:::en
Recently, I wanted to participate in an open-source project, which is a moji dictionary click-to-search extension for Japanese words. It feels more convenient to use than the official one, but I noticed that it has been neglected for a long time. Strangely, the xlog's RSS cannot be combined with AI Summarizer, so I have to make up the word count now.

*   Project URL: [https://github.com/Yukaii/mojidict-helper](https://github.com/Yukaii/mojidict-helper)
*   Chrome Web Store: [https://chrome.google.com/webstore/detail/mojidict-helper/eknkjedaohafedihakaobhjfaabelkem](https://chrome.google.com/webstore/detail/mojidict-helper/eknkjedaohafedihakaobhjfaabelkem)

This article only demonstrates the use of Vite/Webpack+React in the Chrome browser:

You can type `chrome://extensions/` in the Chrome browser's address bar to view all installed extensions. Also, please ensure that the "Developer mode" option in the top right corner is enabled:

💻 Development Environment
--------------------------

### General

IDE: Visual Studio Code React: v18+ Vite: v3+ Vite: v4.2.0 Webpack: v5.76.2

I use `pnpm` to manage all dependencies on my local machine. If you don't have it or use a different package manager, you can replace `pnpm` with the corresponding command!

### Other Complementary Tools

*   TailwindCSS
*   TypeScript

📦 Module Bundler
-----------------

### Native Development (VanillaJS)

You can directly refer to the official demos provided here: [https://github.com/GoogleChrome/chrome-extensions-samples](https://github.com/GoogleChrome/chrome-extensions-samples)

### Webpack

[https://github.com/lxieyang/chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react)

### Vite (Recommended)

[https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite)

How to use this boilerplate? After cloning, install the package dependencies with `pnpm install`, and then start the development mode:

`pnpm dev`: This is the development mode. `pnpm build`: This is the production mode.

The code generated by the above commands will be in the build directory. To see the results while developing, load this directory into `chrome://extension`:

📑 Official Documentation
-------------------------

[https://developer.chrome.com/docs/extensions/](https://developer.chrome.com/docs/extensions/)

👟 Prerequisites
----------------

### Lifecycle

*   onInstalled: Triggered when the extension is installed, updated, or reloaded.
*   onSuspend: Triggered when the extension is about to be suspended.
*   onSuspendCanceled: Triggered when the suspension of the extension is canceled.
*   onUpdateAvailable: Triggered when the extension can be updated (can be used to notify users).
*   onStartup: Triggered when Chrome starts and loads the extension.
*   onConnect: Triggered when the extension connects to another part of Chrome, such as a content script.
*   onConnectExternal: Triggered when a connection is established from an external application (e.g., a native application).
*   onMessage: Triggered when a message is received from another part of Chrome, such as a content script.

How to use these in code?

`chrome.runtime.XX` where XX is one of the lifecycle names mentioned above, e.g.:

js

```js
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details.reason)
})
```

### Extension Configuration: manifest.json

There are many differences between manifest v3 and previous versions, and one of the significant changes is that the direct manipulation of the DOM mechanism in manifest v2 is replaced by a service worker. In simple terms, when not needed, the service worker may be selectively blocked by Chrome, but we can still manipulate the DOM through other means.

> Detailed explanation: [https://developer.chrome.com/docs/extensions/mv3/service\_workers/](https://developer.chrome.com/docs/extensions/mv3/service_workers/)

A not-too-complex `manifest.json` configuration looks like this:

json

```json
{
  "manifest_version": 3,
  "name": "Life Helper",
  "version": "1.0.0",
  "description": "The things we must know in our life.",
  "icons": {
    "16": "icon.png",
    "48": "icon.png",
    "128": "icon.png"
  },
  "action": {
    "default_popup": "popup.html",
    "default_title": "Popup"
  },
  "permissions": [
    "scripting",
    "bookmarks"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "options_page": "options.html"
}
```

> The format of `manifest.json`: [https://developer.chrome.com/docs/extensions/mv3/manifest/](https://developer.chrome.com/docs/extensions/mv3/manifest/)

The permissions section corresponds to the APIs you can use in `background.js`. For example, if you have "bookmarks" in the permissions, you can use methods under [chrome.runtime](https://developer.chrome.com/docs/extensions/reference/runtime/).

The action section mainly specifies the popup window's position and other properties.

The background section corresponds to the service worker, which can be understood as the backend/server of the extension.

The contentScript section indicates the location of frontend scripts. Here, it corresponds directly to the program entry (app.tsx -> index.tsx) of React, and all logic, styles (popup, options, newTab), etc., are organized following React's structure.

Development Process
-------------------

The division of work for each module is as follows:

In simple terms, everything that was previously handled by the backend will now be done by `background`, while everything that was handled by the frontend will be taken care of by `contentScript` for `options`, `newTab`, and `popup`.

This also means that when you want to do state management, you can follow the principle of atomicity to organize each state (M) and style (V), types (M), etc.

### Communication

Communication is not strictly directional here, and there are no restrictions on files or modules. Use it as needed.

However, based on the previously defined scope of work for each module, as a frontend, it's better to communicate with each component about styles, API calls, and user events. On the other hand, as the backend, consider better organizing data, building APIs, or executing external requests during communication.

The basic format is as follows:

js

```js
// Sending a message with a callback
chrome.runtime.sendMessage({ greeting: 'hello' })
  .then(response => console.log(response.farewell))
  .catch(error => console.error(error))

// Receiving a message with a callback
chrome.runtime.onMessage.addListener((request, sender) => {
  console.log(sender.tab
    ? `from a content script:${sender.tab.url}`
    : 'from the extension')
  if (request.greeting == 'hello')
    return Promise.resolve({ farewell: 'goodbye' })

})
```

Message sending and receiving can be filtered by tab id and specified type. For example, if we want to send a message from popup to background and specify the currently active tab:

### Global State Management and Extension Data Persistence

Use Redux Toolkit!

Today, the original Redux is no longer recommended, and the new Redux Toolkit can help us better integrate existing modules to distribute work. It has a usage similar to `pinia`:

First, initialize the overall store, and based on the division of work we defined earlier, it is best to handle initialization and service building in the backend (i.e., `background` module).

js

```js
// store.ts
import { configureStore } from '@reduxjs/toolkit'
import { chromeStorage } from 'redux-persist-storage-chrome'
import { persistReducer } from 'redux-persist'
import { slice1, slice2 } from './slices'

const persistConfig = {
  key: 'chrome-extension-extended',
  storage: chromeStorage,
}

export const store = configureStore({
  reducer: {
    slice1: persistReducer(persistConfig, slice1.reducer),
    slice2: persistReducer(persistConfig, slice2.reducer),
  },
})

export default store
```

As for each slice, define them as follows:

js

```js
import { createSlice } from '@reduxjs/toolkit'

// Define initial values
const initialState1 = {
  value: 0,
}

// Define the first slice
export const slice1 = createSlice({
  name: 'slice1',
  initialState: initialState1,
  reducers: {
    increment1: (state) => {
      state.value += 1
    },
    decrement1: (state) => {
      state.value -= 1
    },
  },
})
export default slice1.reducer
```

### Integrating with chrome.storage for State Persistence

Here you need to install two libraries: `redux-persist-storage-chrome` and `redux-persist`. Then make the following changes in `store.ts`:

js

```js
import { configureStore } from '@reduxjs/toolkit'
import { chromeStorage } from 'redux-persist-storage-chrome'
import { persistReducer } from 'redux-persist'
import { slice1, slice2 } from './slices'

const persistConfig = {
  key: 'chrome-extension-extended',
  storage: chromeStorage,
}

export const store = configureStore({
  reducer: {
    slice1: persistReducer(persistConfig, slice1.reducer),
    slice2: persistReducer(persistConfig, slice2.reducer),
  },
})

export default store
```

Debugging
---------

If you are using HMR or other forms of hot reload, you should only be concerned with messages sent by `background` or `contentScript` itself.

*   Monitoring the background script:

On the `chrome://extensions/` page, click on the service worker, and it will pop up a separate debugging window.

*   Monitoring options, popup, or new tab pages:

Right-click on the respective page and select `Inspect` to open a separate debugging window.

Conclusion
----------

This article serves as a quick guide for those who have never worked on browser extensions. Even I am a beginner, but luckily, the official documentation provides many samples, and there are plenty of ready-made tutorials and boilerplates available online to get started.

Preview
-------

~In the next article, I will try to explore the combination of rollup and ws in the chrome-extension-boilerplate-react-vite project. (This no longer belongs to the scope of extension development.)~

In the next article, I will explore the use of other browser extensions and extensions with other boilerplates on Vue 3.

(Update on 05/08:)

[Antfu's browser extension template](https://github.com/antfu/vitesse-webext) is excellent. However, it does not work on Firefox as the Firefox browser's support for manifest V3 is still unstable ([https://github.com/mozilla/web-ext/issues/2532](https://github.com/mozilla/web-ext/issues/2532)).

(Update on 06/01:)

Commenter Diy.God recommended a browser extension-specific SDK called [plasmo](https://github.com/PlasmoHQ/plasmo). I tried it and found it very useful. It covers all the functionalities mentioned in the boilerplate templates. Highly recommended!

🧩 References
-------------

[https://dev.to/anobjectisa/how-to-build-a-chrome-extension-new-manifest-v3-5edk](https://dev.to/anobjectisa/how-to-build-a-chrome-extension-new-manifest-v3-5edk)

:::
