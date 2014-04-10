define(function() {
    function ContinuousSequence(min, max) {
        this.min = min;
        this.max = max || min;
    }

    ContinuousSequence.prototype.getValue = function(percent) {
        if (percent > 1) {
            percent = 1;
        }
        if (percent < 0) {
            percent = 0;
        }
        var diff = this.max - this.min;
        return this.min + Math.floor(percent * diff);
    };
    return ContinuousSequence;
});
