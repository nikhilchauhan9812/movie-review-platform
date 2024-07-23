import React, { useState, useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";
import "./moviesdetail.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Skeleton from "@mui/material/Skeleton";
import StarIcon from '@mui/icons-material/Star';
const MoviesDetailes = () => {
  const [movie, setMovie] = useState({});
  const [credit, setCredits] = useState({ cast: [] });
  const { movie_id } = useParams();
  const [clicked , setClicked] = useState(false)
const navigate = useNavigate()
  useEffect(() => {
    
    const fetchMovie = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;
      const crediturl = `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmRiYmUyMTM3NGUxMjdmOTEyMGMwODU0MGZkZWUxYiIsIm5iZiI6MTcyMTQ5NDg5MC43MDU2MDgsInN1YiI6IjY2OWJhYjg4OWUzMzVjODIwNzA5OWM1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DZVN5f2Qhswj5iYkhD-oGl-9AHlnPB2S8DdDTnsvTMM",
        },
      };

      try {
        const res = await fetch(url, options);
        const creditres = await fetch(crediturl, options);

        const json = await res.json();
        const creditjson = await creditres.json();
        setCredits(creditjson);
        setMovie(json);
        console.log(json)
        
      } catch (err) {
        console.error("error:", err);
      }
    };

    fetchMovie();
  }, [movie_id]);


  const postdata = () => {
    const token = localStorage.getItem('jwt')
    if(!token){
      navigate('/auth/signin')
    }

    fetch("http://localhost:5000/movies/favourite", {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        movie_id: movie.id,
        movie_name: movie.title || movie.name,
        movie_image: movie.poster_path,
      }),
    })
      .then((res) => res.json())
      .then((msg) => console.log(msg));
      setClicked(true)
  };

  return (
    <>
      <div
        className="backdrop-container"
        style={{
          backgroundImage: movie.backdrop_path ? (
            `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          ) : (
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={500}
              height={158}
            />
          ),
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "680px",
          position: "relative",
          padding: "20px 20px",
        }}
      >
        <div className="content">
          {movie.overview ? (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              > 
              <p><StarIcon /> {movie.vote_average}</p>
                <h1 className="movietitle">{movie.title || movie.name}</h1>
                <p
                  style={{
                    border: "none",
                    padding: "1px 4px 2px 4px",
                    color: "black",
                    backgroundColor: "yellow",
                    width: "5%",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                >
                  {movie.original_language}
                </p>
              </div>

              <p>{movie.overview}</p>
            </div>
          ) : (
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={500}
              height={158}
            />
          )}
          <div>
            <h3>Genres :</h3>
            {movie.genres ? (
              <div style={{ display: "flex", gap: "10px" }}>
                {movie.genres &&
                  movie.genres.map((genre) => (
                    <p className="genrestyle" key={genre.id}>
                      {genre.name}{" "}
                    </p>
                  ))}
              </div>
            ) : (
              <div style={{ display: "flex", gap: "10px", marginLeft: "20px" }}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    variant="rectangular"
                    width={70}
                    height={30}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h3>Casts :</h3>
            {credit.cast ? (
              <div style={{ display: "flex", gap: "10px" }}>
                {credit.cast &&
                  credit.cast.slice(0, 6).map((item) => (
                    <div key={item.cast_id}>
                      {item.profile_path && (
                        <>
                          <img
                            src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                            alt={item.name}
                            height={100}
                            style={{ borderRadius: "50%" }}
                            width={70}
                          />
                          <p>{item.name}</p>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginLeft: "20px",
                  marginBottom: "30px",
                }}
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    variant="circular"
                    width={100}
                    height={100}
                  />
                ))}
              </div>
            )}
          </div>
          {movie && (
            <button onClick={postdata} className="favoritebutton">
              { !clicked ?
           <div style={{display:"flex",gap:'5px'}}>
            <FavoriteIcon />
              Add to favourite
           </div>:
            <div style={{display:"flex",gap:'5px'}}>

                     <FavoriteIcon style={{color:'red'}} />
                 Added to favourite
           </div>
              }
            </button>
          )}
        </div>

        <div
          style={{ flex: "1", alignSelf: "center", justifySelf: "flex-end" }}
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title || movie.name}
              height={570}
              width={400}
            />
          ) : (
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={340}
              height={448}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MoviesDetailes;
