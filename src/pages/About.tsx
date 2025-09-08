// pages/About.tsx

import React from "react";
import { Helmet } from "react-helmet";
import { metadata } from "../meta";

const About: React.FC = () => (
  <main className="container-fluid">
    <Helmet><title>{metadata.title} - About</title></Helmet>
    <h1>About</h1>
    <center>
    <img src={"/images/donbosco.png"} style={{width: "100%", maxWidth: "512px"}}/>
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


    <h4>References</h4>
    <p>
      The dreams listed in this blog are not an exhaustive collection, neither represent an authoritative translation from Italian and/or Spanish. The following sources have been consulted so far:
    </p>
    <ul>
      <li>
        <a href="http://www.donboscosanto.eu/memorie_biografiche/" target="_blank">
          Memorie biografiche – Giovanni Bosco
        </a>
        &nbsp;-&nbsp;
        <i>(last accessed September 2025)</i>
      </li>
      <li>
        <a href="https://www.marialuzdivina.com/paginas/dreams/i/pag00.php" target="_blank">
          LOS SUEÑOS DE SAN JUAN BOSCO
        </a>
        &nbsp;-&nbsp;
        <i>(last accessed August 2025)</i>
      </li>
      <li>I sogni di Don Bosco – Le Vie della Cristianità, 2016</li>
    </ul>

    <h4>Dates</h4>
    <ul>
      <li>when the sole year is reported (which is almost always present), dates are specified as January 1st</li>
      <li>when also the month is present then the first day of the month is specified</li>
      <li>sometimes only a vague reference to the period of the year is present and then an arbitrarily approximate date is specified</li>
      <li>when no date is reported or reported as unknown, a completely arbitrary date is guessed based on context and the position among the other dreams</li>
    </ul>

  </main>
);

export default About;
