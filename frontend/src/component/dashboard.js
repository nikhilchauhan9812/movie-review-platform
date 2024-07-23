import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from 'react-bootstrap/Alert';
import './dashboard.css'
const Dashboard = () => {
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
const navigate = useNavigate()


const deletefav =(id)=>{
    fetch('http://localhost:5000/movies/unfavourite',{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            movie_id:id
        })

    }).then(res=>res.json()).then(data=>(data))
}

  useEffect(() => {
    fetch('http://localhost:5000/movies/allfavourites', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setFavourites(data.favourites);
        }
      })
      .catch(err => setError('Something went wrong, please try again later.'));
  }, [favourites]);

  return (
    
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', padding: '20px' }}>
      <div style={{padding:'10px 10px'}} >
<div style={{display:'flex', justifyContent:"center" , alignItems:'center', gap:'20px'
}}>

      <h1 style={{ color: '#ff6f61' }}>Welcome,</h1>
      <h2>{user.name}</h2>

</div>
<div style={{display:'flex' , alignItems:'center', gap:'20px'}}>

      <p style={{fontSize:'30px'}}>Your Favourite Genre:</p>
        
    {user.favouriteGenre.map(item=><h6 style={{border:'1px solid #928787' , backgroundColor:'#928787' , padding:'5px 7px'}}>{item}</h6>) }

</div>
<div className="fav-count" >

      <h3>favourite movies </h3>
      <p style={{fontSize:'25px' , marginBottom:'0px'}}>{favourites.length}</p>
</div>
      </div>
     <div className='fav-section' >
        
      <h2>Your Favourite Movies</h2>
     { favourites.length !== 0 ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {favourites.map(item => (
            <div className="card" key={item.id}>
           {console.log(item)}
           <img 
           onClick={()=>navigate(`/moviesdetails/${item.movie_id}`)}
             src={`https://image.tmdb.org/t/p/w500${item.movie_image}`}
             alt={item.title || item.name}
             className="poster"
             />

              <button onClick={()=>deletefav(item.movie_id)} className="fav-button">
             <DeleteIcon />
                delete
              </button>

         
         </div>
        ))}
      </div>
      : <h3 style={{ color: '#ff6f61', textAlign:'center' }}>You have no favourite</h3>
}
    </div>
      </div>
  );
};

export default Dashboard;
