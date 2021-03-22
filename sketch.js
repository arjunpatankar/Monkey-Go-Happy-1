//Gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_Collide;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;

function preload(){
  //load the Animation
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  //load the Images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_Collide = loadImage("sprite_1.png");
 }

function setup() {
  createCanvas(600,350);
  
  //create group for banana and obstacle
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  //creating monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //create the ground
  ground = createSprite(400,350,1500,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
  score = 0;
  survialTime = 0;
 }

function draw() {
  
  background ("lightblue");
  
  //displaying survialTime
  stroke("black");
  fill("black");
  textSize(15);
  text("Survial Time : "+  survialTime, 100, 50);
  
  //displaying Score
  stroke("black");
  fill("black");
  textSize(15);
  text("Score : "+  score, 300, 50);
  
 //Make monkey collide with ground
  monkey.collide(ground);

  if(gameState === PLAY){
    //change the monkey's animation
      monkey.changeAnimation("running", monkey_running);
    
    survialTime = Math.ceil(frameCount/frameRate());
     
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
    
    //when space key is pressed monkey will jump
    if(keyDown("space") && monkey.y >= 235){
        monkey.velocityY = -12;
    }    
    
    if(monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score = score+1;
    }
    
  monkey.velocityY = monkey.velocityY + 0.8;
  
  obstacleGroup.setLifetimeEach(-1);
  
  bananas();
  obstacles();
    
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
    }
  }
   if (gameState === END) {
     ground.velocityX = 0;
     
    monkey.y = 315;
    monkey.scale = 0.1;
     
    monkey.changeAnimation("collide", monkey_Collide);
     
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    survialTime.visible = false;
     
    stroke("red");
    fill("red");
    textSize(30);
    text("GameOver", 220, 200);
   }
 
   drawSprites();
}

function bananas() {
  if (frameCount % 90 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.lifetime = 100;
    obstacle.scale = 0.1;
     obstacleGroup.add(obstacle);
  }
 }

//var, function preload)(){}, loadAnimation(), loadImage(), function setup(){}, createCanvas(), createGroup(), createSprite(), addAnimation(), scale, velocityX, x, width/2, function draw(){}, background(), stroke(), fill(), textSize(), text(), collide(), changeAnimation(), Math.ceil(), frameCount, frameRate(), if(), keyDown(), y, velocityY, isTouching(), destroyEach(), setLifetimeEach(), setVelocityXEach(), visible, drawSprite(), function bananas(){}, Math.round(), random(), lifetime, add(), function obstacles(){}