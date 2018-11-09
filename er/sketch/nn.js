class NeuralNetwork{
    
  constructor(in_nodes,hid_nodes,out_nodes){
      
      if (in_nodes instanceof NeuralNetwork) {
      let a = in_nodes;
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;

      this.weights_ih = a.weights_ih;
      this.weights_ho = a.weights_ho;

      this.bias_h = a.bias_h;
      this.bias_o = a.bias_o;
   
    } else {

  this.input_nodes = in_nodes;
  this.hidden_nodes = hid_nodes;
  this.output_nodes = out_nodes;
  
  //Weights between input layer and hidden layer
  this.weights_ih = new Matrix(this.hidden_nodes,this.input_nodes);
  //Weights between hidden layer and output layer
  this.weights_ho = new Matrix(this.output_nodes,this.hidden_nodes);
  this.weights_ih.randomise();
  this.weights_ho.randomise();
  
  //Create biases
  this.bias_h = new Matrix(this.hidden_nodes,1);
  this.bias_o = new Matrix(this.output_nodes,1);
  this.bias_h.randomise();
  this.bias_o.randomise();  
    }
  }

  // Adding function for neuro-evolution
  copy() {
    return new NeuralNetwork(this);
  }
    
  mutate(player) {
    // This is how we adjust weights ever so slightly
        //Randomly check if this should be mutated
      var rate = 1/(player.fitness*100);
      //console.log(rate);
      if (Math.random() < rate) {
       //console.log('MUTATE DEM BABIES');
       player.brain = new NeuralNetwork(1,2,2);
      } 
  }
    
  //Feedforward function
  feedforward(input_array){
      
    // Generating the Hidden Outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // activation function!
    hidden.map(sigmoid);

    // Generating the output's output!
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);
    
    // Sending back to the caller!
    return output.toArray();

  }
  
}

function sigmoid(x){
    return 1 / (1 + Math.exp(-x));
}