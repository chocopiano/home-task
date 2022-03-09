const yup = require("yup");
const { SetPlateauSizeUseCase } = require("../../domain/use-cases/set-plateau-size.use-case");

const SetPlateauSizeSchema = yup.object({
  positionX: yup.number().required(),
  positionY: yup.number().required(),
});

const validate = (req) => {
  try {
    return SetPlateauSizeSchema.validateSync(req, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    const error = { msg: err.errors[0] };
    throw error;
  }
};

const SetPlateauSize = (useCase) => async (req, res) => {
  try {
    const params = validate(req.body);
    const response = await useCase(params);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const useCase = SetPlateauSizeUseCase;

exports.handler = SetPlateauSize(useCase);
