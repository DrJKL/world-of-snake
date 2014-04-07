describe("Theme",function(){
    it("should return one color if only provided one argument", function(){
        var theme = new Theme(200);
        expect(theme.getHue(0)).toEqual(200);
        expect(theme.getHue(10)).toEqual(200);
        expect(theme.getHue(25)).toEqual(200);
        expect(theme.getHue(77)).toEqual(200);
        expect(theme.getHue(100)).toEqual(200);
    });
    it("should give consistent values if given minHue and maxHue", function() {
        var theme = new Theme(100,200);
        expect(theme.getHue(0)).toEqual(100);
        expect(theme.getHue(1)).toEqual(200);
    });
});