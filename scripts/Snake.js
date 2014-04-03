function Snake(gameInst) {
    this.currentDirection = 0;
    this.game = gameInst;
    this.create();
}
Snake.startingSize = 1;

Snake.Direction = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
};

Snake.prototype.create = function() {
    this.body = [];
    for (var i = Snake.startingSize; i > 0; i--) {
        this.body.push(new Cell(i,0));
    }
};

Snake.prototype.foodVisible = function(food) {
    var snakeHead = this.body[0];
    if (!snakeHead) {
        return false;
    }
    for (var i = 1, check_x, check_y; i <= 15; ++i) {
        check_x = snakeHead.x;
        check_y = snakeHead.y;
        switch (this.currentDirection) {
            case Snake.Direction.RIGHT:
                check_x += i;
                break;
            case Snake.Direction.LEFT:
                check_x -= i;
                break;
            case Snake.Direction.UP:
                check_y -= i;
                break;
            case Snake.Direction.DOWN:
                check_y += i;
                break;
        }
        if (food.x == check_x && food.y == check_y) {
            return true;
        }
    }
    return false;
};

Snake.prototype.getNewHead = function() {
    var foodSeen = this.foodVisible(this.game.food);
    var nx, ny, tries = 0;
    do {
        nx = this.body[0].x;
        ny = this.body[0].y;

        if ((Math.random() * 10) < SWOptions.turnChance && !foodSeen) {
            this.randomTurn();
        }
        switch (this.currentDirection) {
            case Snake.Direction.RIGHT:
                nx++;
                break;
            case Snake.Direction.DOWN:
                ny++;
                break;
            case Snake.Direction.LEFT:
                nx--;
                break;
            case Snake.Direction.UP:
                ny--;
                break;
        }

    } while (this.checkCollision(new Cell(nx,ny)) && ++tries < 20);

    if (tries == 20) {
        var randomTries = 0;
        var newLocation;
        do {
            newLocation = this.game.getRandomCell();
        } while (this.checkCollision(newLocation) && randomTries++ < 20);
        return newLocation; 
    }
    return new Cell(
        wrap(nx, (this.game.width() / SWOptions.getCellWidth())),
        wrap(ny, (this.game.height() / SWOptions.getCellWidth())));

};

Snake.prototype.randomTurn = function() {
    var newDirection = this.currentDirection + (Math.random() <= 0.5 ? -1 : 1);
    this.currentDirection = wrap(newDirection, 4);
}

Snake.prototype.move = function(direction) {
    this.currentDirection = wrap(direction, 4);
};

Snake.prototype.jump = function(cell) {
    this.body[0] = cell;
};

Snake.prototype.checkCollision = function(cell) {
    for (var i = 0, len = this.body.length; i < len; i++) {
        if (this.body[i].equals(cell)) {
            return true;
        }
    }
    return false;
}