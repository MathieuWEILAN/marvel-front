import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "../component/Page";

const Characters = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [favCharacter, setFavCharacter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const character = search ? `name=${search}` : "";

        console.log("page", page);

        const response = await axios.get(
          `http://localhost:3001/characters?${character}&page=${page}`
        );
        console.log(response.data);

        console.log("item", response.data.results);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, page]);

  const addToFav = (event, index) => {
    event.preventDefault();
    if (favCharacter.find((item) => item._id !== index._id)) {
      console.log(index._id);
      const newFavArr = [...favCharacter];
      newFavArr.push(index);
      setFavCharacter(newFavArr);
    }
    console.log(favCharacter);
  };

  return isLoading ? (
    <div>Chargement en cours</div>
  ) : (
    <div className="container">
      <div className="character-container">
        {data.results.map((item, i) => {
          const picture = item.thumbnail.path + "." + item.thumbnail.extension;
          return (
            <div>
              <Link
                to={`/comics/${item._id}`}
                style={{ textDecoration: "none", position: "relative" }}
              >
                <div key={item._id} className="character-patch">
                  <button
                    onClick={(event) => {
                      addToFav(event, item);
                    }}
                  >
                    ADD TO FAV
                  </button>
                  <img
                    src={picture}
                    alt="marvel-character"
                    className="character-patch-pic"
                  />
                  <div>{item.name}</div>
                  <div>{item.description}</div>
                </div>
              </Link>{" "}
            </div>
          );
        })}
      </div>

      <div>
        <Page data={data} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Characters;
