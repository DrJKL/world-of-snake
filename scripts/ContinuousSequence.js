define(function() {
    function ContinuousSequence(min, max) {
        this.min = min;
        this.max = max || min;
    }

    ContinuousSequence.prototype.getValue = function(percent) {
        var diff = this.max - this.min;
        return this.min + Math.floor(percent * diff);
    };
    return ContinuousSequence;
});
