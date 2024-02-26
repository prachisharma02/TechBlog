import "./App.css";
import DataProvider from "./context/dataprovider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/account/login";
import Homepage from "./components/home/homepage";
import H

function App() {
  return (
    <div className="App">
      <DataProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
