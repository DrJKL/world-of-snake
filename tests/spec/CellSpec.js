define(["Cell"], function(Cell) {
    describe("Cell", function() {
        describe(".equals", function() {
            it("should equal another cell with the same coordinates", function() {
                var cell1 = new Cell(1, 1);
                var cell2 = new Cell(1, 1);
                expect(cell1.equals(cell2)).toBe(true);
            });
            it("should not equal another cell with different coordinates", function() {
                var cell1 = new Cell(1, 1);
                var cell3 = new Cell(2, 1);
                expect(cell1.equals(cell3)).not.toBe(true);
            });
            it("should not equal an object that doesn't look like a cell", function() {
                var cell1 = new Cell(1, 1);
                var notACell = {
                    prop: "val"
                };
                expect(cell1.equals(notACell)).not.toBe(true);
            });
        });
    });
});
