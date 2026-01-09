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
import Dream from "./pages/Dream";
import Settings from "./pages/Settings";

export const routes: RouteConfig[] = [
  { path: "/", label: "Home", icon: "house-door", element: <Home />},
  { path: "/dreams", label: "Search", icon: "search", element: <Dreams /> },
  { path: "/dream/:id", label: "Dream", icon: "cloud", element: <Dream /> },
  { path: "/about", label: "About", icon: "info", element: <About /> },
  { path: "/settings", label: "Settings", icon: "gear", element: <Settings /> },
];
