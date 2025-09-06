import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Player from "./pages/Player/Player";
import {ToastContainer} from "react-toastify";

const App = () => {
 
  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
