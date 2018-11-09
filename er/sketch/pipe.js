function pipe(){
  this.top = random(height/2);
  if(this.top < height/4){
    this.top +=height/4;
  }
  this.bottom = height;
  this.x = width;
  this.w = 100;
  this.speed = 7;
  
  //Check if the player has hit the pipe
  this.hits = function(player){
    if(player.y+12.5 > height - this.top){
      if(player.x > this.x && player.x < this.x + this.w){
              return true;
      }
    }
  }
  
  this.show = function(){
    fill(255);
    rect(this.x,height-this.top,this.w, this.top);
  }
  
  this.update = function(){
    this.x -= this.speed;
  }
  
  this.offscreen = function(){
    if (this.x < -this.w){
      return true;
    }else{
      return false;
    }
  }
}
