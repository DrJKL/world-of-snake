    /* The main function of the game.  Requires SnakeWorldOptions and Snake.*/
    function SnakeGame(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.snake = new Snake(this);
        this.food = this.getRandomCell();
        this.resetGameLoop();
        this.canvas.onkeydown = function(e) {
            this.processKeyPress(e.keyCode);
        }.bind(this);
        this.canvas.focus();
        this.clearCanvas();
    }

    SnakeGame.prototype.getRandomCell = function() {
        var cellWidth = SWOptions.getCellWidth();
        return new Cell(
            Math.round(Math.random() * (this.width() - cellWidth) / cellWidth),
            Math.round(Math.random() * (this.height() - cellWidth) / cellWidth)
        );
    };

    SnakeGame.prototype.width = function() {
        return this.canvas.width;
    };

    SnakeGame.prototype.height = function() {
        return this.canvas.height;
    };

    SnakeGame.prototype.numCells = function() {
        var cellWidth = SWOptions.getCellWidth();
        return (this.height() / cellWidth) * (this.width() / cellWidth);
    };

    SnakeGame.prototype.percentOccupied = function() {
        var snakeLength = this.snake.body.length;
        var numCells = this.numCells();
        var percent = 100 * snakeLength / numCells;
        return percent.toFixed(2);
    };

    SnakeGame.prototype.createFood = function() {
        this.food = this.getRandomCell();
    };

    SnakeGame.prototype.clearCanvas = function() {
        this.context.fillStyle = SWOptions.background;
        this.context.fillRect(0, 0, this.width(), this.height());
        this.context.strokeStyle = SWOptions.border;
        this.context.strokeRect(0, 0, this.width(), this.height());
    };

    SnakeGame.prototype.checkOutsideBounds = function(cell) {
        var cellWidth = SWOptions.getCellWidth();
        return (cell.x > (this.width()  / cellWidth) - 1 //
             || cell.y > (this.height() / cellWidth) - 1);
    };

    SnakeGame.prototype.update = function() {
        this.checkCapacity();
        this.checkFoodInBounds();
        this.updateSnake();
        this.paint();
    };

    SnakeGame.prototype.checkCapacity = function() {
        if (this.percentOccupied() > 50) {
            SWOptions.shrinkCells();
        }
    };

    SnakeGame.prototype.checkFoodInBounds = function() {
        if (this.checkOutsideBounds(this.food)) {
            this.createFood();
        }
    };

    SnakeGame.prototype.updateSnake = function() {
        var newHead = this.snake.getNewHead();
        if (newHead.equals(this.food)) {
            this.createFood();
        } else {
            this.snake.body.pop();
        }
        this.snake.body.unshift(newHead);
    };

    SnakeGame.prototype.paint = function() {
        this.clearCanvas();
        this.paintSnake();
        this.paintCell(this.food, 0, 'food');
        this.paintStats();
    };

    SnakeGame.prototype.paintSnake = function() {
        for (var len = this.snake.body.length, i = len - 1; i >= 0; i--) {
            var cell = this.snake.body[i];
            var position = ((len - i) / len);
            var color = SWOptions.getTheme().getHslColor(position);
            if (i === 0) { // Head is always a triangle?
                this.paintCell(cell, color, 'triangle');
            } else {
                this.paintCell(cell, color);
            }
        }
    };

    SnakeGame.prototype.paintStats = function() {
        if (!SWOptions.printInfo) {
            return;
        }
        var stats = { // Will be printed out in reverse order.
            "percent: ": this.percentOccupied(),
            "render:  ": SWOptions.getStyle(),
            "size:    ": this.snake.body.length,
            "turn:    ": SWOptions.turnChance,
            "speed:   ": SWOptions.speed,
            "wonk:    ": SWOptions.sizeVariation,
            "theme:   ": SWOptions.currentTheme,
            "level:   ": SWOptions.cellWidth,
        };
        var boxHeight = ((Object.keys(stats).length + 1) * 10);
        this.context.fillStyle = "rgba(50,50,240,0.7)";
        this.context.fillRect(0, this.height() - boxHeight, 120, boxHeight);

        this.context.fillStyle = "white";
        this.context.font = "12px Consolas, Lucida Console, Monaco, Courier New, monospace";
        var height = this.height() - 5;
        for (var stat in stats) {
            if (stats.hasOwnProperty(stat)) {
                this.context.fillText(stat + stats[stat], 5, height);
                height -= 10;
            }
        }
    };

    SnakeGame.prototype.paintCell = function(cell, color, style) {
        if (typeof color == 'undefined') {
            color = 0;
        }
        if (typeof style == 'undefined') {
            style = SWOptions.getStyle();
        }
        var theme = SWOptions.getTheme();
        this.context.fillStyle = (typeof color == 'string')
            ? color
            : theme[color % theme.length];

        if (style == 'random') {
            style = SWOptions.getRandomStyle();
        }
        switch (style) {
            case 'circle':
                this.circle(cell);
                break;
            case 'square':
                this.square(cell);
                break;
            case 'triangle':
                this.triangle(cell);
                break;
            case 'food':
                this.paintFood(cell);
                break;
            default:
                console.log('unknown style');
                break;
        }
    };

    SnakeGame.prototype.square = function(cell) {
        var cellWidth = SWOptions.getCellWidth();
        this.context.fillRect(
            cell.x * cellWidth + SWOptions.getSizeMod(),
            cell.y * cellWidth + SWOptions.getSizeMod(),
            cellWidth + SWOptions.getSizeMod(),
            cellWidth + SWOptions.getSizeMod());
    };

    SnakeGame.prototype.circle = function(cell) {
        var cellWidth = SWOptions.getCellWidth();
        this.context.beginPath();
        this.context.arc(
            cell.x * cellWidth + cellWidth / 2,
            cell.y * cellWidth + cellWidth / 2,
            cellWidth / 2 + SWOptions.getSizeMod(),
            0,
            2 * Math.PI);
        this.context.fill();
        this.context.closePath();
    };

    SnakeGame.prototype.triangle = function(cell) {
        var cellWidth = SWOptions.getCellWidth();
        var loc = {
            x: cell.x * cellWidth,
            y: cell.y * cellWidth,
        };
        var ptOne, ptTwo, ptThree;
        switch (this.snake.currentDirection) {
            case Snake.Direction.RIGHT:
                ptOne = cell.pointOne();
                ptTwo = cell.pointSix();
                ptThree = cell.pointSeven();
                break;
            case Snake.Direction.DOWN:
                ptOne = cell.pointThree();
                ptTwo = cell.pointEight();
                ptThree = cell.pointOne();
                break;
            case Snake.Direction.LEFT:
                ptOne = cell.pointNine();
                ptTwo = cell.pointFour();
                ptThree = cell.pointThree();
                break;
            case Snake.Direction.UP:
                ptOne = cell.pointSeven();
                ptTwo = cell.pointTwo();
                ptThree = cell.pointNine();
                break;
        }
        this.context.beginPath();
        this.context.moveTo(ptOne.x, ptOne.y);
        this.context.lineTo(ptTwo.x, ptTwo.y);
        this.context.lineTo(ptThree.x, ptThree.y);
        this.context.lineTo(ptOne.x, ptOne.y);
        this.context.fill();
        this.context.closePath();
    };

    SnakeGame.prototype.paintFood = function(cell) {
        this.circle(cell);
    };

    SnakeGame.prototype.increaseSpeed = function() {
        SWOptions.modSpeed(1);
        this.resetGameLoop();
    };

    SnakeGame.prototype.pauseGame = function() {
        if (typeof this.gameLoop != "undefined" && this.gameLoop !== null) {
            this.gameLoop = clearInterval(this.gameLoop);
        }
    };
    SnakeGame.prototype.startGame = function() {
        this.gameLoop = setInterval(function() {
            this.update();
        }.bind(this), SWOptions.getSpeedInterval());
    };

    SnakeGame.prototype.pauseStart = function() {
        this.gameLoop
            ? this.pauseGame()
            : this.startGame();
    };

    SnakeGame.prototype.resetGameLoop = function() {
        this.pauseGame();
        this.startGame();
    };

    SnakeGame.prototype.processKeyPress = function(keyCode) {
        switch (keyCode) {
            case 32: // space
                this.snake.jump(this.getRandomCell());
                break;
            case 37: // left
            case 65: // a
                this.snake.move(Snake.Direction.LEFT);
                break;
            case 38: // up
            case 87: // w
                this.snake.move(Snake.Direction.UP);
                break;
            case 39: // right
            case 68: // d
                this.snake.move(Snake.Direction.RIGHT);
                break;
            case 40: // down
            case 83: // s
                this.snake.move(Snake.Direction.DOWN);
                break;
            case 66: // b
                SWOptions.modTurnChance(1);
                break;
            case 67: // c
                SWOptions.printInfo = !SWOptions.printInfo;
                break;
            case 74: // j
                SWOptions.modSizeVariation(1);
                break;
            case 75: // k
                this.increaseSpeed();
                break;
            case 77: // m
                SWOptions.cycleTheme();
                break;
            case 78: // n
                SWOptions.cycleStyle();
                break;
            case 80: // p
                this.pauseStart();
                break;
        }
    };