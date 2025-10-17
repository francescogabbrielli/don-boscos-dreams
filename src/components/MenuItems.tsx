import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../routes";
import { SettingsContext } from "../meta";

export function MenuItems({ itemClass = "" }: { itemClass?: string }) {

  const translate = useContext(SettingsContext)

  return (
    <li>
      {routes
        .filter((route) => route.path.indexOf(":") < 0 && route.path !== "/")
        .map((route) => (
          <NavLink to={route.path} className={itemClass} key={route.path}>
            {route.icon && <i className={`bi bi-${route.icon} me-2`}></i>}
            {route.label}
          </NavLink>
        ))}
        <hr/>
        <div className="form-check form-switch m-2">
          <input className="form-check-input" type="checkbox" role="switch" onChange={translate.toggleLatin} checked={translate.latin}/>
          <span style={{userSelect: "none"}} className={"form-check-label text-" + (translate.latin ? "primary" : "dark")} onClick={translate.toggleLatin}>Latin to Eng</span>
        </div>
    </li>
  );
}