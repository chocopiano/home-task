const yup = require("yup");
const { CalculateFinalPositionUseCase } = require("../../domain/use-cases/calculate-final-position.use-case");

const CalculateFinalPositionSchema = yup.object({
  position: yup.object({
    positionX: yup.number().required(),
    positionY: yup.number().required(),
    compassPoint: yup.string().required(),
  }),
  upperRightSizeCoordinates: yup.object({
    upperRightSizeCoordinateX: yup.number().required(),
    upperRightSizeCoordinateY: yup.number().required(),
  }),
  instructions: yup.string().required(),
});

const validate = (req) => {
  try {
    return CalculateFinalPositionSchema.validateSync(req, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    const error = { msg: err.errors[0] };
    throw error;
  }
};

const CalculateFinalPosition = (useCase) => async (req, res) => {
  try {
    const params = validate(req.body);
    const response = await useCase(params);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const useCase = CalculateFinalPositionUseCase;

exports.handler = CalculateFinalPosition(useCase);
