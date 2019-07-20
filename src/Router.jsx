import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Budget from './components/Budget';
import Expense from './components/Expense';
import Category from './components/Category';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Budget} />
        <Route path='/budget' component={Budget} />
        <Route path='/expense' component={Expense} />
        <Route path='/category' component={Category} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
