import ReactPlayer from "react-player";

const Home = ({ token }) => {
  return (
    <div className="homepage">
      {token ? (
        <div>COMING SOON</div>
      ) : (
        <div>INSCRIS TOI POUR AVOIR ACCES AU CONTENU</div>
      )}

      <div className="video">
        <ReactPlayer url="https://www.youtube.com/watch?v=7w_w10HVa54&ab_channel=FilmsActu" />
      </div>
    </div>
  );
};

export default Home;
