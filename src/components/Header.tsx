// components/Header.tsx
import { useContext } from "react";
import { MenuItems } from "./MenuItems";
import { LatinContext } from "../meta";

function Header() {

  const translate = useContext(LatinContext)

  return (<nav className="navbar navbar-dark bg-dark fixed-top">
    <div className="container-fluid">
    
      <a className="navbar-brand" href="/">Don Bosco's Dreams</a>

      <div className="d-md-block">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" onChange={translate.toggleLatin} checked={translate.latin}/>
          <label className={"form-check-label text-" + (translate.latin ? "primary" : "light")} htmlFor="latinTranslate">Latin to Eng</label>
        </div>
      </div>

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