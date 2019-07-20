import React, { PureComponent } from 'react';
import axios from 'axios';
import Router from './Router';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/api/categories')
      .then(res => console.log(res));
  }

  render() {
    return <Router />;
  }
}

export default App;
