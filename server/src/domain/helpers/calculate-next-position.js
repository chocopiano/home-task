exports.calculateNextPosition = ({ currentPosition, instruction }) => {
  const { positionX, positionY, compassPoint } = currentPosition;

  switch (instruction) {
    case "R":

      if (compassPoint === "N") {
        return { ...currentPosition, compassPoint: "E" };
      }
      if (compassPoint === "E") {
        return { ...currentPosition, compassPoint: "S" };
      }
      if (compassPoint === "S") {
        return { ...currentPosition, compassPoint: "W" };
      }
      return { ...currentPosition, compassPoint: "N" };

    case "L":
      if (compassPoint === "N") {
        return { ...currentPosition, compassPoint: "W" };
      }
      if (compassPoint === "W") {
        return { ...currentPosition, compassPoint: "S" };
      }
      if (compassPoint === "S") {
        return { ...currentPosition, compassPoint: "E" };
      }
      return { ...currentPosition, compassPoint: "N" };

    case "M":
      if (compassPoint === "N") {
        return { ...currentPosition, positionY: positionY + 1 };
      }
      if (compassPoint === "W") {
        return { ...currentPosition, positionX: positionX - 1 };
      }
      if (compassPoint === "S") {
        return { ...currentPosition, positionY: positionY - 1 };
      }
      return { ...currentPosition, positionX: positionX + 1 };

    default:
      return { ...currentPosition };
  }
};
