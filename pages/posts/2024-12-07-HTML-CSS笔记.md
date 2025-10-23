---
title: HTML/CSS笔记
date: 2024-12-07 15:06:56
tags:
    - HTML
    - CSS
    - 私人笔记
categories:
    - 笔记
---

# HTML

## 零碎知识点

### 语义元素

可以理解为把HTML标签用人话描述出来，并且自带了一些样式。

旧的HTML4只能通过定义class或者id来给予特定容器以特定的样式类型，HTML5语义元素则通过官方标签的方式将这些复用率较高的容器组件化，便于直接使用，从而节省开发时间。

同时使页面结构更加现代化，更加直观的展示主要信息，

### web存储

#### 存储方式与存储周期

存在以下两种存储方式（客户端）

localStorage：若用户不主动清除该存储数据，则一直存在于用户浏览器存储中，作用域仅限与之相关联的站点。

sessionStorage：生命周期为一个标签页的周期，即只能在这个标签页周期内存储与该页面有关的数据，关闭页面后数据也随之删除。

存储信息以键值对方式存在，数据格式包括num、object、string

#### 常用命令

> local与session指令使用方法一样，只不过前缀不同，下面将以*省略前缀

*Storage.setItem( name[String], value ) 存储名为name，值为value的数据

*Storage.getItem( name[String] ) 查找名为name的值

*Storage.removeItem( name[String] ) 移除名为name的数据

*Storage.clear() 清除所有数据

*Storage.key() 得到某个数据的索引值

#### 格式转换

> 这里需要注意转换的目标数据要符合转换后数据类型的格式要求，不然会导致格式错误，影响后续对数据的调用

```js
//字符串转对象
var str = new String;
var site = JSON.parse(str);
//对象转字符串
var site = new Object;
var str = JSON.stringify(site); 
//字符串转数字
var str = new String;
var num = Number(str);
console.log( parseInt( str ) );//解析十进制数，它将四舍五入到最接近的整数值，并将该值转换为string
console.log(+str);
parseFloat();//解析一段内容，并且将第一个数字输出
console.log( str * 1 );
console.log( ~~str )
//数字转字符串
var num = new Number;
var str = num.toString();
var str = String(num);
var str = '' + num;
var str = num.toFixed();
```

#### indexedDB

更符合现代需求的浏览器数据库，取代旧版WBE SQL。较于loaclStorage存储量更大，储存类型更丰富，并且不会阻塞主进程

### Canvas

HTML页面与JS绘图的桥接物。

### 拖放

```html
<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
    <img src="/images/logo.png" draggable="true" ondragstart="drag(event)" id="drag1" width="88" height="31">
</div>
<div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>


<script>
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data=ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
}
</script>
```

1. 设置元素为可拖放：< ** draggable="true"></**>

2. 设置拖动元素的数据信息：drag()

3. 设置哪些容器可以接收拖动的元素并且消除浏览器默认行为：allowDro()

4. 接收元素的容器获取元素的数据并且追加到容器中，同时消除浏览器默认行为：drop()

可以理解为将一个元素剪切然后追加到新容器中。

### H5表单增强（input增强）

添加了一些更符合现代需求的标签与属性，内容查询参加[HTML5 表单属性 | 菜鸟教程](https://www.runoob.com/html/html5-form-attributes.html)

其中主要是对于“input”标签进行属性丰富，最显著的功能为数字/数学计算增强，即“数字输入框”
