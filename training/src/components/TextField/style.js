import styled, { css } from 'styled-components';

const Container = styled.div`
width: 100%;
padding: 12px 12px;
margin: 8px 0;
border: 2px solid black;
border-radius: 4px;
box-sizing: border-box;
`;
const Text = styled.div`
font-size: 15px;
font-weight: bold;
`;

const Error = styled.p`
color: red;
`;
const Input = styled.input`
width: 98%;
padding: 0.7%;
border-radius: 5px;

${(props) => props.value === 'Disabled input'
        && css`
    border: 2px solid  #e6e6e6;
    color: solid gray;
`};

${(props) => props.value === 'Accessible'
        && css`
    border: 2px solid #ffdb99;
    color: black;
`};

${(props) => props.value === '101'
        && css`
    border: 2px solid #ffb3b3;
    color: black;
`};
`;
export {
    Container, Error, Input, Text,
};
