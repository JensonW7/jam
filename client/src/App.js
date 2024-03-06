// set up
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./Pages/Home.js";

// components
import Navbar from "./Components/Navbar.js"

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
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App;