---
title: 2022 Annual Summary | 2022 年度总结
date: 2023-03-04
updated: 2023-03-04
id: 1689428069
tags:
  - SE
categories:
  - diary
keywords: keyword1,keyword2
description: description
---
:::zh-CN
由于当前还不是年终，此文章写于出成绩的第二天，本学期目标本来是全pass，完成目标。目前绩点不算完美但可以接受。(全A选手？当我不是和本科阶段一样是班上最活跃的人我就知道自己和A+无缘了)

这学期感觉自己的Software Engineering理解又深刻了一些，虽然精力管理还是一样烂（悲）

代码倒是真没怎么写，大概提升了一下理论 & 研究。


以下按照每个科目大概总结一些要素，括号后为人生时间占比：

## Software Validation & Verification (12%)
这门课的实际出勤比较少，恰逢大选圣诞节等等无限放假，但可以说涵盖了测试的大部分流程，recap的要点如下：

* Unit Test / System Test / User Acceptance Test
* Blackbox / Whitebox Test
* Test Plan / Log / Procedure / Specifications / Result / Summary

总之是test层面的东西是全覆盖到了。大部分时间确实在撸文档上。结论是实际测试的过程和构思要比开发细致很多，完全可以作为一个部门来分工协作（实际上我们Group Project也是在做这件事）。


## Advanced Internet of Things (5.39%)
这门课作为选修占用的时间并不少，由于我自己也是个硬件小白，不过好在arduino并不算难，组装->代码糅合->就完成了，电路图我是真不懂。只是后期**改进**的阶段费了我不少周章。不过这个Smart Home是比我本科做的project实在多了：

输出一些环境监测参数后如何接受？ 请看这个库：

https://github.com/FlynnCao/WOC7020-Smart-Home

改进包括发邮件，如何实现？ 请看这个库（这里Gmail曲线救国，动手能力强的同学放自己服务器上也不是不可以）：

https://github.com/FlynnCao/WOC7020-Smart-Home-Backend

最终结论是：这种项目，树莓派最方便最好用，证明前期硬件Plan是项目正确推进的基石。（贴一张实验室照骗）



## Research Methodology （4.74%）
对于需要修Dissertation的学生，这门课是很重要的。如你所见我并没有占用太多时间，不过我可以自信的低说我已经掌握了所需的研究方法了，接下来就是想一个比劲爆的课题。

重点其实还是在Literature Review上以及如何筛选。当然经过了这门课和（周四）我会在任何自己写的文章里加上引用..事实上只要不是你自己的想法，无论是图片（商用除外）、文段还是表格等其他形式的信息都要加上引用。

EndNote很好用，但学校的图书馆并不好用。

Recap的话：就是LR的各种类型以及围绕写LR的方法论。但目前看来是人类是绕不过AI这个课题了。

## Architecturing Software Systems (7.23%)

这门课倒是这个学期最喜欢的，因为以前自己big mud风格很少会对框架层面进行思考，vue的p-b架构也是无感。这门课Recap的话能想到的比较多，有：

* Quality Attributes
* Architecture Patterns
* Views & Models

QA的话可以和SVV那门课联动一下，当然这门课可以和任何CS的程序联动一下，因为架构本质上就是思维模式，和设计模式或者算法等等没差。


## Advcanced Machine Learning (5.23%)

这门课谈不上喜欢也谈不上讨厌，之前我是觉得AI很无聊。现在我仍然觉得他有非常对局限性（可能是我自己对Chatgpt调教不行？我觉得他只是比搜索引擎好用一点点的工具罢了）

就我自己的论断，AI在艺术创作也可能威胁到人类，只是大家并不会因为这个吵吵着谁失业，人文不被归属在生产力范畴，也饿不死。

我同意的观点大概是如那位新加坡医学教授的话：会淘汰不用AI的人。
  
这门课Recap的话大概是ML的种种特征：

一言以蔽之，就是输入、输出，训练+测试，调参。数据集和应用的模型都很重要。

这个视频很好，可以给完全无概念的人一个ML的入门：

https://www.youtube.com/watch?v=5q87K1WaoFI&ab_channel=WIRED
（Computer Scientist Explains Machine Learning in 5 Levels of Difficulty | WIRED）

## 结语

