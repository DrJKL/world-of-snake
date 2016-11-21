define(["ContinuousSequence"], function(ContinuousSequence) {
    function Theme(hue, sat, lum) {
        this.hue = hue;
        this.sat = sat || new ContinuousSequence(100);
        this.lum = lum || new ContinuousSequence(50);
    }

    Theme.prototype.getHue = function(percent) {
        return this.hue.getValue(percent);
    };
    Theme.prototype.getSat = function(percent) {
        return this.sat.getValue(percent);
    };
    Theme.prototype.getLum = function(percent) {
        return this.lum.getValue(percent);
    };

    Theme.prototype.getHslColor = function(percent) {
        var hue = this.getHue(percent);
        var sat = this.getSat(percent);
        var lum = this.getLum(percent);
        return 'hsl(' + hue + ',' + sat + '%,' + lum + '%)';
    };
    return Theme;
});
