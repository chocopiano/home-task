const COMPASS_POINTS = ["N", "S", "E", "W"];
exports.validateCompassPoint = (compassPoint) => COMPASS_POINTS.includes(compassPoint);
