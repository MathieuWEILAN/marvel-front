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

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    let value = event.target.value;
    setSearch(value);
  };

  return (
    <Router>
      <Header handleSearch={handleSearch} />
      <Menu />
      <Routes>
        <Route
          path="/characters"
          element={<Characters search={search} setSearch={setSearch} />}
        />
        <Route path="/comics/:characterId" element={<CharacterComics />} />
        <Route
          path="/comics"
          element={
            <Comics
              search={search}
              handleSearch={handleSearch}
              setSearch={setSearch}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
