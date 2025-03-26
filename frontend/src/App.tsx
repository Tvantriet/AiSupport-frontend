import { Routes, Route } from "react-router-dom";
import "./assets/styles/global.scss";

import Layout from "./layouts/Layout";
import Landing from "./pages/Landing";
import WidgetShowcase from './pages/WidgetShowcase';

import "./translations";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/fullscreen-chat" element={<Landing/>} />
          <Route path="/" element={<WidgetShowcase />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
