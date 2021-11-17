import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu">
      <Link to="/characters">PERSONNAGES</Link>
      <Link to="/comics">COMICS</Link>
      <Link to="/favoris">FAVORIS</Link>
    </div>
  );
};

export default Menu;
