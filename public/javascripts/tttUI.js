(function(root){

  var TTT = root.TTT = ( root.TTT || {} );

  var UI = TTT.UI = function(game){
    this.board = game.board;
    this.createBoard();
    this.bindEventHandlers();

  }

  UI.prototype.createBoard = function() {
    _.each(this.board, function(row, i) {
        var $div = $("#ttt-board").append('<div class="row">row</div>');
      _.each(row, function(cell, j){
        var $el = $div.append('<div class="cell" data-pos=\"' + i + '_' + j + '\">null</div>');
         

      }) 
    })
  }
  UI.prototype.bindEventHandlers = function() {
    $('#ttt-board').on('click', 'div.cell', function(event) {
      var pos = $(this).attr('data-pos');
      alert(pos); 
    }) 
  }

  UI.prototype.addListeners = function() {

  
  }

  $(document).ready(function(){
    
    var game = new TTT.Game();
    var UI = new TTT.UI(game);

  
  })


})(this)
