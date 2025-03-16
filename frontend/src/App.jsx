import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./styles/layout.style";
import Navbar from "./components/Navbar";

function App({ toggleTheme }) {
  return (
    <LayoutContainer>
      <Navbar onClick={toggleTheme} />
      <Outlet />
    </LayoutContainer>
  );
}

export default App;
