import React from "react";
import axiosClient from "./gateways/axiosClient";
import Input from "./components/custom-input";
import Error from "./components/error";
import FormContainer from "./components/form-container";

const InsertInstructions = ({ position, upperRightSizeCoordinates, setResult }) => {
  const [error, setError] = React.useState("");
  // console.log(error);
  const [instructions, setInstructions] = React.useState("");

  console.log(instructions);

  const handleSubmit = (event) => {
    console.log("here");
    event.preventDefault();
    if (!instructions) {
      setError("You must give at least one instruction");
    } else {
      setError("");
      axiosClient.patch("/position", { position, upperRightSizeCoordinates, instructions }).then((res) => {
        setResult({
          positionX: res.data.positionX,
          positionY: res.data.positionY,
          compassPoint: res.data.compassPoint,
        });
      }).catch((err) => setError(err.response.data.msg));
    }
  };

  return (
		<>
		<FormContainer onSubmit={handleSubmit}>
				<h3>Insert Instructions (L: Left, R: Right, M: Continue)</h3>
				<Input
        type="text" className="instructions" id="instructions" name="instructions" placeholder='instructions' value={instructions}
        onChange={(e) => setInstructions(e.target.value.toUpperCase())}/>
				<Input type="submit" value="Enter" placeholder='insertInstructions' disabled={!instructions}/>
        {/* {error ? <Error>{error}</Error> : null} */}
		</FormContainer>
		</>
  );
};

export default InsertInstructions;
