function Ganggege(enemy){
  var name,body,skills,hp,hp_num,name_div;
  name = '刚哥哥'
  body = main.createImg("img/ganggege.png")
  if(enemy){
    body.setBox(50,500,150,200);

    hp = new HP(100);

    name_div = main.createDiv(null,'name').setBox(75,60,120,30).addText(name);
  }else{
    body.setBox(220,-150,150,200);

    hp_num = new HP_num();
    hp = new HP(100,hp_num);
    hp_num.set_hp_object(hp);

    name_div = main.createDiv(null,'name').setBox(295,465,120,30).addText(name);
  }
  monster = new Monster(name,body,null,hp,name_div,hp_num);

  monster.load_skills = function(self_,enemy_){
    //ganggege
    skills = new Skills(self_,enemy_);
    skills.add_skill('瞪眼','对方感到了害怕，防御力降低了！',function(m1,m2){
        m2.fragile(5);
    });
    skills.add_skill('信不信砍你','对方感到害怕，攻击力降低了！',function(m1,m2){
      m2.weak(2);
    });
    skills.add_skill('学霸光环','自身全属性上升了，且恢复了少量生命！',function(m1,m2){
      m1.weak(-1);
      m1.fragile(-1);
      m1.hp.change(-10);
    });
    skills.add_skill('翻滚吧!包子','命中了对方！',function(m1,m2){
      m1.attack(m2,2);
    });
    self_.skills = skills;
  }

  monster.spacial = '学霸';

  return monster;
}

function Xiaoyima(enemy){
  var name,body,skills,hp,hp_num,name_div;
  name = '晓怡妈';
  body = main.createImg("img/xiaoyima.png");
  if(enemy){
    body.setBox(50,500,150,200);

    hp = new HP(100);

    name_div = main.createDiv(null,'name').setBox(75,60,120,30).addText(name);
  }else{
    body.setBox(220,-150,150,200);

    hp_num = new HP_num();
    hp = new HP(100,hp_num);
    hp_num.set_hp_object(hp);

    name_div = main.createDiv(null,'name').setBox(295,465,120,30).addText(name);
  }
  monster = new Monster(name,body,skills,hp,name_div,hp_num);

  monster.load_skills = function(self_,enemy_){
    //xiaoyima
    var skills = new Skills(self_,enemy_);
    skills.add_skill('屈辱','解除了自身负面状态！',function(m1,m2){
      m1.clear_debuff();
    });
    skills.add_skill('素质贼低','对方攻击大幅降低了！',function(m1,m2){
      m2.weak(3);
    });
    skills.add_skill('报警','召唤警车进行了攻击！效果拔群！',function(m1,m2){
      m1.attack(m2,3);
    });
    skills.add_skill('考试怎么这么差','对方防御降低了，且自身hp恢复到了一定百分比！但最大生命减少了',function(m1,m2){
      m2.fragile(1);
      var hp = Math.ceil(0.6 * 0.9 * m1.hp.max);
      if(hp>m1.hp.now){
        m1.hp.max = Math.ceil(0.9*m1.hp.max);
        m1.hp.set(hp);
      }

    });
    self_.skills = skills;
  }

  return monster;
}

function Chenzong(enemy){
  var name,body,skills,hp,hp_num,name_div;
  name = '陈总';
  body = main.createImg("img/chenzong.png");
  if(enemy){
    body.setBox(50,500,150,200);

    hp = new HP(100);

    name_div = main.createDiv(null,'name').setBox(75,60,120,30).addText(name);
  }else{
    body.setBox(220,-150,150,200);

    hp_num = new HP_num();
    hp = new HP(100,hp_num);
    hp_num.set_hp_object(hp);

    name_div = main.createDiv(null,'name').setBox(295,465,120,30).addText(name);
  }
  monster = new Monster(name,body,skills,hp,name_div,hp_num);

  monster.load_skills = function(self_,enemy_){
    //xiaoyima
    var skills = new Skills(self_,enemy_);
    skills.add_skill('睡午觉','自身回复了大量生命值！但是睡着了zzz',function(m1,m2){
      m1.hp.change(-50);
      m1.vertigo(1);
    });
    skills.add_skill('林丹之魂','自身全属性大量提升',function(m1,m2){
      m1.weak(-2);
      m1.fragile(-2)
    });
    skills.add_skill('钞能力','控制了对方，并且自身一回合免疫控制',function(m1,m2){
      m2.vertigo(1);
      m1.vertigo(-1);
      if(m2.hp.now < m2.hp.max/4){
        m2.hp.now = 0;
      }
    });
    skills.add_skill('野子','唱了一首歌，对方听后感到不适，全属性降低，并受到了伤害',function(m1,m2){
      m2.weak(1);
      m2.fragile(1);
      m1.attack(m2,1);
    });
    self_.skills = skills;
  }

  monster.spacial = '运动健将';

  return monster;
}

