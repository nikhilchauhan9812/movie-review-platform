import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './trending.css';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
const Trending = () => {
  
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmRiYmUyMTM3NGUxMjdmOTEyMGMwODU0MGZkZWUxYiIsIm5iZiI6MTcyMTQ5NDg5MC43MDU2MDgsInN1YiI6IjY2OWJhYjg4OWUzMzVjODIwNzA5OWM1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DZVN5f2Qhswj5iYkhD-oGl-9AHlnPB2S8DdDTnsvTMM'
        }
      };
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setData(json.results);
      } catch (err) {
        console.error('error:' + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    
    <div style={{ backgroundColor: '#0f0e0e', minHeight: '100vh' }}>
    <div style={{ backgroundColor: '#0f0e0e' }}>
      <h1 style={{ textAlign: 'center', backgroundColor: '#0f0e0e', marginTop: '0px', marginBottom:'15px',padding: '40px',fontSize:'50px', color: 'orange' }}>Trending</h1>
    </div>

    <div className="movie-container">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress style={{ color: 'orange' }} />
        </div>
      ) : (
        data && data.map((item, index) => (
          <div className="movie-card" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="movie-poster"
            />
               <button onClick={()=>navigate(`/moviesdetails/${item.id}`)} className="favorite-button">
             < VisibilityIcon/>
                View Details
              </button>
          </div>
        ))
      )}
    </div>

    {/* <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Pagination
        count={20}
        page={page}
        onChange={(event, val) => setPage(val)}
        variant="outlined"
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'orange',
            '&.Mui-selected': {
              backgroundColor: 'orange',
              color: 'white',
            },
            '&:hover': {
              backgroundColor: '#C18427',
              color: 'white',
            },
          },
        }}
        shape="rounded"
      /> */}
    {/* </div> */}
  </div>
   
  );
};

export default Trending;
