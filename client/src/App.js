// set up
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./Pages/Home";
import SearchProfile from "./Pages/SearchProfile";

// components
import Navbar from "./Components/Navbar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route 
                path='/'
                element={ <Home /> }
              />
              <Route 
                path='/SearchProfile'
                element={ <SearchProfile /> }
              />
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App;