import { Helmet } from "react-helmet";
import { generateClient } from "aws-amplify/api";
import { DreamSchema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";
import { metadata } from "../meta";
import { useParams } from "react-router-dom";

const client = generateClient<DreamSchema>();

// pages/Dream.tsx
function Dream() {

  const {id} = useParams();

  const [dream, setDream] = useState<DreamSchema["Dream"]["type"]>();

  useEffect(() => {
    client.models.Dream.get({id: id || ""}).then((data) => setDream(data?.data || undefined));
  })

  return (<main>
    <Helmet><title>{metadata.title} - {dream?.title || "Not found!"}</title></Helmet>
    <div className="text-center" style={{display: dream ? "none": "block"}}>
        <div className="spinner-grow big-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    <div style={{visibility: dream ? "visible" : "hidden"}}>
      <h1>{dream?.title || "Not found!"}</h1>
      <div id="content" dangerouslySetInnerHTML={{__html: dream?.content || ""}}></div>
    </div>
  </main>)

}


export default Dream;