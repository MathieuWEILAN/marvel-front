import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Characters = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const character = search ? `name=${search}` : "";

        const response = await axios.get(
          `http://localhost:3001/characters?${character}`
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
  }, [search]);

  return isLoading ? (
    <div>Chargement en cours</div>
  ) : (
    <div className="container">
      <div className="character-container">
        {data.results.map((item, i) => {
          const picture = item.thumbnail.path + "." + item.thumbnail.extension;
          return (
            <Link to={`/comics/${item._id}`}>
              <div key={item._id} className="character-patch">
                <img
                  src={picture}
                  alt="marvel-character"
                  className="character-patch-pic"
                />
                <div>{item.name}</div>
                <div>{item.description}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div>
        <div></div>
      </div>
    </div>
  );
};

export default Characters;
