var gen = 1;
var rate = 0;
function nextGeneration(){
      gen++;  
    
document.getElementById("generation").innerHTML = gen;
calculateFitness();
generate();

}

function generate(){
    for(var i = 0; i < TOTAL; i++){
    //Change each current player to a random saved one based on fitness
    players[i] = selection();
}
    savedPlayers = [];
}

function calculateFitness(){
    sum = 0;
    bestFitness = 0;
    bestScore = 0;
    avgFitness = 0;
    
  for (let player of savedPlayers){
  sum += player.score;
  }
    
  //Normalise fitness
  for (let player of savedPlayers){
    //Make fitness exponential
    player.fitness = Math.pow(player.fitness,2);
    player.fitness = player.score / sum;

      //Check if its the best fitness in the generation
      if(player.score > bestScore){
      bestScore = player.score;
      }
  }
    avgFitness = sum/TOTAL;
document.getElementById("bestfitness").innerHTML = bestScore;
document.getElementById("averagefitness").innerHTML = avgFitness;
    //Set mutation rate based on how well they are doing
    rate = 1;
    //console.log('Mutation rate: '+rate);

}

function selection(){
     
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be picked since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= savedPlayers[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;
    

    //console.log(savedPlayers[index].fitness);
    
    //Make a duplicate of the one that was selected
    var player = savedPlayers[index];
    var child = new Player(player.brain);
    child.mutate(player);
    return child;
    
}