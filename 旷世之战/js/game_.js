window.onload = mainfunc;

//游戏画布
var main;

//血条
var hp_enemy,hp_self,hp_enemy_bg,hp_self_bg;

//自己和敌人
var player,self,enemy,my_hp;

//技能菜单及按钮
var skillBox,skill1,skill2,skill3,skill4;

//战斗菜单及按钮
var fight_menu,fight,run;

//消息栏
var msgbox;

//开始信息
var start_msg = ["野生的小姨妈跳了出来\n!!!","骚猪：就决定是你了！\n————刚哥哥！"]

var enemy_name = '小姨妈';
var self_name = '刚哥哥';

var count = 0;

//所有技能
var skills;

function mainfunc(){
  main = new GameObject(document.getElementById('main'));
  main.asGameScreen();

  var start = main.createDiv('game-start').setBox(270,300,200,50);
  start.addText("开始游戏");
  start.click(game_load);
}

function game_load(){
  main.createImg("img/bg.jpg").setBox(0,0,main.gameScreenWidth,main.gameScreenHeight);
  load_hp();
  load_man();
  load_skill();
  load_menu();
  load_msg_box();
  game_setting();
}

function load_hp(){

  hp_enemy_bg = main.createDiv();
  hp_enemy_bg.setBox(125,185,140,8);
  hp_enemy_bg.style.backgroundColor = '#F7FAAD';

  hp_self_bg = main.createDiv();
  hp_self_bg.setBox(344,587,140,8);
  hp_self_bg.style.backgroundColor = '#F7FAAD';

  hp_enemy = main.createDiv();
  hp_self = main.createDiv()

  hp_enemy.setBox(125,185,140,8);
  hp_enemy.style.backgroundColor = '#BCF081';

  hp_self.setBox(344,587,140,8);
  hp_self.style.backgroundColor = '#BCF081';

}

function load_man(){
  enemy = main.createImg("img/enemy.png");
  self = main.createImg("img/self.png");
  player = main.createImg("img/player.png");

  enemy.setBox(50,500,150,200);
  self.setBox(220,-150,150,200);
  player.setBox(220,150,150,200);

}

