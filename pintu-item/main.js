/*
 * @Author: yangsir
 * @Date: 2021-02-21 18:21:09
 * @LastEditTime: 2021-02-21 18:21:36
 */

/** @type {HTMLCanvasElement} */

let Count = 3; //默认行列数
let imgarray = [];



let emptyloc = new Object();
emptyloc.x = 0;
emptyloc.y = 0;  //存储空白块的位置


let canva = document.getElementById('canvas');
let canvas = canva.getContext('2d');

let widthimg = canva.width; //获得宽度必须是以标签对象为基础,不能以画布上下文为对象 
let heightimg = canva.height;

let img = new Image(); 
let solved = false;    //完成标志

let input = document.getElementById("file"); //选择上传空间



let clickloc = new Object();
clickloc.x = 0;
clickloc.y = 0;  //点击坐标

let imgsize = widthimg / Count; //图片块宽度

 input.onchange = function (e) {
    let inputfile = input.files; //返回类数组
    img.src = window.URL.createObjectURL(inputfile[0]); //创建一个路径对象, 可以手动释放
 
 }

init();
img.addEventListener('load', draw, false);


document.getElementById('select').onchange = function (){
 
   Count = parseInt(this.value);
   imgsize = widthimg / Count;
   init();
   draw();
}  



img.onerror = function () {
    
  alert("资源加载失败");
  
}

function randomnumber() //随机排序函数
{
  return Math.random() > 0.5 ? -1 : 1;
}

function init() {
  imgarray = new Array(Count * Count); 
  // 必须在初始化时,初始化该数组,否则在选择困难级别时,切换行列数时,由于是随机排序,造成数组中的数据混乱,是的某些图发生空白的情况
  for (let i = 0; i < Count * Count; i++) {
    imgarray[i] = i;
  }

  imgarray.sort(randomnumber); //随机排序;
 
}

function draw() { 
  let imgTrueWidth = img.naturalWidth;
  let imgTrueHeight = img.naturalHeight;

  canvas.clearRect(0, 0, widthimg, heightimg);

  for (let j = 0; j < Count; j++) {
    for (let i = 0; i < Count; i++) {
      let arraynum = imgarray[j * Count + i];
      let row = Math.floor(arraynum / Count); //获得行 
      let column = arraynum % Count; // 获得列     
      

      if ( !(arraynum == 2&& solved == false)) {  //  原图像第二块消失,随机出现
         
        canvas.drawImage(img, column *(imgTrueWidth/Count), row *(imgTrueHeight/Count),(imgTrueWidth/Count), (imgTrueHeight/Count), i * imgsize, j * imgsize, imgsize,
        imgsize);
      }
       else{
           emptyloc.x = j ;
           emptyloc.y = i ;
       }

    }
  }

}


canva.onmousemove = function (e) {

  clickloc.x = Math.floor((e.pageY - this.offsetTop) / imgsize);
  clickloc.y = Math.floor((e.pageX - this.offsetLeft) / imgsize);

};
//click 事件 交换函数


canva.onclick = function () {

  if (distance(clickloc.x, clickloc.y, emptyloc.x, emptyloc.y) == 1) {
    slideimg(emptyloc, clickloc);
    draw();

  }
  if (solved) {
    setTimeout(function () {
      alert("word");
    }, 500);
  }
};


function slideimg(emptyloc, clickloc) {
  if (!solved) {
    let t = 0;

    t = imgarray[emptyloc.x * Count + emptyloc.y];
    imgarray[emptyloc.x * Count + emptyloc.y] = imgarray[clickloc.x * Count + clickloc.y];
    imgarray[clickloc.x * Count + clickloc.y] = t;
    emptyloc.x = clickloc.x;
    emptyloc.y = clickloc.y;
    checksolved();

  }
}

function distance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function checksolved() {
  let flag = true;
  for (let i = 0; i < Count * Count; i++) {
    if (imgarray[i] != i) {
      flag = false;
    }
  }
  solved = flag;


}
