define(["ContinuousSequence"], function(ContinuousSequence) {
    describe("ContinuousSequence", function() {
        describe("Single Argument Construction", function() {
            it("should return one color if only provided one argument", function() {
                var sequence = new ContinuousSequence(200);
                expect(sequence.getValue(0.0)).toEqual(200);
                expect(sequence.getValue(0.10)).toEqual(200);
                expect(sequence.getValue(0.25)).toEqual(200);
                expect(sequence.getValue(0.77)).toEqual(200);
                expect(sequence.getValue(1.00)).toEqual(200);
            });
        });
        describe("Minimum, Maximum cases", function() {
            it("should not give more than the maximum", function() {
                var sequence = new ContinuousSequence(100, 200);
                expect(sequence.getValue(200)).toEqual(200);
                expect(sequence.getValue(100)).toEqual(200);
                expect(sequence.getValue(1.0)).toEqual(200);
                expect(sequence.getValue(2.0)).toEqual(200);
            });
            it("should not give less than the minimum", function() {
                var sequence = new ContinuousSequence(100, 200);
                expect(sequence.getValue(0.0)).toEqual(100);
                expect(sequence.getValue(-0.5)).toEqual(100);
                expect(sequence.getValue(-10.0)).toEqual(100);
            });
        });
        describe(".getValue", function() {
            it("should give proper values for percentages", function() {
                var sequence = new ContinuousSequence(100, 200);
                expect(sequence.getValue(0.0)).toEqual(100);
                expect(sequence.getValue(0.5)).toEqual(150);
                expect(sequence.getValue(1.0)).toEqual(200);
            });
            it("should allow for swapped min and max", function() {
                var sequence = new ContinuousSequence(200, 100);
                expect(sequence.getValue(0.0)).toEqual(200);
                expect(sequence.getValue(0.5)).toEqual(150);
                expect(sequence.getValue(1.0)).toEqual(100);
            });
        });
    });
});
