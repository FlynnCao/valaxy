---
title: How to use pnpm link properly | 如何正确使用pnpm link
date: 2023-07-21
updated: 2023-07-21
hide: false
tags:
  - pnpm
  - npm
  - bundler
categories:
  - blog
---
:::en

I have tested this feature successfully recently. Let's say I have a project named "pass-the-butter" and I want to use this project in another project named "vanilla-js", where I will use 

1. use "pnpm link --global" in folder "pass-the-butter" to link this project globally, which you can find in here `C:\Users\Flynn\AppData\Local\pnpm\global\5\node_modules`;
2. in the project `vanilla-js`, run "pnpm link --global pass-the-butter";
3. also in the `vanilla-js`, run `pnpm add E:\\Test\\pass-the-butter`, be aware that the last parameter should be the absolute path of the project you want to link from.

> Related Issue: [Relative path doesn't work for pnpm link](https://github.com/pnpm/pnpm/issues/6225)

Another tip: this method also helps handle project that implementing monorepo architecture like [eslint-config-flynncao](https://github.com/FlynnCao/eslint-config/) by writing relative link in your `package.json`:

```
...
"eslint-plugin-flynncao": "link:./packages/eslint-plugin-flynncao"`,
...
```

:::



:::zh-CN

我最近成功地测试了这个功能，首先，假设我有一个名为 "pass-the-butter" 的项目，我想在另一个名为 "vanilla-js" 的项目中使用它。以下是步骤：

1.  在 "pass-the-butter" 文件夹中使用 "pnpm link --global" 命令，将该项目链接到全局位置，你可以在这里找到它：`C:\Users\Flynn\AppData\Local\pnpm\global\5\node_modules`；
2.  在项目 "vanilla-js" 中运行 `pnpm link --global pass-the-butter`；
3.  同样在 "vanilla-js" 中运行 `pnpm add E:\\Test\\pass-the-butter`，请注意，最后一个参数应该是你想要链接的项目的绝对路径。

> [相关话题：相对路径在 pnpm link 中无效](https://github.com/pnpm/pnpm/issues/6225)

另一个提示：这种方法也适用于处理实现了 monorepo 架构的项目，例如 [eslint-config-flynncao](https://github.com/FlynnCao/eslint-config/)，只需在你的 `package.json` 文件中使用相对路径链接：



```
"eslint-plugin-flynncao": "link:./packages/eslint-plugin-flynncao"`,
```
:::


 


