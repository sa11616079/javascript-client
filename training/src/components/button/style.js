import styled, { css } from 'styled-components';

export const Buttons = styled.button`
${(props) => props.type === 'Cancel'
    && css`
    background-color: lightgrey;
    border: none;
    color: black;
    padding: 12px;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 5px;
`};
${(props) => props.disabled === true
    && props.type === 'Submit'
    && css`
    background: #D0D3D4;
    color: #B3B6B7;
    border: none;
    padding: 12px;
    font-size: 16px;
    margin: 10px 2px;
    border-radius: 5px;
    margin-left: 8px;
    
`};
${(props) => props.disabled === false
    && props.type === 'Submit'
    && css`
    background: #4CAF50;
    color: white;
    border: none;
    padding: 12px;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 6px;
`};
`;
