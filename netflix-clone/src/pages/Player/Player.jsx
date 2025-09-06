import "./Player.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const Player = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [apiDtata, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos
`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        const trailer =
          res.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
          ) || res.results[0];
        setApiData(trailer || {});
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      <ArrowBackIcon
        className="img"
        onClick={() => {
          navigate(-2);
        }}
      />

      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiDtata.key}?autoplay=1`}
        title="trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>

      <div className="player-info">
        {/* <p>{apiDtata.published_at}</p> */}
        <p>
          {apiDtata.published_at
            ? new Date(apiDtata.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : ""}
        </p>
        {/* <p>{apiDtata.published_at ? apiDtata.published_at.slice(0, 10) : ""}</p> */}

        <p>{apiDtata.name}</p>
        <p>{apiDtata.type}</p>
      </div>
    </div>
  );
};

export default Player;
