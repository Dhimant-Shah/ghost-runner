var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
 ghost = createSprite(300,300)
  ghost.addImage(ghostImg);
  ghost.scale = 0.4
  
  doorsGroup = new Group ();
  climbersGroup = new Group ();
  invisibleBlockGroup = new Group ();
}

function draw(){
  background(0);
  
  if(gameState==="play") {
    if (tower.y>400) {
      tower.y=300
    }
    if(keyDown("space")) {
    
      ghost.velocityY=-5
    }
    ghost.velocityY=ghost.velocityY+0.5
    
    if(keyDown("left")) {
    
      ghost.velocityX=-3
    }
    
    if(keyDown("right")) {
    
      ghost.velocityX=3
    }
    
    spawnDoors();
    
    if (invisibleBlockGroup.isTouching(ghost)){
      ghost.velocityY = 0
      ghost.velocityX=0
      gameState= "end"
    }

    
}
  if(gameState==="end") {
    stroke("yellow")
    fill("yellow")
    text("Game Over",230,250)
    doorsGroup.setVelocityYEach(0)
    climbersGroup.setVelocityYEach(0)
    invisibleBlockGroup.setVelocityYEach(0)
    
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    tower.destroy();
  }
  
  
  drawSprites();
  

}

function spawnDoors() {
  //write code here to spawn the doors in the tower

  if(frameCount%240===0) {
    var door = createSprite (200,-50)
    door.addImage(doorImg)
    
    var climber = createSprite (200,10)
    climber.addImage(climberImg)
    
    var invisibleBlock = createSprite(200,15,climber.width,2)

    
    door.x = Math.round(random(120,400))
    door.velocityY = 1
    
    climber.x=door.x
    climber.velocityY=1
    invisibleBlock.x=door.x
    invisibleBlock.velocityY=1
    
    door.lifetime = 800
    climber.lifetime=800
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth=door.depth
    ghost.depth+=1
    
  
  }
  
  
}

