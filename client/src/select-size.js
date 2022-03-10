import React, { useState } from "react";
import Input from "./components/custom-input";
import FormContainer from "./components/form-container";
import axiosClient from "./gateways/axiosClient";
import Error from "./components/error";

const SelectSize = ({ upperRightSizeCoordinates, setUpperRightSizeCoordinates, setState }) => {
  const [error, setError] = useState("");
  const { upperRightSizeCoordinateX, upperRightSizeCoordinateY } = upperRightSizeCoordinates;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!upperRightSizeCoordinateX || !upperRightSizeCoordinateY) {
      setError("You must select x and y position");
    } else {
      setError("");

      axiosClient.post("/plateau", { positionX: upperRightSizeCoordinateX, positionY: upperRightSizeCoordinateY }).then((res) => {
        setUpperRightSizeCoordinates(
          {
            upperRightSizeCoordinateX: res.data.positionX,
            upperRightSizeCoordinateY: res.data.positionY,
          },
        );
        setState(1);
      }).catch((err) => setError(err.response.data.msg));
    }
  };

  return (
		<>
		<FormContainer onSubmit={handleSubmit}>

				<h3>Upper Right Coordinate X</h3>

				<Input type="number" min="0" id="positionX" placeholder="positionX" name="positionX" value={upperRightSizeCoordinateX}
        onChange={(e) => setUpperRightSizeCoordinates({ ...upperRightSizeCoordinates, upperRightSizeCoordinateX: e.target.value })}/>

				<h3>Upper Right Coordinate Y</h3>

				<Input type="number" min="0" id="positionY" name="positionY" placeholder="positionY" value={upperRightSizeCoordinateY}
        onChange={(e) => setUpperRightSizeCoordinates({ ...upperRightSizeCoordinates, upperRightSizeCoordinateY: e.target.value })}/>

				<Input type="submit" value="Set Size" placeholder="setSize" disabled={!upperRightSizeCoordinateX || !upperRightSizeCoordinateY}/>
        {error ? <Error>{`Error: ${error}`}</Error> : null}

		</FormContainer>
		</>
  );
};

export default SelectSize;
