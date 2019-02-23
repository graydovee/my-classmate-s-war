window.onload = mainfunc;

//游戏画布
var main;

//自己和敌人
var player,self,enemy;

//技能菜单及按钮
var skillBox,skill1,skill2,skill3,skill4;

//战斗菜单及按钮
var fight_menu,fight,run;

//消息栏
var msgbox;

//开始信息
var start_msg = ["野生的{%name%}跳了出来\n!!!","骚猪：就决定是你了！\n————{%name%}！"];

var count = 0;

var audio;

var monster_list = ['刚哥哥','晓怡妈','陈总','范老大'];
var c1,c2;
var choose1,choose2;
var info1,info2,start;

function mainfunc(){
  main = new GameObject(document.getElementById('main'));
  main.asGameScreen();

  var start_ = main.createDiv('game-start').setBox(270,300,200,50);
  start_.addText("开始游戏");
  start_.click(function(){
    start_.hid();
    choose_ch();
  });

  audio = main.createDiv("play-audio",'center').setBox(0,720,80,30);
  audio.addText("关闭音乐");
  music_load();
  audio.click(function(){
    if(audio.text()=='关闭音乐'){
      audio.text("开启音乐");
      music_remove();
    }else{
      audio.text("关闭音乐");
      music_load();
    }
  })
}

function music_load(){
  if(!audio.music){
    audio.music = main.createElement('audio');
    audio.music.src = 'music/bg_music.mp3';
  }

  audio.music.play();
}

function music_remove(){
  audio.music.pause();
}


function choose_ch(){

  info1 = main.createDiv('game-start').setBox(70,100,200,50);
  info1.addText("请选择己方");
  choose1 = main.createDiv(null,'text-center').setBox(170,100,200,300);
  choose1.style.overflow = 'auto';
  choose1.child_list = new Array();
  for(var i=0;i<monster_list.length;++i){
    var temp = choose1.createDiv(null,'text-center').setBox(i*50,0,195,50);
    temp.addText(monster_list[i]);
    temp.object.setAttribute('c1',i);
    temp.click(function(){
      c1 = this.getAttribute('c1');
      for(var i=0;i<choose1.child_list.length;++i){
        choose1.child_list[i].style.backgroundColor = '#FFFFFF';
      }
      this.style.backgroundColor =  '#61AFEF';
    });
    choose1.child_list.push(temp);
  }

  info2 = main.createDiv('game-start').setBox(70,400,200,50);
  info2.addText("请选择敌方");
  choose2 = main.createDiv(null,'text-center').setBox(170,400,200,300);
  choose2.style.overflow = 'auto';
  choose2.child_list = new Array();
  for(var i=0;i<monster_list.length;++i){
    var temp = choose2.createDiv(null,'text-center').setBox(i*50,0,195,50);
    temp.addText(monster_list[i]);
    temp.object.setAttribute('c2',i);
    temp.click(function(){
      c2 = this.getAttribute('c2');
      for(var i=0;i<choose1.child_list.length;++i){
        choose2.child_list[i].style.backgroundColor = '#FFFFFF';
      }
      this.style.backgroundColor =  '#61AFEF';
    });
    choose2.child_list.push(temp);
  }

  start = main.createDiv('game-start','text-center').setBox(400,300,200,50);
  start.addText('开始');
  start.click(function(){
    info1.hid();
    info2.hid();
    choose1.hid();
    choose2.hid();
    start.hid();
    game_load();
  });
}

function game_load(){
  main.createImg("img/bg.jpg").setBox(0,0,main.gameScreenWidth,main.gameScreenHeight);

  //加载人物
    //玩家
  player = main.createImg("img/saozhu.png").setBox(220,150,150,200);

  console.log(c1+'---'+c2);
    //自己
  self = create_monster(c1);
  console.log(self);
  self.name_div.hid();
  self.hp_num.obj.hid();
    //敌人
  enemy = create_monster(c2,1);

  var skills;

  enemy.load_skills(enemy,self);

  self.load_skills(self,enemy);


  load_skill();
  load_menu();
  load_msg_box();
}


