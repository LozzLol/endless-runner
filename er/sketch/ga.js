//variable that tracks the generation
var gen = 1;
//variable that tracks mutation rate
var rate = 1;

//Called when all players are eliminated in order to create a new generation
function nextGeneration(){
    gen++;
    
    //Change generation text in html
    document.getElementById("generation").innerHTML = gen;
    
    calculateFitness();
    generate();

}

//This generates a new population by selecting from current generation
function generate(){
    //Loop through all players
    for(var i = 0; i < TOTAL; i++){
    //Change each current player to a random saved one based on fitness
    players[i] = selection();
}
    //Clear the saved players
    savedPlayers = [];
}

//This function calculates the fitness for all the players
function calculateFitness(){
    //This is the sum of all players scores
    sum = 0;
    //This is the best fitness/score
    bestScore = 0;
    //This is the average fitness/score
    avgFitness = 0;
    
    //Calculate sum
    for (let player of savedPlayers){
    sum += player.score;
    }
    
    //Do this for all players
    for (let player of savedPlayers){
      //Make fitness exponential by squaring it
      player.fitness = Math.pow(player.fitness,2);
      //Normalise fitness
      player.fitness = player.score / sum;

        //Check if its the best fitness in the generation
        if(player.score > bestScore){
        bestScore = player.score;
        }
     }
    //Calculate average fitness of the generation
    avgFitness = sum/TOTAL;
    //Display stats
    document.getElementById("bestfitness").innerHTML = bestScore;
    document.getElementById("averagefitness").innerHTML = avgFitness;

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
    
    
    //Make a duplicate of the one that was selected
    var player = savedPlayers[index];
    var child = new Player(player.brain);
    
    //Mutate the child based on fitness of parent
    child.mutate(player);
    return child;
    
}