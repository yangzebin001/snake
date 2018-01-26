//开始游戏按钮
var btnGameStart = document.getElementById('gameStart');
btnGameStart.onclick = function(){
    history.go(0);
}

//游戏模式按钮
var lis = document.querySelectorAll(".dropdown-menu li");

var btnGameMode = document.querySelector(".dropdown button");
var btnGameModeSelect = document.getElementById('dropdownMenu1');
// btnGameModeSelect.innerHTML = "正常模式";
console.dir(lis);
lis[0].onclick = function(){
    btnGameModeSelect.innerText = "正常模式";
    btnGameMode.innerText = "游戏模式：";
    gameMode = "normal";
    
}
lis[1].onclick = function(){
    btnGameModeSelect.innerText = "自由模式";
    btnGameMode.innerText = "游戏模式：";
    gameMode = "free";
}


//暂停，开始按钮
var btnPause = document.getElementById('pause');
btnPause.onclick = function(){
    if(btnPause.innerText === '暂停'){
        btnPause.innerText = '开始';
        pause();
    }else if(btnPause.innerText === '开始'){
        btnPause.innerText = '暂停';
        gameContinue();
        
    }
}

