import { handler } from "../../../src/presentation/api/set-plateau-size";

describe("presentation: set plateau size", () => {
  it("throw error if body is incorrect", async () => {
    expect.hasAssertions();

    // Arrange.
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
    const positionX = "something";
    const positionY = "something";

    const req = { body: { positionX, positionY } };

    // Act.
    const execution = await handler(req, res);

    // Assert.
    expect(execution).toMatchObject({
      _status: 400,
      _json:
      {
        msg:
        'positionX must be a `number` type, but the final value was: `NaN` (cast from the value `\"something\"`).',
      },
    });
  });
});
