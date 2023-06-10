let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext("2d");
let playerX = 0;
let playerY = 0;
let playerDown = 0;
let playerUp = 0;
let playerRight = 0;
let playerLeft = 0;
let velocity = canvas.width * 0.005;
let playerProjectiles = [];
let enemiesArray=[];
let playerWidth = canvas.width * 0.05;
let playerHeight = canvas.height * 0.05;
let lastEnemySpawnTime = 0;
let enemySpawnInterval = 5000;
let playerHealth=1000;
let homeBaseHealth=10000;
let homeBaseX=canvas.width/2-canvas.width*0.075;
let homeBaseY=canvas.height-canvas.height*0.175;
let homeBaseW=canvas.width*0.15;
let homeBaseH=canvas.height*0.1;



class Projectile {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = "blue";
    context.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

class Enemy {
  constructor(x, y,w,h,health) {
    this.x = x;
    this.y = y;
    this.w=w;
    this.h=h;
    this.health=health;
  }

  draw() {
    context.fillStyle = "brown";
    context.fillRect(this.x,this.y,this.w,this.h);
  }

  update() {
    this.draw();
    this.x=this.x;
    this.y=this.y+ canvas.height*0.0002;
  }
}

function main(ctime) {
  window.requestAnimationFrame(main);
  gameFunction();
}

function gameFunction() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  player();
  homeBase();
  playerProjectiles.forEach((projectile, index) => {
    projectile.update();

    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      playerProjectiles.splice(index, 1);
    }

    for(let i=0;i<enemiesArray.length;i++){
      if( 
        projectile.x + projectile.radius > enemiesArray[i].x && 
        projectile.x - projectile.radius < enemiesArray[i].x + enemiesArray[i].w &&
        projectile.y + projectile.radius > enemiesArray[i].y &&
        projectile.y - projectile.radius < enemiesArray[i].y + enemiesArray[i].h
        ){
          enemiesArray.splice(i,1);
        }
    }
  });

  enemiesArray.forEach((enemy,index)=>{
    enemy.update();
    if(enemy[1]>canvas.height){
      enemiesArray.splice(index,1);
    }

    for (let i=0;i<enemiesArray.length;i++){
      //console.log(enemiesArray[i]);
      //console.log(playerX);
      if(enemiesArray[i].x>playerX && 
        enemiesArray[i].x<(playerX+playerWidth) && 
        (enemiesArray[i].y+enemiesArray[i].h) > playerY && 
        playerY + playerHeight>enemiesArray[i].y)
      {
        enemiesArray.splice(i,1);
        playerHealth-=50;
        if(playerHealth==0){
          location.reload();
          alert("gameover");
        }
        //console.log(playerHealth);
      }
      
      if(enemiesArray[i].x>homeBaseX && 
        enemiesArray[i].x<(homeBaseX+homeBaseW) && 
        (enemiesArray[i].y+enemiesArray[i].h) > homeBaseY && 
        (homeBaseY + homeBaseH)>enemiesArray[i].y)
      {
        enemiesArray.splice(i,1);
        homeBaseHealth-=50;
        if(homeBaseHealth==0){
          location.reload();
          alert("gameover");
        }
      }
    }
  })
  let currentTime = performance.now();
  if (currentTime - lastEnemySpawnTime >= enemySpawnInterval) {
    enemies();
    lastEnemySpawnTime = currentTime;
  }
}

function player() {
  context.fillStyle = "black";
  context.fillRect(playerX, playerY, playerWidth, playerHeight);
  window.addEventListener("keydown", function (key) {
    if (key.code == "ArrowRight") {
      playerRight = velocity;
    }
    if (key.code === "ArrowLeft") {
      playerLeft = -velocity;
    }
    if (key.code === "ArrowDown") {
      playerDown = velocity;
    }
    if (key.code === "ArrowUp") {
      playerUp = -velocity;
    }
  });

  window.addEventListener("keyup", function (key) {
    if (key.code === "ArrowRight") {
      playerRight = 0;
    }
    if (key.code === "ArrowLeft") {
      playerLeft = 0;
    }
    if (key.code === "ArrowDown") {
      playerDown = 0;
    }
    if (key.code === "ArrowUp") {
      playerUp = 0;
    }
  });

  
  if((playerX+playerWidth)>=homeBaseX && !((playerX+playerWidth/2)>(homeBaseX+homeBaseW))&& playerY<=(homeBaseY+homeBaseH) && (playerY+ playerHeight ) >= homeBaseY){
    playerX=playerX-playerWidth/100;
  }
  else if((playerX+playerWidth)>=canvas.width){
    playerX=playerX;
  }
  else{
    playerX += playerRight;
  }

  if(playerX<=(homeBaseX+homeBaseW) && !((playerX+playerWidth)<(homeBaseX+homeBaseW/2)) &&playerY<=(homeBaseY+homeBaseH) && (playerY+playerHeight) >= homeBaseY){
    playerX=playerX + playerWidth/100;
  }
  else if((playerX<=0)){
    playerX=playerX;
  }
  else{
    playerX += playerLeft;
  }

  if(playerY<=(homeBaseY+homeBaseH) && !((playerY+playerHeight)<(homeBaseY+homeBaseH/2)) && playerX<=(homeBaseX+homeBaseW) && (playerX+playerWidth)>=homeBaseX){
    playerY=playerY+playerHeight/100;
  }
  else if(playerY<=0){
    playerY=playerY;
  }
  else{
    playerY+=playerUp;
  }
  
  if((playerY+playerHeight)>=homeBaseY && playerX<=(homeBaseX+homeBaseW) && (playerX+playerWidth)>=homeBaseX){
    playerY=playerY;
  }
  else if((playerY+playerWidth)>=canvas.height){
    playerY=playerY;
  }
  else{
    playerY += playerDown;
  }

  window.addEventListener("click", function (click) {
    let playerProjectileAngle = Math.atan2(
      click.clientY - playerY,
      click.clientX - playerX
    );
    let playerProjectileVelocity = {
      x: 10*Math.cos(playerProjectileAngle),
      y: 10*Math.sin(playerProjectileAngle)
    };
    playerProjectiles.push(
      new Projectile(playerX + playerWidth / 2, playerY + playerHeight / 2, 5, playerProjectileVelocity)
    );
  });
}

function homeBase(){
  context.fillStyle="green";
  context.fillRect(homeBaseX,homeBaseY,homeBaseW,homeBaseH);
}

function enemies(){
  let enemyX=Math.floor(Math.random()*(canvas.width+1));
  let enemyY=0;  
  let enemySize=Math.floor(Math.random()*(canvas.width*0.05-canvas.width*0.025+1));
  let enemyWidth=enemySize;
  let enemyHeight=enemySize;
  enemiesArray.push(new Enemy(enemyX,enemyY,enemyWidth,enemyHeight));
}

window.requestAnimationFrame(main);