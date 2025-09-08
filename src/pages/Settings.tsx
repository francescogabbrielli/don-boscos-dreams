// pages/Settings.tsx
import React, { useEffect, useState } from "react";

import type { DreamSchema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Helmet } from "react-helmet";
import { metadata } from "../meta";

const client = generateClient<DreamSchema>();

const Settings: React.FC = () => {

  const [done, setDone] = useState(true);

  useEffect(() => {
    (document.getElementById("latinTranslate") as HTMLInputElement).checked = localStorage.getItem("translateLatin") === "1";
  }, [])

  function handleTranslateChange(event: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem("translateLatin", event.target.checked ? "1" : "0");
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    event.preventDefault();

    // Insert all dreams (one by one)
    const formData = new FormData(event.currentTarget);
    const array:DreamSchema["Dream"]["type"][] = JSON.parse(formData.get("jsons") as string);

    setDone(false);
    Promise.all(array.map(json => {
      client.models.Dream.delete({id: json.id})
        .then(() => client.models.Dream.create(json))
        .then(result => console.log(result))
        .catch(e => console.log(e));
    })).then(() => setDone(true));
    
  }

  return (<div>
    <Helmet><title>{metadata.title} - Import</title></Helmet>
    <h1>Settings</h1>
    
    <div className="form-check form-switch">
      <input className="form-check-input" type="checkbox" role="switch" id="latinTranslate" onChange={handleTranslateChange}/>
      <label className="form-check-label" htmlFor="latinTranslate">Auto-translate Latin</label>
    </div>
    <hr/>
    <i><b>ONLY ADMIN</b>: The following allows to import a list of dreams in JSON format (array of objects).</i>
    <form method="post" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="jsons">list of JSONs</label>
        <textarea id="jsons" name="jsons" className="form-control" rows={25}></textarea>
      </div>
      <hr/>
      <div className="form-group">
        <button disabled={!done} type="submit" className="btn btn-primary">Import</button>
      </div>
  </form>
  </div>);
}

export default Settings;