OK。目前对于我个人的任务就是找有趣的课题+继续我的Coding之路了。语言层面还是继续精进英文（口语+写作）和日语考级。

下学期有可能的话希望减肥+ Fiteness 一下！？。
:::

:::en
As it is not the end of the year yet, this article was written on the second day of receiving the results. The original goal for this semester was to pass all subjects, and that goal has been achieved. Currently, the GPA is not perfect, but it is acceptable. (Am I the "Full-A" student? When I'm not the most active person in the class like in my undergraduate days, I know I can't achieve an A+ grade.)

During this semester, I feel that my understanding of Software Engineering has deepened. However, my time management skills remain the same (sad).

Regarding coding, I didn't write much code; instead, I focused on theory and research.

Here's a brief summary of each subject, with the percentage of time spent on each:

Software Validation & Verification (12%)
----------------------------------------

Attendance for this course was relatively low due to various holidays, such as Christmas. Nevertheless, it covered most testing processes, and here are the key points:

*   Unit Test / System Test / User Acceptance Test
*   Blackbox / Whitebox Test
*   Test Plan / Log / Procedure / Specifications / Result / Summary

In conclusion, the testing process and planning are more detailed than development. It can be considered a department with its own specific roles (in our Group Project, we followed a similar approach).

Advanced Internet of Things (5.39%)
-----------------------------------

As an elective, this course took up some time. Since I'm not familiar with hardware, I found Arduino relatively easy to work with—assembly, code integration, and it's done. However, the improvement stage required some effort. I worked on numerous Smart Home projects, more than I did in my undergraduate studies.

If you're interested, check out these repositories:

*   Environment parameter monitoring: [WOC7020-Smart-Home](https://github.com/FlynnCao/WOC7020-Smart-Home)
*   How to implement email notifications: [WOC7020-Smart-Home-Backend](https://github.com/FlynnCao/WOC7020-Smart-Home-Backend) (Gmail turned out to be helpful here, but tech-savvy students could set up their own servers.)

The final conclusion is that for these projects, Raspberry Pi is the most convenient and user-friendly option, proving that a solid hardware plan is crucial for project success.

Research Methodology (4.74%)
----------------------------

For students working on their dissertations, this course is essential. As you can see, I didn't spend too much time on it. However, I can confidently say that I've mastered the required research methods, and now it's time to come up with an exciting topic.

The focus was mainly on Literature Review and how to filter and select relevant sources. After this course (and on Thursdays), I will make sure to include proper citations in any article I write. Anything that isn't my own idea, whether it's images (excluding commercial use), paragraphs, tables, or other forms of information, will be appropriately referenced.

EndNote is handy, but the library's version is not user-friendly.

Architecturing Software Systems (7.23%)
---------------------------------------

This was my favorite course of the semester because, previously, I rarely thought about the framework level when coding with a "big mud" approach. Vue's p-b architecture was unfamiliar to me. For this course, the recap includes various aspects:

*   Quality Attributes
*   Architecture Patterns
*   Views & Models

Quality attributes can be linked with Software Validation & Verification. In fact, this course can be connected with any CS program since architecture fundamentally deals with thinking patterns, much like design patterns or algorithms.

Advanced Machine Learning (5.23%)
---------------------------------

I can't say I love or hate this course. I used to find AI boring, and even now, I believe it has significant limitations (perhaps I'm not good at training ChatGPT; it seems to me that it's only slightly better than a search engine).

My conclusion is that AI might threaten human beings in terms of artistic creation, but it's unlikely to lead to debates about unemployment. Humanities aren't considered productive in the same sense as labor and won't be abandoned.

I agree with the viewpoint of a Singaporean medical professor: AI will displace those who don't use it.

The recap for this course includes various ML features:

In a nutshell, it involves input, output, training, testing, and parameter tuning. Both the dataset and the application's model are essential.

For those who have no concept of ML, this video is quite good for an introduction: [Computer Scientist Explains Machine Learning in 5 Levels of Difficulty | WIRED](https://www.youtube.com/watch?v=5q87K1WaoFI&ab_channel=WIRED)

Conclusion
----------

Okay, my personal tasks now are to find interesting topics and continue my coding journey. I also aim to improve my English language skills (both speaking and writing) and take a Japanese proficiency test.

Next semester, if possible, I hope to focus on fitness and losing weight!
:::









