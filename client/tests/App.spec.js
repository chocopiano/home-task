import React from "react";
import { fireEvent, render } from "@testing-library/react";
import App from "../src/App";

describe("app", () => {
  it("should show text for select size", async () => {
    expect.hasAssertions();

    // Arrange.
    // Act.
    const component = render(<App />);
    const marsRoverHeader = component.getByText(/MARS ROVER/i);
    const input = component.getByText("Restart");
    const positionXLabelText = component.getByText("Upper Right Coordinate X");
    const positionYLabelText = component.getByText("Upper Right Coordinate Y");

    // Assert.
    expect(marsRoverHeader).toBeInTheDocument();
    expect(positionXLabelText).toBeInTheDocument();
    expect(positionYLabelText).toBeInTheDocument();
    fireEvent.click(input);
  });

  it("should show text for introduce the user tentative initial position", async () => {
    expect.hasAssertions();

    // Arrange.
    const mockedUseState = jest.fn();

    React.useState = mockedUseState.mockImplementation(() => [1, {}]);

    // Act.
    const component = render(<App />);
    const marsRoverHeader = component.getByText(/MARS ROVER/i);
    const positionXLabelText = component.getByText("Position X");
    const positionYLabelText = component.getByText("Position Y");
    const compassPointLabelText = component.getByText("Compass Point");

    // Assert.
    expect(marsRoverHeader).toBeInTheDocument();
    expect(positionXLabelText).toBeInTheDocument();
    expect(positionYLabelText).toBeInTheDocument();
    expect(compassPointLabelText).toBeInTheDocument();
  });

  it("should show the rovers final position", async () => {
    expect.hasAssertions();

    // Arrange.
    const mockedUseState = jest.fn();

    React.useState = mockedUseState.mockImplementation(() => [2, {}])
      .mockImplementation(() => [0, {}]).mockImplementation(() => [0, {}])
      .mockImplementation(() => [{
        positionX: "1",
        positionY: "2",
        compassPoint: "N",
      }, {}]);

    // Act.
    const component = render(<App />);
    const marsRoverHeader = component.getByText(/MARS ROVER/i);
    const resultText = component.getByText("Result");
    const positionX = component.getByText("X: 1");
    const positionY = component.getByText("Y: 2");
    const compassPoint = component.getByText("Compass Point: N");

    // Assert.
    expect(marsRoverHeader).toBeInTheDocument();
    expect(resultText).toBeInTheDocument();
    expect(positionX).toBeInTheDocument();
    expect(positionY).toBeInTheDocument();
    expect(compassPoint).toBeInTheDocument();
  });
});
