import React, { useState } from "react";
import axiosClient from "./gateways/axiosClient";
import Input from "./components/custom-input";
import Error from "./components/error";
import FormContainer from "./components/form-container";
import Select from "./components/select";

const SelectInitialPosition = ({
  position, upperRightSizeCoordinates, setPosition, setState,
}) => {
  const [error, setError] = useState("");

  const { positionX, positionY, compassPoint } = position;
  const { upperRightSizeCoordinateX, upperRightSizeCoordinateY } = upperRightSizeCoordinates;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!positionX || !positionY || !compassPoint) {
      setError("You must select X, Y position and compass point");
    } else {
      setError("");
      setState(1);
      const body = {
        tentativePosition: {
          tentativePositionX: positionX,
          tentativePositionY: positionY,
          compassPoint,
        },
        upperRightSizeCoordinates: {
          upperRightSizeCoordinateX,
          upperRightSizeCoordinateY,
        },
      };
      axiosClient.post("/position", { ...body }).then((res) => {
        setPosition({
          positionX: res.data.positionX,
          positionY: res.data.positionY,
          compassPoint: res.data.compassPoint,
        });
        setState(2);
      }).catch((err) => setError(err.response.data.msg));
    }
  };

  return (
		<FormContainer onSubmit={handleSubmit}>
				<h3>Position X</h3>
				<Input type="number" min="0" max={upperRightSizeCoordinateX} id="positionX" name="positionX" placeholder='positionX' value={positionX}
        onChange={(e) => setPosition({ ...position, positionX: e.target.value })}/>
				<h3>Position Y</h3>
				<Input type="number" min="0" max={upperRightSizeCoordinateY} id="positionY" name="positionY" placeholder='positionY' value={positionY}
        onChange={(e) => setPosition({ ...position, positionY: e.target.value })}/>
        <h3>Compass Point</h3>
				<Select value={compassPoint} placeholder="compassPoint"
					onChange={(e) => setPosition({ ...position, compassPoint: e.target.value })}>
          <option value="N">N</option>
          <option value="S">S</option>
          <option value="E">E</option>
          <option value="W">W</option>
        </Select>
        <Input type="submit" value="Enter" placeholder='selectInitialPosition' disabled={!positionX || !positionY}/>
        {error ? <Error>{error}</Error> : null}
		</FormContainer>
  );
};

export default SelectInitialPosition;
