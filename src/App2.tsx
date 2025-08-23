// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import { routes } from "./routes.tsx";

const App2: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((r) => (
          <Route index={r.path === "/"} path={r.path === "/" ? undefined : r.path.replace("/", "")} element={r.element} key={r.path} />
        ))}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App2;
