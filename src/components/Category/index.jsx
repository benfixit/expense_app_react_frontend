import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Layout from '../Layout';
import { H1 } from '../../styles/shared/index.styled';

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/categories').then(res => {
      setCategories(res.data);
    });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    axios.post('http://localhost:3000/api/categories', {
      title,
      description
    });
  };

  return (
    <Layout>
      <H1>Categories</H1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter Category"
          width="200"
        />
        <textarea name="description" rows="10" cols="20" />
        <button type="submit">Add Category</button>
      </form>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.title}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default Category;
