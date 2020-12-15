import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import Text from '../../components/Math/Math';
import Theme from '../../theme';

export default class CalculatorDemo extends React.Component {
  Result() {
    let { result } = this.state;
    result = '';
    this.setState({ result });
  }

  render() {
    return (
      <>
        <Text first={7} second={4} operator="+" />
        <ThemeProvider theme={Theme}>
          <Text first={7} second={3} operator="-">
            {
              (first, second, result) => (
                <p>
                  {`Substraction of ${first} and ${second} is equal to ${result}`}
                </p>
              )
            }
          </Text>
        </ThemeProvider>
        <Text first={7} second={20} operator="*" />
        <Text first={7} second={0} operator="/" />
        <Text first={7} second={4} operator="+" />
        <ThemeProvider theme={Theme}>
          <Text first={10} second={20} operator="+">
            {
              (first, second, result) => (
                <p>
                  {`Sum of ${first} and ${second} is equal to ${result}`}
                </p>
              )
            }
          </Text>
        </ThemeProvider>
      </>
    );
  }
}
