import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="root-container">
        <div className="wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
