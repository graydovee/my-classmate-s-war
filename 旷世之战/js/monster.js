function Monster(name,body,skills,hp,name_div,hp_num){
  var obj = this;
  this.name = name;
  this.body = body;
  this.skills = skills;
  this.power = 10;
  this.defense = 0;
  this.hp = hp;
  this.state = 0;
  this.name_div = name_div;
  this.hp_num = hp_num;

  //攻击
  this.attack = function(monster,power){
    var damage = (obj.power - monster.defense);
    if(damage<1){
      damage = 1;
    }
    if(!power){
      power = 1;
    }
    monster.hp.change(damage*power);
  }

  //心里攻击
  this.attack_mind = function(monster,power){
    var damage = obj.power*power;
    if(damage>monster.hp.now){
      monster.hp.set(1);
    }else{
      monster.hp.change(damage*power);
    }
  }

  //攻击力减少
  this.weak = function(num){
    this.power-=num;
    if(this.power<=2){
      this.power = 2;
    }
  }

  //防御力减少
  this.fragile = function(num){
    this.defense -= num;
  }

  //眩晕
  this.vertigo = function(num){
    var temp = 0;
    if(num){
      temp = num;
    }
    if(num<0){
      this.state = num - 1;
    }else{
      this.state = this.state+num;
    }
  }

  this.clear_buff = function(){
    if(this.power>10){
      this.power = 10;
    }
    if(this.defense>0){
      this.defense = 0;
    }
    if(this.state<0){
      this.state = 0;
    }
  }

  this.clear_debuff = function(){
    if(this.power<10){
      this.power = 10;
    }
    if(this.defense<0){
      this.defense = 0;
    }
    if(this.state>0){
      this.state = 0;
    }
  }

  //判断是否死亡
  this.isdeath = function(){
    return obj.hp.now==0?true:false;
  }

  this.to_my_string = function(str){
    return str.replace('{%name%}',obj.name);
  }

}

//如果有hp_num是自己血条，否则是敌人血条
function HP(max,hp_num){
  var obj = this;
  this.max = max;
  this.now = max;

  this.bg_width = 140;
  this.bg_height = 9;

  this.position = [[125,185],[344,587]];
  if(hp_num){
    pos = 1;
    this.hp_num = hp_num;
  }else{
    pos = 0;
  }
  //创建血条背景
  this.bg = main.createDiv().setBox(this.position[pos][0],this.position[pos][1],this.bg_width,this.bg_height);
  this.bg.style.backgroundColor = '#F7FAAD';

  //创建血条
  this.hp_scoll = main.createDiv().setBox(this.position[pos][0],this.position[pos][1],this.bg_width,this.bg_height);
  this.hp_scoll.style.backgroundColor = '#BCF081';


  //设置血量
  this.set = function(num){
    if(num < 0){
      num = 0;
    }
    if(num > obj.max){
      num = obj.max;
    }
    obj.now = num;
    if(obj.now>0.6*obj.max){
      obj.hp_scoll.style.backgroundColor = '#BCF081'
    }else{
      obj.hp_scoll.style.backgroundColor = '#DD5044'
    }
    obj.hp_scoll.style.width = (num==0?0:(num*obj.bg_width)/obj.max)+'px';
    if(obj.hp_num){
      hp_num.update();
    }
  }

  //血量减少
  this.change = function(num){
    var hp = obj.now-num;
    obj.set(hp);
  }

}

function Skills(self_,enemy_){
  var obj = this;
  this.self_ = self_;
  this.enemy_ = enemy_;
  this.list = new Array();
  this.add_skill = function(skill_name,msg,effect){
    if(obj.list.length<=4){
      obj.list.push(new Skill(self_,enemy_,skill_name,msg,effect));
    }
  }
}

function Skill(self_,enemy_,skill_name,msg,effect){
  var obj = this;
  this.self_ = self_;
  this.enemy_ = enemy_;
  this.skill_name = skill_name;
  this.effect = effect;

  this.use = function(){
    if(self_.state<=0){
      if(self_.state<0){
        self_.state+=1;
      }
      show_msg(obj.self_.name+"使用了"+obj.skill_name+'!\n'+msg);
      effect(obj.self_,obj.enemy_);
    }else{
      self_.state -= 1;
      show_msg(obj.self_.name+"不能行动");
    }
  }
}

function HP_num(){
  var obj = this;

  this.obj = main.createDiv().setBox(360,600,140,30);
  this.obj.style.fontSize = "28px";

  this.update = function(){
    this.obj.text(this.hp.now+"/"+this.hp.max);
  }

  this.set_hp_object = function(hp){
    obj.hp = hp;
    obj.update();
  }
}
