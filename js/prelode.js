//返回一个给定范围内的随机数，不包含末尾的数
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}



var map = document.getElementById("map");
console.dir(map);
var food = document.getElementById("food");
console.dir(food);
//获取地图长宽
var mapWidth = map.offsetWidth;
var mapHeight = map.offsetHeight;
//计算栅格数
var gridWidth, gridHeight;

function getRandomColor() {
    colorArr = ["#FFB900", "#E74856", "#0078D7", "#0099BC", "#E81123", "#00CC6A", "#BC05BF", "#BF052E", "3EA70A"];
    return colorArr[getRandomInt(0, colorArr.length)];
}

// console.log(getRandomColor());