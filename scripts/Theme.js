function Theme(minHue, maxHue, minSat, maxSat, minLum, maxLum) {
    this.minHue = minHue;
    this.maxHue = maxHue || minHue;

    this.minSat = minSat || 100;
    this.maxSat = maxSat || 100;

    this.minLum = minLum || 50;
    this.maxLum = maxLum || 50;
}

Theme.prototype.getHue = function(percent) {
    var hueDiff = this.maxHue - this.minHue;
    return this.minHue + Math.floor(percent * hueDiff);
};
Theme.prototype.getSat = function(percent) {
    var satDiff = this.maxSat - this.minSat;
    return this.minSat + Math.floor(percent * satDiff);
};
Theme.prototype.getLum = function(percent) {
    var lumDiff = this.maxLum - this.minLum;
    return this.minLum + Math.floor(percent * lumDiff);
};

Theme.prototype.getHslColor = function(percent) {
    var hue = this.getHue(percent);
    var sat = this.getSat(percent);
    var lum = this.getLum(percent);
    return 'hsl(' + hue + ',' + sat + '%,' + lum + '%)';
};
