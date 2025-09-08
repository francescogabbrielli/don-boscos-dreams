// components/Sidebar.tsx
import { MenuItems } from "./MenuItems.tsx";

function Sidebar() {
  return (<div className="d-none d-md-block bg-light" id="sidebarMenu">
    <div className="p-3 border-end" style={{ width: "180px", height: "100vh", position: "fixed", top: "56px" }}>
      <ul className="nav flex-column">
        <MenuItems itemClass="nav-link my-1"/>
      </ul>
    </div>
  </div>);
}

export default Sidebar;
