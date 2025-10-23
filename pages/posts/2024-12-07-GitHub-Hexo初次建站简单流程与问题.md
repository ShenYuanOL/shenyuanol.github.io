---
title: GitHub-Hexo初次建站简单流程与问题
date: 2024-12-07 10:45:30
tags: 个人博客
---

> 终于是吃上Github的个人博客建站了，之前使用的宝塔-wordpress建站，由于租赁的服务器自动更新导致的宝塔服务崩溃的问题，把服务器站点关了，不仅个人博客关了，自己的项目也停了（当然主要问题不是博客关了🥵）

本文重点不在于建站的流程，而是强调几点建站中遇到的问题（主要寻找的几篇文章中并没有提到这些问题，而是一味的去教死板的建站流程）

# Github-Hexo个人github.io博客搭建

Github中建站的方式有很多种，其中包括纯搓readme文件以及利用工具搭建，当然，我选择用工具。

本文使用Hexo工具来进行建站操作。

## Hexo基础搭建与测试内容制作

### 前提

1. 已经拥有Github账号，并且将ssh在本地设置完毕
2. 本地系统环境已经安装Git
3. 本地系统环境拥有node合适的版本（具体node版本参见[文档 | Hexo-Node.js版本限制](https://hexo.io/zh-cn/docs/#Node-js-%E7%89%88%E6%9C%AC%E9%99%90%E5%88%B6)）
4. 本地拥有Vscode（建议）软件，并且已设置Vscode的系统环境与用户环境
5. 本地已经设置了npm镜像（清华镜像或者其他）

### 开始

npm包可以全局安装和局部安装，为了方便使用hexo命令，建议全局安装。

桌面win+R运行cmd安装hexo基本环境

```
npm install hexo -g
```

安装完毕后在自己的硬盘中找个地方（禁止C盘战士）新建一个文件夹，然后在文件管理器的地址栏输入”cmd“快速在该文件夹调用cmd

![](/posts/ /posts/2024-12-07-GitHub-Hexo初次建站简单流程与问题/2024-12-07-13-30-42-image.png)

然后在终端中输入以下指令进行hexo项目初始化

```
npm init
```

> 建议使用Vscode集成环境进行项目编写与终端命令执行

### 配置

初始化之后需要对项目进行配置，配置方法参见[配置 | Hexo](https://hexo.io/zh-cn/docs/configuration)

主要配置字段：

- title 站点标题

- author 你的名字

- language 站点语言

- new_post_name 新文章文件名称（文件/文章名字的格式配置）

- post_asset_folder 是否开启资源文件夹模式（主要用于文章图片的存储）

### 撰写文章

首先使用hexo命令创建模板md文件

```
hexo new [layout] <title>
```

其中*layout*是创建的文件类型，创建文章使用”post“，创建页面使用”page“（这么说不是很正规，但是这样理解是最简单的，具体描述参见[指令-new | Hexo](https://hexo.io/zh-cn/docs/commands#new)）

比如我现在要创建一个文章，那么运行

```
hexo new post "新的文件"
```

> 这里文件名的双引号最好一直使用这种方式进行命名，虽然英文名可以不加，但避免混淆，最好养成使用单双引号命名的习惯

然后我就可以在我的文件目录”G:\Blog\source\_posts\2024-12-07-新的文件.md“找到我的博客文章的文件

![](/posts/ /posts/2024-12-07-GitHub-Hexo初次建站简单流程与问题/2024-12-07-13-58-06-image.png)

进入文件后，文件默认自带三行内容

![](/posts/ /posts/2024-12-07-GitHub-Hexo初次建站简单流程与问题/2024-12-07-13-59-10-image.png)

title即文章标题，date为框架自动生成的时间戳信息，tags部分为文章标签，支持多个标签。

该部分配置方法参见[Front-matter | Hexo](https://hexo.io/zh-cn/docs/front-matter)

### 欲发布

> 为什么不是预发布？事实上到现在为止我并没有教你很多东西，只是在教你如何在github上进行一个博客搭建的测试工作（狗头保命），真正预发布还得去设置站点主题、完善配置文件、完善站点结构，只不过我这篇文章不教，那些东西都烂大街了，直接搜就有

#### 预览

在发布之前可以进行效果预览。依次执行以下指令

```
hexo generate
hexo server
```

第一条指令是生成静态文件（可以理解为MD文件转换为HTML），第二条指令是在本地4000端口开启预览服务，执行成功后就可以在<u> *localhost:4000* </u>预览站点

![](/posts/ /posts/2024-12-07-GitHub-Hexo初次建站简单流程与问题/2024-12-07-14-08-21-image.png)

## GitHub设置

### GitHub仓库初始化

首先进入你的github主页，新建一个仓库，名称格式为

```
<username>.github.io
```

例如我的（希望没人真的把username.github.io作为名称吧）

```
shenyuanol.github.io
```

然后如下图操作（仓库名有一个验重，如果名称不可用就会报红，比如我这里我已经创建了该仓库了，就不能再创建了）

![](/posts/ /posts/2024-12-07-GitHub-Hexo初次建站简单流程与问题/2024-12-07-14-19-58-image.png)

创建完毕后，使用git命令，将自己的测试内容全都覆盖到仓库中。

### 项目Git配置并提交项目到Github（一键部署）

#### Git信息配置

进入你的项目目录，打开_config.yml文件，将以下字段根据自己信息填写进去（如果文件中已经有这段内容了，改一下就行，避免出现配置信息冲突）

```yml
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repo: https://github.com/<username>/<username>.github.io
  branch: <站点项目分支>
```

#### 一键部署

使用Hexo一键部署可以快速实现部署，只需要执行一个指令

```
hexo deploy
```

等待进度完毕后即可在GitHub找到这些文件

> 该操作只会将站点主要文件，即站点文件（项目根目录source文件夹）上传至Github，根目录中其他文件并不会跟随上传。
> 
> 如有需求，请使用Git的push方法上传，并开启仓库分支，将源文件与站点文件双份存储，开启站点时指向站点文件分支即可

![](/posts/ /posts/2024-12-07-GitHub-Hexo初次建站简单流程与问题/2024-12-07-14-34-55-image.png)

![](/posts/ /posts/2024-12-07-GitHub-Hexo初次建站简单流程与问题/2024-12-07-14-35-15-image.png)

### GitHub博客模式设置

当所有文件上传之后，转到仓库设置（setting）-页面（pages）

![](/posts/ /posts/2024-12-07-GitHub-Hexo初次建站简单流程与问题/2024-12-07-14-37-32-image.png)

source模式改为分支模式，branch中选择你站点的分支，然后点击”save“执行更改。

随后就可以在网址查看自己的站点

```
https://<username>.github.io
```

> 这里需要注意的是，该操作不会立刻被执行，在1~10分钟内才会被执行，可以重复刷新页面，但是不要去重复上传与部署操作，待10分钟后页面依旧没有反应，再去检查自己的操作是否存在问题，再次执行上传与部署操作。



# END
