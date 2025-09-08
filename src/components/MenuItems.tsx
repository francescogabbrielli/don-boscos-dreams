import { NavLink } from "react-router-dom";
import { routes } from "../routes";

export function MenuItems({ itemClass = "" }: { itemClass?: string }) {
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
    </li>
  );
}