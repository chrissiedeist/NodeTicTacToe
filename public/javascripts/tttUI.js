(function(root){

  var TTT = root.TTT = ( root.TTT || {} );

  var tttUI = TTT.UI = function(game){
    this.board = game.board;
    this.createBoard();

  }

  tttUI.prototype.createBoard = function() {
    _.each(this.board, function(row) {
        var $div = $("#ttt-board").append('<div class="row">');
      _.each(row, function(col){
        $div.append('<div data-id="' + row + '_' + col + '">');
        
      }) 
    })
     
  }

  $(document).ready(function(){
    
    var game = new TTT.Game();
    var UI = new TTT.tttUI(game.board);

  
  })


})(this)
