import { useState } from "react";
import close from "../img/close-icon.png";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = ({ signupOn, setDisplaySignup, setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const handleEmail = (event) => {
    let value = event.target.value;
    setEmail(value);
  };
  const handleUSername = (event) => {
    let value = event.target.value;
    setUsername(value);
  };
  const handlePassword = (event) => {
    let value = event.target.value;
    setPassword(value);
  };

  const addUSer = async (event) => {
    try {
      event.preventDefault();
      if (!username || !email || !password) {
        return alert("Missing informations");
      } else {
        const newUser = {
          username: username,
          email: email,
          password: password,
        };
        console.log(newUser);
        const response = await axios.post(
          "https://mathieu-marvel.herokuapp.com/signup",
          newUser
        );
        setUser(response.data);
        console.log(response.data);
        const token = response.data.token;
        const id = response.data.id;
        Cookies.set("token", token, { expires: 7 });
        setToken(token);
        setDisplaySignup(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup">
      <div className="signup-content">
        <img src={close} alt="" className="close" onClick={signupOn} />
        <h1>Inscription</h1>
        <form action="" onSubmit={addUSer}>
          <input type="text" placeholder="Username" onChange={handleUSername} />
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

export default Signup;
