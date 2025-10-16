// pages/Home.tsx

import React from "react";

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { metadata } from '../meta';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { DreamSchema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const client = generateClient<DreamSchema>()

const ONE_WEEK:number = 7 * 24 * 60 * 60 * 1000;

const Home: React.FC = () => {

  const [width, setWidth] = React.useState(window.innerWidth)

  const [showcaseDreams, setShowcaseDreams] = React.useState<Array<DreamSchema["Dream"]["type"]>>([])

  React.useEffect(() => {
    async function fetchShowcaseDreams() {
      
      const items = []
      let token:string|null|undefined = null

      const cached = JSON.parse(localStorage.getItem("{\"main\":false,\"types\":[\"Dream\",\"Vision\"]}")
        || localStorage.getItem("{\"main\":false,\"types\":[\"Dream\"]}") || "{}")
      
      if (cached?.time && (Date.now() - cached.time) < ONE_WEEK && Array.isArray(cached.data)) {
        setShowcaseDreams(cached.data
          .filter((dream: DreamSchema["Dream"]["type"]) => dream.showcase))
      } else {
        do {
          const {data: pageItems, nextToken}:{data: Array<DreamSchema["Dream"]["type"]>, nextToken?:string|null|undefined} = await client.models.Dream.list({ 
            filter: { showcase: { eq: true } },
            nextToken: token
          })
          token = nextToken
          items.push(...pageItems)
        } while(token)
        setShowcaseDreams(items
          .filter(dream => dream.number)
          .sort((a, b) => (a.number ?? 0) - (b.number ?? 0))) // Sort dreams by number ascending
      }
    }

    window.addEventListener("resize", () => setWidth(window.innerWidth), false)
    fetchShowcaseDreams()
  }, [])

  return (
  <HelmetProvider>
  <div className="container">
      <Helmet><title>{metadata.title} - Home</title></Helmet>
    <h1>The Dreams</h1>
    <p>
    Many of us know of Don Bosco’s prophetic dreams, particularly that famous one in which a wonderful ship was harassed by multitudes of small ships.
    </p>
    <p>
    That dream represented the attack that the church would suffer centuries later, in our times. But there were many other dreams of our beloved saint and educator of youth.
    </p>
    <p>
    In this site, many of Saint Giovanni Bosco’s dreams are reproduced, which not only testify to the special graces that God surrounded him with, but also shape a school of faith and charity.
    </p>
    <p>
    More than ever, we must learn from Don Bosco the importance of a simple heart that believes and surrenders to Divine Providence, to Mary Help of Christians (Santa Maria Ausiliatrice).
    </p>
    <p>
      <em>Migrated from WordPress blog: <a href="https://donboscodreams.wordpress.com" target="wordpress">donboscodreams.wordpress.com</a></em>
    </p>
    <div className="row mb-2">
    <div className="col-md-12">
      <h2>Featured</h2>
      <Swiper
        slidesPerView={width < 720 ? 1 : 2}
        spaceBetween={10}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper">
        {showcaseDreams.map((dream) => (
          <SwiperSlide key={dream.number}>
            <div className="card flex-md-row mb-4 box-shadow h-md-250" 
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, var(--t)) 0 100%), url('/images/${String(dream.number).padStart(3, "0")}.jpg')`, 
                  backgroundSize: "cover",
                  height: "300px"}}>
            <div className="card-body d-flex flex-column align-items-start">
              <h3 className="mb-0">
                <a className="text-light" href={"/dream/" + dream.id}>{dream.title}</a>
              </h3>
              <div className="mb-1 text-light">{dream.date ? new Date(dream.date).toLocaleDateString("en-US", metadata.dateOptions) : "----"}</div>
              <p className="card-text mb-auto text-light"></p>
           </div>
           </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
    <div className="row">
    <div className="col-md-12">
      <center>
      <span className="btn btn-secondary" onClick={() => location.href="/dreams"}>See more</span>
      </center>
    </div>
    </div>
  </div>
  </HelmetProvider>)
}

export default Home;
