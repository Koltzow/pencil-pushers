Number.prototype.intToHSL = function() {
    var shortened = this % 360;
    return "hsl(" + shortened + ",45%,56%)";
};