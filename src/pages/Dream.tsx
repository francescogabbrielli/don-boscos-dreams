// pages/Dream.tsx

import { Helmet, HelmetProvider } from "react-helmet-async";
import { generateClient } from "aws-amplify/api";
import { DreamSchema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";
import { metadata } from "../meta";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';

const client = generateClient<DreamSchema>();

const NOT_FOUND:DreamSchema["Dream"]["type"] = {
  id: "000",
  title: "Not Found!",
  content: "Wrong page requested, please go back to main index...",
  updatedAt: Date.now().toLocaleString(),
  createdAt: Date.now().toLocaleString(),
}

function Dream() {

  const {id} = useParams();

  const [swiper, setSwiper] = useState<SwiperType>();

  const [dream, setDream] = useState<DreamSchema["Dream"]["type"]>();

  const [pages, setPages] = useState<Array<string>>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [image, setImage] = useState<HTMLImageElement>();

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(currentPage - 1);
    }
  }, [swiper, currentPage])

  useEffect(() => {
    client.models.Dream.get({id: id || ""})
      .then((data) => {
        setDream(data?.data || NOT_FOUND)
        setPages((data?.data?.content || "").split("<!--nextpage-->") || [])
        checkImage(data?.data?.number || 0)
    })
  }, [id])

  useEffect(() => {
      const alt = localStorage.getItem("translateLatin") === "1" ? "la" : "en";
      document.querySelectorAll("span[lang='" + alt + "']").forEach(span => span.classList.add("alt"));
  }, [dream])

  function checkImage(imageNr?: number) {
    if (!imageNr) return;
    const img = new Image();
    img.onload = () => setImage(img); 
    img.onerror = () => console.log("no image");
    img.src = "/images/" + String(imageNr).padStart(3, "0") + ".jpg";
  }

  return (
  <HelmetProvider>
  <div className="container-sm">
    
    <Helmet><title>{metadata.title} - {dream?.title || ""}</title></Helmet>

    <div style={{display: dream ? "none": "block"}}>
        <div className="spinner-grow big-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>

    <div style={{visibility: dream ? "visible" : "hidden"}}>
      
      <h1>{dream?.number}. {dream?.title}</h1>

      {/* show date and type on the left and pagination on the right */}
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h6><i>{new Date(dream?.date || "2025").toLocaleDateString("en-US", metadata.dateOptions)} <small>({dream?.type})</small></i></h6>
        <div className="btn-group" role="group" aria-label="Basic example" style={{visibility: pages.length > 1 ? "visible" : "hidden"}}>{
          pages.map((_, i) => 
            <span key={"dot_"+(i+1)} 
              className={"dot " + (i+1 === currentPage ? "active" : "")} 
              onClick={() => setCurrentPage(i+1)}>{i+1}</span>)
        }</div>
      </div>
      
      <Swiper className="mySwiper" 
        pagination={{type: "progressbar"}}
        modules={[Pagination, Navigation]}
        preventInteractionOnTransition={true}
        simulateTouch={false}
        onSwiper={setSwiper}
        onSlideChange={(w) => {
          if (w.activeIndex === currentPage - 1) return;
          window.scrollTo(0, w.activeIndex < currentPage ? (document.getElementById("content_"+(w.activeIndex+1))?.scrollHeight || window.innerHeight) - window.innerHeight + 160 : 0);
          setCurrentPage(w.activeIndex + 1);
        }}>
        { 
          pages.map((page, index) => 
            <SwiperSlide key={"slide_" + (index+1)}>
              { image && index==0 ? <img className="featured-image" src={image.src} alt={dream?.title || "?"} /> : <></> }
              <div id={"content_" + (index+1)} dangerouslySetInnerHTML={{__html: page || "No content?"}}></div>
              { currentPage < pages.length ? <center> <p className="btn btn-secondary" onClick={() => swiper?.slideTo(index+1)}>Continue reading...</p></center> : <></> }
            </SwiperSlide>)
        }
      </Swiper>
      
    </div>

  </div>
  </HelmetProvider>)

}

export default Dream;
