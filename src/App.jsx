import { Routes, Route } from "react-router-dom";
import Home from "./pages/homepage/Home";
import AppHome from "./pages/app/AppHome";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/pt-agenda' element={<AppHome />} />
    </Routes>
  );
}

export default App;
