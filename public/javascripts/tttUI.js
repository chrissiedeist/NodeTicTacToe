(function(root){

  var TTT = root.TTT = ( root.TTT || {} );
  var socket = io.connect();

  var UI = TTT.UI = function(game, socket){
    this.game = game;
    this.socket = socket;
    this.board = game.board;
    this.createBoard();
    this.bindEventHandlers();

  }

  UI.prototype.createBoard = function() {
    _.each(this.board, function(row, i) {
        var $row = $('<div class="row"></div>');
      _.each(row, function(cell, j){
        $row.append('<div class="cell" data-pos=\"' + i + '_' + j + '\"></div>');
      }) 

      var $div = $("#ttt-board").append($row);
    })
  }

  UI.prototype.bindEventHandlers = function() {
    var ui = this;
    $('#ttt-board').on('click', 'div.cell', function(event) {
      var $selectedSquare = $(this)

      var data_pos = $(this).attr('data-pos');
      ui.socket.emit("move", { pos: data_pos });
    }) 
  }

  UI.prototype.makeMove = function($square){
    var pos = $square.attr('data-pos');
    pos = [parseInt(pos[0]), parseInt(pos[2])]

    if(this.game.makeMove(pos)) {
      $square.addClass(this.game.player);   

      if(this.game.isWon()) {
        alert(this.game.player + " is the winner!"); 
      }
    }

     
  }

  $(document).ready(function(){
    
    var game = new TTT.Game();
    var UI = new TTT.UI(game, socket);
    socket.on('move', function(data){
      $square = $("div[data-pos='" + data.pos + "'");
      UI.makeMove($square);
    }); 
  })


})(this)
