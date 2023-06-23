import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteSate from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { useState } from "react";
import Notes from "./components/Notes";

function App() {
  const[alert,setAlert] = useState(null);

  const showAlert = (message,type)=>{
    setAlert({
      msg : message ,
      typ : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <>
      <NoteSate>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route
                exact
                path="/notes"
                element={<Notes showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </Router>
      </NoteSate>
    </>
  );
}

export default App;
