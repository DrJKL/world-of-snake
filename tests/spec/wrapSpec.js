define(["wrap"], function(wrap) {
    describe("wrap", function() {
        it("should act like mod", function() {
            expect(wrap(1,1)).toBe(0);
            expect(wrap(2,2)).toBe(0);
            expect(wrap(4,2)).toBe(0);
            expect(wrap(5,2)).toBe(1);
        });
        it("should act like mod with negative numbers", function() {
            expect(wrap(-1,4)).toBe(3);
            expect(wrap(-1,2)).toBe(1);
            expect(wrap(-4,2)).toBe(0);
            expect(wrap(-5,15)).toBe(10);
        });
    });
});
