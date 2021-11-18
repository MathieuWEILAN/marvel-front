import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "../component/Page";

const Comics = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const comics = search ? `title=${search}` : "";
        const response = await axios.get(
          `http://localhost:3001/comics?${comics}&page=${page}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, page]);

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
              <button className="btn-fav">add to fav</button>
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

export default Comics;
