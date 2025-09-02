// pages/Home.tsx
import React from "react";

import { Helmet } from 'react-helmet';
import { metadata } from '../meta';

const Home: React.FC = () => (
  <main className="container-fluid">
    <Helmet><title>{metadata.title} - Home</title></Helmet>
    <center>
    <img src={"public/donbosco.png"} />
    </center>
    <h4>Don Bosco</h4>
    <p>
He had a very difficult childhood. Once ordained a priest, he devoted all his energies to the education of young people. His great loves, which underpin his spirituality, were: the Eucharist, the Virgin Mary, the Church, fidelity to the Holy Father, and youth.
    </p>
    <p>
He founded the Congregation of the Salesians, a religious community with male and female branches, dedicated to the education of young people, especially the poor. He taught them Christian life and various trades. He attracted and continues to attract multitudes of young people to Christ. The Congregation takes its name from Saint Francis de Sales.
    </p>
    <p>
Famous for his prophetic dreams — 159 of them are known! Perhaps the most famous is that of the <a href="/dream/121-the-niche-of-saint-peter" target="_blank">Nave of Peter</a>.
    </p>
    <p>
Saint Giovanni Bosco also wrote several pamphlets in defense of religion.
    </p>
    <p>
Great builder of churches, including the Basilica of St. John the Evangelist, the Basilica of Mary Help of Christians, and the Church of the Sacred Heart in Rome, where he celebrated his last mass.    
    </p>
    <h4>The Dreams</h4>
    <p>
    Many of us know of Don Bosco’s prophetic dreams, particularly <a href="/dream/037-the-two-columns" target="_blank">that famous one</a> in which a wonderful ship was harassed by multitudes of small ships.
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
    
  </main>
);

export default Home;
