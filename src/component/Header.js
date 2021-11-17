import logo from "../img/Marvel_Logo.svg.png";

const Header = ({ search, handleSearch }) => {
  return (
    <div>
      <div className="header-container">
        <div className="header-container-logo">
          <img src={logo} alt="" className="header-logo" />
        </div>
        <input type="text" className="header-input" onChange={handleSearch} />
      </div>
    </div>
  );
};

export default Header;
