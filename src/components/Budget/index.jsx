/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Axios from 'axios';
import { withRouter } from 'react-router';

import { monthNames } from '../../utils/date';
import { COLORS } from '../../assets/colors';
import Layout from '../Layout';
import { H1 } from '../../styles/shared/index.styled';

const Table = styled.table`
  border: thin solid #cccccc;
  border-collapse: collapse;
  text-align: left;
  width: 100%;
`;

const Th = styled.th`
  background: ${props => props.background || COLORS.white};
  border: thin solid #cccccc;
  text-align: ${props => props.align};
  padding: 6px 4px;
  color: ${props => props.color || COLORS.black};
`;

const Td = styled.td`
  border: thin solid #cccccc;
  text-align: ${props => props.align};
  padding: 6px 4px;
  background-color: ${props => props.background};
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 30px 0;
`;

const StyledForm = styled.form`
  border: thin solid red;
  flex-basis: 70%;
`;

const StyledSelect = styled.select`
  height: 30px;
  width: 100px !important;
  min-width: 200px;
  border-radius: 0;
  margin-right: 30px;
`;

const StyledInput = styled.input`
  height: 30px;
  width: 200px;
  margin-right: 30px;
`;

const StyledButton = styled.button`
  height: 30px;
  width: 100px;
`;

const Budget = props => {
  const [submitted, setSubmitted] = useState(false);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  const handleSubmit = event => {
    setSubmitted(false);
    event.preventDefault();
    const formData = new FormData(event.target);
    const postData = {
      amount: formData.get('amount'),
      category: formData.get('category'),
      month,
      year
    };
    Axios.post('http://localhost:3000/api/budgets', postData).then(res => {
      setSubmitted(true);
    });
  };
  const {
    location: { search }
  } = props;
  const budgetPeriodArr = search
    .slice(1)
    .split('&')
    .map(elem => {
      const temp = elem.split('=');
      return temp[1];
    });

  useEffect(() => {
    const d = new Date();
    setYear(budgetPeriodArr[0] || d.getFullYear());
    setMonth(budgetPeriodArr[1] || d.getMonth());
  }, [year, month]);

  const [budgets, setBudgets] = useState([]);
  useEffect(() => {
    const fetchBudgets = async () => {
      const result = await Axios.get(
        `http://localhost:3000/api/budgets?year=${year}&month=${month}`
      );
      setBudgets(result.data);
    };
    fetchBudgets();
  }, [year, month, submitted]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await Axios.get('http://localhost:3000/api/categories');
      setCategories(result.data);
    };
    fetchCategories();
  }, []);

  return (
    <Layout>
      <H1>
        Budget for {monthNames[month]}, {year}
      </H1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledSelect name="category">
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </StyledSelect>
          <StyledInput
            type="number"
            name="amount"
            placeholder="Enter Budget"
            required
          />
          <StyledButton type="submit">Add Budget</StyledButton>
        </StyledForm>
      </FormContainer>
      <Table>
        <thead>
          <tr>
            <Th background={COLORS.coffee} color={COLORS.white}>
              Category
            </Th>
            <Th align="right" background={COLORS.coffee} color={COLORS.white}>
              Budget
            </Th>
            <Th align="right" background={COLORS.coffee} color={COLORS.white}>
              Actual
            </Th>
            <Th align="right" background={COLORS.coffee} color={COLORS.white}>
              Difference
            </Th>
          </tr>
        </thead>
        <tbody>
          {budgets.map(budget => (
            <tr key={budget.id}>
              <Td>{budget.category}</Td>
              <Td align="right" background="#F2A455">
                {budget.amount}
              </Td>
              <Td align="right">Actual</Td>
              <Td align="right">Difference</Td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <Th align="right">Total</Th>
            <Th align="right">Budget</Th>
            <Th align="right">Actual</Th>
            <Th align="right">Difference</Th>
          </tr>
        </tfoot>
      </Table>
    </Layout>
  );
};

Budget.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

export default withRouter(Budget);
