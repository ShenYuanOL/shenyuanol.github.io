---
title: PHP-Laravel框架win环境部署与问题解决
date: 2025-01-01 14:06:29
tags:
  - php
  - laravel
categories:
  - Laravel
---

# 前言

laravel 框架-nginx 真的好折磨人啊~

最开始接触是在 24 年暑假的一个比赛，当时大意了，因为我本机平时都是使用 Apache 运行 PHP 项目，指定运行目录就能运行项目。但是到了那里比赛，人家只有 nginx 的 linux 服务器环境，虽说也是直接扔进相关目录，然后配置一下 nginx 就行，但是我没有用过 nginx 啊~~~

而且从来没有在本机上用过 nginx，只知道这个可以运行网站，别的啥都不知道了。当时直接懵了。

然后现在又有一个比赛，也是会用到这个框架，吃了一次亏，不能再吃，而且网上好像对 win 环境部署 laravel 框架没有过多的相关文章，遇见了问题也无从下药【因为正式部署都是 linux 服务器部署，win 极少，那我就来补全吧，要不有小白想查资料也没地方查 QWQ】

# 开始部署 Laravel 框架

> 免责声明：本教程只是实现在 win 环境进行测试开发部署，并非正式生产环境部署，正式生产环境部署涉及到的 nginx 安全相关的配置信息，本教程不会涉及

文中分割线包裹部分为技术问题发生点与相对应的解决方法，如有遗漏或错误，可以联系我加以改正

## 准备工作

准备一个小 P（phpstudy），一个待测试的 laravel 框架（内含一个测试 api）

## 开始

在小 P 面板下载 nginx 服务后，再下载一个 laravel 需要的 php 版本，比如我使用的是 laravel10.x，那么需要的 php 版本为 8.2

![](/posts/2025-01-01-php-laravel-windows-deployment/2025-01-01-14-32-20-image.png)

![](/posts/2025-01-01-php-laravel-windows-deployment/2025-01-01-14-32-35-image.png)

小 P 面板的 nginx 服务不能做到像 Apache 那样使用指定 php 版本运行站点，这里 nginx 默认使用的是系统环境中的 php 版本。所以这里需要手动将小 P 中下载的 PHP 环境扔到系统环境中。

### PHP 环境配置

