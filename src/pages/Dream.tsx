// pages/Dream.tsx

import { Helmet, HelmetProvider } from "react-helmet-async";
import { generateClient } from "aws-amplify/api";
import { DreamSchema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";
import { metadata } from "../meta";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
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

  const [dream, setDream] = useState<DreamSchema["Dream"]["type"]>();

  const [pages, setPages] = useState<Array<string>>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [image, setImage] = useState<HTMLImageElement>();
    
  // const SwiperNavigations = () => {
  //   const swiper = useSwiper();
  //   return (
  //     <div className="navigation-btns">
  //       <button onClick={() => swiper.slidePrev()} >PREV</button>
  //       <button onClick={() => swiper.slideNext()} >NEXT</button>
  //     </div>
  //   )
  // }

  useEffect(() => {
    client.models.Dream.get({id: id || ""})
      .then((data) => {
        setDream(data?.data || NOT_FOUND)
        setPages((data?.data?.content || "").split("<!--nextpage-->") || [])
        if (data?.data?.number) {
          checkImage("/images/" + (String(data?.data?.number).padStart(3, "0") || "000") + ".jpg")
        }
        setTimeout(() => {
          if (localStorage.getItem("translateLatin") === "1") {
            document.querySelectorAll("span[lang='la']").forEach(span => span.setAttribute("style","display:none"));
            document.querySelectorAll("span[lang='en']").forEach(span => span.setAttribute("style","display:inline"));
          }}, 1000);
    })
  }, [id])

  function checkImage(imageSrc:string) {
      const img = new Image();
      img.onload = () => setImage(img); 
      img.onerror = () => console.log("no image");
      img.src = imageSrc;
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
      <h6><i>{new Date(dream?.date || "2025").toLocaleDateString("en-US", metadata.dateOptions)} <small>({dream?.type})</small></i></h6>
      
      <Swiper
        pagination={{type: "progressbar"}}
        modules={[Pagination, Navigation]}
        onSlideChange={(w) => {
          window.scrollTo(0, w.activeIndex < currentPage ? (document.getElementById("content_"+(w.activeIndex+1))?.scrollHeight || window.innerHeight) - window.innerHeight + 160 : 0);
          setCurrentPage(w.activeIndex + 1);
        }}
        className="mySwiper" >
        { 
          pages.map((page, index) => 
            <SwiperSlide key={"slide_" + (index+1)}>
              { image && index==0 ? <img className="featured-image" src={image.src} alt={dream?.title || "?"} /> : <></> }
              <div id={"content_" + (index+1)} dangerouslySetInnerHTML={{__html: page || "No content?"}}></div>
            </SwiperSlide>)
        }
      </Swiper>
    </div>
  </div>
  </HelmetProvider>)

}

export default Dream;
