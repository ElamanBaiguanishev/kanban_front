import { Outlet } from "react-router-dom";
import colorConfigs from "../../configs/colorConfigs";
import Topbar from "./Topbar";
import { FC } from "react";
import Sidebar from "./Sidebar";
import './nav.css';
import { useAuth } from "../../hooks/useAuth";

const MainLayout: FC = () => {
  const isAuth = useAuth();

  return (
    <div style={{ display: "flex" }}>
      {isAuth ? (
        <>
          <nav>
            <Sidebar />
          </nav>
          <div style={{ width: "100%" }}>
            <Topbar />
            <main
              style={{
                minHeight: "100vh",
                backgroundColor: colorConfigs.mainBg,
              }}
            >
              <Outlet />
            </main>
          </div>
        </>
      ) : (
        <div style={{ width: "100%" }}>
          <Topbar />
          <main
            style={{
              minHeight: "100vh",
              backgroundColor: colorConfigs.mainBg,
            }}
          >
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
