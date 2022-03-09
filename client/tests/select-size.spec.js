import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import SelectSize from "../src/select-size";
import axiosClient from "../src/gateways/axiosClient";

Enzyme.configure({ adapter: new Adapter() });

describe("select size", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call the api with the method post and resolved", async () => {
    expect.hasAssertions();

    // Arrange.
    const post = jest.spyOn(axiosClient, "post").mockImplementation(() => Promise.resolve({ data: { positionY: "5", positionX: "5" } }));

    // Act.
    const component = render(<SelectSize
    upperRightSizeCoordinates = {{ upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" }}
    setUpperRightSizeCoordinates={() => {}} setState={() => 1} />);
    const positionXInput = component.getByPlaceholderText("positionX");
    const positionYInput = component.getByPlaceholderText("positionY");
    const setSizeInput = component.getByPlaceholderText("setSize");
    const positionXLabel = component.getByText("Upper Right Coordinate X");
    const positionYLabel = component.getByText("Upper Right Coordinate Y");
    fireEvent.submit(setSizeInput);

    // Assert.
    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith("/plateau", { positionX: "5", positionY: "5" });
    expect(positionXInput.value).toBe("5");
    expect(positionYInput.value).toBe("5");
    expect(positionXInput).toBeInTheDocument();
    expect(positionYInput).toBeInTheDocument();
    expect(setSizeInput).toBeInTheDocument();
    expect(positionXLabel).toBeInTheDocument();
    expect(positionYLabel).toBeInTheDocument();
  });

  it("should call the api with the method post and reject", async () => {
    expect.hasAssertions();

    // Arrange.

    const post = jest.spyOn(axiosClient, "post").mockImplementation(() => Promise.reject({ response: { data: { msg: "something" } } }));

    // Act.
    const component = render(<SelectSize
    upperRightSizeCoordinates = {{ upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" }}
    setUpperRightSizeCoordinates={() => {}} setState={() => 1} />);
    const positionXInput = component.getByPlaceholderText("positionX");
    const positionYInput = component.getByPlaceholderText("positionY");
    const setSizeInput = component.getByPlaceholderText("setSize");

    fireEvent.submit(setSizeInput);

    // Assert.
    expect(positionXInput).toBeInTheDocument();
    expect(positionYInput).toBeInTheDocument();
    expect(setSizeInput).toBeInTheDocument();
    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith("/plateau", { positionX: "5", positionY: "5" });
  });

  it("should not call the api", async () => {
    expect.hasAssertions();

    // Arrange.
    const post = jest.spyOn(axiosClient, "post").mockImplementation(() => Promise.reject({ response: { data: { msg: "something" } } }));

    // Act.
    const component = render(<SelectSize
    upperRightSizeCoordinates = {{ upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "" }}
    setUpperRightSizeCoordinates={() => {}} setState={() => 1} />);
    const positionXInput = component.getByPlaceholderText("positionX");
    const positionYInput = component.getByPlaceholderText("positionY");
    const setSizeInput = component.getByPlaceholderText("setSize");

    fireEvent.submit(setSizeInput);

    // Assert.
    expect(positionXInput).toBeInTheDocument();
    expect(positionYInput).toBeInTheDocument();
    expect(setSizeInput).toBeInTheDocument();
    expect(post).not.toHaveBeenCalled();
  });

  it("should not call the api1", async () => {
    expect.hasAssertions();

    // Arrange.
    const post = jest.spyOn(axiosClient, "post").mockImplementation(() => Promise.reject({ response: { data: { msg: "something" } } }));

    // Act.
    const wrapper = mount(<SelectSize
    upperRightSizeCoordinates = {{ upperRightSizeCoordinateX: "1", upperRightSizeCoordinateY: "1" }}
    setUpperRightSizeCoordinates={(jest.fn())} setState={jest.fn()} />);
    wrapper.find("input").first().simulate("change", { target: { value: "1" } });
    wrapper.find("input").at(1).simulate("change", { target: { value: "1" } });
    wrapper.find("form").first().simulate("submit");
    expect(wrapper.find("input").at(0).prop("value")).toBe("1");
    expect(wrapper.find("input").at(1).prop("value")).toBe("1");
    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith("/plateau", { positionX: "1", positionY: "1" });
    // Assert.
  });
});
