//监听键盘：WSAD
//w:119; a:97; s:115; d:100
window.onkeypress = function(e) {
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

//初始化参数
var speed = 100;
var foodArr = [];
var foodNumber = 2;
var foodColor = getRandomColor();
var snakeHeaderColor = "blue";
var snakeBodyColor = "white";
//初始化蛇、食物
var s = initSnake(snakeHeaderColor, snakeBodyColor);
initFood(foodArr, foodNumber, foodColor);
gameLife(map, s, foodArr, foodColor, speed);