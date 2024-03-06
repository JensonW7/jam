// set up
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";

// components
import Navbar from "./components/Navbar"

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
                path='/profile'
                element={ <Profile /> }
              />
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App;