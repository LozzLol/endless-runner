class Player{
  
  constructor(brain){
  this.y = height -12.5;
  this.x = 25;
  
  this.gravity = 1;
  this.velocity = 0;
  this.lift = -25;
      
  this.score = 0;
  this.fitness = 0;
  this.in = 1;
  this.hid = 2;
  this.out = 2;

      //If this object is created with a brain then copy it
      if(brain){
          this.brain = brain.copy();
      }else{
          //Otherwise make a new brain
            this.brain = new NeuralNetwork(this.in,this.hid,this.out);
      }

}
    
  show(){
    stroke(255);
    fill(25,255,25,50);
    ellipse(this.x,this.y,25,25);
  }
    
  mutate(player,rate){
      this.brain.mutate(player,rate,this.in,this.hid,this.out);
  }
  
  update(){
    //reward player for surviving
    this.score++;  
      
    this.velocity += this.gravity;
    this.y += this.velocity;
    
    if(this.y > height-12.5){
      this.y = height - 12.5;
      this.velocity = 0;
    }
  }
  
  //Predicts what it should do then either jumps or doesnt
  think(pipes){

      var closest = null;
      var closestD = Infinity;
      
      //Determine closest pipe
      for (var i = 0; i <pipes.length; i++){
          var d = pipes[i].x - this.x;
          if (d < closestD && d > 0){
              closest = pipes[i];
              closestD = d;
          }
      }
      var inputs = [];

      //X position of closest obstacle
      inputs[0] = closest.x / width;
      
      var output = this.brain.feedforward(inputs);
      if(output[1] > output[0]){
          this.jump();
      }
  }
  
  //Makes player jump if they are grounded
  jump(){
    if(this.y == height -12.5){
      this.velocity += this.lift;
    }
    
  }
  
}
