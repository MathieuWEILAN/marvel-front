import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./component/Header";
import Characters from "./pages/Characters";
import Footer from "./component/Footer";
import Menu from "./component/Menu";
import CharacterComics from "./pages/CharacterComics";
import Comics from "./pages/Comics";
import Signup from "./component/Signup";
import Cookies from "js-cookie";
import Favoris from "./pages/Favoris";
import Home from "./pages/Home";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

function App() {
  const [token, setToken] = useState(Cookies.get("token"));
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    let value = event.target.value;
    setSearch(value);
  };

  return (
    <Router>
      <Header handleSearch={handleSearch} token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route
          path="/characters"
          element={
            <Characters search={search} setSearch={setSearch} token={token} />
          }
        />
        <Route path="/comics/:characterId" element={<CharacterComics />} />
        <Route
          path="/comics"
          element={
            <Comics
              search={search}
              handleSearch={handleSearch}
              setSearch={setSearch}
              token={token}
            />
          }
        />
        <Route
          path="/favoris"
          element={<Favoris token={token} setToken={setToken} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
