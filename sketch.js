let ScreenHeight = 540;
let ScreenWidth = 960;
let time = 30;
let gameloop = 0;
let bugKills = 0;
let speed = 3;

function reset(){
  time = 30;
  bugKills = 0;
  gameloop = 0;
}

class Bug{
  constructor(){
    this.height = 40;
    this.width = 40;
    this.x = Math.floor(Math.random() * (ScreenWidth - this.width/2));
    this.y = Math.floor(Math.random() * (ScreenHeight - this.height/2));
    this.velX = Math.random() < 0.5 ? -speed : speed;
    this.velY = Math.random() < 0.5 ? -speed : speed;
  }

  render(){

    if(this.x <= 0 + this.width/2 || this.x >(ScreenWidth - this.width/2)){
      this.velX = -this.velX
    }
    if(this.y <= 0 + this.height/2 || this.y >(ScreenHeight - this.height/2)){
      this.velY = -this.velY
    }

    this.x = this.x+this.velX;
    this.y = this.y+this.velY;

    rect(this.x, this.y, this.height, this.width);
  }
}


function setup() {
  createCanvas(ScreenWidth, ScreenHeight);
  frameRate(60);
  imageMode(CENTER);
  rectMode(CENTER);

}
let bugs = [];
bugs.length = 3;
function preload(){
  for (let i = 0; i < bugs.length; i++) {
    bugs[i] = new Bug();
  }
}

function draw() {
  background('lightgreen');
  switch (gameloop) {
    case 0:
      for (let i = 0; i < bugs.length; i++) {
        bugs[i].render();
      }
      break;
    case 1:
      push()
        textAlign(CENTER);
        textSize(32);
        text(`Your Score: ${bugKills}`, ScreenWidth/2, ScreenHeight/2);
      pop()
      push()
        textAlign(CENTER);
        textSize(16);
        text(`Highest Score: ${localStorage.getItem('high-score')}`, ScreenWidth/2, ScreenHeight/2+32);
      pop()      
      break;
  
    default:
      break;
  }
}
function mousePressed(){
  for (let i = 0; i < bugs.length; i++) {
    if((mouseX > bugs[i].x - bugs[i].width/2 && mouseX < bugs[i].x+bugs[i].width/2) && 
      (mouseY > bugs[i].y - bugs[i].height/2 && mouseY < bugs[i].x+bugs[i].height/2)){
    speed = speed + 0.25;
    bugKills = bugKills + 1;
    document.getElementById("number").innerHTML = bugKills;
    bugs[i] = new Bug();
  }
  }
}


let timer = setInterval(()=>{
  if(time > 0){
    document.getElementById("timer").innerHTML = time;
    time = time-1;
  }else{
    gameloop = 1;
    document.getElementById("buttonContainer").innerHTML = '<button>Play Again</button>'
    document.getElementById("timer").innerHTML = 0;
    console.log("finished")
    clearInterval(timer);
    if( bugKills > localStorage.getItem('high-score')){
      localStorage.setItem('high-score', bugKills);
    }
  }
}, 1000)

if(localStorage.getItem('high-score') ===null){
  localStorage.setItem('high-score', 0);
}
