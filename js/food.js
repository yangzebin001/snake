//定义食物类
function Food(options) {
    options = options || {};

    //定义宽高、坐标
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.color = options.color || getRandomColor();
    //
    gridWidth = mapWidth / this.width;
    gridHeight = mapHeight / this.height;
    //定义坐标，由于使用的随机数函数不包含给定末尾的数，所以为以下写法，应为(0, gridWidth-1) * this.width
    this.X = getRandomInt(0, gridWidth) * this.width;
    this.Y = getRandomInt(0, gridHeight) * this.height;

    var modelFood;
    //渲染食物
    this.rander = function(map) {
        modelFood = document.createElement("div");
        modelFood.style.width = this.width + "px";
        modelFood.style.height = this.height + "px";
        modelFood.style.backgroundColor = this.color;
        modelFood.style.position = "absolute";

        modelFood.style.left = this.X + "px";
        modelFood.style.top = this.Y + "px";

        console.dir(modelFood);
        map.appendChild(modelFood);
    }

    //仅仅是清除在DOM中的对象，要想清除对象请使用obj = null；
    this.clearRander = function(map) {
        map.removeChild(modelFood);
    }

}


// var f1 = new Food();
// f1.rander(map);
// setTimeout(function(){f1.clearRander(map);
// f1 = null;
// f1 = new Food();
// f1.rander(map);
// },1000);