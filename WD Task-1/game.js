let headDirection = {x:0 , y:0};
let remainingTime = 30;
let snakeSpeed = 5;
let previousRenderTime = 0;
let gameScore=0;
let snakeArray= [{x:11,y:11}];
let food1={x:0,y:0};
let food2={x:0,y:0};
let food3={x:0,y:0};
let food4={x:0,y:0};
let x=0;
let a=1;
let b=20;
let snakeMoving=false;
food1={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
food2={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
food3={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
food4={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};


function main(ctime){
  window.requestAnimationFrame(main);
  //console.log(ctime);
  if((ctime-previousRenderTime)/1000 < (1/snakeSpeed)){
    return;
  }
  else{
    previousRenderTime=ctime;
    gameFunction();
    //console.log("main loop works");
  }
}

function snakeDead(snakeArray){
  for(let l=1;l<snakeArray.length;l++){
    if (snakeArray[0].x===snakeArray[l].x && snakeArray[0].y===snakeArray[l].y){
      return true;
    }
  }
  if (snakeArray[0].x>=21 || snakeArray[0].x<=0 || snakeArray[0].y>=21 || snakeArray[0].y<=0){
    return true;
  }
}


setInterval(updateCountdownn,1000);

const countDown= document.getElementById("timer");
function updateCountdownn(){
  if(snakeMoving){
    if(remainingTime>0){
      remainingTime--;
      countDown.innerHTML="REMAINING TIME : "+remainingTime;
    }
    else{
      headDirection={x:0 , y:0};
      alert("Game over , press any key to play again");
      snakeMoving=false;
      snakeArray= [{x:11,y:11}];
      remainingTime=30;
      timer.innerHTML="REMAINING TIME : "+remainingTime;
      gameScore=0;
      score.innerHTML="SCORE : "+gameScore;
      let a=1;
      let b=20;
      food1={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food2={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food3={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food4={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
    }
  }
}

function gameFunction(){


  if(snakeDead(snakeArray)){
    headDirection={x:0 , y:0};
    alert("Game over , press any key to play again");
    snakeArray= [{x:11,y:11}];
    snakeMoving=false;
    remainingTime=30;
    timer.innerHTML="REMAINING TIME : "+remainingTime;
    gameScore=0;
    score.innerHTML="SCORE : "+gameScore;
    let a=1;
    let b=20;
    food1={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
    food2={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
    food3={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
    food4={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
  }

  if (snakeArray[0].x===food1.x && snakeArray[0].y===food1.y){
    food1=0;
  }

  if (snakeArray[0].x===food2.x && snakeArray[0].y===food2.y){
    if (food1===0){
      food2=0;
    }
    else {
      headDirection={x:0 , y:0};
      alert("Game over , press any key to play again");
      snakeMoving=false;
      let a=1;
      let b=20;
      food1={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food2={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food3={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food4={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      snakeArray= [{x:11,y:11}];
      gameScore=0;
      score.innerHTML="SCORE : "+gameScore;
      remainingTime=30;
      timer.innerHTML="REMAINING TIME : "+remainingTime;
    }
  }

  if (snakeArray[0].x===food3.x && snakeArray[0].y===food3.y){
    if (food1===0 && food2===0){
      food3=0;
    }
    else {
      headDirection={x:0 , y:0};
      alert("Game over , press any key to play again");
      snakeMoving=false;
      remainingTime=30;
      timer.innerHTML="REMAINING TIME : "+remainingTime;
      let a=1;
      let b=20;
      food1={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food2={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food3={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food4={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      snakeArray= [{x:11,y:11}];
      gameScore=0;
      score.innerHTML="SCORE : "+gameScore;
    }
  }

  if (snakeArray[0].x===food4.x && snakeArray[0].y===food4.y){
    if (food1===0 && food2===0 && food3===0){
      gameScore += 1;
      score.innerHTML="SCORE : "+gameScore;
      remainingTime+=10;
      if (gameScore>hiScore){
        hiScore=gameScore;
        localStorage.setItem("highScore",JSON.stringify(hiScore));
        leaderBoard.innerHTML = "HIGHSCORE : "+hiScore;
      }
      if (snakeArray.length<=3){
        snakeArray.unshift({x:snakeArray[0].x + headDirection.x, y:snakeArray[0].y + headDirection.y});
      }
      let a=1;
      let b=20;
      food1={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food2={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food3={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food4={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
    }
    else {
      headDirection={x:0 , y:0};
      alert("Game over , press any key to play again");
      snakeMoving=false;
      let a=1;
      let b=20;
      food1={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food2={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food3={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      food4={x:Math.round((a+(b-a)*Math.random())),y:Math.round((a+(b-a)*Math.random()))};
      snakeArray= [{x:11,y:11}];
      gameScore=0;
      score.innerHTML="SCORE : "+gameScore;
      remainingTime=30;
      timer.innerHTML="REMAINING TIME : "+remainingTime;
    }
  }


  for (let i= snakeArray.length - 2 ; i>=0 ; i--){
    snakeArray[i+1]={...snakeArray[i]};
  }

  snakeArray[0].x=(snakeArray[0].x + headDirection.x);
  snakeArray[0].y=(snakeArray[0].y + headDirection.y);


  board.innerHTML = "";
  snakeArray.forEach((e,index)=>{
    snakeElement=document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index == 0){
      snakeElement.classList.add("snakeHead");
    }
    else{
      snakeElement.classList.add('snakeBody');
    }
    board.appendChild(snakeElement);
  })

food1Element=document.createElement("div");
food1Element.style.gridRowStart = food1.y;
food1Element.style.gridColumnStart = food1.x;
food1Element.classList.add('food1');
board.appendChild(food1Element);


food2Element=document.createElement("div");
food2Element.style.gridRowStart = food2.y;
food2Element.style.gridColumnStart = food2.x;
food2Element.classList.add('food2');
board.appendChild(food2Element);

food3Element=document.createElement("div");
food3Element.style.gridRowStart = food3.y;
food3Element.style.gridColumnStart = food3.x;
food3Element.classList.add('food3');
board.appendChild(food3Element);

food4Element=document.createElement("div");
food4Element.style.gridRowStart = food4.y;
food4Element.style.gridColumnStart = food4.x;
food4Element.classList.add('food4');
board.appendChild(food4Element);
}

let highScore= localStorage.getItem("highScore");
if (highScore===null){
  hiScore =0 ;
  localStorage.setItem("highScore",JSON.stringify(hiScore));
}
else{
  hiScore= JSON.parse(highScore);
  leaderBoard.innerHTML = "HIGHSCORE : "+hiScore;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown",e=>{
  headDirection={x:0,y:1}
  switch (e.key){
    case "ArrowUp":
      //console.log("up");
      snakeMoving=true;
      headDirection.x=0;
      headDirection.y=-1;
      break;

    case "ArrowDown":
      snakeMoving=true;
      //console.log("down");
      headDirection.x=0;
      headDirection.y=1;
      break;

    case "ArrowLeft":
      snakeMoving=true;
      //console.log("left");
      headDirection.x=-1;
      headDirection.y=0;
      break;

    case "ArrowRight":
      snakeMoving=true;
      //console.log("right");
      headDirection.x=1;
      headDirection.y=0;
      break;
  }
})