> 以下转载[windows 下搭建 nginx+php+laravel 开发环境(转) - 帅 LOVE 俊 - 博客园](https://www.cnblogs.com/shuaiandjun/p/10561839.html)

进入 php 文件夹，找到 php.ini-development 配置文件并 copy 一份重命名为 php.ini。

双击打开 php.ini 配置文件

搜索 extension_dir 找到配置项，把该配置项设置成 php 目录下 ext 的绝对路径（最好是绝对路径，也可以是相对路　　径"./ext"），如图：

![](/posts/2025-01-01-php-laravel-windows-deployment/eb6847408c7df5400ab0613a968ee0567ca73eb7.png)

也可直接去除前面的分号       如：extension_dir = "ext"

ps：左边的;号要删除，该分号作用是注释，即分号后面的内容不参与执行，仅仅是备注。

搜索 cgi.fix_pathinfo 找到配置项，取消注释并把该配置项设置成 1。

![](/posts/2025-01-01-php-laravel-windows-deployment/a584077e1a2612095eb409e79042f86a47eef446.png)

`cgi.fix_pathinfo`是用来设置在 cgi 模式下 PHP 是否提供 PATH_INFO 信息。

因为 nginx 默认不会设置 PATH_INFO 的值，所以需要通过上面的方法来提供。

ps：暂时开启这两个就可以执行了，其他配置项根据自己需求开启，不一一说明

<div style="text-align: center;">
  <span style="border-top: 1px solid #000; padding: 0 10px; background-color: white;">
    ——起始——
  </span>
</div>

#### 记事本修改 php.ini 文件权限问题

在部署 php 站点时，有时会需要配置 php 环境配置，比如数据库之类的。这些配置需要进入"php.ini"文件进行修改。

但是有的开发者会习惯将开发环境放进 C 盘，但是对 C 盘中的文件进行修改时会遇见一些权限问题，如图

![](/posts/2025-01-01-php-laravel-windows-deployment/2025-01-01-14-41-39-image.png)

这里我也在网上查询了解决方法，但是没有解决，而且这里可能会涉及到一些安全问题，所以不懂的就别瞎捣鼓了，可以使用以下两种方法解决。

##### 方法一：

在其他目录配置好需要的插件后，再将环境/配置文件拷贝进 C 盘中，文件的移动操作有管理员选项（所以为什么编辑后没有以管理员保存？火大），直接覆盖掉即可

##### 方法二：

将 PHP 系统环境不指向 C 盘，而是将 PHP 系统环境放在其他盘，这样就可以避免权限问题了

<div style="text-align: center;">
  <span style="border-top: 1px solid #000; padding: 0 10px; background-color: white;">
    ——结束——
  </span>
</div>

### nginx 配置

因为使用的是小 P 的 nginx 服务，所以就要定位到其运行目录进行操作

![](/posts/2025-01-01-php-laravel-windows-deployment/2025-01-01-14-57-13-image.png)

在 nginx 目录下进入配置文件/conf/nginx.conf，然后将以下内容写进该文件中（注意以下配置中包含了文件中配置结构，请不要盲目复制粘贴使用，注意嵌套关系）

```json
http {
    server {
        listen       8011;//开启的端口
        server_name  localhost;//站点地址，本地测试就用localhost
        root G:\Laravel\example-app\public;// laravel/public/index.php地址

        location / {
            index index.html index.htm index.php;
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {

            fastcgi_pass   127.0.0.1:9000;// php-FPM/php-cgi监听地址
            fastcgi_index  index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
    }
}
```

<div style="text-align: center;">
  <span style="border-top: 1px solid #000; padding: 0 10px; background-color: white;">
    ——起始——
  </span>
</div>

#### 部署后报错 403

nginx 根目录内有个文件夹为“html”，在这里是放站点的地方，然后在写 root 路径时就可以写“/html/...”

但是，这里会涉及到一个问题，这个相对路径“/”到底指向哪，理论上是“nginx/html/...”，但是他会报错 403 权限问题（具体什么原因我也知不道）

这里直接使用绝对路径就可以避免这个问题

<div style="text-align: center;">
  <span style="border-top: 1px solid #000; padding: 0 10px; background-color: white;">
    ——结束——
  </span>
</div>

### PHP 环境启动

nginx 启动后并不会自己去一同启动 php 环境，这点与 Apache 不一样。

首先进入到你的 PHP 环境根目录下，然后在该目录启动 cmd 终端

![](/posts/2025-01-01-php-laravel-windows-deployment/2025-01-01-15-25-16-image.png)

然后输入指令

```batch
php-cgi.exe -b 127.0.0.1:9000 -c  php.ini
```

![](/posts/2025-01-01-php-laravel-windows-deployment/2025-01-01-15-27-14-image.png)

输入指令后没有报错和自动换行即可，这里不会出现信息输出的

<div style="text-align: center;">
  <span style="border-top: 1px solid #000; padding: 0 10px; background-color: white;">
    ——起始——
  </span>
</div>

#### 进入站点报错 502

检查 php-cgi 启动地址端口与 nginx 配置文件中的地址端口是否相同

<div style="text-align: center;">
  <span style="border-top: 1px solid #000; padding: 0 10px; background-color: white;">
    ——结束——
  </span>
</div>

### Laravel！启动！！！

接下来进入测试 api 看看站点是否已经运行

![](/posts/2025-01-01-php-laravel-windows-deployment/2025-01-01-15-30-49-image.png)

![](/posts/2025-01-01-php-laravel-windows-deployment/2025-01-01-15-29-49-image.png)

这里看到已经正常输出信息了，接下来愉快的开发去吧~~~ヾ(≧▽≦\*)o

## 补充说明

心细的已经注意到了，我们启动 php 服务其实是手动的，这里其实可以不用去配置 php 系统环境以及去刻意关注 php 环境的位置。

但是肯定不只开发这一个项目需要 php 环境，也不是只有这一个项目是需要手动去启动 php 服务的，所以配置好后，不仅方便此项目开发，也符合开发标准与习惯。

养成良好的开发习惯是一个程序的基本素养，就比如说写 HTML，类名不能用“aa、bb、cc”命名一个道理
