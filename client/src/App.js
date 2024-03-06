// set up
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login"

// components
import Navbar from "./components/Navbar"

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
                  element={ <Home code={code} state={state}/>}
                />}
                {!code && <Route 
                  path='/'
                  element={ <Login />}
                />}
              </Routes>
            </div>
      </BrowserRouter>
    </div>
  )
}

export default App;