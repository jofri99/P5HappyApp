let img1, img2, img3,img4,img5;
let picArr = [];
let picCArr = [];
let usedPicArr = [];
var screen = 0;
var y = 50;
var offSetY = 0;
var mousePosP;
var offSetOld;

function preload() {
  img1 = loadImage("images/essenQuadrat.jpg");
  img2 = loadImage("images/skateQuadrat.jpg");
  img3 = loadImage("images/autoQuadrat.jpg");
  img4 = loadImage("images/wandererQuadrat.jpg");
  img5 = loadImage("images/meditationQuadrat.jpg");
}

function setup() {
  picCArr.push(new Pic(img1, 0, 0, 0, 0,"Food"));
  picCArr.push(new Pic(img2, 0, 0, 0, 0,"Sport"));
  picCArr.push(new Pic(img3, 0, 0, 0, 0,"Car"));
  picCArr.push(new Pic(img4, 0, 0, 0, 0,"Hiking"));
  picCArr.push(new Pic(img5, 0, 0, 0, 0,"Meditation"));
  picCArr.push(new Pic(img1, 0, 0, 0, 0,"Food"));
  picCArr.push(new Pic(img2, 0, 0, 0, 0,"Sport"));
  //push all pictures in an Array as a Pic(Class)
  createCanvas(500, 750);
}

function mouseClicked() {
  switch (screen) {
    case 0:
      let d = dist(mouseX,mouseY,245,380);
      if(d<70){
        screen = 1;
      }
      break;
    case 1:
    //Check if 'Weiter' Button is clicked
      if(mouseX<150 && mouseX>50 && mouseY < 70 && mouseY > 20){
        screen = 2; 
      }
    //Check if a picture is clicked
      for (let i = 0; i < picCArr.length; i++) {
        if (mouseX > picCArr[i].X && mouseX < picCArr[i].X + picCArr[i].WIDTH &&
          mouseY > picCArr[i].Y && mouseY < picCArr[i].Y + picCArr[i].HEIGHT) {
          picClicked(i);
        }
      }
      break;
    case 2:
      break;
  }
}

function mousePressed() {
  mousePosP = mouseY;
  offSetOld = offSetY;
}

function mouseDragged() {
  var a = mousePosP - mouseY;
  offSetY = offSetOld;
  offSetY += a;
}


function draw() {
  clear();
  background(51);
  switch (screen) {
    case 0:
      circle(245,380,140);
      textSize(32);
      text('Wie war dein Tag?', 115, 390);
      break;
    case 1:
      x = 50;
      y = 100 + offSetY;

      if (y > 100) {
        offSetY -= 50;
      }

      if (y < (picArr.length * 60) * -1) {
        offSetY += 50;
      }
      for (let i = 0; i < picCArr.length; i++) {
        picCArr[i].X = x;
        picCArr[i].Y = y;
        picCArr[i].WIDTH = picCArr[i].PIC.width / 3;
        picCArr[i].HEIGHT = picCArr[i].PIC.height / 3;
        picCArr[i].show();
        if (x < 50 + picCArr[i].WIDTH / 3) {
          x += picCArr[i].WIDTH  + 30;
        } else {
          x = 50;
          y += picCArr[i].HEIGHT  + 30;
        }
      }
      rect(50 ,20,100,50);
      textSize(30);
      text('Weiter',55,55);
      break;
    case 2:
      rect(20, 20, 20, 20);
      break;
  }
}

function picClicked(i){
  print("A pic was clicked");
  usedPicArr.push(picCArr[i]);
  picCArr.splice(i,1);
}