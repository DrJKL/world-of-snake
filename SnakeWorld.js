    function Cell(x, y) {
        this.x = x;
        this.y = y;
    }

    Cell.prototype.equals = function(other) {
        if (!(other.hasOwnProperty('x') && other.hasOwnProperty('y'))) {
            return false;
        }
        return (this.x == other.x && this.y == other.y);
    };

    Cell.prototype.pointOne = function() {
        return {
            x: (this.x * SWOptions.cellWidth),
            y: (this.y * SWOptions.cellWidth),
        };
    };
    Cell.prototype.pointTwo = function() {
        return {
            x: (this.x * SWOptions.cellWidth) + (SWOptions.cellWidth / 2),
            y: (this.y * SWOptions.cellWidth),
        };
    };
    Cell.prototype.pointThree = function() {
        return {
            x: (this.x * SWOptions.cellWidth) + (SWOptions.cellWidth),
            y: (this.y * SWOptions.cellWidth),
        };
    };
    Cell.prototype.pointFour = function() {
        return {
            x: (this.x * SWOptions.cellWidth),
            y: (this.y * SWOptions.cellWidth) + (SWOptions.cellWidth / 2),
        };
    };
    Cell.prototype.pointFive = function() {
        return {
            x: (this.x * SWOptions.cellWidth) + (SWOptions.cellWidth / 2),
            y: (this.y * SWOptions.cellWidth) + (SWOptions.cellWidth / 2),
        };
    };
    Cell.prototype.pointSix = function() {
        return {
            x: (this.x * SWOptions.cellWidth) + (SWOptions.cellWidth),
            y: (this.y * SWOptions.cellWidth) + (SWOptions.cellWidth / 2),
        };
    };
    Cell.prototype.pointSeven = function() {
        return {
            x: (this.x * SWOptions.cellWidth),
            y: (this.y * SWOptions.cellWidth) + (SWOptions.cellWidth),
        };
    };
    Cell.prototype.pointEight = function() {
        return {
            x: (this.x * SWOptions.cellWidth) + (SWOptions.cellWidth / 2),
            y: (this.y * SWOptions.cellWidth) + (SWOptions.cellWidth),
        };
    };
    Cell.prototype.pointNine = function() {
        return {
            x: (this.x * SWOptions.cellWidth) + (SWOptions.cellWidth),
            y: (this.y * SWOptions.cellWidth) + (SWOptions.cellWidth),
        };
    };

    /* The main function of the game.  Requires SnakeWorldOptions and Snake.*/
    function SnakeGame(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.snake = new Snake(this);
        this.food = this.getRandomCell();
        this.resetGameLoop();
        var inst = this;
        this.canvas.onkeydown = function(e) {
            inst.processKeyPress(e.keyCode);
        };
        this.canvas.focus();
        this.clearCanvas();
    }

    SnakeGame.prototype.getRandomCell = function() {
        return new Cell(
            Math.round(Math.random() * (this.width() - SWOptions.cellWidth) / SWOptions.cellWidth),
            Math.round(Math.random() * (this.height() - SWOptions.cellWidth) / SWOptions.cellWidth)
        );
    };

    SnakeGame.prototype.width = function() {
        return this.canvas.width;
    };

    SnakeGame.prototype.height = function() {
        return this.canvas.height;
    };

    SnakeGame.prototype.numCells = function() {
        return (this.height() / SWOptions.cellWidth) * (this.width() / SWOptions.cellWidth);
    };

    SnakeGame.prototype.percentOccupied = function() {
        var snakeLength = this.snake.body.length;
        var numCells = this.numCells();
        return snakeLength / numCells;
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
        return (cell.x > (this.width() / SWOptions.cellWidth) - 1 || //
            cell.y > (this.height() / SWOptions.cellWidth) - 1);
    };

    SnakeGame.prototype.paint = function() {
        this.clearCanvas();

        if (this.checkOutsideBounds(this.food)) {
            this.createFood();
        }

        var newHead = this.snake.getNewHead();
        if (newHead.equals(this.food)) {
            this.createFood();
        } else {
            this.snake.body.pop();
        }

        this.snake.body.unshift(newHead);

        // Paint Body
        for (var len = this.snake.body.length, i = len - 1; i >= 0; i--) {
            var cell = this.snake.body[i];
            var position = ((len - i) / len);
            var color = SWOptions.getTheme().getHslColor(position);
            if (i === 0) {
                this.paintCell(cell, color, 'triangle');
            } else {
                this.paintCell(cell, color);
            }
        }
        // Paint Head
        //this.paintCell(this.snake.body[0], this.snake.body.length, 'triangle');

        this.paintCell(this.food, 0, 'food');
        this.writeText();
    };

    SnakeGame.prototype.writeText = function() {
        if (!SWOptions.printInfo) {
            return;
        }
        var stats = { // Will be printed out in reverse order.
            "size:  ": this.snake.body.length,
            "turn:  ": SWOptions.randomness,
            "speed: ": SWOptions.speed,
            "wonk:  ": SWOptions.sizeVariation,
            "theme: ": SWOptions.currentTheme,
        };
        var boxHeight = ((Object.keys(stats).length + 1) * 10);
        this.context.fillStyle = "blue";
        this.context.fillRect(0, this.height() - boxHeight, 50, boxHeight);

        this.context.fillStyle = "white";
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
        this.context.fillStyle = (typeof color == 'string') ? color : theme[color % theme.length];

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
        this.context.fillRect(
            cell.x * SWOptions.cellWidth + SWOptions.getSizeMod(),
            cell.y * SWOptions.cellWidth + SWOptions.getSizeMod(),
            SWOptions.cellWidth + SWOptions.getSizeMod(),
            SWOptions.cellWidth + SWOptions.getSizeMod());
    };

    SnakeGame.prototype.circle = function(cell) {
        this.context.beginPath();
        this.context.arc(
            cell.x * SWOptions.cellWidth + SWOptions.cellWidth / 2,
            cell.y * SWOptions.cellWidth + SWOptions.cellWidth / 2,
            SWOptions.cellWidth / 2 + SWOptions.getSizeMod(),
            0,
            2 * Math.PI);
        this.context.fill();
        this.context.closePath();
    };

    SnakeGame.prototype.triangle = function(cell) {
        var loc, ptOne, ptTwo, ptThree;
        loc = {
            x: cell.x * SWOptions.cellWidth,
            y: cell.y * SWOptions.cellWidth,
        };
        switch (SWOptions.dirs[this.snake.currentDirection]) {
            case 'right':
                ptOne = cell.pointOne();
                ptTwo = cell.pointSix();
                ptThree = cell.pointSeven();
                break;
            case 'down':
                ptOne = cell.pointThree();
                ptTwo = cell.pointEight();
                ptThree = cell.pointOne();
                break;
            case 'left':
                ptOne = cell.pointNine();
                ptTwo = cell.pointFour();
                ptThree = cell.pointThree();
                break;
            case 'up':
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

    SnakeGame.prototype.pause = function() {
        var inst = this;
        this.gameLoop = this.gameLoop ? clearInterval(this.gameLoop) : setInterval(function() {
            inst.paint();
        }, SWOptions.getSpeedInterval());
    };

    SnakeGame.prototype.resetGameLoop = function() {
        if (typeof this.gameLoop != "undefined" && this.gameLoop !== null) {
            clearInterval(this.gameLoop);
        }
        var inst = this;
        this.gameLoop = setInterval(function() {
            inst.paint();
        }, SWOptions.getSpeedInterval());
    };

    SnakeGame.prototype.processKeyPress = function(keyCode) {
        switch (keyCode) {
            case 32:
            case "randomjump":
                this.snake.body[0] = this.getRandomCell();
                break;
            case 37:
            case "left":
                this.snake.move(0);
                break;
            case 38:
            case "up":
                this.snake.move(1);
                break;
            case 39:
            case "right":
                this.snake.move(2);
                break;
            case 40:
            case "down":
                this.snake.move(3);
                break;
            case 66:
            case "B":
                SWOptions.modRandomness(1);
                break;
            case 67:
            case "c":
                SWOptions.printInfo = !SWOptions.printInfo;
                break;
            case 74:
            case "j":
                SWOptions.modSizeVariation(1);
                break;
            case 75:
            case "k":
                SWOptions.modSizeVariation(-1);
                break;
            case 77:
            case "m":
                SWOptions.cycleTheme();
                break;
            case 78:
            case "n":
                SWOptions.cycleStyle();
                break;
            case 80:
            case "pause":
                this.pause();
                break;
        }
    };