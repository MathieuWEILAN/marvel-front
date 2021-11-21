import { Link } from "react-router-dom";
import Login from "./Login";

const Menu = ({ token, setDisplayLogin }) => {
  return (
    <div className="menu">
      <Link to="/characters">PERSONNAGES</Link>
      <Link to="/comics">COMICS</Link>
      {token && (
        <Link onClick={setDisplayLogin} to="/favoris">
          FAVORIS
        </Link>
      )}
    </div>
  );
};

export default Menu;
