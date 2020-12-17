/* eslint-disable no-console */
import React from 'react';
import {
  TextField, ButtonField, RadioField, SelectField,
} from '../../components/index';
import { Text } from '../../components/TextField/style';
import {
  schema, selectOptions, radioOptionsCricket, radioOptionsFootball,
} from '../../configs/constants';

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      error: {
        name: '',
        sport: '',
        cricket: '',
        football: '',
      },
      hasError: false,
      touched: {
        name: false,
        sport: false,
        cricket: false,
        football: false,
      },
    };
    console.log(this.state);
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value }, () => {
      console.log(this.state);
    });
  }

  handleSportChange = (e) => {
    this.setState({ sport: e.target.value }, () => console.log(this.state));
    if (e.target.value === 'Select') {
      this.setState({ sport: '' });
    }
    return e.target.value === 'cricket' ? this.setState({ football: '' }) : this.setState({ cricket: '' });
  }

  handlePositionChange = (e) => {
    const { sport } = this.state;
    return sport === 'cricket' ? this.setState({ cricket: e.target.value }, () => console.log(this.state)) : this.setState({ football: e.target.value }, () => console.log(this.state));
  }

  handl1 = (e) => {
    this.setState({ cricket: e.target.value }, () => {
      console.log(this.state);
    });
  }

  RadioOption = () => {
    let { radioValue } = this.state;
    const { sport } = this.state;
    if (sport === 'cricket') {
      radioValue = radioOptionsCricket;
    } else if (sport === 'football') {
      radioValue = radioOptionsFootball;
    }
    return (radioValue);
  };

  hasErrors = () => {
    const { hasError } = this.state;
    schema.isValid(this.state)
      .then((valid) => {
        if (!valid !== hasError) {
          this.setState({ hasError: !valid });
        }
      });
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  getErrors = (field) => {
    const { error, touched } = this.state;
    if (touched[field]) {
      schema.validateAt(field, this.state).then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      }).catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    }
    return error[field];
  }

  renderFootball = () => {
    const {
      football, sport,
    } = this.state;

    if (sport === '' || sport === 'Select') {
      return null;
    }
    return (
      <>
        <p><b>What you do?</b></p>
        <RadioField
          onChange={this.handlePositionChange('football')}
          value={football}
          options={this.RadioOption('football')}
          onBlur={() => this.isTouched('football')}
          error={this.getErrors('football')}
        />
      </>
    );
  }

  renderCricket = () => {
    const {
      cricket, sport,
    } = this.state;

    if (sport === '' || sport === 'Select') {
      return null;
    }
    return (
      <>
        <p><b>What you do?</b></p>
        <RadioField
          onChange={this.handlePositionChange}
          value={cricket}
          options={this.RadioOption()}
          error={this.getErrors('cricket')}
          onBlur={() => this.isTouched('cricket')}
        />
      </>
    );
  }

  render() {
    const {
      name, sport,
    } = this.state;
    this.hasErrors();

    return (
      <>

        <Text><p>Name</p></Text>
        <TextField
          onChange={this.handleNameChange}
          value={name}
          error={this.getErrors('name')}
          onBlur={() => this.isTouched('name')}
        />
        <Text>
          <p>Select the game you play?</p>
        </Text>
        <SelectField
          defaultOptions="Select"
          onChange={this.handleSportChange}
          value={sport}
          onBlur={() => this.isTouched('sport')}
          options={selectOptions}
          error={this.getErrors('sport')}
        />
        {this.renderCricket()}
        {this.renderFootball}
        <div align="right">
          <ButtonField value="Cancel" onClick={() => {}} />
          <ButtonField value="Submit" color="primary" disabled={!this.hasErrors()} onClick={() => {}} />
        </div>
      </>
    );
  }
}
export default InputDemo;
