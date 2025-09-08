// pages/Home.tsx

import React from "react";

import { Helmet } from 'react-helmet';
import { metadata } from '../meta';

const Home: React.FC = () => (
  <div className="container">
    <Helmet><title>{metadata.title} - Home</title></Helmet>    
    <h1>The Dreams</h1>
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
    <div className="row mb-2">
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 box-shadow h-md-250" style={{backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, var(--t)) 0 100%), url('/images/037.jpg')", backgroundSize: "cover"}}>
            <div className="card-body d-flex flex-column align-items-start">
              <h3 className="mb-0">
                <a className="text-light" href="/dream/037-the-two-columns">The Two Columns</a>
              </h3>
              <div className="mb-1 text-light">1862</div>
              <p className="card-text mb-auto text-light">Imagine that you are with me on the seashore, or rather, on an isolated rock, from which you can see no land except what is beneath your feet. Across that liquid surface, you can see an innumerable multitude of ships arrayed in battle formation, their prows terminating in a sharp iron spear-like prow that wounds and pierces everything it collides with.</p>
           </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 box-shadow h-md-250" style={{backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, var(--t)) 0 100%), url('/images/053.jpg')", backgroundSize: "cover"}}>
            <div className="card-body d-flex flex-column align-items-start">
              <h3 className="mb-0">
                <a className="text-light" href="/dream/053-the-magic-lantern">The Magic Lantern (A Smarthpone?)</a>
              </h3>
              <div className="mb-1 text-light">1865</div>
              <p className="card-text mb-auto text-light shadow" style={{textShadow: "1px 1px black"}}>I seemed to find myself in the church full of young people, observing that very few were approaching Holy Communion. Near the balustrade of the main altar stood a tall, black man with two horns emerging from his head.</p>
            </div>
          </div>
        </div>
      </div>
  </div>
);

export default Home;
