import React from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
const Displaylist = ({ data, title, link }) => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#0f0e0e" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 10px 0px 10px",
        }}
      >
        <h5
          style={{
            marginLeft: "20px",
            fontSize: "30px",
            marginBottom: "0px",
            color: "#F16222",
          }}
        >
          {title}
        </h5>
        <button
          onClick={() => navigate(`/movies/${link}`)}
          style={{
            backgroundColor: "#9A4925",
            borderRadius: "10px",
            border: "none",
            color: "whitesmoke",
            padding: "5px 15px",
            marginRight: "20px",
          }}
        >
          see all
        </button>
      </div>

      <div className="moviecontainer">
        {data ? (
          data.slice(0, 5).map((item, index) => (
            <div className="moviecard" key={item.id}>
              {console.log(item.id)}
              <img
                onClick={() => navigate(`/moviesdetails/${item.id}`)}
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className="movieposter"
              />
            </div>
          ))
        ) : (
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                width="350px"
                height="350px"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Displaylist;
