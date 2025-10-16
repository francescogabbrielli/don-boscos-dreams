// pages/Settings.tsx

import React, { useContext, useEffect, useState } from "react";

import type { DreamSchema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LatinContext, metadata } from "../meta";

const client = generateClient<DreamSchema>();

const Settings: React.FC = () => {

  const [done, setDone] = useState(true);

  const translate = useContext(LatinContext)

  useEffect(() => {
    document.dispatchEvent(new Event("translateLatinChanged"));
  }, [])

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

  return (
  <HelmetProvider>
  <div>
    <Helmet><title>{metadata.title} - Import</title></Helmet>
    <h1>Settings</h1>
    
    <div className="form-check form-switch">
      <input className="form-check-input" type="checkbox" role="switch" onChange={translate.toggleLatin} checked={translate.latin}/>
      <label className="form-check-label" htmlFor="latinTranslate">Auto-translate all Latin texts to English</label>
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
  </div>
  </HelmetProvider>);
}

export default Settings;
