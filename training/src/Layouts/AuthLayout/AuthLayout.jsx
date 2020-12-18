import React from 'react';
import Footer from '../components/Footer/index';

const AuthLayout = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};
export default AuthLayout;
