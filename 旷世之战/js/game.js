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

function mainfunc(){
  main = new GameObject(document.getElementById('main'));
  main.asGameScreen();

  var start = main.createDiv('game-start').setBox(270,300,200,50);
  start.addText("开始游戏");
  start.click(function(){
    start.hid();
    choose_ch();
  });
}

function choose_ch(){
  var choose1,choose2;
  var c1,c2;

  var info = main.createDiv('game-start').setBox(170,250,200,50);
  info.addText("请选择己方");

  choose1 = main.createDiv('game-start').setBox(270,100,200,50);
  choose1.addText("刚哥哥");
  choose1.click(function(){
    if(!c1){
      c1 = 2;
      info.text("请选择敌方");
    }else{
      choose1.hid();
      choose2.hid();
      c2 = 2;
      game_load(c1,c2);
    }
  });
  choose2 = main.createDiv('game-start').setBox(270,400,200,50);
  choose2.addText("晓怡妈");
  choose2.click(function(){
    if(!c1){
      c1 = 1;
      info.text("请选择敌方");
    }else{
      choose1.hid();
      choose2.hid();
      c2 = 1;
      game_load(c1,c2);
    }
  });
}

function game_load(c1,c2){
  main.createImg("img/bg.jpg").setBox(0,0,main.gameScreenWidth,main.gameScreenHeight);

  //加载人物
    //玩家
  player = main.createImg("img/player.png").setBox(220,150,150,200);
    //自己
    if(c1==2){
      self = Ganggege(self);
    }else if(c1==1){
      self = Xiaoyima(self);
    }
    //敌人
    if(c2==2){
      enemy = Ganggege(self,1);
    }else if(c2==1){
      enemy = Xiaoyima(self,1);
    }

  var skills;


  skills = new Skills(enemy,self);
  enemy.skills = skills;
  enemy.load_skills();

  skills = new Skills(self,enemy);
  self.skills = skills;
  self.load_skills();

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
    show_msg("可是并没什卵用");
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

          msgbox.click(function(){
            msgbox.hid();
            fight_menu.show();
          });

        });

      });
    }
  });
}

function show_msg(msg){
  fight_menu.hid();
  skillBox.hid();
  msgbox.text(msg);
  msgbox.show();
}


function enemy_round(){
  var num = Math.floor(Math.random()*4);
  var skill;
  skill = enemy.skills.list[num];
  msgbox.click(function(){
    if(enemy.hp.now==0){
      show_msg("晓怡妈倒下了\n胜利者是刚哥哥！！！");
      enemy.body.moveTo(800,-200,500,enemy.body.hid);
      msgbox.click(gameover);
      return;
    }
    skill.use();
    if(self.hp.now==0){
      show_msg("刚哥哥倒下了！\n迷人的刚哥哥竟输给了晓怡妈！");
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
