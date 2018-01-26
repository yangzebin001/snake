//监听键盘：WSAD
//w:119; a:97; s:115; d:100
window.onkeypress = function(e) {
    keyboardListener(e);
}

// 监听鼠标
map.onmousedown = function(e) {
    mouseListener(e);
}

//监听触摸操作（适配手机）
window.ontouchstart = function(e) {
    touchListener(e);
}

function keyboardListener(e){
    console.log(e.charCode);
    switch (e.charCode) {
        case 119:
            if (s.snakeHeaderDirection === "down") { break; }
            s.snakeHeaderDirection = "up";
            break;
        case 97:
            if (s.snakeHeaderDirection === "right") { break; }
            s.snakeHeaderDirection = "left";
            break;
        case 115:
            if (s.snakeHeaderDirection === "up") { break; }
            s.snakeHeaderDirection = "down";
            break;
        case 100:
            if (s.snakeHeaderDirection === "left") { break; }
            s.snakeHeaderDirection = "right";
            break;
    }
}
function mouseListener(e){
    var mousedownX = e.clientX;
    var mousedownY = e.clientY;
    console.log(mousedownX);
    console.log(mousedownY);
    map.onmouseup = function(e) {
        var mouseupX = e.clientX;
        var mouseupY = e.clientY;
        console.log(mouseupX);
        console.log(mouseupY);
        // if (mouseupX - mousedownX < allowError && mouseupY - mousedownY > allowError) {
        //     s.snakeHeaderDirection = "down";
        //     console.log("向下滑动");
        // } else if (mouseupX - mousedownX < allowError && mouseupY - mousedownY > -allowError) {
        //     console.log("向上滑动");
        // }
        if (mouseupY - mousedownY > Math.abs(mouseupX - mousedownX)) {
            console.log("向下滑动");
            if (s.snakeHeaderDirection === "up") { return; }
            s.snakeHeaderDirection = "down";
        } else if (mousedownY - mouseupY > Math.abs(mouseupX - mousedownX)) {
            console.log("向上滑动");
            if (s.snakeHeaderDirection === "down") { return; }
            s.snakeHeaderDirection = "up";
        } else if (mouseupX - mousedownX > Math.abs(mousedownY - mouseupY)) {
            console.log("向右滑动");
            if (s.snakeHeaderDirection === "left") { return; }
            s.snakeHeaderDirection = "right";
        } else if (mousedownX - mouseupX > Math.abs(mousedownY - mouseupY)) {
            console.log("向左滑动");
            if (s.snakeHeaderDirection === "right") { return; }
            s.snakeHeaderDirection = "left";
        }
    }
}

function touchListener(e){
    var touchesstart = e.changedTouches;
    console.dir(touchesstart);
    var touchstartX = touchesstart[0].clientX;
    var touchstartY = touchesstart[0].clientY;
    window.ontouchend = function(e) {
        var touchesend = e.changedTouches;
        var touchendX = touchesend[0].clientX;
        var touchendY = touchesend[0].clientY;
        console.dir(touchesend);
        if (touchendY - touchstartY > Math.abs(touchstartX - touchendX)) {
            console.log("向下滑动");
            if (s.snakeHeaderDirection === "up") { return; }
            s.snakeHeaderDirection = "down";
        } else if (touchstartY - touchendY > Math.abs(touchstartX - touchendX)) {
            console.log("向上滑动");
            if (s.snakeHeaderDirection === "down") { return; }
            s.snakeHeaderDirection = "up";
        } else if (touchendX - touchstartX > Math.abs(touchstartY - touchendY)) {
            console.log("向右滑动");
            if (s.snakeHeaderDirection === "left") { return; }
            s.snakeHeaderDirection = "right";
        } else if (touchstartX - touchendX > Math.abs(touchstartY - touchendY)) {
            console.log("向左滑动");
            if (s.snakeHeaderDirection === "right") { return; }
            s.snakeHeaderDirection = "left";
        }
    }
}


//初始化参数
var speed = 150;
var foodArr = [];
var foodNumber = 2;
var foodColor = getRandomColor();
var snakeHeaderColor = "blue";
var snakeBodyColor = "white";
var gameMode = "normal";
var isGameOver = false;
var isPause = false;
var gameScore = 0;
//初始化蛇、食物
var s;
s = initSnake(snakeHeaderColor, snakeBodyColor);
initFood(foodArr, foodNumber, foodColor);
randerFoodArr(foodArr);
gameLife(map, s, foodArr, foodColor, speed);