---
title: (CN Only) Git、NPM、Maven、Pip 镜像和代理加速下载设置（国内食用）
date: 2022-07-13 01:44:38
updated: 
tags:
  - frontend
categories:
  - blog
---
# Git、NPM、Maven、Pip 镜像和代理加速下载设置（国内食用）

## Git 


```
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080
```
> 1080为你代理暴露的端口

```
git config --global --unset http.proxy
git config --global --unset https.proxy
```
## npm

设置淘宝镜像为npm包来源

```
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
```
## Maven
首先找到Maven的安装目录
例如: `D:\Program Files\apache-maven-3.6.3` Open the `settings.xml` under the `conf` folder.(如果不存在，就创建一个新的)

编辑或者替换此配置文件的内容：

```xml
 <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                          https://maven.apache.org/xsd/settings-1.0.0.xsd">
      <localRepository/>
      <interactiveMode/>
      <offline/>
      <pluginGroups/>
      <servers/>
	  <mirrors>
	    <mirror>
			<id>nexus-aliyun</id>
			<mirrorOf>*</mirrorOf>
			<name>Nexus aliyun</name>
			<url>http://maven.aliyun.com/nexus/content/groups/public</url>
		</mirror>
	  </mirrors>
      <profiles/>
      <activeProfiles/>
   </settings>
```

## PIP

打开以下文件夹：

`C:\Users\User\xx\AppData\Roaming`  ("xx" is your logged username)

进入 `pip` 文件夹, 创建`pip.ini` 文件，内容如下：

```
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host = mirrors.aliyun.com
```

如果出现这种错误提示：

```javascript
pip is configured with locations that require TLS/SSL, however the ssl module in Python is not available
```

需要安装这个应用: https://slproweb.com/products/Win32OpenSSL.html

![img](https://image-1256777099.cos.ap-beijing-fsi.myqcloud.com/denfaxelgl.png)

对于Windows系统，只需要下载X64的版本

安装完成后重试上述步骤即可

## 参考

https://cloud.tencent.com/developer/article/1761837
