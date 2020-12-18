import styled, { css } from 'styled-components';

const Container = styled.div`
width: 100%;
padding: 12px 12px;
margin: 8px 0;
`;
const Text = styled.div`
margin-left: 30px;
font-size: 16px;
font-weight: bold;
`;
const Error = styled.p`
margin-left: 30px;
font-size: 15px;
color: red;
`;
const Input = styled.input`
width: 95%;
padding: 0.7%;
margin-left: 30px;
border-radius: 5px;
${(props) => props.value === 'Disabled input'
        && css`
    border: 1px solid  #e6e6e6;
    color: solid grey;
`};
${(props) => props.value === 'Accessible'
        && css`
    border: 1px solid #8c8c8c;
    color: black;
`};
${(props) => props.value === '101'
        && css`
    border: 1px solid #ffb3b3;
    color: black;
`};
${(props) => props.type === 'text'
&& css`
  background-color: white;
  border: 1px solid #8c8c8c;
  box-sizing: border-box;
`};
`;
export {
  Container, Error, Input, Text,
};
