// 对象game   
// 需要的变量
// 1、全局变量  存储当前2048数据的变量data，二位数组
// 2、全局变量  存储游戏当前状态开始/结束、state，定义两个常量RUNNING\GAMEOVER
// 3、全局变量  总行数总列数 mRow,mCol
// 4、当前的行列row、col
var game = {
  data: [],
  state: 0,
  RUNNING: 1,
  GAMEOVER: 0,
  mRow: 4,
  mCol: 4,
  score: 0,
  //初始化方法  window.onload(){} start    row、col
  start: function () {
    this.data = [
      [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
    ];
    this.score = 0;
    this.state = this.RUNNING;

    this.isGameStart();
  },

  //判断游戏状态并执行方法    isGameStart()
  isGameStart: function () {
    if (!this.isFull()) {
      // alert("isGameStart....true")
      this.inint();
      return true;
    }

    for (var i = 0; i < this.mRow; i++) {
      for (var j = 0; j < this.mCol; j++) {
        if (j < this.mCol - 1) {
          if (this.data[i][j] == this.data[i][j + 1]) {
            this.inint();
            return true;
          }
        }
        if (i < this.mRow - 1) {
          if (this.data[i][j] == this.data[i + 1][j]) {
            this.inint();
            return true;
          }
        }
      }
    }
    return false;
  },
  //游戏开始，初始化生成随机数字
  inint: function () {
    //游戏开始，随机位置取随机的2或4
    this.randomNum();
    this.randomNum();
    //更新2048页面的功能
    this.updateView();
  },
  //产生随机数2、4的方法  randomNum()
  randomNum: function () {
    if (!this.isFull()) {
      while (true) {
        // alert("isFull....false")
        var row = parseInt(Math.random() * this.mRow);
        var col = parseInt(Math.random() * this.mCol);
        if (this.data[row][col] == 0) {
          var num = Math.random() < 0.5 ? 2 : 4;
          this.data[row][col] = num;
          //alert("data[row][col]" + this.data[row][col]);
          break;
        }
      }
    }
  },
  //更新2048的数字的方法      updateView()
  //更新视图，包含判断游戏是否结束
  updateView: function () {
    var div = document.getElementById("gameOver");
    div.style.display = "none";
    for (var i = 0; i < this.mRow; i++) {
      for (var j = 0; j < this.mCol; j++) {
        var divObj = document.getElementById("c" + i + j);
        var curr = this.data[i][j];
        //修改div开始标签和结束标签之间的内容
        // alert("curr:"+curr)
        divObj.innerHTML = curr != 0 ? curr : "";
        //修改div的class属性
        divObj.className = curr != 0 ? "cell n" + curr : "cell";
      }
    }
    //data数组没有零的值，即游戏没有空间
    if (this.data.toString().indexOf("0") == -1) {
      //相邻相等的个数
      var num = 0;
      for (var i = 0; i < this.mRow; i++) {
        for (var j = 0; j < this.mCol - 1; j++) {
          if (this.data[i][j] == this.data[i][j + 1]) {
            num++;
          }
        }
      }
      for (var i = 0; i < this.mCol; i++) {
        for (var j = 0; j < this.mRow - 1; j++) {
          if (this.data[j][i] == this.data[j+1][i]) {
            num++;
          }
        }
      }
      //所有值都不为零的条件下
      //上下或左右相邻的数字相等的次数为零
      if (num == 0) {
        this.state == this.GAMEOVER
        var div = document.getElementById("gameOver");
        var span = document.getElementById("finalScore");
        span.innerHTML = this.score;
        div.style.display = "block";
        num = 1;
      }
    }
    var span = document.getElementById("score");
    span.innerHTML = this.score;
    var span = document.getElementById("finalScore");
    span.innerHTML = this.score;

  },
  //判断游戏是否失败的方法    isFull()   data数组每个数字不为零，而且相邻不相等
  isFull: function () {
    for (var i = 0; i < this.mRow; i++) {
      for (var j = 0; j < this.mCol; j++) {
        if (this.data[i][j] == 0) {
          return false;
        }
      }
    }
    return true;
  },
  //游戏向右（左上下）滑方法  moveRight()
  moveRight: function () {
    for (var i = 0; i < this.mRow; i++) {

      this.moveInRowRight(i);
    }
    this.randomNum();
    this.updateView();
  },

  moveLeft: function () {
    for (var i = 0; i < this.mRow; i++) {
      this.moveInRowLeft(i);
    }
    this.randomNum();
    this.updateView();
  },

  //第N行
  moveInRowRight: function (nRow) {
    this.deteRight(nRow);
    this.moveRowRightO(nRow);
  },
  deteRight: function (nRow) {
    for (var i = this.mCol - 1; i > 0; i--) {
      for (var j = i - 1; j >= 0; j--) {
        if (this.data[nRow][i] != 0) {
          if (this.data[nRow][j] != 0) {
            if (this.data[nRow][i] == this.data[nRow][j]) {
              this.data[nRow][i] += this.data[nRow][j];
              this.data[nRow][j] = 0;
              this.score += this.data[nRow][i];
            } else
              break;
          }
        }
      }
    }
  },
  moveRowRightO: function (nRow) {
    for (var i = this.mCol - 1; i > 0; i--) {
      for (var j = i - 1; j >= 0; j--) {
        //如果i为零，且j为零继续遍历
        //如果i为零，且j不为零，移动j到i
        //如果i不为零，继续循环i+1
        if (this.data[nRow][i] == 0) {
          if (this.data[nRow][j] != 0) {
            this.data[nRow][i] = this.data[nRow][j];
            this.data[nRow][j] = 0;
          }
        }
      }
    }
  },
  moveInRowLeft: function (nRow) {
    this.deleteLeft(nRow);
    this.moveRowLeftO(nRow);
  },
  deleteLeft: function (nRow) {
    for (var i = 0; i < this.mCol - 1; i++) {
      for (var j = i + 1; j < this.mCol; j++) {
        //当i，j都不为零
        //如果i，j相等，i=i+j，消除j
        //如果不相等，退出此次循环。i+1继续循环
        if (this.data[nRow][i] != 0) {
          if (this.data[nRow][j] != 0) {
            if (this.data[nRow][i] == this.data[nRow][j]) {
              this.data[nRow][i] += this.data[nRow][j];
              this.data[nRow][j] = 0;
              this.score += this.data[nRow][i];
            } else
              break;
          }
        }
      }
    }
  },
  moveRowLeftO: function (nRow) {
    //从左边开始遍历，往右边查找不为零的数  
    for (var i = 0; i < this.mCol - 1; i++) {
      for (var j = i + 1; j < this.mCol; j++) {
        //第i个为零，与第一个不为零的j替换，退出此次循环
        if (this.data[nRow][i] == 0) {
          if (this.data[nRow][j] != 0) {
            this.data[nRow][i] = this.data[nRow][j];
            this.data[nRow][j] = 0;
          }
        }
      }
    }

  },
  moveUp: function () {
    for (var j = 0; j < this.mCol; j++) {
      this.moveInColUp(j);
    }
    this.randomNum();
    this.updateView();
  },
  //实现向下滑动，分解成每一列向下滑动
  moveDown: function () {

    for (var j = 0; j < this.mCol; j++) {
      this.moveInColDown(j);
    }
    this.randomNum();
    this.updateView();
  },
  //实现某nCol一列向上滑动
  moveInColUp: function (nCol) {
    //参照向下滑
    this.deleteUp(nCol);
    this.moveColUpO(nCol);
  },
  deleteUp: function (nCol) {
    //alert("uuuup")
    for (var i = 0; i < this.mRow - 1; i++) {
      for (var j = i + 1; j < this.mRow; j++) {
        //第i数不等于零，且j不等于零的条件下
        //如果i等于j，i*2，消除j
        if (this.data[i][nCol] != 0) {
          if (this.data[j][nCol] != 0) {
            if (this.data[i][nCol] == this.data[j][nCol]) {
              this.data[i][nCol] += this.data[j][nCol];
              this.data[j][nCol] = 0;
              this.score += this.data[i][nCol];
            } else
              break;
          }
        }
      }
    }
  },
  moveColUpO: function (nCol) {
    for (var i = 0; i < this.mRow - 1; i++) {
      for (var j = i + 1; j < this.mRow; j++) {
        if (this.data[i][nCol] == 0) {
          if (this.data[j][nCol] != 0) {
            this.data[i][nCol] = this.data[j][nCol];
            this.data[j][nCol] = 0;
          }
        }
      }
    }
  },
  //实现某nCol一列向下滑动
  //分解成消除相等数和向下滑动两个功能
  moveInColDown: function (nCol) {
    //实现向下滑动中，消除相等的数
    this.deleteDown(nCol);
    //实现向下滑的功能
    this.moveColDownO(nCol);
  },
  deleteDown: function (nCol) {
    for (var i = this.mRow - 1; i > 0; i--) {
      for (var j = i - 1; j >= 0; j--) {
        //第i不为零且遍历的j不为零的条件下
        //如果两个数相等就i*2，消除j
        if (this.data[i][nCol] != 0) {
          if (this.data[j][nCol] != 0) {
            if (this.data[i][nCol] == this.data[j][nCol]) {
              this.data[i][nCol] += this.data[j][nCol];
              this.data[j][nCol] = 0;
              this.score += this.data[i][nCol];
            } else
              break;
          }
        }
      }
    }
  },
  moveColDownO: function (nCol) {
    for (var i = this.mRow - 1; i > 0; i--) {
      for (var j = i - 1; j >= 0; j--) {
        if (this.data[i][nCol] == 0) {
          if (this.data[j][nCol] != 0) {
            this.data[i][nCol] = this.data[j][nCol];
            this.data[j][nCol] = 0;
          }
        }
      }
    }
  }
}

//onload事件：当页面加载后自动执行
window.onload = function () {
  game.start();//页面加载后，自动启动游戏
  //当按键盘按键时，触发移动:
  document.onkeydown = function () {
    //获得事件对象中键盘号
    //事件对象：在事件发生时自动创建 封装了事件的信息
    if (game.state == game.RUNNING) {
      //Step1: 获得事件对象
      var e = window.event || arguments[0];
      //IE   DOM标准
      //Step2: 获得键盘号:e.keyCode
      if (e.keyCode == 37) {
        game.moveLeft();
      } else if (e.keyCode == 39) {
        game.moveRight();
      } else if (e.keyCode == 38) {
        game.moveUp();
      } else if (e.keyCode == 40) {
        // 向下滑动
        //其他功能向上、向左、向右，都是类似的实现
        //思考:是不是可以抽离出来，做一个类
        game.moveDown();
      }
      //如果按左键，调用moveLeft
      //否则如果按右键，调用moveRight
    }
  }
}