exports.SetPlateauSizeUseCase = ({ positionX, positionY }) => {
  let error = "";
  if (positionX < 0) {
    error = ({ msg: "Position X can not be negative" });

    throw error;
  }

  if (positionY < 0) {
    error = { msg: "Position Y can not be negative" };

    throw error;
  }

  return ({ positionX, positionY });
};
