import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <div style={{ marginTop: "5rem" }}>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
