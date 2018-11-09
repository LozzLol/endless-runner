const TOTAL = 100;
var players = [];
var savedPlayers = [];
var pipes = [];
var counter = 0;
var counter2 = 0;
var cycles = 1;
var lifeTime = 100;

function setup() {
createCanvas(window.innerWidth,400);
    
    for(var i = 0; i < TOTAL; i++){
        players[i] = new Player();
    }
counter2 = lifeTime;
//testing

}

function draw() {


    //GAME LOGIC
    for (let n = 0; n < cycles;n++){
    if(counter % 60 ==0){
    pipes.push(new pipe());
  }
        
    counter++;
    
    //Loop through array backwards
  for (var i = pipes.length-1; i >= 0; i--){
    //Update pipes position
    pipes[i].update();
    
    for (var j = players.length-1; j>=0; j--)  
      {
    //If pipe hits player
    if (pipes[i].hits(players[j])){
      savedPlayers.push(players[j]);
        players.splice(j,1);
    }
      }
    //If pipe is offscreen then delete it
    if(pipes[i].offscreen()){
      pipes.splice(i,1);
    }
  }
  
  //Update then show players
  for (i = 0; i < players.length; i++){
  players[i].think(pipes);
  players[i].update();
  }

  //Lifetime counter
  if(frameCount % 10 ==0){
    counter2--;
        //Countdown then reset
        if(counter2 <= 0){
            forceResetGame();
        }
  }
        
  if(players.length == 0){
      resetGame();
  }
    }
  //DRAWING
    
  background(100);
  for (let player of players){
      player.show();
  }
    
  for (let pipe of pipes){
      pipe.show();
  }

}

function resetGame(){
      counter = 0;
      counter2 = lifeTime;
      nextGeneration();
      pipes = [];
}

function forceResetGame(){
      for (var j = players.length-1; j>=0; j--)  
                {
                   //Save players
                   savedPlayers.push(players[j]);
                   players.splice(j,1);
                }
      resetGame();
}

function updateSlider(value){
    cycles = value;
}

/*function keyPressed(){
  
  // If space is pressed
  if (key==' '){
    p.jump();
  }
}*/
