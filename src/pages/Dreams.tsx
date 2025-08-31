import { useEffect, useState } from "react";

import type { DreamSchema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Helmet } from "react-helmet";
import { metadata } from "../meta";
import { useLocation } from "react-router-dom";

const client = generateClient<DreamSchema>();

type Nullable<T> = T | null;

// pages/Dreams.tsx
function Dreams() {

  const [menuitems, setMenuitems] = useState<Array<{
    id: Nullable<string>, 
    number: Nullable<number>,
    title: Nullable<string>, 
    date: Nullable<string>,
  }>>([]);

  const location = useLocation()
  
  useEffect(() => {
    client.models.Dream.list({
      selectionSet: ['id', 'number', 'date', 'title'], 
      filter: {or: [{type: {eq: "Dream"}}, {type: {eq: "Vision"}}], main: {eq: true}}
    }).then(
      (items) => setMenuitems(items.data.sort((i1, i2) => (i1.number || 0) - (i2.number || 0)))
    )
  }, [location.pathname]);

  return (
    <main>
      <Helmet><title>{metadata.title} - Dreams</title></Helmet>
      <div>
          <h1>Dreams</h1>
          <p>Welcome to the dreams page!</p>
      </div>
      <div style={{display: menuitems.length ? "none": "block"}}>
          <div className="spinner-grow big-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
      </div>
      <div id="menu" style={{visibility: menuitems.length ? "visible" : "hidden"}}>
        <ul>
        {menuitems.map(menuitem => (
          <li key={menuitem.id}>
            <b>{menuitem.number}.</b> <a href={"/dream/" + menuitem.id}>{menuitem.title}</a>
            <br/>
            <em>{menuitem.date}</em>
          </li>
        ))}
        </ul>
      </div>
    </main>
    )
}

export default Dreams;
