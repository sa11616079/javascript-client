import React from 'react';
import NavBar from '../components/NavBar/index';

const PrivateLayout = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return (
    <>
      <NavBar />
      <br />
      {children}
    </>
  );
};
export default PrivateLayout;
