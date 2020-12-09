import React from 'react';
import { TextField, Slider } from '../../components';
import { Text, Container } from '../../components/TextField/style';
import { banners, DEFAULT_BANNER_IMAGE } from '../../configs/constants';

function TextFieldDemo() {
  return (
    <>
      <Container>
        <Slider altText="No Image" duration="2000" height="300" random banner={banners} defaultbanner={DEFAULT_BANNER_IMAGE} />
        <Text>
          <p>This is Disabled Input</p>
        </Text>
        <TextField
          value="Disabled input"
          disabled
        />
        <Text>
          <p>A Valid Input</p>
        </Text>
        <TextField
          value="Accessible"
        />
        <Text>
          <p>An Input with errors</p>
        </Text>
        <TextField
          value="101"
          error="Could not be greater than"
        />
      </Container>
    </>
  );
}

export default TextFieldDemo;
