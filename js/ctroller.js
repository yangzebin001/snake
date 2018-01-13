//游戏生命周期钩子。
var timer;

// **********游戏周期函数**********
function gameLife(map, s, foodArr, foodColor) {
    timer = setInterval(function() {
        //让蛇跑起来
        s.move(map);
        //蛇是否吃到了食物
        sankeToFood(s, foodArr, foodColor, map);
        //蛇是否超出了地图
        var isToMap = ifSnakeToMap(s, map, timer);
        if (isToMap) {
            clearInterval(timer);

        }

    }, speed);
}

//初始化食物
function initFood(foodArr, foodNumber, foodColor) {
    if (!foodNumber || foodNumber < 1) return;
    // if (foodArr == null || food == undefined) foodArr = [];
    while (foodNumber > 0) {
        var f = new Food({ color: foodColor });
        f.rander(map);
        foodArr.push(f);
        foodNumber--;
        console.log("渲染食物");
    }
}

//初始化蛇，返回蛇对象（独一份）
function initSnake(csnakeHeaderColor, csnakeBodyColor) {
    var s = new Snake({ snakeHeaderColor: csnakeHeaderColor, snakeBodyColor: csnakeBodyColor });
    return s;
}

//蛇吃到食物
function sankeToFood(s, foodArr, foodColor, map) {
    if (foodArr && foodArr.length > 0) {
        var i = 0,
            len = foodArr.length;
        for (; i < len; i++) {
            if (s.snakeAllHeaderX === foodArr[i].X && s.snakeAllHeaderY === foodArr[i].Y) {
                s.grow();
                foodArr[i].clearRander(map);
                //清除引用
                foodArr[i] = null;
                //重新创建并渲染
                foodArr[i] = new Food({ color: foodColor });
                foodArr[i].rander(map);
            }

        }
    }
}

//是否蛇超出地图，如果是，返回true；
function ifSnakeToMap(s, map, timer) {
    if (s === null || s === undefined) return;
    if (s.snakeAllHeaderX >= mapWidth || s.snakeAllHeaderY >= mapHeight || s.snakeAllHeaderX < 0 || s.snakeAllHeaderY < 0) {
        return true;
    }
}