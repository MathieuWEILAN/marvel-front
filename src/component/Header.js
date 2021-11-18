import logo from "../img/Marvel_Logo.svg.png";
import Signup from "./Signup";
import { useState } from "react";

const Header = ({ handleSearch }) => {
  const [displaySignup, setDisplaySignup] = useState(false);
  const signupOn = () => {
    setDisplaySignup(!displaySignup);
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-container-logo">
          <img src={logo} alt="" className="header-logo" />
        </div>
        <input type="text" className="header-input" onChange={handleSearch} />
        <button onClick={signupOn}>se connecter</button>
        {displaySignup ? (
          <Signup signupOn={signupOn} setDisplaySignup={setDisplaySignup} />
        ) : null}
      </div>
    </div>
  );
};

export default Header;
