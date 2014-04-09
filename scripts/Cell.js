define(["SnakeWorldOptions"], function(SWOptions) {
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
            x: (this.x * SWOptions.getCellWidth()),
            y: (this.y * SWOptions.getCellWidth()),
        };
    };
    Cell.prototype.pointTwo = function() {
        return {
            x: (this.x * SWOptions.getCellWidth()) + (SWOptions.getCellWidth() / 2),
            y: (this.y * SWOptions.getCellWidth()),
        };
    };
    Cell.prototype.pointThree = function() {
        return {
            x: (this.x * SWOptions.getCellWidth()) + (SWOptions.getCellWidth()),
            y: (this.y * SWOptions.getCellWidth()),
        };
    };
    Cell.prototype.pointFour = function() {
        return {
            x: (this.x * SWOptions.getCellWidth()),
            y: (this.y * SWOptions.getCellWidth()) + (SWOptions.getCellWidth() / 2),
        };
    };
    Cell.prototype.pointFive = function() {
        return {
            x: (this.x * SWOptions.getCellWidth()) + (SWOptions.getCellWidth() / 2),
            y: (this.y * SWOptions.getCellWidth()) + (SWOptions.getCellWidth() / 2),
        };
    };
    Cell.prototype.pointSix = function() {
        return {
            x: (this.x * SWOptions.getCellWidth()) + (SWOptions.getCellWidth()),
            y: (this.y * SWOptions.getCellWidth()) + (SWOptions.getCellWidth() / 2),
        };
    };
    Cell.prototype.pointSeven = function() {
        return {
            x: (this.x * SWOptions.getCellWidth()),
            y: (this.y * SWOptions.getCellWidth()) + (SWOptions.getCellWidth()),
        };
    };
    Cell.prototype.pointEight = function() {
        return {
            x: (this.x * SWOptions.getCellWidth()) + (SWOptions.getCellWidth() / 2),
            y: (this.y * SWOptions.getCellWidth()) + (SWOptions.getCellWidth()),
        };
    };
    Cell.prototype.pointNine = function() {
        return {
            x: (this.x * SWOptions.getCellWidth()) + (SWOptions.getCellWidth()),
            y: (this.y * SWOptions.getCellWidth()) + (SWOptions.getCellWidth()),
        };
    };
    return Cell;
});
