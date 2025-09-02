import { Helmet } from "react-helmet";
import { generateClient } from "aws-amplify/api";
import { DreamSchema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";
import { metadata } from "../meta";
import { useParams } from "react-router-dom";

const client = generateClient<DreamSchema>();

const NOT_FOUND:DreamSchema["Dream"]["type"] = {
  id: "000",
  title: "Not Found!",
  content: "Wrong page requested, please go back to main index...",
  updatedAt: Date.now().toLocaleString(),
  createdAt: Date.now().toLocaleString(),
}

// pages/Dream.tsx
function Dream() {

  const {id} = useParams();

  const [dream, setDream] = useState<DreamSchema["Dream"]["type"]>();

  useEffect(() => {
    client.models.Dream.get({id: id || ""})
      .then((data) => setDream(data?.data || NOT_FOUND))
  }, [id])

  return (<main>
    <Helmet><title>{metadata.title} - {dream?.title || ""}</title></Helmet>
    <div style={{display: dream ? "none": "block"}}>
        <div className="spinner-grow big-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    <div style={{visibility: dream ? "visible" : "hidden"}}>
      <h1>{dream?.title}</h1>
      <h4>{dream?.number} - {dream?.type} - {dream?.date}</h4>
      <div id="content" dangerouslySetInnerHTML={{__html: dream?.content || ""}}></div>
    </div>
  </main>)

}

export default Dream;