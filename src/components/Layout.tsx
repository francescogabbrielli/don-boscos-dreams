// components/Layout.tsx
import { useEffect, useState } from "react";
import { LatinContext } from "../meta.tsx";
import Header from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";
import { Outlet } from "react-router-dom";

function Layout() {

  const toggleLatin = () => {
    setState(state => ({
      latin: !state.latin,
      toggleLatin: state.toggleLatin
    }));
  };

  const [state, setState] = useState({
    latin: localStorage.getItem("translateLatin") === "1",
    toggleLatin: toggleLatin
  })

  useEffect(() => {
    localStorage.setItem("translateLatin", state.latin ? "1" : "0")
  }, [state.latin])

  return(<LatinContext.Provider value={state}>
    <Header />
    <Sidebar />
    <main id="mainContent" className="pt-5">
      <div className="container-fluid py-4">
        <Outlet />
      </div>
    </main>

    <style>{`
      @media (min-width: 768px) {
        #mainContent {
          margin-left: 180px;
        }
      }
    `}</style>
  </LatinContext.Provider>)
}

export default Layout;
