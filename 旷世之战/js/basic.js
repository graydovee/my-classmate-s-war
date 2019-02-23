function GameObject(obj){
  if(!isDom(obj)){
      return null;
  }

  this.object = obj;
  this.style = obj.style;
  var gameObject = this;

  obj.classList.add('game-object');

  //增加类名
  this.addClass = function(name){
    gameObject.object.classList.add(name);
  }

  //增加元素
  this.addElement = function(element){
    if(element instanceof GameObject){
      element = element.object;
    }
    if(isDom(element)){
      gameObject.object.appendChild(element);
    }
  }

  this.createElement = function(element){
    var ele = document.createElement(element);
    gameObject.addElement(ele);
    return ele;
  }

  //创建盒子
  this.createDiv = function(id,className,position){
    var divBox = document.createElement('div');
    if(position){
      divBox.style.position = position;
    }
    if(id){
      divBox.id = id;
    }
    if(className){
      divBox.classList.add(className);
    }
    gameObject.addElement(divBox);

    return new GameObject(divBox);
  }

  //创建图片
  this.createImg = function(src){
    var imgBox = document.createElement('img');
    imgBox.src = src;
    gameObject.addElement(imgBox);

    return new GameObject(imgBox);
  }

  //增加文字描述
  this.addText = function(msg){
    var textNode = document.createTextNode(msg)
    gameObject.object.appendChild(textNode);
    return gameObject;
  }

  //作为游戏画布
  this.asGameScreen = function(){
    gameObject.addClass('game-screen');
    GameObject.prototype.gameScreenWidth = gameObject.object.clientWidth;
    GameObject.prototype.gameScreenHeight = gameObject.object.clientHeight;
    gameObject.style.left = (window.innerWidth - gameObject.gameScreenWidth)/2+"px";
    gameObject.style.top = (window.innerHeight - gameObject.gameScreenHeight)/2+"px";
  }

  //设置外观
  this.setBox = function(top,left,width,height){
      if(top){
        gameObject.object.style.top = top+"px";
      }
      if(left){
        gameObject.object.style.left = left+"px";
      }
      if(width){
        gameObject.object.style.width = width+"px";
      }
      if(height){
        gameObject.object.style.height = height+"px";
      }
      return gameObject;
  }

  //切换隐藏与显示
  this.toggle = function(){
    var msg = gameObject.style.display;
    if(msg!='none'){
      obj.style.display = 'none';
    }else{
        obj.style.display = 'block';
    }
  }

  this.show = function(){
    obj.style.display = 'block';
  }

  this.hid = function(){
    obj.style.display = 'none';
  }

  //点击事件
  this.click = function(func){
    gameObject.style.cursor = "pointer";
    gameObject.object.onclick = func;
  }

  //内部文本内容
  this.text = function(text){
    if(text){
      gameObject.object.innerText = text;
    }
    return gameObject.object.innerText;
  }

  //移动元素，以左上角为原点
  this.moveTo = function(x,y,time,func){
    if(time){
      var now_x = parseInt(gameObject.object.style.left);
      var now_y = parseInt(gameObject.object.style.top);

      var frame_number = time/10;

      var diff_x = (x - now_x)/frame_number;
      var diff_y = (y - now_y)/frame_number;
      var frame_count = 0;
      var timer = window.setInterval(function(){
        frame_count++;
        if(frame_count>=frame_number){
          gameObject.style.left = x + 'px';
          gameObject.style.top = y + 'px';
          window.clearInterval(timer);
          if(func){
            func();
          }
        }else{
          gameObject.style.left = (now_x + diff_x*frame_count) +'px';
          gameObject.style.top = (now_y + diff_y*frame_count) + 'px';
        }
      },10)
    }else{
      gameObject.style.left = x + 'px';
      gameObject.style.top = y + 'px';
    }
  }

}

//判断是否为Dom对象
function isDom(obj){
  return ((typeof HTMLElement === 'function')

  ? (obj instanceof HTMLElement)

  : (obj && (typeof obj === 'object') && (obj.nodeType === 1) && (typeof obj.nodeName === 'string')))
}
