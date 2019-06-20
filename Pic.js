class Pic{
  constructor(pic,x,y,width,height,desc){
    this.X = x;
    this.Y = y;
    this.WIDTH = width;
    this.HEIGHT = height;
    this.PIC = pic;
    this.DESC = desc;
  }
  
  show(){
    image(this.PIC,this.X,this.Y,this.WIDTH,this.HEIGHT);
  }
}