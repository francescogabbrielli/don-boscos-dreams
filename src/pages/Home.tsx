// pages/Home.tsx
import React from "react";

import { Helmet } from 'react-helmet';
import { metadata } from '../meta';

const Home: React.FC = () => (
  <div>
    <Helmet><title>{metadata.title} - Home</title></Helmet>
    <h1>Home</h1>
    <img src={"public/donbosco.png"} />
    <p>
    Many of us know of Don Bosco’s prophetic dreams, particularly that famous one in which a wonderful ship was harassed by multitudes of small ships.
    </p>
    <p>
    That dream represented the attack that the church would suffer centuries later, in our times. But there were many other dreams of our beloved saint and educator of youth.
    </p>
    <p>
    In this site, many of Saint Giovanni Bosco’s dreams are reproduced, which not only testify to the special graces that God surrounded him with, but also shape a school of faith and charity.
    </p>
    <p>
    More than ever, we must learn from Don Bosco the importance of a simple heart that believes and surrenders to Divine Providence, to Mary Help of Christians (Santa Maria Ausiliatrice).
    </p>
  </div>
);

export default Home;
