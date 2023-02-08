let ScreenHeight = 540;
let ScreenWidth = 960;
let time = 30;
let gameloop = 0;
let bugKills = 0;
let speed = 3;
let spritesheet;

function reset(){
  time = 30;
  bugKills = 0;
  gameloop = 0;
}

class Bug{
  constructor(spritesheet){
    this.spritesheet = spritesheet;
    this.height = 50;
    this.width = 50;
    this.alive = true;
    this.pressed = false;
    this.x = Math.floor(Math.random() * ((ScreenWidth - this.width/2) - this.width/2)) + (1 + (this.width/2));
    this.y = Math.floor(Math.random() * ((ScreenHeight - this.height/2) - this.height/2)) + (1 + (this.height/2));
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

    //rect(this.x, this.y, this.height, this.width);
    if(this.velX >0){
      push()
      scale(-1,1)
      this.updateSprite(-this.x);
      pop()
    }else if(this.velX <=0){
      this.updateSprite(this.x);
    }
  }

  updateSprite(x){
    //image(this.spritesheet,this.x,this.y,this.width,this.width,{x},0,40,40);

    if(this.alive){

    let frame = frameCount % 16;
    if(frame >=0 && frame <3){
      image(this.spritesheet,x,this.y,this.width,this.width,0,0,40,40);
    }else if(frame >=3 && frame <7){
      image(this.spritesheet,x,this.y,this.width,this.width,40,0,40,40);
    }
    else if(frame >=7 && frame <11){
      image(this.spritesheet,x,this.y,this.width,this.width,80,0,40,40);
    }
    else if(frame >=11 && frame <=15){
      image(this.spritesheet,x,this.y,this.width,this.width,0,0,40,40);
    }
    //image(this.spritesheet,this.x,this.y,this.width,this.width,0,0,40,40);
  }else{
    image(this.spritesheet,x,this.y,this.width,this.width,120,0,40,40);
  }
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
  spritesheet = loadImage("bee.png")
  for (let i = 0; i < bugs.length; i++) {
    bugs[i] = new Bug(spritesheet);
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
    if((mouseX > bugs[i].x - (bugs[i].width/2) && mouseX < bugs[i].x+(bugs[i].width/2)) && 
      (mouseY > bugs[i].y - (bugs[i].height/2) && mouseY < bugs[i].y+(bugs[i].height/2))){
        if(!bugs[i].pressed){
          speed = speed + 0.25;
          bugKills = bugKills + 1;
          document.getElementById("number").innerHTML = bugKills;
          bugs[i].pressed = true;
          bugs[i].alive = false;
          bugs[i].velX = 0;
          bugs[i].velY = 0;
        }
    setTimeout(()=>{
      bugs[i] = new Bug(spritesheet);
    }, 300)
  }
  }
}


let timer = setInterval(()=>{
  if(time > 0){
    document.getElementById("timer").innerHTML = time;
    time = time-1;
  }else{
    gameloop = 1;
    document.getElementById("timer").innerHTML = 0;
    clearInterval(timer);
    if( bugKills > localStorage.getItem('high-score')){
      localStorage.setItem('high-score', bugKills);
    }
  }
}, 1000)

if(localStorage.getItem('high-score') ===null){
  localStorage.setItem('high-score', 0);
}
