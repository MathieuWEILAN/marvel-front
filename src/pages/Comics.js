import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Comics = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const comics = search ? `title=${search}` : "";
        const response = await axios.get(
          `http://localhost:3001/comics?${comics}`
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
    <div>Chargement en cours</div>
  ) : (
    <div className="container">
      <div className="character-container">
        {data.results.map((item, i) => {
          const picture = item.thumbnail.path + "." + item.thumbnail.extension;
          return (
            <div key={item._id} className="character-patch">
              <img
                src={picture}
                alt="marvel-character"
                className="character-patch-pic"
              />
              <div>{item.title}</div>
              <div>{item.description}</div>
            </div>
          );
        })}
      </div>

      <div>
        <div></div>
      </div>
    </div>
  );
};

export default Comics;
