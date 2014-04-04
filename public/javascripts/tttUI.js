(function (root) {
  var TTT = root.TTT = (root.TTT || {});
  var socket = io.connect();

  var UI = TTT.UI = function (game, $el, socket) {

    this.socket = socket;
    this.game = game;
    this.$el = $el;
  };

  UI.prototype.bindEvents = function () {
    var ui = this;

    // install a handler on the `li` elements inside the board.
    var that = this;
    this.$el.on('click', 'li', function (event) {
//      ui.makeMove($(this));

      var data_pos = $(this).attr('data-pos');
      that.socket.emit("move", { pos: data_pos });
    });
  };

  UI.prototype.getPosition = function ($square) {
    return _.map($square.attr('data-pos').split('_'), function (el) {
      return parseInt(el, 10);
    });
  };

  UI.prototype.makeMove = function ($square) {
    var pos = this.getPosition($square);
    var player = this.game.player;

    if (this.game.move(pos)) {
      $square.addClass(player);

      if (this.game.over()) {
        this.$el.off('click');

        var winner = this.game.winner();
        if (winner) {
          this.$el.addClass('winner-' + winner);
        } else {
          this.$el.addClass('over');
        }
      }
    } else {
      alert('Invalid move! Try again.');
    }
  };

  UI.prototype.play = function () {
    this.setupBoard();
    this.bindEvents();
  };

  UI.prototype.setupBoard = function () {
    var html = '';

    _.times(3, function (rowNum) {
      _.times(3, function (colNum) {
        var pos = '' + rowNum + '_' + colNum;
        html += '<li data-pos="' + pos + '"></li>';
      });
    });

    this.$el.append(html);
  };

  $(document).ready(function() {
    var game = new TTT.Game();
    var $el = $("#ttt-board");
    console.log(game);
    var UI = new TTT.UI(game, $el, socket);
    UI.play();
    socket.on('move', function(data){

        $square = $("li[data-pos='" + data.pos + "'");
        UI.makeMove($square);
    });

  })
})(this);
