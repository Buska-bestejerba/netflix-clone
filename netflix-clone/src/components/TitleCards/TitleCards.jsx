import {useRef, useEffect, useState} from "react";
import "./TitleCards.css";
import {Link} from "react-router-dom";

const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTI5Nzk1NDE0MTc1MzAzMDdkNDY2YzE0ZjlmMzI2NCIsIm5iZiI6MTc1NzE5NDc5MS4xODUsInN1YiI6IjY4YmNhYTI3N2U0MTk2NWI5MTk0NzFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DXuwbaizK7pye1wxNkduFw9u652-hOvzzSEUBkDhWiQ`,
    },
  };

  const handleWheel = (event) => {3
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY; // ✅ fixed typo
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "popular"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const container = cardsRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    // ✅ cleanup
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path}
                alt={card.original_title}
              />
              <div className="card-title">
                <p>{card.original_title}</p>
              </div>{" "}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
