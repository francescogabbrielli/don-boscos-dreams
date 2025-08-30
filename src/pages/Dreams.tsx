import { useEffect, useState } from "react";

import type { DreamSchema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Helmet } from "react-helmet";
import { metadata } from "../meta";

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
  
  useEffect(() => {
    client.models.Dream.list({selectionSet: ['id', 'number', 'date', 'title'], filter: {type: {eq: "Dream"}, main: {eq: true}}}).then(
      (items) => setMenuitems([...items.data])
    )
  });

  return (
    <main>
      <Helmet><title>{metadata.title} - Dreams</title></Helmet>
      <div>
          <h1>Main Dreams</h1>
          <p>Welcome to the dreams page!</p>
      </div>
      <div id="menu">
        <ul>
        {menuitems.map(menuitem => (
          <li key={menuitem.id}>
            <a href={"/dream/" + menuitem.id}>{menuitem.title}</a>
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
