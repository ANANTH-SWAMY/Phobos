import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Authenticate";

const App = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const [currUser, setCurrUser] = useState(null);

  const handleAuth = (e) =>{
    setAuthenticated(e);
  }

  const handleUserChange = (mail) =>{
    setCurrUser(mail);
  }

  useEffect(()=>{
    if(!localStorage.getItem("currUser")) setAuthenticated(false);
    else setAuthenticated(true);
  },[])

  useEffect(()=>{console.log("Auth changed --->", authenticated)}, [authenticated])

  return (
    <Router>
      <Routes>
        { <Route path="/auth" element={<Auth auth={authenticated} handleAuth={handleAuth} handleUserChange={handleUserChange} />} />}
        <Route
          path="/dashboard"
          element={
            authenticated ? (
              <Dashboard handleAuth={handleAuth} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
