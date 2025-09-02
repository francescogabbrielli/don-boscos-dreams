// components/Header.tsx
import { routes } from "../routes";
import { NavLink } from "react-router-dom";

function Header() {

    return (<nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Don Bosco's Dreams</a>

        {/* Hamburger dropdown on mobile */}
        <div className="dropdown d-md-none">
          <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            id="mobileMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-list fs-4"></i> {/* 3 dashes icon */}
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="mobileMenuButton">
            {routes
              .filter((route) => route.path.indexOf(":") < 0 && route.path !== "/")
              .map((route) => (
              <li key={route.path}>
                <NavLink to={route.path} className="dropdown-item">
                  {route.icon && <i className={`bi bi-${route.icon} me-2`}></i>}
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>)
}

export default Header;