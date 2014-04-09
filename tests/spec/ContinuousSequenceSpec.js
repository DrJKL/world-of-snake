define(["ContinuousSequence"], function(ContinuousSequence) {
    describe("ContinuousSequence", function() {
        it("should return one color if only provided one argument", function() {
            var sequence = new ContinuousSequence(200);
            expect(sequence.getValue(0.0)).toEqual(200);
            expect(sequence.getValue(0.10)).toEqual(200);
            expect(sequence.getValue(0.25)).toEqual(200);
            expect(sequence.getValue(0.77)).toEqual(200);
            expect(sequence.getValue(1.00)).toEqual(200);
        });
        it("should give proper values for percentages", function() {
            var sequence = new ContinuousSequence(100, 200);
            expect(sequence.getValue(0.0)).toEqual(100);
            expect(sequence.getValue(0.5)).toEqual(150);
            expect(sequence.getValue(1.0)).toEqual(200);
        });
    });
});