function Laoda(enemy){
  var name,body,skills,hp,hp_num,name_div;
  name = '范老大';
  body = main.createImg("img/laoda.png");
  if(enemy){
    body.setBox(50,500,150,200);

    hp = new HP(100);

    name_div = main.createDiv(null,'name').setBox(75,60,120,30).addText(name);
  }else{
    body.setBox(220,-150,150,200);

    hp_num = new HP_num();
    hp = new HP(100,hp_num);
    hp_num.set_hp_object(hp);

    name_div = main.createDiv(null,'name').setBox(295,465,120,30).addText(name);
  }
  monster = new Monster(name,body,skills,hp,name_div,hp_num);

  monster.load_skills = function(self_,enemy_){
    //xiaoyima
    var skills = new Skills(self_,enemy_);
    skills.add_skill('物理课代表','并且全属性提高了,且回复了一定hp',function(m1,m2){
      m1.weak(-1);
      m1.fragile(-1);
      m1.hp.change(-20);
    });
    skills.add_skill('老大的职责','自身防御力大幅度提升，若血量较少，还能回复少量生命',function(m1,m2){
      m1.fragile(-2)
      if(m1.hp.now < m1.hp.max/2){
        m1.hp.change(-10);
      }
    });
    skills.add_skill('收作业','清除了对方强化，并造成了少量伤害',function(m1,m2){
      m2.clear_buff();
      m1.attack(m2,1);
    });
    skills.add_skill('物理考试','对学渣造成了成吨的伤害',function(m1,m2){
      if(m2.spacial=='学霸'){
        show_msg("可惜对方是学霸，这次考试考了满分，自己受到了心理伤害");
        m2.attack_mind(m1,1);
      }else{
        m1.attack(m2,3.5);
      }
    });
    self_.skills = skills;
  }

  return monster;
}

function Saozhu(enemy){
  var name,body,skills,hp,hp_num,name_div;
  name = '骚猪';
  body = main.createImg("img/saozhu.png");
  if(enemy){
    body.setBox(50,500,150,200);

    hp = new HP(100);

    name_div = main.createDiv(null,'name').setBox(75,60,120,30).addText(name);
  }else{
    body.setBox(220,-150,150,200);

    hp_num = new HP_num();
    hp = new HP(100,hp_num);
    hp_num.set_hp_object(hp);

    name_div = main.createDiv(null,'name').setBox(295,465,120,30).addText(name);
  }
  monster = new Monster(name,body,skills,hp,name_div,hp_num);

  monster.load_skills = function(self_,enemy_){
    //xiaoyima
    var skills = new Skills(self_,enemy_);
    skills.add_skill('骚','不堪入目！！！对方收到了心理伤害',function(m1,m2){
      if(self.spacial=='光之巨人'){
        show_msg("在骚的时候不小心踩到了对方一脚");
        m1.attack(m2,1);
      }else{
        m1.attack_mind(m2,2);
      }
    });
    skills.add_skill('迪迦奥特曼',' ',function(m1,m2){
        var num = Math.floor(Math.random()*100);
        if(num<2 || m1.spacial=='光之巨人'){
          show_msg('竟然真的出现了迪迦奥特曼！！！\n————造成了极其恐怖的伤害！！！');
          m1.attack(m2,100);
        }else{
          show_msg(m1.name+'试图召唤迪加奥特曼对对方攻击\n————似乎什么也没发生');
        }
    });
    skills.add_skill('假面超人','',function(m1,m2){
        var num = Math.floor(Math.random()*100);
        if(num<5 || m1.spacial=='光之巨人'){
          show_msg('竟然真的出现了假面超人！！！\n————造成了非常恐怖的伤害！！！');
          m1.attack(m2,10);
        }else{
          show_msg(m1.name+'试图召假面超人对对方攻击\n————似乎什么也没发生');
        }
    });
    skills.add_skill('光之巨人','',function(m1,m2){
        var num = Math.floor(Math.random()*100);
        if(num<2 && m1.spacial!='光之巨人'){
          show_msg(self.name+'竟然真的变成了光之巨人！！！\n————身体产生了不知名的变化！！！');
          m1.weak(-100);
          m1.body.object.src='img/dijia.png';
          m1.spacial = '光之巨人';
        }else{
          show_msg(m1.name+'正在试图使用奥特曼变身器变成奥特曼\n————似乎什么也没发生');
        }
    });
    self_.skills = skills;
  }

  return monster;
}
