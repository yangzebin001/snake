//游戏生命周期钩子。
var timer;

// **********游戏周期函数**********
function gameLife(map, s, foodArr, foodColor) {
    timer = setInterval(function() {
        //让蛇跑起来
        s.move(map);
        console.dir(s);
        //蛇是否吃到了食物

        sankeToFood(s, foodArr, foodColor, map);

        //蛇是否超出了地图
        var isToMap = ifSnakeToMap(s);
        if (isToMap) {
            //判断游戏模式
            if(gameMode === "normal"){
                clearInterval(timer);
                isGameOver = true;
                // console.log(isGameOver);
            }else if(gameMode === "free"){
                if(s.snakeAllHeaderX >= mapWidth){
                    s.snakeHeaderX = 0;
                }else if(s.snakeAllHeaderY >= mapHeight){
                    s.snakeHeaderY = 0;
                }else if(s.snakeAllHeaderX < 0){
                    s.snakeHeaderX = mapWidth / s.snakeOnewidth;
                }else if(s.snakeAllHeaderY < 0){
                    s.snakeHeaderY = mapHeight / s.snakeOneheight;
                }
            }
        }

        var isti = ifSnakeToItself(s);
        if(isti){
            clearInterval(timer);
            isGameOver = true;
        }
        //判断游戏是否结束，将结果分存储到本地中。
        if(isGameOver){
            if(gameScore > localStorage.getItem("snakeGameScore")){
                localStorage.setItem("snakeGameScore", gameScore);
                alert("恭喜，您创造了记录！分数为："+gameScore);
            }else{

                alert("您的分数为："+gameScore);
            }
        }

    }, speed);
}

//初始化食物：将给定数量的食物添加到食物数组中。
function initFood(foodArr, foodNumber, foodColor) {
    if (!foodNumber || foodNumber < 1) return;
    // if (foodArr == null || food == undefined) foodArr = [];
    while (foodNumber > 0) {
        var f = new Food({ color: foodColor });
        // f.rander(map);
        foodArr.push(f);
        foodNumber--;
    }
}

//将数组中的每个食物渲染到地图中
function randerFoodArr(foodArr){
    foodArr.forEach(function(f){
        f.rander(map);
        console.log("渲染食物");
    });
}



function clearRanderFoodArr(foodArr){
    foodArr.forEach(function(f){
        f.clearRander(map);
        console.log("渲染食物");
    });
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
                //将蛇增加一节
                s.grow();
                //游戏分加一
                gameScore++;
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
function ifSnakeToMap(s) {
    if (s === null || s === undefined) return;
    if (s.snakeAllHeaderX >= mapWidth || s.snakeAllHeaderY >= mapHeight || s.snakeAllHeaderX < 0 || s.snakeAllHeaderY < 0) {
        return true;
    }
}

// 是否蛇吃到了自身，如果是，返回true；
function ifSnakeToItself(s){
    var a = [];
    a[0] = {
        gridX : s.snakeHeaderX,
        gridY : s.snakeHeaderY
    };
    for (var i = 1; i < s.body.length+1; i++) {
        a[i] = s.body[i-1];
    };

    var n = new Set();
    for (var i = 0; i < a.length; i++) {
        n.add(a[i]);
    }

    console.dir(a);
    console.dir(n);
    if(n.size !== a.length){
        return true;
    }
    return false;
}


//暂停游戏
function pause(){
    if(timer){
        clearInterval(timer);
        console.log("游戏暂停");
        timer = null;
        window.onkeypress = null;
        isPause = true;
    }
}

//继续游戏
function gameContinue(){
    if(isPause && !isGameOver){
        window.onkeypress = function(e) {
            keyboardListener(e);
        }
        // randerFoodArr(foodArr);
        // gameLife(map, s, foodArr, foodColor, speed);
        gameLife(map, s, foodArr, foodColor, speed);
        isPause = false;
    }
}

