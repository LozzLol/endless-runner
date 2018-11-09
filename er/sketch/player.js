class Player{
  
  constructor(brain){
  this.y = height/2;
  this.x = 25;
  
  this.gravity = 1;
  this.velocity = 0;
  this.lift = -25;
      
  this.score = 0;
  this.fitness = 0;
  
      if(brain){
          this.brain = brain.copy();
      }else{
            this.brain = new NeuralNetwork(1,2,2);
      }

}
    
  
  show(){
    stroke(255);
    fill(255,50);
    ellipse(this.x,this.y,25,25);
  }
    
  mutate(player){
      this.brain.mutate(player);
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
    
  think(pipes){
      //find the closest pipe
      var closest = null;
      var closestD = Infinity;
      
      for (var i = 0; i <pipes.length; i++){
          var d = pipes[i].x - this.x;
          if (d < closestD && d > 0){
              closest = pipes[i];
              closestD = d;
          }
      }
      var inputs = [];
      //Y position of player
      //inputs[0] = this.y / height;
      //X position of obstacle
      inputs[0] = closest.x / width;
      //How tall obstacle is
      //inputs[1] = closest.top / height;

      //var inputs = [1.0,0.5,0.2,0.4];
      //console.log(inputs);
      var output = this.brain.feedforward(inputs);
      if(output[1] > output[0]){
          this.jump();
      }
  }
  
  jump(){
    if(this.y == height -12.5){
      this.velocity += this.lift;
    }
    
  }
  
}
