/*
 * @Author: yangsir
 * @Date: 2021-02-21 18:28:20
 * @LastEditTime: 2021-02-21 18:28:23
 */

let canvas = document.querySelector("#canvas");
let draw = canvas.getContext('2d');
let linenum = canvas.width / 20;
let chesswidth = canvas.width;
let white = 0;
let chessarray = new Array();



function init() {

    for (let i = 0; i < linenum - 1; i++) {
        chessarray[i] = new Array();
        for (let j = 0; j < linenum - 1; j++) {
            chessarray[i][j] = 0;
        }
    }

    drawchessboard();

}

function drawchessboard() {
    draw.clearRect(0, 0, 600, 600);
    for (let i = 1; i <= linenum; i++) {
        draw.beginPath();
        draw.moveTo(30, i * 30);
        draw.lineTo(canvas.width, i * 30);
        draw.moveTo(i * 30, 30);
        draw.lineTo(i * 30, canvas.width);
        draw.stroke();
    }
    draw.closePath();
}

function work(flag, chess) {
    if (flag >= 4) {
        if (chess === 1) {
            alert("白棋胜");
            white = 0;
            init(); 
        } else {
            alert('黑棋胜');
            white = 0;
           init();  
        }
    }
}


function judgechess(i, j, chess) {
    let flag0 = 0; 
    let flag1 = 0; 
    let flag2 = 0; 
    let flag3 = 0;   //代替四个方向线的变量
    let A=true,B=true,C=true,D=true,E=true,F=true,G=true,H=true;

   for(let k=1;k < 5;k++) {
       if(A||B)
       {
           if(chessarray[i-k][j-k] ===chess && A)
           {
               flag0++;
               work(flag0,chess);
           }
           else{
               A= false;
           }
           if(chessarray[i+k][j+k] ===chess && B)
           {
               flag0++;
               work(flag0,chess);
           } 
           else{
             B=false;
           }
       }
   }
   for(let k=1;k < 5;k++) {
       if(C||D)
       {
           if(chessarray[i][j-k] ===chess && C)
           {
               flag1++;
               work(flag1,chess);
           }
           else{
               C= false;
           }
           if(chessarray[i][j+k] ===chess && D)
           {
               flag1++;
               work(flag1,chess);
           } 
           else{
             D=false;
           }
       }
   }
   for(let k=1;k < 5;k++) {
       if(E||F)
       {
           if(chessarray[i-k][j] ===chess && E)
           {
               flag2++;
               work(flag2,chess);
           }
           else{
               E= false;
           }
           if(chessarray[i+k][j] ===chess && F)
           {
               flag2++;
               work(flag2,chess);
           } 
           else{
             F = false;
           }
       }
   }
   for(let k=1;k < 5;k++) {
       if(G||H)
       {
           if(chessarray[i-k][j+k] ===chess && G)
           {
               flag3++;
               work(flag3,chess);
           }
           else{
               G= false;
           }
           if(chessarray[i+k][j-k] ===chess && H)
           {
               flag3++;
               work(flag3,chess);
           } 
           else{
             H=false;
           }
       }
   }



    
    }





function judgecoorde(e) {
    /*  console.log(e.clientY); */
    let i = Math.round((e.pageY - canvas.offsetTop - 30) / 30);
    let j = Math.round((e.pageX - canvas.offsetLeft - 30) / 30);

    let x = (i + 1) * 30;
    let y = (j + 1) * 30;
    if (chessarray[i][j] != 0) {
        return;
    } else {

        white++;

        if (white % 2 == 0) {
            draw.beginPath();
            draw.fillStyle = "white";
            draw.arc(y, x, 10, 0, Math.PI * 2, true);
            draw.closePath();
            draw.fill();
            chessarray[i][j] = 1; //白色
            judgechess(i, j, chessarray[i][j]);
        } else {
            draw.beginPath();
            draw.fillStyle = 'black';
            draw.arc(y, x, 10, 0, Math.PI * 2, true);
            draw.closePath();
            draw.fill();
            chessarray[i][j] = 2; //黑色
            judgechess(i, j, chessarray[i][j]);

        }

    }



}
init();
canvas.addEventListener('click', judgecoorde);
