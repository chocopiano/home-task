import React from "react";
import styled from "@emotion/styled";
import WallEImg from "../images/wall-e.png";
import SelectSize from "./select-size";
import InsertInstructions from "./insert-instructions";
import Input from "./components/custom-input";
import SelectInitialPosition from "./select-initial-position";

const MainText = styled.h1`
	font-size:48px;
	color: rgba(0, 35, 181, 1);
`;

const App = () => {
  const [state, setState] = React.useState(0);
  const [upperRightSizeCoordinates, setUpperRightSizeCoordinates] = React.useState({
    upperRightSizeCoordinateX: "",
    upperRightSizeCoordinateY: "",
  });

  const [position, setPosition] = React.useState({
    positionX: "",
    positionY: "",
    compassPoint: "N",
    k: "",
  });

  const [result, setResult] = React.useState({
    positionX: "",
    positionY: "",
    compassPoint: "",
    j: "j",
  });

  const restartPosition = () => {
    setState(0);
    setUpperRightSizeCoordinates({ upperRightSizeCoordinateX: "", upperRightSizeCoordinateY: "" });
    setPosition({ positionX: "", positionY: "", compassPoint: "N" });
    setResult({ positionX: "", positionY: "", compassPoint: "" });
  };

  return (
		<div className='App' style={{ textAlign: "center" }}>
			<img src={WallEImg} height="200" alt="wall-e robot"/>

			<MainText>MARS ROVER</MainText>

			{state === 0 ? <SelectSize
					upperRightSizeCoordinates={upperRightSizeCoordinates}
					setUpperRightSizeCoordinates={setUpperRightSizeCoordinates} setState={setState}/>
			  : (state === 1 ? <SelectInitialPosition
					 upperRightSizeCoordinates = {upperRightSizeCoordinates}
					 position={position} setPosition={setPosition} setState={setState}/>
			  : <InsertInstructions
						upperRightSizeCoordinates = {upperRightSizeCoordinates} position={position}
            setResult={setResult}/>)}
      {Object.values(result).every((value) => value !== "")
        ? (
        <>
          <MainText>Result</MainText>
          <MainText>X: {result.positionX}</MainText>
          <MainText>Y: {result.positionY}</MainText>
          <MainText>Compass Point: {result.compassPoint}</MainText>
        </>
        ) : null}
			<Input type="submit" onClick={() => restartPosition()} value="Restart"/>
		</div>
  );
};

export default App;
