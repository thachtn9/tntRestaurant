import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="app-content">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default App;
