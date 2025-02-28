import { Routes, Route } from "react-router-dom";
import "./assets/styles/global.scss";

import Layout from "./layouts/Layout";
import Landing from "./pages/Landing";

import "./translations";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
