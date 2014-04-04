(function(root){

  var TTT = root.TTT = ( root.TTT || {} );

  var UI = TTT.UI = function(game){
    this.game = game;
    this.board = game.board;
    this.createBoard();
    this.bindEventHandlers();

  }

  UI.prototype.createBoard = function() {
    _.each(this.board, function(row, i) {
        var $row = $('<div class="row"></div>');
      _.each(row, function(cell, j){
        $row.append('<div class="cell" data-pos=\"' + i + '_' + j + '\">null</div>');
      }) 

      var $div = $("#ttt-board").append($row);
    })
  }

  UI.prototype.bindEventHandlers = function() {
    var ui = this;
    $('#ttt-board').on('click', 'div.cell', function(event) {
      var $selectedSquare = $(this)
      ui.makeMove($selectedSquare);

      $(this).addClass(ui.game.player);
    }) 
  }

  UI.prototype.makeMove = function($square){
    var pos = $square.attr('data-pos');
    var pos = [pos[0], pos[2]]
    alert(pos); 
    if(this.game.makeMove(pos)) {
      $square.addClass(this.game.player);   

      if(this.game.isWon()) {
        alert(this.game.player + " is the winner!"); 
      }
    }

     
  }

  $(document).ready(function(){
    
    var game = new TTT.Game();
    var UI = new TTT.UI(game);

  
  })


})(this)
