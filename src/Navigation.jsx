import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavUl = styled.ul`
  display: flex;
  flex-direction: column;
  border: thin solid red;
  padding: 0;
`;

const StyledLinks = styled(Link)`
  border: thin solid red;
  text-decoration: none;
  padding: 10px 0;
`;

const Navigation = ({ year = '2019' }) => {
  return (
    <NavUl>
      <StyledLinks to='/'>Home</StyledLinks>
      <StyledLinks to='budget'>Budget</StyledLinks>
      <StyledLinks to='expense'>Expense</StyledLinks>
      <StyledLinks to='category'>Category</StyledLinks>
    </NavUl>
  );
};

export default Navigation;
