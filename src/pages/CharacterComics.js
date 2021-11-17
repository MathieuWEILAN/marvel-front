import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const CharacterComics = () => {
  const { characterId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/comics/${characterId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>Chargement en cours </div>
  ) : (
    <div className="container">
      <div className="character-comics-container">
        {data.comics.map((comic, i) => {
          const picture =
            comic.thumbnail.path + "." + comic.thumbnail.extension;
          return (
            <div key={comic._id}>
              <div className="character-comics-patch">
                <img
                  src={picture}
                  alt="comics"
                  className="character-patch-pic"
                />
                <div>{comic.title}</div>
                <div>{comic.description}</div>
              </div>
            </div>
          );
        })}
        <div></div>
      </div>
    </div>
  );
};

export default CharacterComics;
