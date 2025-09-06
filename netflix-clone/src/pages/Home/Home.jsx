import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Home.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        const randomIndex = Math.floor(Math.random() * data.results.length);
        const movie = data.results[randomIndex];
        setHeroMovie(movie);
      } catch (error) {
        console.error("Error fetching hero movie:", error);
      }
    };


    fetchHeroMovie();
  }, []);

  return (
    <div className="home">
      <Header />

      <div className="hero">
        {heroMovie && (
          <>
            <img
              src={`${IMAGE_BASE_URL}${heroMovie.backdrop_path}`}
              alt={heroMovie.title}
              className="banner-img"
            />
            <div className="hero-caption">
              <h1 className="caption-title">{heroMovie.title}</h1>
              <p>{heroMovie.overview}</p>
              <div className="hero-btns">
                <button
                  className="btn"
                  onClick={() => navigate(`/player/${heroMovie.id}`)}>
                  <PlayArrowIcon />
                  Play
                </button>

                <button
                  className="btn dark-btn"
                  onClick={() => setShowInfo(true)}>
                  <InfoOutlineIcon />
                  More Info
                </button>
              </div>
              <TitleCards title={"Now Playing"} category={"now_playing"} />
            </div>
          </>
        )}
      </div>

      {/* Info Modal */}
      {showInfo && heroMovie && (
        <div className="movie-modal">
          <div className="movie-modal-content">
            <span className="close-btn" onClick={() => setShowInfo(false)}>
              &times;
            </span>
            <img
              src={`${POSTER_BASE_URL}${heroMovie.poster_path}`}
              alt={heroMovie.title}
              className="modal-poster"
            />
            <div className="modal-details">
              <h2>{heroMovie.title}</h2>
              <p>
                <strong>Release Date:</strong>{" "}
                {heroMovie.release_date
                  ? new Date(heroMovie.release_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )
                  : ""}
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {heroMovie.vote_average}/10
              </p>
              <p>{heroMovie.overview}</p>
            </div>
          </div>
        </div>
      )}

      <div className="more-cards">
        <TitleCards title={"Popular"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Rated"} category={"top_rated"} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
