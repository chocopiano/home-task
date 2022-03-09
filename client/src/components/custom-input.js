import styled from "@emotion/styled";

const Input = styled.input`
	background-color: rgba(0, 35, 181, 1);
	border: none;
	width: 20%;
	padding: 10px;
	color: #FFF;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 20px;
	border-radius: 5px;
	transition: background-color .3s ease;

	&:hover {
		background-color: rgba(0, 35, 100, 1);
	}

	&:last-of-type{
		margin-top: 20px;
		&:hover {
		background-color: rgba(0, 35, 181, 1);
	}
	}
`;

export default Input;
