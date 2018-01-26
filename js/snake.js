function Snake(options) {
    options = options || {};
    //标准传入对象：
    // {
    //     width: 20,
    //     height: 20,
    //     
    //     snakeHeaderColor: "red",
    //     snakeHeaderDirection: "right",
    //     snakeHeaderX: 3,
    //     snakeHeaderY: 1
    //     
    //     snakeBodyColor: "white",
    //     Body: [{
    //         gridX: 0,
    //         gridY: 1,
    //     }, {
    //         gridX: 1,
    //         gridY: 1,
    //     }, {
    //         gridX: 2,
    //         gridY: 1,
    //     }]
    // }


    //定义单元格长宽
    this.snakeOnewidth = options.width || 20;
    this.snakeOneheight = options.height || 20;
    //定义头部
    this.snakeHeaderX = options.snakeHeaderX || 3;
    this.snakeHeaderY = options.snakeHeaderY || 1;
    this.snakeHeaderColor = options.snakeHeaderColor || "red";
    this.snakeHeaderDirection = options.snakeHeaderDirection || "right";

    //定义身体
    //定义身体颜色
    this.snakeBodyColor = options.snakeBodyColor || "white";
    //定义身体坐标数组
    this.body = options.snakeBody || [{
        gridX: 0,
        gridY: 1,
    }, {
        gridX: 1,
        gridY: 1,
    }, {
        gridX: 2,
        gridY: 1,
    }];

    //定义蛇在地图中的全坐标
    this.snakeAllHeaderX = 0;
    this.snakeAllHeaderY = 0;



    //头部
    var snakeHeader;
    //绘制身体数组，用来绘制bodydiv
    var count;

    //绘制头部
    this.randerHeader = function(map) {
        snakeHeader = document.createElement("div");
        snakeHeader.style.width = this.snakeOnewidth + "px";
        snakeHeader.style.height = this.snakeOneheight + "px";
        snakeHeader.style.backgroundColor = this.snakeHeaderColor;
        snakeHeader.style.position = "absolute";

        this.snakeAllHeaderX = this.snakeOnewidth * this.snakeHeaderX;
        this.snakeAllHeaderY = this.snakeOneheight * this.snakeHeaderY;

        snakeHeader.style.left = this.snakeOnewidth * this.snakeHeaderX + "px";
        snakeHeader.style.top = this.snakeOneheight * this.snakeHeaderY + "px";

        console.dir(snakeHeader);
        map.appendChild(snakeHeader);
    }


    //绘制身体
    this.randerBody = function(map) {
        // var body = options.snakeBody.bodyArr;
        var len = this.body.length;
        count = [];
        for (; len > 0; len--) {
            var snakeBodydiv = document.createElement("div");
            snakeBodydiv.style.width = this.snakeOnewidth + "px";
            snakeBodydiv.style.height = this.snakeOneheight + "px";
            snakeBodydiv.style.backgroundColor = this.snakeBodyColor;
            snakeBodydiv.style.position = "absolute";

            snakeBodydiv.style.left = this.body[len - 1].gridX * this.snakeOnewidth + "px";
            snakeBodydiv.style.top = this.body[len - 1].gridY * this.snakeOneheight + "px";

            count.push(snakeBodydiv);
        }
        count.forEach(function(item) {
            map.appendChild(item);
        });
        console.log(count);

    }

    //取消渲染头部
    this.clearHeaderRander = function(map) {
            if (snakeHeader) {
                map.removeChild(snakeHeader);
            }
        }
        //取消渲染身体
    this.clearBodyRander = function(map) {
        if (count && count !== []) {
            count.forEach(function(item) {
                map.removeChild(item);
            });
        }
    }
    this.clearRander = function(map){
        this.clearHeaderRander(map);
        this.clearBodyRander(map);
    }

    //移动蛇
    //蛇是否渲染过的标记。
    var wasRander = false;
    this.move = function(map) {
        //蛇身移动：数组中的最后一个为最接近蛇头的，将蛇头的位置赋值给数组中的最后一个，
        //			其他为：后一个的值赋给前一个。

        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[this.body.length - 1 - i].gridX = this.body[this.body.length - i].gridX;
            this.body[this.body.length - 1 - i].gridY = this.body[this.body.length - i].gridY;
        }

        this.body[this.body.length - 1].gridX = this.snakeHeaderX;
        this.body[this.body.length - 1].gridY = this.snakeHeaderY;

        console.log(this.body);
        //蛇头移动
        switch (this.snakeHeaderDirection) {
            case "up":
                this.snakeHeaderY -= 1;
                break;
            case "down":
                this.snakeHeaderY += 1;
                break;
            case "left":
                this.snakeHeaderX -= 1;
                break;
            case "right":
                this.snakeHeaderX += 1;
                break;
        }
        console.log(this.snakeHeaderDirection);
        if (wasRander) {
            this.clearHeaderRander(map);
            this.clearBodyRander(map);
            console.log("蛇重新渲染了");
            wasRander = false;
        }
        this.randerHeader(map);
        this.randerBody(map);

        wasRander = true;

    }

    this.grow = function() {
        this.body.unshift({
            gridX: this.body[0].gridX,
            gridY: this.body[0].gridY
        });
    }

    // this.die = function (map){
    // 	this.clearBodyRander(map);
    // 	this.clearHeaderRander(map);
    // }
}

// var s = new Snake();
// s.move(map);
// s.die(map);
// s.snakeHeaderDirection = "down";
// setInterval(function(){
// 	// s.clearBodyRander(map);
// 	// s.clearHeaderRander(map);
// 	s.move(map);
// 	s.grow();
// },300);
// console.log(s.body);