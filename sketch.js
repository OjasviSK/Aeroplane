var fly="start";

var aeroplane, aeroplanei;
var obstacle, storm, bird;
var fire, firei;
var downArrowi, downarrow, upArrowi, uparrow;
var money, moneyi;
var obstacleGroup, moneyGroup, fireGroup;
var reset;
var salary=0;
var distance=0;

function preload(){

  aeroplanei=loadImage("aeroplane.png");
  firei=loadImage("fire.png");
  moneyi=loadImage("money.png");
  storm=loadImage("storm.png");
  bird=loadImage("bird.png");
  downArrowi=loadImage("downArrow.png");
  upArrowi=loadImage("upArrow.png");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  obstacleGroup=new Group();
  moneyGroup=new Group();
  fireGroup=new Group();

  aeroplane=createSprite(windowWidth/6,windowHeight/2,20,20);
  aeroplane.addImage(aeroplanei);
  aeroplane.scale=0.75;
//  aeroplane.debug=true;
  aeroplane.setCollider("rectangle",0,0,aeroplane.width,aeroplane.height);

}

function draw() {
  background("lightblue");

  fill="red";
  textSize=20;
  text("Distance = "+ distance + "km", windowWidth/3,windowHeight/10);
  text("You Have Earned = Rs." + salary,windowWidth/1.5,windowHeight/10);

  if(aeroplane.y>windowHeight){
    aeroplane.y=aeroplane.y-10;
  }
  if(aeroplane.y<windowHeight/windowHeight){
    aeroplane.y=aeroplane.y+10;
  }

  if(fly=="start"){
    
    if(mousePressedOver(uparrow)){
      aeroplane.velocityY=-7.5;
    }else if(mousePressedOver(downarrow)){
      aeroplane.velocityY=7.5;
    }else{
      aeroplane.velocityY=0;
    }
    if(frameCount%2==1){
      distance=distance+1
    }
    if(moneyGroup.isTouching(aeroplane)){
      moneyGroup.destroyEach();
      salary=salary+10;
    }

    disturb();
    earn();
  }  

  if(aeroplane.isTouching(obstacleGroup)){
    fly="end";
  }

  if(fly=="end"){
        
    obstacleGroup.setLifetimeEach(-1);
    moneyGroup.setLifetimeEach(-1);

    obstacleGroup.setVelocityXEach(0);
    moneyGroup.setVelocityXEach(0);

    aeroplane.velocityY=0;

    text("YOU HAVE TRAVELLED "+distance+"km AND EARNED Rs."+salary,windowWidth/2.3,windowHeight/5);
    text("CLICK HERE TO PLAY AGAIN",windowWidth/2.125,windowHeight/4);
    reset=createSprite(windowWidth/1.9,windowHeight/4,windowWidth/7,20);
    reset.visible=false;

    on_fire();

  }

  if(mousePressedOver(reset)){
    obstacleGroup.destroyEach();
    moneyGroup.destroyEach();
    fireGroup.destroyEach();
    aeroplane.y=windowHeight/2;
    fly="start";
  }

  arrow();
  drawSprites();

}

function earn(){

  var fc=Math.round(random(80,200));
  if(frameCount % fc == 0){
    money=createSprite(windowWidth+10,Math.round(random(windowHeight/10,windowHeight/1.25)),20,20);
    money.addImage(moneyi);
    money.scale=0.5;
    money.velocityX=-(2*5+distance/1000);
//    money.debug=true;
    money.setCollider("rectangle",0,0,money.width/1.5,money.height/1.5);
    moneyGroup.add(money);
  }
}

function disturb(){

  if(frameCount % 100 == 0){
    obstacle=createSprite(windowWidth+10,Math.round(random(windowHeight/10,windowHeight/1.25)),20,20);
    obstacle.velocityX=-(2*5+distance/1000);

    x=Math.round(random(1,2));
    if(x==1){
      obstacle.addImage(bird);
      obstacle.scale=0.25;
//      obstacle.debug=true;
      obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
      obstacle.lifetime = -(windowWidth*obstacle.velocityX);
    }else if(x==2){
      obstacle.addImage(storm);
      obstacle.scale = 1;
//      obstacle.debug=true;
      obstacle.setCollider("rectangle",0,-5,obstacle.width/1.5,obstacle.height/1.1);
      obstacle.lifetime = -(windowWidth*obstacle.velocityX);
    }
    obstacleGroup.add(obstacle);
  }
}

function on_fire(){

  fire=createSprite(windowWidth/10,windowHeight/2,20,20);
  fire.addImage(firei);
  fire.scale=0.9;
  fire.x=aeroplane.x;
  fire.y=aeroplane.y;
//  fire.debug=true;
  fire.setCollider("rectangle",0,0,fire.width/1.3,fire.height/1.3);
  fireGroup.add(fire);
}

function arrow(){

  uparrow=createSprite(windowWidth/15,windowHeight/3,20,20);
  uparrow.addImage(upArrowi);
  uparrow.scale=0.45;
//  uparrow.debug=true;
  uparrow.setCollider("rectangle",0,0,uparrow.width/2,uparrow.height);

  downarrow=createSprite(windowWidth/15,windowHeight/1.5,20,20);
  downarrow.addImage(downArrowi);
  downarrow.scale=0.35;
//  downarrow.debug=true;
  downarrow.setCollider("rectangle",0,0,downarrow.width,downarrow.height);
}