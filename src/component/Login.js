import { useState } from "react";
import close from "../img/close-icon.png";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const Login = ({ loginOn, setDisplayOn, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    let value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    let value = event.target.value;
    setPassword(value);
  };

  const navigate = useNavigate();
  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      if (!password || !email) {
        return alert("Missing information");
      } else {
        const user = { email: email, password: password };
        console.log(user);
        const response = await axios.post(
          "https://mathieu-marvel.herokuapp.com/login",
          user
        );
        const token = response.data.token;
        const id = response.data.id;
        Cookies.set("token", token, { expires: 14 });
        setToken(token);
        navigate("/characters", { id });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="signup">
      <div className="signup-content">
        <img src={close} alt="" className="close" onClick={loginOn} />
        <h1>Se connecter</h1>
        <form action="" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={handleEmail} />
          <input
            type="password"
            placeholder="Password"
            onChange={handlePassword}
          />
          <input type="Submit" className="btn-send" />
        </form>
      </div>
    </div>
  );
};

export default Login;
