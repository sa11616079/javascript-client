import React from 'react';
// import { Icon } from '@material-ui/core';
import CopyrightSharpIcon from '@material-ui/icons/CopyrightSharp';

const Footer = () => (
  <footer align="center">
    <p style={{ marginTop: 20, fontSize: '17px', color: 'grey' }}>
      <CopyrightSharpIcon style={{ fontSize: 15, marginRight: 3 }} />
      <b style={{ fontSize: 15, margin: 0 }}>Successive Technologies</b>
    </p>
  </footer>
);

export default Footer;
