class Matrix{
    
    constructor(rows,cols){
    this.rows = rows;
    this.cols = cols;
    this.data = [];
    
    for(var i = 0; i < this.rows; i++){
      //assign every row an array
      this.data[i] = [];
      for (var j = 0; j < this.cols; j++){
        //assign every column an array
        this.data[i][j] = 0;
      }
    }
    }
  
  //Takes in array and turns it into a matrix
  static fromArray(arr){
    var m = new Matrix(arr.length,1);
    for(var i = 0; i < arr.length; i++){
      m.data[i][0] = arr[i];
    }
    return m;
  }
  
  //Takes in a matrix and turns it into an array
  toArray(arr){
    var arr = [];
    for(var i = 0; i < this.rows; i++){
       for (var j = 0; j < this.cols; j++){
         //turn matrix into array
         arr.push(this.data[i][j]);
      }
    }
    return arr;
  }
  
  //Transposes a matrix
  transpose(){
    var result = new Matrix(this.cols,this.rows);
    for(var i = 0; i < this.rows; i++){
       for (var j = 0; j < this.cols; j++){
         //transpose values
         result.data[j][i] = this.data[i][j];
      }
    }
    return result;
  }
  
  //Randomise values of a matrix
  randomise(){
    for(var i = 0; i < this.rows; i++){
       for (var j = 0; j < this.cols; j++){
         //randomise every value between -1 and 1
         this.data[i][j] = Math.random() * 2 - 1;
      }
    }
  }
 
  //Adds value to each cell of a matrix or adds matrix to a matrix
  add(n){
    
    if(n instanceof Matrix){
          for(var i = 0; i < this.rows; i++){
       for (var j = 0; j < this.cols; j++){
         //add values elementwise
         this.data[i][j] += n.data[i][j];
      }
     }
    }else{
    
      for(var i = 0; i < this.rows; i++){
       for (var j = 0; j < this.cols; j++){
         //add values scalar
         this.data[i][j] += n;
      }
     }
    }
  }
  
  //Multiplies two matrices, returning the matrix product
  static multiply(a,b){
    var result = new Matrix(a.rows, b.cols);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        // Dot product of values in col
        var sum = 0;
        for (var k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    return result;
  }
  
  //Applies a function to every value in a matrix 
  map(func){
      for(var i = 0; i < this.rows; i++){
       for (var j = 0; j < this.cols; j++){
         var val = this.data[i][j];
           this.data[i][j] = func(val);
      }
    }
  }
}

