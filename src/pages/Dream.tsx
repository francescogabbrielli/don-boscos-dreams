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

  const [image, setImage] = useState<HTMLImageElement>();

  useEffect(() => {
    client.models.Dream.get({id: id || ""})
      .then((data) => {
        setDream(data?.data || NOT_FOUND)
        if (data?.data?.number) {
          checkImage("/images/" + (String(data?.data?.number).padStart(3, "0") || "000") + ".jpg")
        }
        if (localStorage.getItem("translateLatin") === "1") {
          document.querySelectorAll("span[lang='la']").forEach(span => span.setAttribute("style","display:none"));
          document.querySelectorAll("span[lang='en']").forEach(span => span.setAttribute("style","display:inline"));
        }
    })
  }, [id])

  function checkImage(imageSrc:string) {
      const img = new Image();
      img.onload = () => setImage(img); 
      img.onerror = () => console.log("no image");
      img.src = imageSrc;
  }

  return (<main>
    <Helmet><title>{metadata.title} - {dream?.title || ""}</title></Helmet>
    <div style={{display: dream ? "none": "block"}}>
        <div className="spinner-grow big-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    <div style={{visibility: dream ? "visible" : "hidden"}}>
      <h1>{dream?.number}. {dream?.title}</h1>
      <h6> <i>{new Date(dream?.date || "2025").toLocaleDateString("en-US", metadata.dateOptions)} <small>({dream?.type})</small></i></h6>
      { image ? <img className="border rounded" src={image.src} alt={dream?.title || "?"} /> : <></> }
      <div id="content" dangerouslySetInnerHTML={{__html: dream?.content || ""}}></div>
    </div>
  </main>)

}

export default Dream;