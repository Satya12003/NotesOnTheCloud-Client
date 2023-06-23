import React, { useEffect } from "react";
import { Link,useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(()=>{
    console.log(location.pathname)
  },[location])
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/")
  }
  return ( 
    
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          NotesOnCloud
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
            </li>
          </ul>
          {!localStorage.getItem('token') ?<span></span>: <button onClick = {handleLogout} className="btn btn-primary">Logout</button>}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
