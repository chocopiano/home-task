import { handler } from "../../../src/presentation/api/set-initial-position";

describe("presentation: set initial position", () => {
  it("throw error if body is incorrect", async () => {
    expect.hasAssertions();

    // Arrange.

    const upperRightSizeCoordinateX = "something";
    const upperRightSizeCoordinateY = "something";
    const upperRightSizeCoordinates = { upperRightSizeCoordinateX, upperRightSizeCoordinateY };

    const tentativePositionX = 1;
    const tentativePositionY = 2;
    const compassPoint = "W";
    const tentativePosition = { tentativePositionX, tentativePositionY, compassPoint };

    const req = { body: { tentativePosition, upperRightSizeCoordinates } };

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
    expect(execution).toMatchObject({
      _status: 400,
      _json: {
        msg:
      'upperRightSizeCoordinates.upperRightSizeCoordinateX must be a `number`type, but the final value was: `NaN` (cast from the value `\"something\"`).',
      },
    });
  });
});
