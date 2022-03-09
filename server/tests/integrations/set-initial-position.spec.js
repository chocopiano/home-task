import { handler } from "../../src/presentation/api/set-initial-position";

const res = {
  _status: null,
  _json: null,
  status(code) {
    this._status = code;
    return this;
  },
  json(json) {
    this._json = json;
    return this;
  },
};

const upperRightSizeCoordinateX = 10;
const upperRightSizeCoordinateY = 10;
const upperRightSizeCoordinates = { upperRightSizeCoordinateX, upperRightSizeCoordinateY };
describe("integration: set plateau size", () => {
  describe("success", () => {
    it("should return position x and y if they are ok", async () => {
      expect.hasAssertions();

      // Arrange.

      const tentativePositionX = 1;
      const tentativePositionY = 2;
      const compassPoint = "W";
      const tentativePosition = { tentativePositionX, tentativePositionY, compassPoint };

      const req = { body: { tentativePosition, upperRightSizeCoordinates } };

      // Act.
      const execution = await handler(req, res);

      // Assert.
      expect(execution).toMatchObject(
        { _status: 200, _json: { positionX: tentativePositionX, positionY: tentativePositionY } },
      );
    });
  });
  describe("errors", () => {
    it("throw position x can not be out of the plateau", async () => {
      expect.hasAssertions();

      // Arrange.
      const tentativePositionX = 11;
      const tentativePositionY = 2;
      const compassPoint = "W";
      const tentativePosition = { tentativePositionX, tentativePositionY, compassPoint };

      const req = { body: { tentativePosition, upperRightSizeCoordinates } };

      // Act.
      const execution = await handler(req, res);

      // Assert.
      expect(execution).toMatchObject(
        { _status: 400, _json: { msg: `Position x: ${tentativePositionX} is out of the plateau` } },
      );
    });

    it("throw position y can not be out of the plateau", async () => {
      expect.hasAssertions();

      // Arrange.
      const tentativePositionX = 1;
      const tentativePositionY = -1;
      const compassPoint = "W";
      const tentativePosition = { tentativePositionX, tentativePositionY, compassPoint };

      const req = { body: { tentativePosition, upperRightSizeCoordinates } };

      // Act.
      const execution = await handler(req, res);

      // Assert.
      expect(execution).toMatchObject(
        { _status: 400, _json: { msg: `Position y: ${tentativePositionY} is out of the plateau` } },
      );
    });

    it("throw if compass point is incorrect", async () => {
      expect.hasAssertions();

      // Arrange.
      const tentativePositionX = 1;
      const tentativePositionY = 1;
      const compassPoint = "K";
      const tentativePosition = { tentativePositionX, tentativePositionY, compassPoint };

      const req = { body: { tentativePosition, upperRightSizeCoordinates } };

      // Act.
      const execution = await handler(req, res);

      // Assert.
      expect(execution).toMatchObject({ _status: 400, _json: { msg: "Compass point must be N, S, E ,W" } });
    });
  });
});
