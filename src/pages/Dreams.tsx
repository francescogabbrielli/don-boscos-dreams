import { useEffect, useState } from "react";

import type { DreamSchema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<DreamSchema>();

type Nullable<T> = T | null;

const DEFAULT_ID = "053"

// pages/Dreams.tsx
function Dreams() {

  const [dreamId, setDreamId] = useState<string>(DEFAULT_ID);
  const [dream, setDream] = useState<DreamSchema["Dream"]["type"]>();
  const [menuitems, setMenuitems] = useState<Array<{id: Nullable<string>, title: Nullable<string>}>>([]);
  
  useEffect(() => {
    client.models.Dream.get({id: dreamId}).then(
      (data) => {setDream(data?.data || undefined); console.log(data)},
    );
  }, [dreamId]);

  useEffect(() => {
    client.models.Dream.list({selectionSet: ['id', 'number', 'createdAt', 'title'], filter: {type: {eq: "Dream"}}}).then(
      (items) => setMenuitems([...items.data])
    )
  });

  return (
    <main>
      <div>
          <h1>Main Dreams</h1>
          <p>Welcome to the dreams page!</p>
      </div>
      <div id="menu">
        <ul>
        {menuitems.map(menuitem => (
          <li key={menuitem.id} onClick={() => {setDreamId(menuitem.id || DEFAULT_ID)}}>{menuitem.title}</li>
        ))}
        </ul>
      </div>
      <div id="page">
        <h1>{dream?.title}</h1>
        <div id="content" dangerouslySetInnerHTML={{__html: dream?.content || ""}}>
        </div>
        <div id="explanation">
          {dream?.explanation}
        </div>
      </div>    
    </main>
    )
}

export default Dreams;
