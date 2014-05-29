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
        $row.append('<div class="cell" data-pos=\"' + i + '_' + j + '\">');
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

      if(this.game.isWon() || this.game.over()) {
      
        var cellClass = (this.game.isWon()) ? this.game.player + "-won" : "tie"; 
        $('.cell').addClass(cellClass);
        $('#ttt-board').off('click', 'div.cell');
        $('#ttt-board').on('click', function(event){
          alert('The game has ended! Refresh both browsers to begin play again.'); 
        })

        var winMessage = "Player " + this.game.player + " is the winner!";
        var tieMessage = "It's a tie!";

        var message = (this.game.isWon()) ? winMessage : tieMessage;
        $('.messages').html("");
        alert(message);

      }
      
    }
  }



  $(document).ready(function(){
    
    var game = new TTT.Game();
    var UI = new TTT.UI(game, socket);
    var message = "Welcome to NodeTicTacToe! This game is built on a Node.js server to allow for asynchronous I/O between players in different locations. To test it out, navigate to this page in a second browser window. It may take a moment to establish the connection; the message below the board will let you know you're ready to play!"
    alert(message);
    $('.messages').html("Please wait while the connection between players is established.");
    socket.on('move', function(data){
      $square = $("div[data-pos='" + data.pos + "']");
      UI.makeMove($square);
    }); 
    socket.on('entrance', function(data) {
      alert(data.message);
      if(data.ready) { $('.messages').html("Click any square to begin!"); }
    });
    socket.on('move_attempt', function(data) {
      alert(data.message); 
    });
  })


})(this)
