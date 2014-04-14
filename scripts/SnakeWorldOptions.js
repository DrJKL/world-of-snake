define(["Theme","ContinuousSequence", "wrap", "google-analytics"], function(Theme, ContinuousSequence, wrap, ga) {
    function SWOptions() {}
    /* Defaults */
    SWOptions.currentTheme = 0;
    SWOptions.currentStyle = 0;
    SWOptions.turnChance = 0;
    SWOptions.sizeVariation = 0;
    SWOptions.cellWidth = 0;
    SWOptions.speed = 1;
    SWOptions.maxSpeed = 7;
    SWOptions.printInfo = true;
    SWOptions.styles = ['square', 'circle', 'triangle', 'random'];
    SWOptions.background = 'black';
    SWOptions.border = 'green';

    SWOptions.themes = [
        new Theme(new ContinuousSequence(0, 360)),
        new Theme(new ContinuousSequence(0, 180)),
        new Theme(new ContinuousSequence(180, 360)),
        new Theme(new ContinuousSequence(0, 90)),
        new Theme(new ContinuousSequence(90, 180)),
        new Theme(new ContinuousSequence(180, 270)),
        new Theme(new ContinuousSequence(270, 360)),
        new Theme(new ContinuousSequence(120)),
    ];

    SWOptions.cellWidths = [
        60, 30, 20, 15, 12, 10,
        6, 5, 4, 3, 2, 1,
    ];

    SWOptions.modSizeVariation = function(modifier) {
        SWOptions.sizeVariation = wrap(SWOptions.sizeVariation + modifier, 6);
    };

    SWOptions.modSpeed = function(modifier) {
        SWOptions.speed = wrap(SWOptions.speed + modifier, SWOptions.maxSpeed);
    };

    SWOptions.modTurnChance = function(modifier) {
        SWOptions.turnChance = wrap(SWOptions.turnChance + modifier, 11);
    };

    SWOptions.cycleStyle = function() {
        SWOptions.currentStyle = wrap(SWOptions.currentStyle + 1, SWOptions.styles.length);
    };

    SWOptions.cycleTheme = function() {
        SWOptions.currentTheme = wrap(SWOptions.currentTheme + 1, SWOptions.themes.length);
    };

    SWOptions.shrinkCells = function() {
        ga('send', 'event', 'level', 'increment', SWOptions.cellWidths.length);
        if (SWOptions.cellWidth < SWOptions.cellWidths.length) {
            SWOptions.cellWidth++;
        }
    };

    SWOptions.getCellWidth = function() {
        return SWOptions.cellWidths[SWOptions.cellWidth];
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
    return SWOptions;
});
