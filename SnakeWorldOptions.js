function wrap(number, mod) {
    return (number + mod) % mod;
};

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

function SWOptions() {}
/* Defaults */
SWOptions.currentTheme = 0;
SWOptions.currentStyle = 0;
SWOptions.randomness = 0;
SWOptions.sizeVariation = 0;
SWOptions.cellWidth = 60;
SWOptions.speed = 1;
SWOptions.maxSpeed = 7;
SWOptions.printInfo = true;
SWOptions.dirs = ['left', 'up', 'right', 'down'];
SWOptions.oldthemes = [
    ['white'],
    ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
    ['blue', 'teal', 'darkcyan', 'darksteelblue', 'midnightblue', 'dodgerblue', 'steelblue', 'royalblue'],
    ['red', 'orange', 'yellow', 'orangered', 'gold'],
    ['forestgreen', 'darkgreen', 'darkolivegreen', 'green', 'lawngreen', 'yellowgreen'],
    ['wheat', 'seashell', 'peachpuff', 'mistyrose', 'lightgoldenrodyellow', 'cornsilk', 'lavenderblush', 'blanchedalmond', 'papayawhip', 'lemonchiffon', 'bisque', 'linen', 'oldlace'],
];
SWOptions.styles = ['square', 'circle', 'triangle', 'random'];
SWOptions.background = 'black';
SWOptions.border = 'green';

SWOptions.themes = [
    new Theme(0, 360),
    new Theme(0, 180),
    new Theme(180, 360),
    new Theme(0, 90),
    new Theme(90, 180),
    new Theme(180, 270),
    new Theme(270, 360),
    new Theme(120),
];

SWOptions.modSizeVariation = function(modifier) {
    SWOptions.sizeVariation = wrap(SWOptions.sizeVariation + modifier, 6);
};

SWOptions.modSpeed = function(modifier) {
    SWOptions.speed = wrap(SWOptions.speed + modifier, SWOptions.maxSpeed);
};

SWOptions.modRandomness = function(modifier) {
    SWOptions.randomness = wrap(SWOptions.randomness + modifier, 11);
};

SWOptions.cycleStyle = function() {
    SWOptions.currentStyle = wrap(SWOptions.currentStyle + 1, SWOptions.styles.length);
};

SWOptions.cycleTheme = function() {
    SWOptions.currentTheme = wrap(SWOptions.currentTheme + 1, SWOptions.themes.length);
};

SWOptions.getSizeMod = function() {
    return Math.round(Math.random() * SWOptions.sizeVariation * 2) - SWOptions.sizeVariation;
};

SWOptions.getTheme = function() {
    return SWOptions.themes[SWOptions.currentTheme];
};

SWOptions.getStyle = function() {
    return SWOptions.styles[SWOptions.currentStyle];
};

SWOptions.getRandomStyle = function() {
    // One less than length because 'Random' is at the end.
    var rand = Math.floor(Math.random() * (SWOptions.styles.length - 1));
    return SWOptions.styles[rand];
};

SWOptions.getSpeedInterval = function() {
    return (SWOptions.maxSpeed - SWOptions.speed) * 10;
};