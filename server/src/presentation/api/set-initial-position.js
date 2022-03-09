const yup = require("yup");
const { SetInitialPositionUseCase } = require("../../domain/use-cases/set-initial-position.use-case");

const SetInitialPositionSchema = yup.object({
  tentativePosition: yup.object({
    tentativePositionX: yup.number().required(),
    tentativePositionY: yup.number().required(),
    compassPoint: yup.string().required(),
  }),
  upperRightSizeCoordinates: yup.object({
    upperRightSizeCoordinateX: yup.number().required(),
    upperRightSizeCoordinateY: yup.number().required(),
  }),
});

const validate = (req) => {
  try {
    return SetInitialPositionSchema.validateSync(req, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    const error = { msg: err.errors[0] };
    throw error;
  }
};

const SetInitialPosition = (useCase) => async (req, res) => {
  try {
    const params = validate(req.body);
    const response = await useCase(params);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const useCase = SetInitialPositionUseCase;

exports.handler = SetInitialPosition(useCase);
