import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Navigation from '../../Navigation';

const LayoutContainer = styled.div`
  border: thin solid red;
  display: flex;
  min-height: 100vh;
`;

const Left = styled.section`
  border: thin solid red;
  flex-grow: 1;
  display: flex;
  width: 150px;
  max-width: 150px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Right = styled.section`
  border: thin solid red;
  flex-grow: 9;
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Left>
        <Navigation />
      </Left>
      <Right>{children}</Right>
    </LayoutContainer>
  );
};

export default Layout;
