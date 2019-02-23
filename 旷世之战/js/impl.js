function Ganggege(monster,enemy){
  var name,body,skills,hp,hp_num;
  name = '刚哥哥'
  body = main.createImg("img/self.png")
  if(enemy){
    body.setBox(50,500,150,200);
  }else{
    body.setBox(220,-150,150,200);
  }
  skills = new Skills();
  if(enemy){
    hp = new HP(100);
  }else{
    hp_num = new HP_num();
    hp = new HP(100,hp_num);
    hp_num.set_hp_object(hp);
  }
  monster = new Monster(name,body,skills,hp);
  skills.self_ = monster;

  monster.load_skills = function(){
    //ganggege
    skills = monster.skills;
    skills.add_skill('瞪眼','对方感到了害怕，防御力降低了！',function(m1,m2){
        m2.defense -= 5;
    });
    skills.add_skill('信不信砍你','对方感到害怕，攻击力降低了！',function(m1,m2){
      m2.power -= 2;
      if(m2.power<2){
        m2.power = 2;
      }
    });
    skills.add_skill('学霸光环','自身全属性上升了，且恢复了少量生命！',function(m1,m2){
      m1.defense += 1;
      m1.power += 1;
      m1.hp.change(-10);
    });
    skills.add_skill('翻滚吧!包子','命中了对方！',function(m1,m2){
      m1.attack(m2,2);
    });

    monster.skills = skills;
  }

  return monster;
}

function Xiaoyima(monster,enemy){
  var name,body,skills,hp,hp_num;
  name = '晓怡妈';
  body = main.createImg("img/enemy.png");
  if(enemy){
    body.setBox(50,500,150,200);
  }else{
    body.setBox(220,-150,150,200);
  }
  skills = new Skills();
  if(enemy){
    hp = new HP(100);
  }else{
    hp_num = new HP_num();
    hp = new HP(100,hp_num);
    hp_num.set_hp_object(hp);
  }
  monster = new Monster(name,body,skills,hp);
  skills.self_ = monster;

  monster.load_skills = function(){
    //xiaoyima
    skills = monster.skills;
    skills.add_skill('屈辱','解除了自身负面状态！',function(m1,m2){
      if(m1.power<10){
        m1.power = 10;
      }
      if(m1.defense<0){
        m1.defense = 0;
      }
    });
    skills.add_skill('素质贼低','对方攻击大幅降低了！',function(m1,m2){
      m2.power -= 3;
    });
    skills.add_skill('报警','召唤警车进行了攻击！效果拔群！',function(m1,m2){
      m1.attack(m2,3);
    });
    skills.add_skill('考试怎么这么差','对方防御降低了，且自身hp恢复到了一定百分比！但最大生命减少了',function(m1,m2){
      m2.defense -= 1;
      var hp = Math.ceil(0.6 * 0.9 * m1.hp.max);
      if(hp>m1.hp.now){
        m1.hp.max = Math.ceil(0.9*m1.hp.max);
        m1.hp.set(hp);
      }
    });

    monster.skills = skills;

  }

  return monster;
}
