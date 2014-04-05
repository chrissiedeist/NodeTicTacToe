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

    function alertMove(event){
      var $selectedSquare = $(this)
      var data_pos = $(this).attr('data-pos');
      ui.socket.emit("move", { pos: data_pos });
    }

    $('#ttt-board').on('click', 'div.cell', alertMove);
  }

  UI.prototype.makeMove = function($square){
    var pos = $square.attr('data-pos');
    pos = [parseInt(pos[0]), parseInt(pos[2])]
    
    var lastPlayer = this.game.player === "x" ? "x" : "o";
    if(this.game.makeMove(pos)) {
      $('.messages').html("Player " + lastPlayer + ", your move!");  
      $square.addClass(this.game.player);   

      if(this.game.isWon()) {
        $('.messages').html("Player " + this.game.player + " is the winner!");  
        $('cell').addClass('over');
        $('#ttt-board').off('click', 'div.cell');
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
    socket.on('entrance', function(data) {
      $('.messages').html(data.message);  
    });
  })


})(this)
