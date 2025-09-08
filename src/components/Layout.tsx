// components/Layout.tsx
import React from "react";
import Header from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => (
  <>
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
  </>
);

export default Layout;
