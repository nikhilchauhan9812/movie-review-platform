import React, { useEffect, useState, useRef } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Carousel from "react-bootstrap/Carousel";
import Displaylist from "./displaylist";
import Skeleton from '@mui/material/Skeleton';

const Home = () => {
  const [trendingData, setTrendingData] = useState(null);
  const [popularData, setPopularData] = useState(null);
  const [latestData, setLatestData] = useState(null);
  const [topRatedData, setTopRatedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const posterListRef = useRef(null);
  // const [data , setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        
        const trendingUrl ="https://api.themoviedb.org/3/trending/movie/day?language=en-US";
        const latestUrl ="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
        const popularUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
        const topRated ='https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmRiYmUyMTM3NGUxMjdmOTEyMGMwODU0MGZkZWUxYiIsIm5iZiI6MTcyMTQ5NDg5MC43MDU2MDgsInN1YiI6IjY2OWJhYjg4OWUzMzVjODIwNzA5OWM1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DZVN5f2Qhswj5iYkhD-oGl-9AHlnPB2S8DdDTnsvTMM",
          },
        };

        const trendingRes = await fetch(trendingUrl, options);
        const latestRes = await fetch(latestUrl, options);
        const popularRes = await fetch(popularUrl, options);
        const topRatedRes = await fetch(topRated, options);


        const trendingJson = await trendingRes.json();
        const latestJson = await latestRes.json();
        const popularJson = await popularRes.json();
        const topRatedJson = await topRatedRes.json();

        // console.log('pop',popularJson);
         setTopRatedData(topRatedJson.results)
        setLatestData(latestJson.results);
        setPopularData(popularJson.results);
        setTrendingData(trendingJson.results);
      } catch (err) {
        console.error("error:" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const Changedata = (data) => {
    const newdata = data.split("");
    if (newdata.length > 20) {
      return newdata.slice(0, 190).join("") + "......";
    }
  };
  return (
    <>
    <div style={{backgroundColor:' #0f0e0e'}}>
<div style={{}}>

    {latestData ?
      <Carousel variant="light">
        {
          latestData.slice(0, 5).map((item) => (
            <Carousel.Item key={item.id} interval={2000}>
              <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={item.title || item.name}
                />
              <Carousel.Caption>
                <h3>{item.title || item.name}</h3>
                <p>
                  {Changedata(item.overview)}
                  <span style={{ cursor: "pointer" }}>see more</span>
                </p>
                {/* <p>{item.overview}</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
      :
      <Skeleton
      sx={{ bgcolor: 'grey.900' ,marginLeft:'10%',padding:'20px 20px' }}
      variant="rectangular"
      
      width='80%'
      height='600px'
      />
}
      </div>
      <div className="header">
       
          <div>
          
              <Displaylist data={trendingData} title="Trending Movies/Shows" link="trending"/>
              <Displaylist data={popularData} title="Popular Movies" link="popular" />
              <Displaylist data={topRatedData} title="G.O.A.T-Greatest Of All Time" link="toprated" />
           
          </div>
      
      </div>
        </div>
    </>
  );
};

export default Home;
