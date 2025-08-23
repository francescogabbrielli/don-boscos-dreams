// routes.tsx
//import { HouseDoor } from "react-bootstrap-icons"; // optional

export interface RouteConfig {
  path: string;
  label: string;
  icon?: string;
  element: JSX.Element;
}

import Home from "./pages/Home";
import About from "./pages/About";
import Dreams from "./pages/Dreams";
import Import from "./pages/Import";

export const routes: RouteConfig[] = [
  { path: "/", label: "Home", icon: "house-door", element: <Home /> },
  { path: "/dreams", label: "Dreams", icon: "cloud", element: <Dreams /> },
  { path: "/about", label: "About", icon: "info", element: <About /> },
  { path: "/import", label: "Import", icon: "download", element: <Import /> },
  //{ path: "/settings", label: "Settings", icon: "gear", element: <Settings /> },
];
