// set up
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home.js"
import Login from "./pages/Login.js"
import Profile from "./pages/Profile.js"

// components
import Navbar from "./components/Navbar.js"

// auth
const code = new URLSearchParams(window.location.search).get('code')
const state = new URLSearchParams(window.location.search).get('state')

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Navbar />
            <div className="pages">
              <Routes>
                {code && <Route
                  path='/'
                  element={ <Home code={code} state={state}/> }
                />}
                {!code && <Route 
                  path='/'
                  element={ <Login /> }
                />}
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