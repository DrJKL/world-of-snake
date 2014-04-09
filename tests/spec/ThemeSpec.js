define(["Theme", "ContinuousSequence"], function(Theme, ContinuousSequence) {
    describe("Theme", function() {
        it("should format hsl properly", function() {
            var theme = new Theme(new ContinuousSequence(200));
            expect(theme.getHslColor(0)).toEqual("hsl(200,100%,50%)");
        });
    });
});
