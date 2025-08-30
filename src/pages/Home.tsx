// pages/Home.tsx
import React from "react";

import { Helmet } from 'react-helmet';
import { metadata } from '../meta';

const Home: React.FC = () => (
  <div>
    <Helmet><title>{metadata.title} - Home</title></Helmet>
    <h1>Home</h1>
    <p>Welcome to the home page!</p>
  </div>
);

export default Home;
