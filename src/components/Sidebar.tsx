// components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import { routes } from "../routes.tsx";

function Sidebar() {
  return (<div className="d-none d-md-block bg-light" id="sidebarMenu">
    <div className="p-3 border-end" style={{ width: "220px", height: "100vh", position: "fixed", top: "56px" }}>
      <ul className="nav flex-column">
        {routes
          .filter((route) => route.path.indexOf(":") < 0)
          .map((route) => (
          <li className="nav-item" key={route.path}>
            <NavLink
              to={route.path}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              {route.icon && <i className={`bi bi-${route.icon} me-2`}></i>}
              {route.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  </div>);
}

export default Sidebar;
