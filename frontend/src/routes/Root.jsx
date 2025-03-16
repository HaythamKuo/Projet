import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { LayoutContainer } from "../styles/layout.style";

function Root({ toggleTheme }) {
  return (
    <LayoutContainer>
      <Navbar onClick={toggleTheme} />
      <Outlet />
    </LayoutContainer>
  );
}
export default Root;
