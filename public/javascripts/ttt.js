(function(root) {
  
  var TTT = root.TTT = ( root.TTT || {} );

  var Game = TTT.Game = function() {
    this.board = this.setUpBoard();
    this.players = ['x', 'o'];
    this.player = this.players[0];
  }

  Game.prototype.checkDiagonals = function(){
    var that = this;
    var winner = false;

    var diagonalWins = [
      [[0,0],[1,1],[2,2]],
      [[0,2],[1,1],[2,0]]
    ]

    _.each(this.players, function(mark) {
      _.each(diagonalWins, function(positions) {
        if(that.threeAcross(positions, mark)){
          winner = mark;
        }
      }) 
    }) 
  }

  Game.prototype.checkRowsAndCols = function(){
    var that = this;
    var winner = false;

    _.each(this.players, function(mark){
      win = _.any([0, 1, 2], function(x){
        winningRow = _.all([0, 1, 2], function(y){
          that.posMarkedBy([x,y], mark);
        });
        winningCol =  _.all([0, 1, 2], function(y){
          that.posMarkedBy([x,y], mark);
        });
        return (winningRow || winningCol);
      })
      winner = win ? mark : false;
    })
    return winner;
  }

  Game.prototype.threeAcross = function(positions, player){
    var that = this;
    return _.all(positions, function(pos){
      that.posMarkedBy(pos, player);
    }) 
  }

  Game.prototype.isWon = function() {
    return this.checkDiagonals() || this.checkRowsAndCols;
  }

  Game.prototype.play = function() {
    if (!this.isWon()) {
      var pos = this.getMove();
      this.placeMark(pos);
      this.switchPlayers();
      this.play();
    }
  }

  Game.prototype.makeMove = function(pos) {
    if (this.empty(pos)) { 
      this.placeMark(pos) 
      this.switchPlayers(); 
      return true;
    } else { return false };
  }

  Game.prototype.placeMark = function(pos){
    if (this.empty(pos)){
      this.board[pos[0]][pos[1]] = this.player; 
    } 
  }

  Game.prototype.posMarkedBy = function(pos, mark){
    return (this.board[pos[0]][pos[1]] === mark);
  }

  Game.prototype.empty = function(pos){
    return this.board[pos[0]][pos[1]] === null; 
  }

  Game.prototype.setUpBoard = function(){
    var board = [];
    _.times(3, function(row) {
      var arr = [];
      _.times(3, function(col) {
        arr.push(null);
      })
      board.push(arr);
    }) 
    return board;
  }

  Game.prototype.switchPlayers = function() {
    return ((this.player = "x") ? "o" : "x")
  }


  var game = new Game();
  game.setUpBoard();
  game.placeMark([0,0], "x");
  console.log(game.board.toString());
  

  

})(this)


