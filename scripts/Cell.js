define(['SnakeWorldOptions'], function (SWOptions) {
	function Cell (x, y) {
		this.x = x;
		this.y = y;
	}

	Cell.prototype.equals = function ({x , y}) {
		return (this.x == x && this.y == y);
	};

	Cell.prototype.x_one = function () {
		return this.x * SWOptions.getCellWidth();
	};
	Cell.prototype.y_one = function () {
		return this.y * SWOptions.getCellWidth();
	};
	Cell.prototype.half_cell = function () {
		return SWOptions.getCellWidth() / 2;
	};
	Cell.prototype.full_cell = function () {
		return SWOptions.getCellWidth();
	};
	let xy = function (x, y) {
		return {x,y};
	};

	Cell.prototype.pointOne = function () {
		return xy(this.x_one(), this.y_one());
	};
	Cell.prototype.pointTwo = function () {
		return xy(
			this.x_one() + this.half_cell(),
			this.y_one());
	};
	Cell.prototype.pointThree = function () {
		return xy(
			this.x_one() + this.full_cell(),
			this.y_one());
	};
	Cell.prototype.pointFour = function () {
		return xy(
			this.x_one(),
			this.y_one() + this.half_cell());
	};
	Cell.prototype.pointFive = function () {
		return xy(
			this.x_one() + this.half_cell(),
			this.y_one() + this.half_cell());
	};
	Cell.prototype.pointSix = function () {
		return xy(
			this.x_one() + this.full_cell(),
			this.y_one() + this.half_cell());
	};
	Cell.prototype.pointSeven = function () {
		return xy(
			this.x_one(),
			this.y_one() + this.full_cell());
	};
	Cell.prototype.pointEight = function () {
		return xy(
			this.x_one() + this.half_cell(),
			this.y_one() + this.full_cell());
	};
	Cell.prototype.pointNine = function () {
		return xy(
			this.x_one() + this.full_cell(),
			this.y_one() + this.full_cell());
	};
	return Cell;
});
