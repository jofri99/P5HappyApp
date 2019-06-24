let img1, img2, img3,img4,img5,smileyHappy,smileyOK,smileySad;
let picArr = [];
let picCArr = [];
let usedPicArr = [];
var screen = 0;
var y = 50;
var offSetY = 0;
var mousePosP;
var offSetOld;
var dropzone;
var img=-1;
var input;
function preload() {
  img1 = loadImage("images/essenQuadrat.jpg");
  img2 = loadImage("images/skateQuadrat.jpg");
  img3 = loadImage("images/autoQuadrat.jpg");
  img4 = loadImage("images/wandererQuadrat.jpg");
  img5 = loadImage("images/meditationQuadrat.jpg");
  smileyHappy = loadImage("images/smiley_happy.png");
  smileyOK = loadImage("images/smiley_OK.png");
  smileySad = loadImage("images/smiley_sad.png");
}

function setup() {
  input = createInput();
  input.position(100,500);
  input.hide();
  dropzone = select('#dropzone');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unHighlight)
  dropzone.drop(handleFile);
  picCArr.push(new Pic(img1, 0, 0, 0, 0,"Essen"));
  picCArr.push(new Pic(img2, 0, 0, 0, 0,"Sport"));
  picCArr.push(new Pic(img3, 0, 0, 0, 0,"Auto"));
  picCArr.push(new Pic(img4, 0, 0, 0, 0,"Wandern"));
  picCArr.push(new Pic(img5, 0, 0, 0, 0,"Meditation"));
  picCArr.push(new Pic(img1, 0, 0, 0, 0,"Essen"));
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
    //Check if 'Aktivität hinzufügen' Button is clicked
    if(mouseX<470 && mouseX>270 && mouseY < 70 && mouseY > 20){
      screen = 3; 
      dropzone.style("visibility","visible");
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
        if(mouseX<170 && mouseX>20 && mouseY < 400 && mouseY > 250){
          writeData(usedPicArr,3);
          screen = 4;
        }else if(mouseX<330 && mouseX>180 && mouseY < 400 && mouseY > 250){
          writeData(usedPicArr,2);
          screen = 4;
        }else if(mouseX<490 && mouseX>340 && mouseY < 400 && mouseY > 250){
          writeData(usedPicArr,1);
          screen = 4;
        }
        break;
      
    
   
    case 3:
        if(mouseX<330 && mouseX>300 && mouseY < 525 && mouseY > 495){
         console.log(img);
         addActivity(img,input.value);
         input.value = '';
         input.hide();
         dropzone.style('visibility','hidden');
         screen = 1;
        }
        
        break;
    case 4:
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
      
      fill(255);
      rect(200,20,270,50);
      fill(0);
      textSize(30);
      text('Aktivität hinzufügen',205,55);

      fill(255)
      rect(50,20,100,50);
      textSize(30);
      fill(0);
      text('Weiter',55,55);

 
      break;
    case 2:
      fill(255);
      text("Wie hast du dich heute gefühlt?",50,50);
      image(smileyHappy,20,250,150,150);
      image(smileyOK,180,250,150,150);
      image(smileySad,340,250,150,150);
      break;
    case 3:
      input.show();
      
      fill(255, 255, 255, 255);
      textSize(20);
      text("Beschreibung",100,495)

      rect(300,495,30,30);
      fill(0,0,0,255);
      textSize(30);
      text("+",307,522);
      if(img != -1){
        image(img,100,100,img.width/2,img.height/2);
      }
        if(img.width != 500 || img.height != 500){
          fill(255, 255, 255, 255);
          text("500x500 Bild in Box legen.",100,100);
        }else
        {
          
        }
      break;
      case 4:
        text("Auswertung: ",100,100); 
        break;
  }
  
}

function picClicked(i){
  print("A pic was clicked");
  usedPicArr.push(picCArr[i].DESC);
  picCArr.splice(i,1);
}

function addActivity(img,desc) {
  if(img != -1){
    var newPic = new Pic(img,0,0,500/3,500/3,desc)
    picCArr.push(newPic);
    console.log(picCArr[picCArr.length-1]);
  }
}

const highlight = () => {
  dropzone.style('background-color','#ccc');
}

const unHighlight = () => {
  dropzone.style('background-color','#fff');
}



const handleFile = (file) => {
  unHighlight();
  img = createImg(file.data);
  img.hide();
  console.log(img);
}

