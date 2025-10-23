---
title: 《真-安全键盘》---灵感来自于河北农信的密码输入键盘
date: 2024-12-10 19:24:25
tags:
  - JS
categories:
  - 闲来无事小功能
---
# 前言

本人有张储蓄卡是农村信用社的，平时查余额都用他家的软件查。有意思的事，他家输入密码的键盘，每次打开那个界面键盘数字都会被打乱，感觉挺有意思的，然后想着用JS复现一下。

# 预览

![](/posts/2024-12-10-secure-keyboard-inspiration/2024-12-10-19-31-24-image.png)

# HTML

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>安全键盘 | ShenYuan</title>
    <script src="./main.js"></script>
    <link rel="stylesheet" href="main.css" />
</head>

<body>
    <div id="keyboard" class="keyboard">
        <input id="user-input" class="user-input" disabled />
        <div class="keyboard-btns">
            <button id="delete-btn" class="delete-btn" onclick="deleteChar()">删除</button>
            <button id="clear-btn" class="clear-btn" onclick="clearInput()">清空</button>
        </div>
        <div id="keyboard-list" class="keyboard-list"></div>
    </div>
</body>

</html>
```

# css

```css
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.keyboard {
    width: 240px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 2px solid black;
    border-radius: 20px;
    background-color: rgb(241, 241, 241);
}

.user-input{
    height: 24px;
    padding: 4px 8px;
    background-color: aqua;
    border: 1px solid grey;
    border-radius: 16px;
    box-shadow: inset gray 2px 2px 2px;
}

.keyboard-btns{
    margin: 8px 0;
    display: grid;
    grid-template-columns:1fr 1fr;
    justify-items: center;
}

.keyboard-btns button {
    width: 60%;
    padding: 4px 8px;
    border: 1px solid grey;
    border-radius: 16px;
    box-shadow: gray 2px 2px 2px;
}

.delete-btn:active{
    background-color: rgb(255, 211, 66);
    box-shadow: inset gray 2px 2px 2px;
}

.clear-btn:active {
    background-color: rgb(255, 55, 66);
    box-shadow: inset gray 2px 2px 2px;
}


.keyboard-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
}

.keyboard-item{
    padding: 16px 32px;
    border: 1px solid gray;
    border-radius: 10px;
    box-shadow: gray 2px 2px 2px;
}

.keyboard-item:active {
    box-shadow: inset gray 2px 2px 2px;
    background-color: rgb(255, 255, 255);
}
```

# JS

```js
window.onload = function () {
    randomKey();
    keyboardInner();
}

var keylist = [
    "k_1", "k_2", "k_3", "k_4", "k_5", "k_6", "k_7", "k_8", "k_9", "k_0", "k_*", "k_#"
]

var new_keylist = [];
var userInput = "";

//将keylist元素打乱
function randomKey() {
    const list = [...keylist]; // 复制一份keylist
    const listLength = list.length;
    for (var i = 0; i < listLength; i++) {
        var random = Math.floor(Math.random() * list.length);
        var newItem = list[random];
        // 删除list[random]元素
        list.splice(random, 1);
        new_keylist.push(newItem);
    }
}

function keyboardInner() {
    var keyboard = document.getElementById("keyboard-list");
    for (var i = 0; i < new_keylist.length; i++) {
        var new_key = document.createElement("div");
        new_key.className = "keyboard-item";
        new_key.id = new_keylist[i];
        new_key.innerHTML = new_keylist[i].slice(2);
        new_key.onclick = keyClick;
        keyboard.appendChild(new_key);
    }
}

function keyClick() {
    var key_id = this.id;
    var key_value = key_id.slice(2);
    userInput += key_value;
    document.getElementById("user-input").value = userInput;
    //超出限长不再接收新值
    if (userInput.length >= 6) {
        document.getElementById("keyboard-list").style.display = "none";
    }
}

function clearInput() {
    userInput = "";
    document.getElementById("user-input").value = "";
    document.getElementById("keyboard-list").style.display = "grid";
}

function deleteChar() {
    userInput = userInput.slice(0, -1);
    document.getElementById("user-input").value = userInput;
    if (userInput.length < 6) {
        document.getElementById("keyboard-list").style.display = "grid";
    }
}
```

# 结语

JS给我的感觉就是特性好多啊......

其中有一段内容，randomKey函数，当我按下面这样写的时候就会报错

```js
function randomKey() {
    const list = [...keylist]; // 复制一份keylist
    for (var i = 0; i= list.length; i++) {
        var random = Math.floor(Math.random() * list.length);
        var newItem = list[random];
        // 删除list[random]元素
        list.splice(random, 1);
        new_keylist.push(newItem);
    }
}
```

AI给出的解释

![](/posts/2024-12-10-secure-keyboard-inspiration/2024-12-10-19-42-57-image.png)

运行前定义和运行中引用是两码事，感觉好奇怪，但是这样就是正确的。

# END
