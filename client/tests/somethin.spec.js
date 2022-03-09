import React from "react";
import { fireEvent, render } from "@testing-library/react";
import axiosClient from "../src/gateways/axiosClient";
import InsertInstructions from "../src/insert-instructions";

describe("insert instructions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call the api with the method patch and resolved", async () => {
    expect.hasAssertions();

    // Arrange.
    const data = { positionX: "1", positionY: "1", compassPoint: "N" };
    const patch = jest.spyOn(axiosClient, "patch").mockImplementation(() => Promise.resolve({ data }));

    const mockedUseState = jest.fn();

    React.useState = mockedUseState.mockImplementation(() => ["LMLM", () => console.log("first")]);

    // Act.
    const component = render(<InsertInstructions
      position={{ positionX: "1", positionY: "1", compassPoint: "N" }}
      upperRightSizeCoordinates = {{ upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" }} setResult={() => {}} />);
    const instructionsInput = component.getByPlaceholderText("instructions");
    const insertInstructionsInput = component.getByPlaceholderText("insertInstructions");
    const instructionsLabel = component.getByText("Insert Instructions (L: Left, R: Right, M: Continue)");

    fireEvent.submit(insertInstructionsInput);

    // Assert.
    expect(patch).toHaveBeenCalledTimes(1);
    expect(patch).toHaveBeenCalledWith("/position", {
      position: {
        positionX: data.positionX,
        positionY: data.positionY,
        compassPoint: data.compassPoint,
      },
      upperRightSizeCoordinates: { upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" },
      instructions: instructionsInput.value,

    });
    expect(instructionsInput).toBeInTheDocument();
    expect(instructionsLabel).toBeInTheDocument();
  });

  it("should not call the api when instructions are not given", async () => {
    expect.hasAssertions();

    // Arrange.
    const data = { positionX: "1", positionY: "1", compassPoint: "N" };
    const patch = jest.spyOn(axiosClient, "patch").mockImplementation(() => Promise.resolve({ data }));

    const mockedUseState = jest.fn();

    React.useState = mockedUseState.mockImplementation(() => ["", () => console.log("first")]);

    // Act.
    // position, upperRightSizeCoordinates, setPosition, setState,
    const component = render(<InsertInstructions
      position={{ positionX: "1", positionY: "1", compassPoint: "N" }}
      upperRightSizeCoordinates = {{ upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" }} setResult={() => {}} />);
    const instructionsInput = component.getByPlaceholderText("instructions");
    const insertInstructionsInput = component.getByPlaceholderText("insertInstructions");
    const instructionsLabel = component.getByText("Insert Instructions (L: Left, R: Right, M: Continue)");

    fireEvent.submit(insertInstructionsInput);

    console.log(instructionsInput.value, "instructionsInput");

    // Assert.
    expect(patch).not.toHaveBeenCalled();

    expect(instructionsInput).toBeInTheDocument();
    expect(instructionsLabel).toBeInTheDocument();
  });
});
