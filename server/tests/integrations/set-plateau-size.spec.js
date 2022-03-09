import { handler } from "../../src/presentation/api/set-plateau-size";

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
describe("integration: set plateau size", () => {
  describe("success", () => {
    it("should return position x and y if they are ok", async () => {
      expect.hasAssertions();

      // Arrange.

      const positionX = 1;
      const positionY = 2;
      const req = { body: { positionX, positionY } };

      // Act.
      const execution = await handler(req, res);

      // Assert.
      expect(execution).toMatchObject({ _status: 200, _json: { positionX, positionY } });
    });
  });
  describe("errors", () => {
    it("throw position x can not be a negative", async () => {
      expect.hasAssertions();

      // Arrange.
      const positionX = -1;
      const positionY = 2;
      const req = { body: { positionX, positionY } };

      // Act.
      const execution = await handler(req, res);

      // Assert.
      expect(execution).toMatchObject({ _status: 400, _json: { msg: "Position X can not be negative" } });
    });

    it("throw position y can not be a negative", async () => {
      expect.hasAssertions();

      // Arrange.
      const positionX = 1;
      const positionY = -2;
      const req = { body: { positionX, positionY } };

      // Act.
      const execution = await handler(req, res);

      // Assert.
      expect(execution).toMatchObject({ _status: 400, _json: { msg: "Position Y can not be negative" } });
    });
  });
});
