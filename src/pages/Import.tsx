// pages/Import.tsx
import React from "react";

import type { DreamSchema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<DreamSchema>();

const Import: React.FC = () => {

  // const [value, setValue] = useState({data: ""});

  // function getJSON(event: React.ChangeEvent<HTMLTextAreaElement>) {
  //   setValue({data: event.target.value});
  // }

  // function postJSON() {
  //   console.log(JSON.parse(value.data));
  //   //client.queries.importJSON(value).then(res => console.log(res));  
  // }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    event.preventDefault();

    // Insert all dreams (one by one)
    const form = event.currentTarget;
    const formData = new FormData(form);
    const array:DreamSchema["Dream"]["type"][] = JSON.parse(formData.get("jsons") as string);
    array.forEach(json => {
      client.models.Dream.create(json)
        .then(result => console.log(result))
        .catch(e => console.log(e));
    });
    
  }

  return (<div>
    <h1>Import</h1>
    <form method="post" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="jsons">list of JSONs</label>
        <textarea id="jsons" name="jsons" className="form-control" rows={30}></textarea>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">Import</button>
      </div>
  </form>
  </div>);
}

export default Import;
