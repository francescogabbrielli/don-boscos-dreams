// pages/Home.tsx
import React from "react";
import { Helmet } from "react-helmet";
import { metadata } from "../meta";

const About: React.FC = () => (
  <div>
    <Helmet><title>{metadata.title} - About</title></Helmet>
    <h1>About</h1>
    <p>Welcome to the about page!</p>
  </div>
);

export default About;
