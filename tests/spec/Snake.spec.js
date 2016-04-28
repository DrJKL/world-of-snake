define(["Snake", "SnakeGame"], function(Snake, SnakeGame) {
    describe("Snake", function() {
        var snake;
        var snakeGame;
        var canvas;
        beforeEach(function() {
            canvas = document.createElement('canvas');
            canvas.width = 960;
            canvas.height = 540;
            snakeGame = new SnakeGame(canvas);
            snake = new Snake(snakeGame);
        });
        it("should", function() {
            //
        });
    });
});
