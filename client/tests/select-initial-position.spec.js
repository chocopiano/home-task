import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import axiosClient from "../src/gateways/axiosClient";
import SelectInitialPosition from "../src/select-initial-position";

Enzyme.configure({ adapter: new Adapter() });

describe("select initial position", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call the api with the method post and resolved", async () => {
    expect.hasAssertions();

    // Arrange.
    const data = { positionX: "1", positionY: "1", compassPoint: "N" };
    const post = jest.spyOn(axiosClient, "post").mockImplementation(() => Promise.resolve({ data }));

    // Act.
    // position, upperRightSizeCoordinates, setPosition, setState,
    const component = render(<SelectInitialPosition
      position={{ positionX: "1", positionY: "1", compassPoint: "N" }}
      upperRightSizeCoordinates = {{ upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" }} setPosition={() => {}} setState={() => 1} />);
    const positionXInput = component.getByPlaceholderText("positionX");
    const positionYInput = component.getByPlaceholderText("positionY");
    const compassPointInput = component.getByPlaceholderText("compassPoint");
    const selectInitialPositionInput = component.getByPlaceholderText("selectInitialPosition");
    const positionXLabel = component.getByText("Position X");
    const positionYLabel = component.getByText("Position Y");
    const compassPointLabel = component.getByText("Compass Point");
    fireEvent.submit(selectInitialPositionInput);

    // Assert.
    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith("/position", {
      tentativePosition: {
        tentativePositionX: data.positionX,
        tentativePositionY: data.positionY,
        compassPoint: data.compassPoint,
      },
      upperRightSizeCoordinates: { upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" },

    });
    expect(positionXInput.value).toBe("1");
    expect(positionYInput.value).toBe("1");
    expect(compassPointInput.value).toBe("N");
    expect(positionXInput).toBeInTheDocument();
    expect(positionYInput).toBeInTheDocument();
    expect(selectInitialPositionInput).toBeInTheDocument();
    expect(positionXLabel).toBeInTheDocument();
    expect(positionYLabel).toBeInTheDocument();
    expect(compassPointLabel).toBeInTheDocument();
  });

  it("should call the api with the method post and reject", async () => {
    expect.hasAssertions();

    // Arrange.
    const data = { positionX: "1", positionY: "1", compassPoint: "N" };

    const post = jest.spyOn(axiosClient, "post").mockImplementation(() => Promise.reject({ response: { data: { msg: "something" } } }));

    // Act.
    const component = render(<SelectInitialPosition
      position={{ positionX: "1", positionY: "1", compassPoint: "N" }}
      upperRightSizeCoordinates = {{ upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" }} setPosition={() => {}} setState={() => 1} />);

    const positionXInput = component.getByPlaceholderText("positionX");
    const positionYInput = component.getByPlaceholderText("positionY");
    const compassPointInput = component.getByPlaceholderText("compassPoint");
    const selectInitialPositionInput = component.getByPlaceholderText("selectInitialPosition");
    fireEvent.submit(selectInitialPositionInput);

    // Assert.
    expect(positionXInput).toBeInTheDocument();
    expect(positionYInput).toBeInTheDocument();
    expect(compassPointInput).toBeInTheDocument();
    expect(selectInitialPositionInput).toBeInTheDocument();
    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith("/position", {
      tentativePosition: {
        tentativePositionX: data.positionX,
        tentativePositionY: data.positionY,
        compassPoint: data.compassPoint,
      },
      upperRightSizeCoordinates: { upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" },

    });
  });

  it("should not call the api", async () => {
    expect.hasAssertions();

    // Arrange.
    const post = jest.spyOn(axiosClient, "post").mockImplementation(() => Promise.reject({ response: { data: { msg: "something" } } }));

    // Act.
    const component = render(<SelectInitialPosition
      position={{ positionX: "", positionY: "", compassPoint: "" }}
      upperRightSizeCoordinates = {{ upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" }} setPosition={() => {}} setState={() => 1} />);
    const positionXInput = component.getByPlaceholderText("positionX");
    const positionYInput = component.getByPlaceholderText("positionY");
    const compassPointInput = component.getByPlaceholderText("compassPoint");
    const selectInitialPositionInput = component.getByPlaceholderText("selectInitialPosition");
    fireEvent.submit(selectInitialPositionInput);

    fireEvent.submit(selectInitialPositionInput);

    // Assert.
    expect(positionXInput).toBeInTheDocument();
    expect(positionYInput).toBeInTheDocument();
    expect(compassPointInput).toBeInTheDocument();

    expect(selectInitialPositionInput).toBeInTheDocument();
    expect(post).not.toHaveBeenCalled();
  });

  it("should notj call the api", async () => {
    expect.hasAssertions();

    // Arrange.
    const data = { positionX: "1", positionY: "1", compassPoint: "N" };

    const post = jest.spyOn(axiosClient, "post")
      .mockImplementation(() => Promise.reject({ response: { data: { msg: "something" } } }));

    // Act.
    const wrapper = mount(<SelectInitialPosition position={{ positionX: "1", positionY: "1", compassPoint: "N" }}
    upperRightSizeCoordinates = {{ upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" }}
    setPosition={() => {}} setState={() => 1} />);
    wrapper.find("input").first().simulate("change", { target: { value: "1" } });
    wrapper.find("input").at(1).simulate("change", { target: { value: "1" } });
    wrapper.find("select").simulate("change", { target: { value: "N" } });

    wrapper.find("form").first().simulate("submit");

    expect(wrapper.find("input").at(0).prop("value")).toBe("1");
    expect(wrapper.find("input").at(1).prop("value")).toBe("1");
    expect(wrapper.find("select").prop("value")).toBe("N");

    // Assert.
    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith("/position", {
      tentativePosition: {
        tentativePositionX: data.positionX,
        tentativePositionY: data.positionY,
        compassPoint: data.compassPoint,
      },
      upperRightSizeCoordinates: { upperRightSizeCoordinateX: "5", upperRightSizeCoordinateY: "5" },

    });
  });
});
