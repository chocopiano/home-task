import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { fireEvent, render } from "@testing-library/react";
import axiosClient from "../src/gateways/axiosClient";
import InsertInstructions from "../src/insert-instructions";

Enzyme.configure({ adapter: new Adapter() });

describe("insert instructions", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<InsertInstructions position={{ positionX: "1", positionY: "1", compassPoint: "N" }}
    upperRightSizeCoordinates = {{ upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" }} setResult={jest.fn()} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call the api when invalid instructions are given with the input value and reject", async () => {
    expect.hasAssertions();

    // Arrange.
    const inputValue = "LMLM";
    const patch = jest.spyOn(axiosClient, "patch").mockImplementation(() => Promise.reject({ response: { data: { msg: "something" } } }));

    // Act.
    wrapper.find("input").first().simulate("change", { target: { value: inputValue } });
    wrapper.find("form").first().simulate("submit");

    // Assert.
    const userInputValue = wrapper.find("input").at(0).prop("value");
    expect(wrapper).not.toBeNull();
    expect(userInputValue).toBe(inputValue);
    expect(patch).toHaveBeenCalledTimes(1);
    expect(patch).toHaveBeenCalledWith("/position", {
      position: { positionX: "1", positionY: "1", compassPoint: "N" },
      upperRightSizeCoordinates: { upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" },
      instructions: "LMLM",

    });
  });
});

describe("insert instructions using enzyme", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call the api with  method patch and resolved", async () => {
    expect.hasAssertions();

    // Arrange.
    const mockedResult = { positionX: "1", positionY: "1", compassPoint: "N" };
    const position = { positionX: "1", positionY: "1", compassPoint: "N" };
    const upperRightSizeCoordinates = { upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" };
    const instruction = "LMLM";

    const patch = jest.spyOn(axiosClient, "patch").mockImplementation(() => Promise.resolve({ data: { ...mockedResult } }));
    const setResult = jest.fn();
    const mockedUseState = jest.fn();
    React.useState = mockedUseState.mockImplementation(() => [instruction, () => jest.fn()]);

    // Act.
    const component = render(<InsertInstructions
      position={{ ...position }}
      upperRightSizeCoordinates = {{ ...upperRightSizeCoordinates }} setResult={setResult} />);

    const instructionsInput = component.getByPlaceholderText("instructions");
    const insertInstructionsInput = component.getByPlaceholderText("insertInstructions");
    const instructionsLabel = component.getByText("Insert Instructions (L: Left, R: Right, M: Continue)");
    fireEvent.submit(insertInstructionsInput);

    // Assert.
    expect(patch).toHaveBeenCalledTimes(1);
    expect(patch).toHaveBeenCalledWith("/position", {
      position,
      upperRightSizeCoordinates,
      instructions: instructionsInput.value,
    });
    expect(instructionsInput).toBeInTheDocument();
    expect(instructionsLabel).toBeInTheDocument();
  });

  it("should not call the api when instructions are not given", async () => {
    expect.hasAssertions();

    // Arrange.
    const position = { positionX: "1", positionY: "1", compassPoint: "N" };
    const upperRightSizeCoordinates = { upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" };

    const patch = jest.spyOn(axiosClient, "patch").mockImplementation(() => Promise.resolve(undefined));
    const mockedUseState = jest.fn();
    React.useState = mockedUseState.mockImplementation(() => ["", jest.fn()]);

    // Act.
    const component = render(<InsertInstructions
      position={{ ...position }}
      upperRightSizeCoordinates = {{ ...upperRightSizeCoordinates }} setResult={jest.fn()} />);
    const instructionsInput = component.getByPlaceholderText("instructions");
    const insertInstructionsInput = component.getByPlaceholderText("insertInstructions");
    const instructionsLabel = component.getByText("Insert Instructions (L: Left, R: Right, M: Continue)");
    fireEvent.submit(insertInstructionsInput);

    // Assert.
    expect(patch).not.toHaveBeenCalled();
    expect(instructionsInput).toBeInTheDocument();
    expect(instructionsLabel).toBeInTheDocument();
  });
});
