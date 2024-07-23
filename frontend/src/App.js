import Trending from './component/trending';
import React from "react";
import Navbar from './component/Navbar';
import Popular from './component/popular';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter ,Route ,Routes} from 'react-router-dom'
import Home from './component/home';
import TopRated from './component/toprated';
import Signin from './component/auth/signin';
import NewUserDetail from './component/auth/newuserdetail';
import MoviesDetailes from './component/moviesdetails';
import Dashboard from './component/dashboard';

function App() {

  
  return (
    <>
   

    <BrowserRouter>
   <Navbar />
   <Routes>
   <Route path='/' element={<Home />} />

   <Route path='/movies/trending' element={<Trending />} />
   <Route path='/movies/popular' element={<Popular />} />
   <Route path='/movies/toprated' element={<TopRated />} />
   <Route path='/auth/signin' element={<Signin />} />
   <Route path='/newuserdetail/:token' element={<NewUserDetail />} />
   <Route path='/moviesdetails/:movie_id' element={<MoviesDetailes />} />
   <Route path='/dashboard' element={<Dashboard />} />
   </Routes>
    </BrowserRouter>
 
    </>
  );
}

export default App;
