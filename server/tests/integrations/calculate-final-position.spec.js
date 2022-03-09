import { handler } from "../../src/presentation/api/calculate-final-position";

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

const upperRightSizeCoordinateX = 5;
const upperRightSizeCoordinateY = 5;
const upperRightSizeCoordinates = { upperRightSizeCoordinateX, upperRightSizeCoordinateY };
describe("integration: calculate final position", () => {
  describe("success", () => {
    it("should return 13N for LMLMLMLMM instructions", async () => {
      expect.hasAssertions();

      // Arrange.

      const positionX = 1;
      const positionY = 2;
      const compassPoint = "N";
      const position = { positionX, positionY, compassPoint };
      const instructions = "LMLMLMLMM";

      const req = { body: { position, upperRightSizeCoordinates, instructions } };

      // Act.
      const execution = await handler(req, res);

      // Assert.
      expect(execution).toMatchObject(
        { _status: 200, _json: { positionX: 1, positionY: 3, compassPoint: "N" } },
      );
    });

    it("should return 13N for LMLMLMLMMRRRR instructions", async () => {
      expect.hasAssertions();

      // Arrange.

      const positionX = 1;
      const positionY = 2;
      const compassPoint = "N";
      const position = { positionX, positionY, compassPoint };
      const instructions = "LMLMLMLMMRRRR";

      const req = { body: { position, upperRightSizeCoordinates, instructions } };

      // Act.
      const execution = await handler(req, res);

      // Assert.
      expect(execution).toMatchObject(
        { _status: 200, _json: { positionX: 1, positionY: 3, compassPoint: "N" } },
      );
    });
  });
  describe("errors", () => {
    it("throw instructions are not valid", async () => {
      expect.hasAssertions();

      // Arrange.

      const positionX = 1;
      const positionY = 2;
      const compassPoint = "N";
      const position = { positionX, positionY, compassPoint };
      const instructions = "LMLMLKMLMMRRRR";

      const req = { body: { position, upperRightSizeCoordinates, instructions } };

      // Act.
      const execution = await handler(req, res);

      // Assert.
      expect(execution).toMatchObject({ _status: 400, _json: { msg: "These instructions are not valid K" } });
    });

    it("throw position x is out of the plateau", async () => {
      expect.hasAssertions();

      // Arrange.

      const positionX = 0;
      const positionY = 2;
      const compassPoint = "W";
      const position = { positionX, positionY, compassPoint };
      const instructions = "M";

      const req = { body: { position, upperRightSizeCoordinates, instructions } };

      // Act.
      const execution = await handler(req, res);

      // Assert.
      expect(execution).toMatchObject({ _status: 400, _json: { msg: "Position x: -1 is out of the plateau" } });
    });

    it("throw position y is out of the plateau", async () => {
      expect.hasAssertions();

      // Arrange.

      const positionX = 0;
      const positionY = 0;
      const compassPoint = "S";
      const position = { positionX, positionY, compassPoint };
      const instructions = "M";

      const req = { body: { position, upperRightSizeCoordinates, instructions } };

      // Act.
      const execution = await handler(req, res);

      // Assert.
      expect(execution).toMatchObject({ _status: 400, _json: { msg: "Position y: -1 is out of the plateau" } });
    });
  });
});
