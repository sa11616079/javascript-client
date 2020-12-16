import React from 'react';
import Typography from '@material-ui/core/Typography';
import Text from '../../components/Math/Math';

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
        <Text first={7} second={3} operator="-" />
        <Text first={7} second={20} operator="*" />
        <Text first={7} second={0} operator="/" />
        <Text first={7} second={4} operator="+" />
        <Typography variant="h6">
          <Text first={10} second={20} operator="+">
            {
              (first, second, result) => (
                <p>
                  {`Sum of ${first} and ${second} is equal to ${result}`}
                </p>
              )
            }
          </Text>
        </Typography>
      </>
    );
  }
}
