import { handler } from "../../../src/presentation/api/calculate-final-position";

describe("presentation: calculate final position", () => {
  it("throw error if body is incorrect", async () => {
    expect.hasAssertions();

    // Arrange.

    const req = { body: { } };

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

    // Act.
    const execution = await handler(req, res);

    // Assert.
    expect(execution).toMatchObject({ _status: 400, _json: { msg: "position.positionX is a required field" } });
  });
});
