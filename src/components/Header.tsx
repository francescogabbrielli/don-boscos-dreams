// components/Header.tsx
import { MenuItems } from "./MenuItems";

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
            <MenuItems itemClass="dropdown-item"/>
          </ul>
        </div>
      </div>
    </nav>)
}

export default Header;