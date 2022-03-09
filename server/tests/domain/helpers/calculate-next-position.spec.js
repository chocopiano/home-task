const { calculateNextPosition } = require("../../../src/domain/helpers/calculate-next-position");

describe("success", () => {
  it("should return 13N for LMLMLMLMM instructions", () => {
    expect.hasAssertions();

    // Arrange.

    const positionX = 1;
    const positionY = 2;
    const compassPoint = "N";
    const position = { positionX, positionY, compassPoint };
    const instructions = "J";

    // Act.
    const execution = calculateNextPosition({ currentPosition: position, instructions });

    // Assert.
    expect(execution).toMatchObject(
      { positionX: 1, positionY: 2, compassPoint: "N" },
    );
  });
});
