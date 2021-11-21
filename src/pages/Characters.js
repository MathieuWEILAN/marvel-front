import axios from "axios";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Page from "../component/Page";

const Characters = ({ search, token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // aller chercher les personnages
        const character = search ? `name=${search}` : "";
        const response = await axios.get(
          `https://mathieu-marvel.herokuapp.com/characters?${character}&page=${page}`
        );
        setTab(response.data);

        //aller chercher les favoris pour comparer les 2 tableaux
        if (token) {
          const myFavoritesResponse = await axios.get(
            `https://mathieu-marvel.herokuapp.com/favoris?token=${token}`
          );
          console.log("myFavoritesResponse ===>", myFavoritesResponse);

          // création d'un 3eme tableau qui va mixer les 2 responses (response et myFavoritesResponse) et sera sauvegarader dans le state data
          let myFavorites = [];
          // boucle sur le tableau de tous les personnages (response)
          for (let i = 0; i < response.data.results.length; i++) {
            //result représente chaque élément du tableau response
            const result = response.data.results[i];
            console.log("ok");
            // compare le tableau des favoris avec l'id de chaque personnages du tableau principal
            const found = myFavoritesResponse.data.favoris_characters.find(
              (elem) => elem._id === result._id
            );
            if (found) {
              myFavorites.push({ ...result, favorite: true });
            } else {
              myFavorites.push({ ...result, favorite: false });
            }
          }
          console.log("Tableau original : responseData ===>", response.data);
          // console.log("Tableau des fav : myFavorites ===>", myFavorites);
          setData(myFavorites);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, page]);

  const handleFavorites = async (item) => {
    try {
      console.log("click");
      const newFav = { favCharacter: item, token: token };
      const response = await axios.post(
        "https://mathieu-marvel.herokuapp.com/handlecharacter",
        newFav
      );
      console.log("post", newFav);
      // on crée un tableau vide, à chaque click, on ajoutera l'élément du tableau data dans le nouveau tableau(newFavorites) si celui-ci n'y est pas déjà

      const newFavorites = [];
      for (let j = 0; j < data.length; j++) {
        const element = data[j];
        if (element._id !== item._id) {
          newFavorites.push(element);
        }
      }
      console.log("newFavorites maj avec ajout du nouveau perso", newFavorites);
      //on crée une copie du tableau général (le mix entre response et myFavoritesResponse)
      const newData = [...data];
      // on crée un tableau vide ou seront stockés les items sélectionnés
      const newArray = [];
      for (let i = 0; i < newData.length; i++) {
        const element = newData[i];
        //si l'élément est présent dans le tableau, on fait une copie de l'élément et ensuite on change la valeur de la clé favorite
        if (element._id === item._id) {
          const newElement = { ...element };
          newElement.favorite = !newElement.favorite;
          // on push l'élément avec la valeur de la clé modifié dans le tableau vide
          newArray.push(newElement);
        } else {
          // sinon, on push juste l'élément dans le tableau vide,  la valeur par défaut sera donc false
          newArray.push(element);
        }
      }
      console.log("new array", newArray);
      // on enregistre ce nouveau tableau dans le state data qui gère la page
      setData(newArray);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <div>Chargement en cours</div>
  ) : (
    <div className="container">
      <div>
        <Page tab={tab} page={page} setPage={setPage} />
      </div>
      <div className="character-container">
        {data.map((item, i) => {
          const picture = item.thumbnail.path + "." + item.thumbnail.extension;
          return (
            <div key={i}>
              {token ? (
                <div className="btn-fav" onClick={() => handleFavorites(item)}>
                  {item.favorite ? "remove" : "add"}
                </div>
              ) : null}
              <NavLink to={`/comics/${item._id}`} className="navlink">
                <div key={item._id} className="character-patch">
                  <img
                    src={picture}
                    alt="marvel-character"
                    className="character-patch-pic"
                  />

                  <div className="name-patch">{item.name}</div>
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>

      <div>
        <Page tab={tab} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Characters;
