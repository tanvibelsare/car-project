const startContainer=document.querySelector('.start');
const gameContainer=document.querySelector('.game');
const scoreContainer=document.querySelector('.score');
const scoreId=document.querySelector('#score-id')
let score=0
let carPosition={
   x:0,
   y:0,
   speed:5
}
let player={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false
}
function isCollide(a , b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !(
      aRect.bottom < bRect.top ||
      aRect.top > bRect.bottom ||
      aRect.right < bRect.left ||
      aRect.left > bRect.right
    );
  }
function moveEnemy() {
    let ele = document.querySelectorAll(".enemy");
    ele.forEach(function (item) {
      if (false) {
         endGame();
      }
      if (item.y >= 1500) {
        item.y = -600;
        item.style.left = Math.floor(Math.random() * 350) + "px";
        item.style.backgroundColor = 'blue';
      }
      item.y += 3;
      item.style.top = item.y + "px";
    });
  }
function moveLine(){
    const lines=document.querySelectorAll('.line')
    lines.forEach(line => {
        var top=line.offsetTop;
        const gameContainerDatails=gameContainer.getBoundingClientRect();
        if(line.offsetTop>gameContainerDatails.bottom){
           top=0;
        }
        line.style.top = top + carPosition.speed+'px';

    });
}
function playGame(milliseconds){
    moveLine();
    moveEnemy();
   //to move a car
   const gameContainerDatails=gameContainer.getBoundingClientRect();
    
      if(player.ArrowUp&&carPosition.y>gameContainerDatails.top){
           carPosition.y-=carPosition.speed;
       }
       if(player.ArrowDown&& carPosition.y<gameContainerDatails.bottom-200){
           carPosition.y+=carPosition.speed;
       }

       if(player.ArrowRight &&carPosition.x<gameContainerDatails.right-505){
        carPosition.x+=carPosition.speed;
    }

       if(player.ArrowLeft && carPosition.x>0){
           carPosition.x-=carPosition.speed;
       }
      score++;
      scoreId.textContent=score;
      const car =  document.querySelector('.car');
     car.style.top = carPosition.y+'px';
     car.style.left = carPosition.x+'px';
    window.requestAnimationFrame(playGame);
    //we can creat animation loop(form a recursive function)
}
function endGame() {

    player.startGame = false;
    scoreId.innerHTML = "Game Over<br>Score was " + player.scoreId;
    startContainer.classList.remove("hide");
  }
function startGame(){
 //hide the start container
 startContainer.classList.add('hide');
//  startContainer.setAttribute('class','hide')
player.startGame=true;
//creat car
const car=document.createElement('div')
car.setAttribute('class','car')
//add this car in game container
gameContainer.appendChild(car)
//to get offsets offset of car
const carTop=car.offsetTop;
const carLeft = car.offsetLeft;

carPosition.y=carTop;
carPosition.x = carLeft;


//creat line
var top=0;
for(var i=0;i<4;i++){
    const line=document.createElement('div')
    line.classList.add('line')
    line.style.top=top+'px';
    gameContainer.appendChild(line)
    top+=150;
}
//creat enemy
window.requestAnimationFrame(playGame)
for (let x = 0; x < 3; x++) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.innerHTML = "<br>" + (x + 1);
    enemy.y = ((x + 1) * 600) * -1;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = Math.floor(Math.random() * 350) + "px";
    enemy.style.backgroundColor = 'purple';
    gameContainer.appendChild(enemy);

}
}
function handleKeyUp(event){
    //event tell us that which key press
    event.preventDefault();
    player[event.key]=true;//event.key =[upkey]
}
function handleKeyDown(event){
    event.preventDefault();
    player[event.key]=false;
}
 document.addEventListener("keyup",handleKeyUp)
 document.addEventListener("keydown",handleKeyDown)
//add event listner on start container
startContainer.addEventListener("click",startGame)
