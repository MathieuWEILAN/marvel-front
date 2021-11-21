import axios from "axios";
import { useEffect, useState } from "react";

const Favoris = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/favoris?token=${token}`
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
    <div>Is loading </div>
  ) : (
    <div>
      <h1>ton équipe marvel !</h1>
      <div className="character-container">
        {data.favoris_characters.map((elem, i) => {
          const image = elem.thumbnail.path + "." + elem.thumbnail.extension;
          return (
            <div className="comics-patch">
              <img src={image} alt="" className="character-patch-pic" />
              <div>{elem.name} </div>
            </div>
          );
        })}
      </div>
      <h1>Tes comics préférés !</h1>
      <div className="character-container">
        {data.favoris_comics.map((elem, i) => {
          const image = elem.thumbnail.path + "." + elem.thumbnail.extension;
          return (
            <div className="comics-patch">
              <img src={image} alt="" className="character-patch-pic" />
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
};

export default Favoris;
