import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import MainSite from "./components/MainSite";

import Register from "./components/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mainSite/*" element={<MainSite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
