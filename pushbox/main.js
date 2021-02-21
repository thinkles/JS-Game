/*
 * @Author: yangsir
 * @Date: 2021-02-21 18:50:27
 * @LastEditTime: 2021-02-21 18:51:52
 */
/*
 * @Author: yangsir
 * @Date: 2021-02-21 18:50:27
 * @LastEditTime: 2021-02-21 18:50:28
 */

        let canvas = document.getElementById("canvas");
        canvas.width = 32*21;
        canvas.height = 32*17;
        let drawrange = canvas.getContext('2d');
        let firstbutton = document.querySelector('.button').firstElementChild;
        let secondbutton = firstbutton.nextElementSibling;
        let backbutton = secondbutton.nextElementSibling;
        let img = document.querySelectorAll('.main>img');

        let currentMan_x, currentMan_y; //人物当前坐标   使用数组索引 不使用传统坐标系
        let level = []; //地图 
        let oldmap; //记载旧地图   撤销使用
        let curmap;
        let cando = false ;//撤销标志

        level[0] = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', ' ', 'W', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', 'B', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', 'W', 'W', 'W', ' ', ' ', 'B', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', 'W', ' ', ' ', 'B', ' ', 'B', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', 'W', 'W', 'W', ' ', 'W', ' ', 'W', 'W', ' ', 'W', ' ', ' ', ' ', 'W', 'W', 'W', 'W', 'W', 'W',
                ' '
            ],
            [' ', 'W', ' ', ' ', ' ', 'W', ' ', 'W', 'W', ' ', 'W', 'W', 'W', 'W', 'W', ' ', ' ', 'G', 'G', 'W',
                ' '
            ],
            [' ', 'W', ' ', 'B', ' ', ' ', 'B', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', 'G', 'W',
                ' '
            ],
            [' ', 'W', 'W', 'W', 'W', 'W', ' ', 'W', 'W', 'W', ' ', 'W', 'P', 'W', 'W', ' ', ' ', 'G', 'G', 'W',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ]
        ];

        level[1] = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W', 'B', ' ', ' ', ' ', 'W', ' ', 'W', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'B', 'W', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', ' ', 'W', 'W', 'W', 'W', ' ', 'W', 'W', ' ', 'W', 'W', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', 'B', ' ', ' ', ' ', 'B', ' ', 'W', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', 'B', ' ', ' ', ' ', 'B', ' ', 'W', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', 'B', 'B', 'B', 'B', 'B', ' ', ' ', ' ', 'W', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', 'B', 'P', 'B', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W', 'W', ' ', 'W', 'W', 'W', 'W', 'W', 'W', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W', ' ', 'W', 'W', 'W', 'W', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', ' ', 'W', 'G', 'G', ' ', ' ', ' ', 'G', 'G', 'W', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', ' ', 'W', 'G', 'G', 'G', ' ', 'G', 'G', 'G', 'W', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'G', 'G', 'G', 'W', 'W', 'W', ' ', ' ', ' ', ' ', ' ',
                ' '
            ],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' '
            ]
        ];

        let maplevel = 0;

        function init() {
            curmap = copyArray(level[maplevel]);
            oldmap = copyArray(curmap);
        }

        function loadimg() {      //等图片信息全都加载后,绘图
        let f = 0;
        for (let i = 0; i <img.length; i++) {
            img[i].onload = function () {
                f++;
                if (f == 7) { 
                     drawmap(curmap);
                }
            }
        }
    }

        function copyArray(array) {
            let b = []
            for (let i = 0; i < array.length; i++) {
                b[i] = array[i].slice();
            }
            return b;
        }

        function Point(X, Y) // 这里的坐标 使用数组索引, 不是传统的坐标系
        {
            this.x = X;
            this.y = Y;
        }

        function drawmap(array) {
         
           drawrange.clearRect(0, 0, 800, 800);
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array[i].length; j++) {
                    switch (array[i][j]) {
                        case 'W' :
                            drawrange.drawImage(img[0], 0, 0, 32, 32, j * 32, i * 32, 32, 32);
                            break;
                        case ' ':
                           drawrange.drawImage(img[2], 0, 0, 32, 32, j * 32, i * 32, 32, 32);
                            break;
                        case 'B':
                            drawrange.drawImage(img[1], 0, 0, 32, 32, j * 32, i * 32, 32, 32);
                            break;
                        case 'G':
                            drawrange.drawImage(img[4], 0, 0, 32, 32, j * 32, i * 32, 32, 32);
                            break;
                        case 'P':
                            currentMan_x = i;
                            currentMan_y = j;
                            drawrange.drawImage(img[6], 0, 0, 32, 32, j * 32, i * 32, 32, 32);
                            break;
                        case 'PG':
                            currentMan_x = i;
                            currentMan_y = j;
                            drawrange.drawImage(img[5], 0, 0, 32, 32, j * 32, i * 32, 32, 32);
                            break;
                        case 'BG':
                            drawrange.drawImage(img[3], 0, 0, 32, 32, j * 32, i * 32, 32, 32);
                            break;
                        case 'G':
                            drawrange.drawImage(img[4], 0, 0, 32, 32, j * 32, i * 32, 32, 32);

                    }
                }
            }

            if(checkdown())
            {
                selectlevel(1);
            }
        }


        function jungle(e) {
            e.preventDefault();
            switch (e.key) {
                case 'ArrowRight':
                    P1 = new Point(currentMan_x, currentMan_y + 1);
                    P2 = new Point(currentMan_x, currentMan_y + 2);
                    move(P1, P2);
                    break;

                case 'ArrowLeft':
                    P1 = new Point(currentMan_x, currentMan_y - 1);
                    P2 = new Point(currentMan_x, currentMan_y - 2);
                    move(P1, P2);
                    break;

                case 'ArrowDown':
                    P1 = new Point(currentMan_x + 1, currentMan_y);
                    P2 = new Point(currentMan_x + 2, currentMan_y);
                    move(P1, P2);
                    break;

                case 'ArrowUp':
                    P1 = new Point(currentMan_x - 1, currentMan_y);
                    P2 = new Point(currentMan_x - 2, currentMan_y);
                    move(P1, P2);
                    break;

            }

            drawmap(curmap);

        }

        function move(P1, P2) {
            if (curmap[P1.x][P1.y] === 'W') {
                return;
            }



            if (curmap[P1.x][P1.y] === ' ' || curmap[P1.x][P1.y] === 'G') { // 处理人物当前位置
                oldmap = copyArray(curmap); //用来撤销使用
                cando =true;

                if (curmap[currentMan_x][currentMan_y] === 'PG') //人物上一步的位置
                {
                    curmap[currentMan_x][currentMan_y] = 'G';
                } else {
                    curmap[currentMan_x][currentMan_y] = ' ';
                }

                if (curmap[P1.x][P1.y] === ' ') {
                    curmap[P1.x][P1.y] = 'P';
                } else {
                    curmap[P1.x][P1.y] = 'PG';
                }


            }

            if (curmap[P1.x][P1.y] === 'B' || curmap[P1.x][P1.y] === 'BG') {
                if (curmap[P2.x][P2.y] === 'W' || curmap[P2.x][P2.y] === 'B' || curmap[P2.x][P2.y] === 'BG') {
                    return;
                }
                if (curmap[P2.x][P2.y] === ' ' || curmap[P2.x][P2.y] === 'G') { //箱子可以移动
                    oldmap = copyArray(curmap); //用来撤销使用
                    cando =true;
                    if (curmap[currentMan_x][currentMan_y] === 'PG') //人物上一步的位置
                    {
                        curmap[currentMan_x][currentMan_y] = 'G';
                    } else {
                        curmap[currentMan_x][currentMan_y] = ' ';
                    }

                    if (curmap[P1.x][P1.y] === 'B') {   //人物 箱子下一步的位置
                        curmap[P1.x][P1.y] = 'P';
                        if (curmap[P2.x][P2.y] === ' ') {
                            curmap[P2.x][P2.y] = 'B';
                        }else{
                            curmap[P2.x][P2.y] = 'BG';
                        }

                    } else {
                        curmap[P1.x][P1.y] = 'PG';
                        if (curmap[P2.x][P2.y] === 'G') {
                            curmap[P2.x][P2.y] = 'BG';
                        }
                        else{
                            curmap[P2.x][P2.y] = 'B';
                        }
                    }
                }
            }


        }
        function checkdown(){
            let flag =true;
            for(let i = 0; i< curmap.length;i++)
            {
                for(let j = 0 ;j<curmap[i].length; j++) {
                    if(curmap[i][j] ==='G' || curmap[i][j] ==='PG' )
                    {
                         flag =false;
                    }
                }
            }
           return flag;
        }
       function selectlevel(i) {
           maplevel = maplevel+ i;
           if(maplevel< 0)
           {
               maplevel = 0;
           }
           if(maplevel > 1)
           {
              maplevel = 1;
           }
           curmap = copyArray(level[maplevel]);
           init();
           drawmap(curmap);
       }

        function back() {
         if(cando)
         {
             curmap = copyArray(oldmap);
             drawmap(curmap);
             cando=false;
         }
         
        }
         init();
         loadimg(); 
         backbutton.addEventListener('click',back);
        window.addEventListener('keydown', jungle);
