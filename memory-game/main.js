/*
 * @Author: yangsir
 * @Date: 2021-02-21 18:41:37
 * @LastEditTime: 2021-02-21 18:42:16
 */
let container = document.querySelectorAll('.container');
    let time = document.querySelector(".time");
    let score = document.querySelector(".defen"); //界面上的主要内容

    let scoretext = document.querySelector('.scoretext'); //结算界面分数
    let timeCount = 30; //60秒计时
    let flipcard = []; //存储翻过的牌的DOM对象

    let se; //调度结束
    let pic = ["url(../img/lp0.png)", "url(./img/lp0.png)",
        "url(../img/lp2.png", "url(./img/lp1.png)",
        "url(../img/lp4.png)", "url(./img/lp2.png)",
        "url(../img/lp0.png)", "url(./img/lp3.png)",
        "url(../img/lp2.png", "url(./img/lp4.png)",
        "url(../img/lp4.png)", "url(./img/bear1.jpg)"
    ]; //图片

    let scoreIncrementer = 0;
    let endgame = document.querySelector(".end");
    let enbutton = document.querySelector(".enbutton");


    function init() { //初始化   初始结算界面, 初始随机数组

        scoreIncrementer = 0
        endgame.style.display = 'none';
        score.innerHTML = 0;  //初始化得分
        scoretext.innerHTML= "Score:"+ 0;

        shuffle(pic);

        for (let i = 0; i < container.length; i++) { //进行存储图片信息,以及绑定点击事件
            if(container[i].classList.contains('on')) { //第二次重来时开,对翻过的牌进行重置
            container[i].classList.toggle('on');
      }
            container[i].querySelector(".back").style.backgroundImage = pic[i];
            container[i].addEventListener('click', flip);
        }


      Timer(); //开始计时

    }


    function flip() { //翻牌函数
        if (!this.classList.contains("on") && flipcard.length < 2) { //牌没有被翻过,数量小于2
            this.classList.add('on');
            flipcard.push(this); //push后再次检测length==2 进行检测
            if (flipcard.length === 2) {
                checkmatch();
            }

        }


    }

    function checkmatch() { //检查牌是否相等
        if (flipcard[0].querySelector('.back').style.backgroundImage === flipcard[1].querySelector('.back').style
            .backgroundImage) {
            flipcard = [];

            score.innerHTML = "0" + ++scoreIncrementer;
        } else {
            setTimeout(flipBack, 1500);
        }

    }


    function flipBack() {
        flipcard[0].classList.toggle('on');
        flipcard[1].classList.toggle('on');
        flipcard = [];

    }

    function shuffle(array) {
        for (let i = 0; i < array.length - 1; i++) {
            let j = Math.floor(Math.random() * (i + 1)); //随机值 0 --- (length-1);
            let temp = array[i]; //交换数据
            array[i] = array[j];
            array[j] = temp;
        }

    }

    function Timer() {
        timeCount =30;
        time.innerHTML = "1:00"; //初始化计时
        
        se = setInterval(startimer,1000);
    }


    function startimer() {     //倒计时
        timeCount--;
        if (timeCount < 10) {
            time.innerHTML = "0:0" + timeCount;

        }
        if (timeCount == 0) {
            time.innerHTML = '0:0' + timeCount;
            clearInterval(se);
            final();
        }
        if (timeCount >= 10) {
            time.innerHTML = '0:' + timeCount;
        }

        if (scoreIncrementer == 6) {
          clearInterval(se);
          final();
        }
    }


    function final() {    // 结束之后的 结算界面  
       
        let test = document.querySelector(".test");
        if (scoreIncrementer == 6) {
            test.innerHTML = "YOU WIN"
            scoretext.innerHTML += scoreIncrementer;

        } 
        else {
            test.innerHTML = "YOU LOSE"
            scoretext.innerHTML += scoreIncrementer;
        }
        endgame.style.display = "block";
    }

    enbutton.onclick = function () {

        init();
    }

    init();