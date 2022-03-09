import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
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

  it("should not call the api when instructions are not given1", async () => {
    expect.hasAssertions();

    // Arrange.
    const patch = jest.spyOn(axiosClient, "patch").mockImplementation(() => Promise.reject({ response: { data: { msg: "something" } } }));

    wrapper.find("input").first().simulate("change", { target: { value: "LMLM" } });
    wrapper.find("form").first().simulate("submit");
    expect(wrapper).not.toBeNull();

    expect(wrapper.find("input").at(0).prop("value")).toBe("LMLM");

    expect(patch).toHaveBeenCalledTimes(1);
    expect(patch).toHaveBeenCalledWith("/position", {
      position: { positionX: "1", positionY: "1", compassPoint: "N" },
      upperRightSizeCoordinates: { upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" },
      instructions: "LMLM",

    });
  });
  it("should not call the api when instructions are not givfen1", async () => {
    expect.hasAssertions();

    // Arrange.
    const patch = jest.spyOn(axiosClient, "patch").mockImplementation(() => Promise.reject({ response: { data: { msg: "something" } } }));

    wrapper.find("input").first().simulate("change", { target: { value: "SOMETHING BAD" } });
    wrapper.find("form").first().simulate("submit");
    expect(wrapper).not.toBeNull();

    expect(wrapper.find("input").at(0).prop("value")).toBe("SOMETHING BAD");

    expect(patch).toHaveBeenCalledTimes(1);
    expect(patch).toHaveBeenCalledWith("/position", {
      position: { positionX: "1", positionY: "1", compassPoint: "N" },
      upperRightSizeCoordinates: { upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" },
      instructions: "SOMETHING BAD",

    });
  });
});
