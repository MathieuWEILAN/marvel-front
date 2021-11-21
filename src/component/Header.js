import logo from "../img/Marvel_Logo.svg.png";
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";
import Cookies from "js-cookie";
import Menu from "./Menu";
import { Navigate, useNavigate } from "react-router";

const Header = ({ handleSearch, token, setToken }) => {
  const [displaySignup, setDisplaySignup] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);

  const navigate = useNavigate();

  const signupOn = () => {
    setDisplaySignup(!displaySignup);
  };
  const loginOn = () => {
    setDisplayLogin(!displayLogin);
  };

  const disconnected = () => {
    Cookies.remove("token");
    setToken("");
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-container-logo">
          <img
            src={logo}
            alt=""
            className="header-logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <input
          type="text"
          className="header-input"
          onChange={handleSearch}
          placeholder="What are you looking for?"
        />
        {token ? (
          <button className="btn-login" onClick={disconnected}>
            Se déconnecter
          </button>
        ) : (
          <div>
            <button className="btn-signup" onClick={signupOn}>
              S'inscrire
            </button>
            {displaySignup ? (
              <Signup
                signupOn={signupOn}
                setDisplaySignup={setDisplaySignup}
                setToken={setToken}
              />
            ) : null}
            <button className="btn-login" onClick={loginOn}>
              Se connecter
            </button>
            {displayLogin ? (
              <Login
                loginOn={loginOn}
                setDisplayLogin={setDisplayLogin}
                setToken={setToken}
              />
            ) : null}
          </div>
        )}
      </div>
      <Menu token={token} setDisplayLogin={setDisplayLogin} />
    </div>
  );
};

export default Header;
