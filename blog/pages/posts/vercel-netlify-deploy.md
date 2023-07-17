---
title: Deploy Valaxy on Vercel and Netlify 
date: 2023-07-16 
updated: 2023-07-16
hide: true
tags:
  - cloud
categories:
  - blog
---


:::en
:warning: no grammar-check or any revision by machine.

This blog is meant for collecting errors I met and guide you to complete deployment on various platforms.

## Netlify
While Valaxy provides a build-in `netlify` settings for us, I still couldn't deploy it successfully due to weird "Build Failed with “non-zero exit code: 2” error". 
## Vercel
Vercel is another powerful hosting provider:

After you signed-up Vercel successfully and entered the [dashboard](vercel.com/dashboard):

![20230716163348](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716163348.png)

Click `Add New` -> `Project` to import an existing project, which I recommend you start with deploying Yun's demo and make sure everything is fine.

![20230716163516](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716163516.png)

Fork a repository to your github account before modifying as your own usage is always recommended, after import, system will guide you to deploy a new from default production branch `main`.

For users, just use main branch is fine and everytime you update the code(especially the blog posts) on `main` branch, Vercel will automatically redeploy it according to your previous settings.

My settings within Setting tab are as follows:
![20230716163942](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716163942.png)
* Build Command: I copied from the build-in `netlify.toml -> command` which will tell the Vercel run this command, installing packages and bundling your code.(If you are modified `demo/yun` as your own site, you don't need to modify this command, otherwise you should specify the build command of sub-folder the in `package.json`)
* Output Directory: This folder is also crucial, make sure it's `blog/dist` or `demo/yun/dist` which points to your site directory.
* Build Command and Development Command can also be cut from  `build command` for better deployment speed.
:::

:::zh-CN
本博客旨在收集我遇到的错误，并指导您在各种平台上完成部署。

## Netlify
虽然Valaxy为我们提供了内置的 "netlify "设置，但我仍然无法成功部署，因为出现了奇怪的 "Build Failed with "non-zero exit code： 2" 错误"。
## Vercel :tada：
Vercel是另一个强大的主机提供商：

在您成功注册Vercel并进入[dashboard](vercel.com/dashboard)后：

![20230716163348](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716163348.png)

点击 "Add New"->"Project "导入现有项目，我建议您先部署Yun的Demo，确保一切正常。

![20230716163516](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716163516.png)

导入后，系统将引导您从默认的生产分支 "main "部署一个新的项目。

对于用户来说，使用主分支就可以了，每次你在`main`分支上更新代码（尤其是博客文章），Vercel都会根据你之前的设置自动重新部署。

我在设置选项卡中的设置如下：
![20230716163942](https://raw.githubusercontent.com/FlynnCao/blog-images/main/img/20230716163942.png)
* 构建命令： 我复制了内置的`netlify.toml -> command`，它会告诉Vercel运行这个命令，安装包并捆绑你的代码。(如果你修改了`demo/yun`作为你自己的站点，你不需要修改这个命令，否则你应该在`package.json`中指定子文件夹的build命令)
* 输出目录： 这个文件夹也很重要，确保它是`blog/dist`或`demo/yun/dist`，指向你的站点目录。
* Build Command和Development Command也可以从`build command`中删除，以提高部署速度。
:::


