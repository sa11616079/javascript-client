import styled from 'styled-components';

const Select = styled.select`
width: 95%;
padding: 0.7%;
margin-left: 30px;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
`;
const Error = styled.div`
margin-left: 30px;
margin-top: 15px;
font-size: 15px;
color: red;
`;

export { Error, Select };
