// pages/Search.tsx

import { ChangeEvent, useEffect, useState } from "react";

import type { DreamSchema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { metadata } from "../meta";
import { useLocation } from "react-router-dom";

const client = generateClient<DreamSchema>();

type Nullable<T> = T | null;

type Filter = {
  init: boolean,
  main?: boolean,
  types?: Array<string>,
  tags?: Array<string>,
  year?: number
}

type DreamSelection = {
  id: Nullable<string>, 
  number: Nullable<number>,
  title: Nullable<string>, 
  date: Nullable<string>,
  main: Nullable<boolean>,
  type: Nullable<string>,
  showcase: Nullable<boolean>,
  tags: Nullable<Array<Nullable<string>>>
}


const ITEMS_KEY = "items"
const FILTER_KEY = "searchFilter"
const INITIAL_FILTER:Filter = { init: false, main: true, types: ["Dream", "Vision"] }

const ONE_DAY:number = 24 * 60 * 60 * 1000;

function Search() {

  const [filter, setFilter] = useState<Filter>(INITIAL_FILTER);

  const [menuitems, setMenuitems] = useState<Array<DreamSelection>>([]);

  const [filtered, setFiltered] = useState<Array<DreamSelection>>([]);

  const [tags, setTags] = useState<Array<{name: string, count: number}>>([]);

  const [error, setError] = useState<string>();

  const location = useLocation();

  // load filter from cached value
  // useEffect(() => {
  //   const f = localStorage.getItem("searchFilter")
  //   setFilter(f ? JSON.parse(f) : DEFAULT_FILTER)
  // }, [location.pathname])

  // load data
  useEffect(() => {

    async function fetchData() {

        let token:string|null|undefined = null
        const items = []
        let i = 0

        // fetch results one page at a time
        do {
          const {data: pageItems, nextToken}:{data: Array<DreamSelection>, nextToken?:string|null|undefined} = await client.models.Dream.list({
            selectionSet: ['id', 'number', 'date', 'title', 'main', 'type', 'showcase', 'tags'],
            // filter: {
            //   or: filter.types?.map((t: string) => ({type: {eq: t}})), // by type
            //   main: filter.main ? {eq: true} : undefined // main flag
            // },
            nextToken: token
          })
          token = nextToken || null
          items.push(...pageItems)
          i++
        } while (token && i < 2) // max 2 pages (safety measure)
        
        // collect and sort results
        if (items.length > 0) {
          return items.sort(
            (i1, i2) => i1.number && i2.number ? i1.number - i2.number : i1.date?.localeCompare(i2.date || "") || 0
          )
        } else {
          setError("No items found")
        }

        return []

    }

    // if (filter === INITIAL_FILTER)
    //   return
    
    setMenuitems([])
    setError(undefined)

    // const cacheKey = JSON.stringify(filter)
    // localStorage.setItem("searchFilter", cacheKey)
    // setAdditionalFilter({})
    const f = localStorage.getItem(FILTER_KEY)
    setFilter(f ? JSON.parse(f) : INITIAL_FILTER)

    // retrieve cached data and check if still valid (1 day)...
    const cached = JSON.parse(localStorage.getItem(ITEMS_KEY) || "{}")
    if (cached?.time && (Date.now() - cached.time) < ONE_DAY && Array.isArray(cached.data)) {
      setMenuitems(cached.data)
    // ...otherwise query from DB
    } else {
      fetchData().then(data => {
        setMenuitems(data)
        if (data.length > 0)
          localStorage.setItem(ITEMS_KEY, JSON.stringify({data: data, time: Date.now()}))
      }).catch(err => setError(err))
    }
  }, [location.pathname])

  useEffect(() => {
    if (!filter.init) return
    localStorage.setItem(FILTER_KEY, JSON.stringify(filter))
  }, [filter])

  // apply main filters
  useEffect(() => {
    setFiltered(menuitems
      .filter(item => !filter.main || item.main)
      .filter(item => !filter.types || filter.types.includes(item.type || ""))
      .filter(item => {
            if (filter.tags && filter.tags.length > 0) {
              if (!item.tags) return false
              for (const tag of filter.tags) {
                if (!item.tags.includes(tag)) return false
              }
            }
            return true
          })
    )
  }, [menuitems, filter])

  useEffect(() => {
    // extract additional filters from current results
    const temp:Map<string, number> = new Map<string, number>()
    filtered.forEach(item => 
      item.tags?.forEach(tag => {
        if (tag) {
          temp.set(tag, (temp.get(tag) || 0) + 1)
        }
      })
    )
    setTags([...temp].sort().map(t => ({name: t[0], count: t[1]})))
  }, [filtered])

  function filterMain() {
    setFilter((prev) => ({...prev, init: true, main: !filter.main}));
  }

  function filterTypes(event: ChangeEvent<HTMLInputElement>) {
    setFilter((prev) => ({...prev, init: true, types: event.target.value.split(",")}))
  }

  function filterTag(tagName: string) {
    return () => {
      setFilter((prev) => {
        if (prev.tags?.includes(tagName)) {
          return {...prev, tags: prev.tags.filter(t => t !== tagName)}
        } else {
          return {...prev, tags: prev.tags ? [...prev.tags, tagName] : [tagName]}
        }
      })
    }
  }

  return (
    <HelmetProvider>
    <div className="container-fluid">
      <Helmet>
        <title>{metadata.title} - Search</title>
      </Helmet>
      <h1>Search</h1>
      <p>Welcome to the all dreams! (more search tools coming soon...)</p>
      
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
        <div className="hstack">
          <h6 className="bg-light">Tags</h6> 
          &nbsp;
          <a className="btn btn-sm btn-secondary" 
            data-bs-toggle="collapse" href="#tagSpacer" role="button" 
            aria-expanded="false" aria-controls="tagSpacer"><small>[]</small></a>
          <div className="collapse" id="tagSpacer">
            <div className="m-2">
              {tags.map(
                tag => (
                  <span className={"badge me-1 " + (filter.tags?.includes(tag.name) ? "bg-primary" : "bg-secondary")} key={tag.name} onClick={filterTag(tag.name)}>
                    {tag.name} <small>({tag.count})</small>
                  </span>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <h4>Dreams</h4>
      <div style={{display: menuitems.length || error ? "none": "block"}}>
        <div className="spinner-grow big-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className="container" style={{visibility: error ? "visible" : "hidden"}}>
        <p className="text-danger">{error}</p>
      </div>
      <div id="menu" className="container-fluid border rounded" style={{visibility: menuitems.length ? "visible" : "hidden"}}>
        <div className="row row-cols-auto" style={{minWidth: "200px"}}>
        {filtered
          .map(menuitem => (
            <div className="col bg-light m-1" key={menuitem.id}>
              {menuitem.number}. <strong><a href={"/dream/" + menuitem.id}>{menuitem.title}</a></strong>
              <br/> 
              [ <em>{new Date(Date.parse(menuitem.date || '0')).toLocaleDateString()}</em> ]
            </div>
          ))}
        </div>
      </div>

    </div>
    </HelmetProvider>
    )
}

export default Search;
