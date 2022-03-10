const { calculateNextPosition } = require("../helpers/calculate-next-position");

const validInstructions = ["R", "L", "M"];
exports.CalculateFinalPositionUseCase = ({ position, upperRightSizeCoordinates, instructions }) => {
  const instructionsList = instructions.split("");

  const invalidInstructions = instructionsList.filter(
    (instruction) => !validInstructions.includes(instruction),
  );

  if (invalidInstructions.length > 0) {
    const error = { msg: `These instructions are not valid ${invalidInstructions}` };

    throw error;
  }

  const { upperRightSizeCoordinateX, upperRightSizeCoordinateY } = upperRightSizeCoordinates;

  let currentPosition = { ...position };

  let error = "";

  instructionsList.forEach((instruction) => {
    currentPosition = calculateNextPosition({ currentPosition, instruction });

    const { positionX: currentPositionX, positionY: currentPositionY } = currentPosition;

    if (currentPositionX < 0 || currentPositionX > upperRightSizeCoordinateX) {
      error = { msg: `Position x: ${currentPositionX} is out of the plateau` };

      throw error;
    }

    if (currentPositionY < 0 || currentPositionY > upperRightSizeCoordinateY) {
      error = { msg: `Position y: ${currentPositionY} is out of the plateau` };

      throw error;
    }
  });

  return currentPosition;
};
