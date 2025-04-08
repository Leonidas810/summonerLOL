import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Home from './components/pages/home';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:summonerName" element={<div></div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
