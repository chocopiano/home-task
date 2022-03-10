const { validateCompassPoint } = require("../helpers/validate-compass-point");

exports.SetInitialPositionUseCase = ({ tentativePosition, upperRightSizeCoordinates }) => {
  const { tentativePositionX, tentativePositionY, compassPoint } = tentativePosition;

  const { upperRightSizeCoordinateX, upperRightSizeCoordinateY } = upperRightSizeCoordinates;

  let error = "";

  if (tentativePositionX < 0 || tentativePositionX > upperRightSizeCoordinateX) {
    error = { msg: `Position x: ${tentativePositionX} is out of the plateau` };

    throw error;
  }

  if (tentativePositionY < 0 || tentativePositionY > upperRightSizeCoordinateY) {
    error = { msg: `Position y: ${tentativePositionY} is out of the plateau` };

    throw error;
  }

  const isCompassPointValid = validateCompassPoint(compassPoint);

  if (!isCompassPointValid) {
    error = { msg: "Compass point must be N, S, E ,W" };

    throw error;
  }

  return { positionX: tentativePositionX, positionY: tentativePositionY, compassPoint };
};
