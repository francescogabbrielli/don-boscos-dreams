import { ChangeEvent, useEffect, useState } from "react";

import type { DreamSchema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Helmet } from "react-helmet";
import { metadata } from "../meta";
import { useLocation } from "react-router-dom";

const client = generateClient<DreamSchema>();

type Nullable<T> = T | null;

type Filter = {
  main?: boolean,
  types?: Array<string>
};

const DEFAULT_FILTER:Filter = { main: true, types: ["Dream", "Vision"] }

// pages/Dreams.tsx
function Dreams() {

  const [filter, setFilter] = useState<Filter>({});

  const [menuitems, setMenuitems] = useState<Array<{
    id: Nullable<string>, 
    number: Nullable<number>,
    title: Nullable<string>, 
    date: Nullable<string>,
//    tags: Nullable<Array<string>>
  }>>([]);

  const location = useLocation();

  useEffect(() => {
    const f = localStorage.getItem("searchFilter")
    setFilter(f ? JSON.parse(f) : DEFAULT_FILTER)
  }, [location.pathname])

  // load data
  useEffect(() => {
    
    if (filter.main === undefined)
      return
    
    const cacheKey = JSON.stringify(filter)
    const cached = JSON.parse(localStorage.getItem(cacheKey) || "{}")
    localStorage.setItem("searchFilter", cacheKey)

    if (cached?.data) {      1
      setMenuitems(cached.data)
    } else {
      client.models.Dream.list({
        selectionSet: ['id', 'number', 'date', 'title'], 
        filter: {
          or: filter.types?.map((t: string) => ({type: {eq: t}})), // by type
          main: filter.main ? {eq: true} : undefined // main flag
        }
      }).then(
        (items) => {
          const results = items.data.sort(
            (i1, i2) => i1.number && i2.number ? i1.number - i2.number : i1.date?.localeCompare(i2.date || "") || 0
          )
          localStorage.setItem(cacheKey, JSON.stringify({data: results, time: Date.now()}))
          setMenuitems(results)
        }
      )    
    }
  }, [filter]);

  function filterMain() {
    setFilter((prev) => ({...prev, main: !filter.main}));
  }

  function filterTypes(event: ChangeEvent<HTMLInputElement>) {
    setFilter((prev) => ({...prev, types: event.target.value.split(",")}))
  }

  return (
    <main className="container-fluid">
      <Helmet><title>{metadata.title} - Dreams</title></Helmet>
      <h1>Dreams</h1>
      <p>Welcome to the dreams page!</p>
      
      <h4>Filters</h4>
      <div className="container-fluid border rounded">
        <div className="hstack">
          <h6 className="bg-light text-nowrap">Main dreams only</h6>
          &nbsp;
          <div className="form-check m-2">
            <label className="form-check-label" htmlFor="mainFilter"></label>
            <input className="form-check-input" type="checkbox" id="mainFilter" 
              checked={filter.main} 
              onChange={filterMain}/>
          </div>
        </div>
        <div className="hstack">
          <h6 className="bg-light">Type</h6>
          &nbsp;
          <div className="form-check m-2">
            <label className="form-check-label" htmlFor="typeFilterDream">Dream</label>
            <input className="form-check-input" type="radio" name="typeFilter" id="typeFilterDream" 
              value="Dream"
              checked={filter.types?.length === 1 && filter.types[0] === "Dream"}
              onChange={filterTypes}/>
          </div>
          <div className="form-check m-2">
            <label className="form-check-label" htmlFor="typeFilterVision">Vision</label>
            <input className="form-check-input" type="radio" name="typeFilter" id="typeFilterVision" 
              value="Vision" 
              checked={filter.types?.length === 1 && filter.types[0] === "Vision"}
              onChange={filterTypes}/>
          </div>
          <div className="form-check m-2">
            <label className="form-check-label" htmlFor="typeFilterAll">All</label>
            <input className="form-check-input" type="radio" name="typeFilter" id="typeFilterAll" 
              value="Dream,Vision" 
              checked={filter.types?.length === 2}
              onChange={filterTypes}/>
          </div>
        </div>
      </div>
      <br></br>
      <h4>List</h4>
      <div style={{display: menuitems.length ? "none": "block"}}>
        <div className="spinner-grow big-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div id="menu" className="container-fluid border rounded" style={{visibility: menuitems.length ? "visible" : "hidden"}}>
        <div className="row row-cols-auto" style={{minWidth: "200px"}}>
        {menuitems.map(menuitem => (
          <div className="col bg-light m-1" key={menuitem.id}>
            <b>{menuitem.number}.</b> <strong><a href={"/dream/" + menuitem.id}>{menuitem.title}</a></strong>
            <br/> 
            [ <em>{new Date(Date.parse(menuitem.date || '0')).toLocaleDateString()}</em> ]
          </div>
        ))}
        </div>
      </div>

    </main>
    )
}

export default Dreams;