function load_skill(){

  skillBox = main.createDiv();
  skillBox.setBox(440,70,250,150);
  skillBox.style.backgroundColor = '#FFFFFF';
  skillBox.style.border="5px solid #152900";
  skillBox.style.display = 'none';

  var temp,name;

  skill1 = skillBox.createDiv(null,"button").setBox(0, 0,100,50);
  name = self.skills.list[0].skill_name;
  temp = skill1.createDiv().addText(name);
  if(name.length>=4){
    temp.style.fontSize = '20px';
    temp.style.paddingTop = '10px';
  }
  skill1.click(function(){
    self.skills.list[0].use();
    enemy_round();
  });

  skill2 = skillBox.createDiv(null,"button").setBox(70,0,100,50);
  name = self.skills.list[1].skill_name;
  temp = skill2.createDiv().addText(name);
  if(name.length>=4){
    temp.style.fontSize = '20px';
    temp.style.paddingTop = '10px';
  }
  skill2.click(function(){
    self.skills.list[1].use();
    enemy_round();
  });

  skill3 = skillBox.createDiv(null,"button").setBox(0,120,100,50);
  name = self.skills.list[2].skill_name;
  temp = skill3.createDiv().addText(name);
  if(name.length>=4){
    temp.style.fontSize = '20px';
    temp.style.paddingTop = '10px';
  }
  skill3.click(function(){
    self.skills.list[2].use();
    enemy_round();
  });

  skill4 = skillBox.createDiv(null,"button").setBox(70,120,100,50);
  name = self.skills.list[3].skill_name;
  temp = skill4.createDiv().addText(name);
  if(name.length>=4){
    temp.style.fontSize = '20px';
    temp.style.paddingTop = '10px';
  }
  skill4.click(function(){
    self.skills.list[3].use();
    enemy_round();
  });

}

function load_menu(){
  fight_menu = main.createDiv().setBox(440,450,250,150);
  fight_menu.style.display = 'none';

  fight = fight_menu.createDiv(null,"button").setBox(0,0,100,50);
  fight.createDiv().addText("战斗");
  fight.click(skillBox.toggle);

  run = fight_menu.createDiv(null,"button").setBox(60,120,100,50);
  run.createDiv().addText("逃跑");
  run.click(function(){
    if(self.spacial=='运动健将'){
      show_msg(self.name+"试图逃跑",function(){
        show_msg(self.name+"跑掉了了。。。。。。\n————骚猪只好自己上了",function(){
          self.name_div.hid();
          self.hp.hp_scoll.hid();
          self.hp.bg.hid();
          self.hp_num.obj.hid();
          self.body.moveTo(-150,220,500,function(){
            self.body.hid();

            self = create_monster(-1);
            self.load_skills(self,enemy);
            enemy.load_skills(enemy,self)
            main.object.removeChild(skillBox.object);
            load_skill();
            main.object.removeChild(fight_menu.object);
            load_menu();

            self.hp_num.obj.hid();
            self.name_div.hid();
            self.body.moveTo(150,220,500,function(){
              fight_menu.show();
              msgbox.hid();
              self.name_div.show();
              self.hp_num.obj.show();
            })
          });
        })
      });
    }else{
        show_msg(self.name+"试图逃跑",function(){
          show_msg("可是似乎并跑不过对方！！！\n——————对方追上来了！！！");
          enemy_round();
        });
    }
  });
}

function load_msg_box(){
  msgbox = main.createDiv('msgbox').setBox(460,50,700,100);
  msgbox.click(function(){
    if(count<start_msg.length){
        if(count==0){
          msgbox.text(enemy.to_my_string(start_msg[count]));
        }
        if(count==1){
          msgbox.text(self.to_my_string(start_msg[count]));
        }
        count++;
    }else{
      count = 0;
      msgbox.click(function(){});
      player.moveTo(-150,220,500,function(){
        player.hid();
        self.body.show();
        self.body.moveTo(150,220,500,function(){

          fight_menu.show();
          msgbox.hid();
          self.name_div.show();
          self.hp_num.obj.show();

          msgbox.click(function(){
            msgbox.hid();
            fight_menu.show();
          });

        });

      });
    }
  });
}

function show_msg(msg,func){
  fight_menu.hid();
  skillBox.hid();
  msgbox.text(msg);
  msgbox.show();
  if(func){
    msgbox.click(func);
  }else{
    msgbox.click(function(){
      msgbox.hid();
      fight_menu.show();
    });
  }
}


function enemy_round(){
  var num = Math.floor(Math.random()*4);
  var skill;
  skill = enemy.skills.list[num];
  msgbox.click(function(){
    if(enemy.hp.now==0){
      show_msg(enemy.name+"倒下了\n胜利者是"+self.name+"！！！");
      enemy.body.moveTo(800,-200,500,enemy.body.hid);
      msgbox.click(gameover);
      return;
    }
    skill.use();
    if(self.hp.now==0){
      show_msg(self.name+"倒下了\n胜利者是"+enemy.name+"！！！");
      self.body.moveTo(-150,600,500,self.body.hid);
      msgbox.click(gameover);
      return;
    }
    msgbox.click(function(){
      msgbox.hid();
      fight_menu.show();
    });
  });
}


function gameover(){
  var flag = confirm("游戏结束，是否重新开始？");
  if(flag){
    window.location.reload();
  }
}

function create_monster(n,enemy){
  switch(parseInt(n))
  {
  case -1:
    return Saozhu(enemy)
    break;
  case 0:
    return Ganggege(enemy);
    break;
  case 1:
    return Xiaoyima(enemy);
    break;
  case 2:
    return Chenzong(enemy);
    break;
  case 3:
    return Laoda(enemy);
    break;
  default:
    return Ganggege(enemy);
  }
}