function load_skill(){
  load_skills();

  skillBox = main.createDiv();
  skillBox.setBox(440,70,250,150);
  skillBox.style.backgroundColor = '#FFFFFF';
  skillBox.style.border="5px solid #152900";
  skillBox.style.display = 'none';

  var temp;

  skill1 = skillBox.createDiv(null,"button").setBox(0, 0,100,50);
  temp = skill1.createDiv().addText("瞪眼");
  skill1.click(self.skill.s1);

  skill2 = skillBox.createDiv(null,"button").setBox(70,0,100,50);
  temp = skill2.createDiv().addText("信不信砍你");
  temp.style.fontSize = '20px';
  temp.style.paddingTop = '10px';
  skill2.click(self.skill.s2);

  skill3 = skillBox.createDiv(null,"button").setBox(0,120,100,50);
  temp = skill3.createDiv().addText("学霸光环");
  temp.style.fontSize = '20px';
  temp.style.paddingTop = '10px';
  skill3.click(self.skill.s3);

  skill4 = skillBox.createDiv(null,"button").setBox(70,120,100,50);
  temp = skill4.createDiv().addText("翻滚吧包子");
  temp.style.fontSize = '20px';
  temp.style.paddingTop = '10px';
  skill4.click(self.skill.s4);

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
        msgbox.text(start_msg[count]);
        count++;
    }else{
      count = 0;
      msgbox.click(function(){});
      player.moveTo(-150,220,500,function(){
        player.hid();
        self.show();
        self.moveTo(150,220,500,function(){

          fight_menu.show();
          msgbox.hid();
          my_hp.show();

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

function game_setting(){
  //设置最大生命和当前生命
  self.max_hp = 100;
  enemy.max_hp = 100;

  self.now_hp = self.max_hp;
  enemy.now_hp = enemy.max_hp;

  //显示血量值
  my_hp = main.createDiv().setBox(360,600,140,30);
  my_hp.text(self.now_hp+"/"+self.max_hp);
  my_hp.style.fontSize = "28px";
  my_hp.hid();

  //血量变化
  self.hp = hp_self;
  enemy.hp = hp_enemy;

  self.hp_change = function(num){
    var hp = self.now_hp-num;
    if(hp < 0){
      hp = 0;
    }
    if(hp > self.max_hp){
      hp = self.max_hp;
    }
    self.now_hp = hp;
    update_hp(self);
    my_hp.text(self.now_hp+'/'+self.max_hp);
  }

  enemy.hp_change = function(num){
    var hp = enemy.now_hp-num;
    if(hp < 0){
      hp = 0;
    }
    if(hp > enemy.max_hp){
      hp = enemy.max_hp;
    }
    enemy.now_hp = hp;
    update_hp(enemy);
  }

  self.attack = 10;
  enemy.attack = 10;

  self.defense = 0;
  enemy.defense = 0;
}

function load_skills(){
  //己方技能
  skills = new Object();
  skills.s1 = function(){
    show_msg("刚哥哥使用了瞪眼\n对方防御降低了！")
    enemy.defense -= 5;
    enemy_round();
  };
  skills.s2 = function(){
    show_msg("刚哥哥使用了信不信砍你\n对方感到害怕，攻击力降低了！")
    enemy.attack -= 2;
    if(enemy.attack<2){
      enemy.attack = 2;
    }
    enemy_round();
  }
  skills.s3 = function(){
    show_msg("刚哥哥使用了学霸光环\n自身全属性上升了，且恢复了少量生命！")
    self.defense += 1;
    self.attack += 1;
    self.hp_change(-10);
    enemy_round();
  }
  skills.s4 = function(){
    show_msg("刚哥哥使用了翻滚吧！包子\n命中了对方！")
    attack(self,enemy,2);
    enemy_round();
  }
  self.skill = skills;

  //敌方技能
  skills = new Object();
  skills.s1 = function(){
    show_msg("小姨妈使用了屈辱\n解除了自身负面状态！");
    if(enemy.attack<10){
      enemy.attack = 10;
    }
    if(enemy.defense<0){
      enemy.defense = 0;
    }
  }
  skills.s2 = function(){
    show_msg("小姨妈使用了素质贼低\n对方攻击大幅降低了！");
    self.attack -= 3;
  }
  skills.s3 = function(){
    show_msg("小姨妈使用了报警\n召唤警车进行了攻击！效果拔群！");
    attack(enemy,self,3);
  }
  skills.s4 = function(){
    show_msg("小姨妈使用了这次考试怎么这么差\n对方防御降低了，且自身hp恢复到了一定百分比！但最大生命减少了");
    self.defense -= 1;
    enemy.max_hp = 0.9*enemy.max_hp;
    var hp = 0.6 * enemy.max_hp;
    if(hp>enemy.now_hp)
    enemy.now_hp = hp;
    update_hp(enemy);
  }
  enemy.skill = skills;
}

function enemy_round(){
  var num = Math.floor(Math.random()*4);
  var skill;
  if(num==0){
    skill = enemy.skill.s1;
  }else if(num==1){
    skill = enemy.skill.s2;
  }else if(num==2){
    skill = enemy.skill.s3;
  }else{
    skill = enemy.skill.s4;
  }
  msgbox.click(function(){
    if(enemy.now_hp==0){
      show_msg("晓怡妈倒下了\n胜利者是刚哥哥！！！");
      enemy.moveTo(800,-200,500,enemy.hid);
      msgbox.click(gameover);
      return;
    }
    skill();
    if(self.now_hp==0){
      show_msg("刚哥哥倒下了！\n迷人的刚哥哥竟输给了晓怡妈！");
      self.moveTo(-150,600,500,self.hid);
      msgbox.click(gameover);
      return;
    }
    msgbox.click(function(){
      msgbox.hid();
      fight_menu.show();
    });
  });
}

function update_hp(obj){
  if(obj.now_hp>0.6*obj.max_hp){
    obj.hp.style.backgroundColor = '#BCF081'
  }else{
    obj.hp.style.backgroundColor = '#DD5044'
  }
  var max_width = parseInt(hp_enemy_bg.style.width);
  var hp = obj.now_hp;
  obj.hp.style.width = (hp==0?0:(hp*max_width)/obj.max_hp)+'px';
}

function attack(self_,enemy_,dmg){
  var damage = (self_.attack - enemy_.defense);
  if(damage<1){
    damage = 1;
  }
  enemy_.hp_change(damage*dmg);
}

function gameover(){
  var flag = confirm("游戏结束，是否重新开始？");
  if(flag){
    window.location.reload();
  }
}
