import React, { useState } from 'react';
import './sigin.css';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Link, useNavigate, useParams } from "react-router-dom";

const NewUserDetail = () => {
  const [name, setName] = useState("");
  const [favourite, setFavourite] = useState([]); // Ensure this is an array
  const [error, setError] = useState("");
  const navigate = useNavigate();
const {token} = useParams()
console.log(token)
  const postdata = () => {
    if (!name || !favourite.length) {
      setError("Please enter both name and select your favorites.");
      return;
    }

    fetch(`http://localhost:5000/newuserdetails/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        favouriteGenre:favourite,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <div style={{ height: '91vh', backgroundColor: '#110F0F', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="signincard">
        <h5 className="welcome-text">Let us know about yourself!</h5>
       
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
              <label style={{ color: 'white' }}>Your Name</label>
              <input 
                onChange={(e) => setName(e.target.value)} 
                type='text' 
                className='sigininput' 
                placeholder='Jane Doe' 
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={topgenre}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                value={favourite}  // Manage as an array
                onChange={(event, newValue) => setFavourite(newValue)}  // Update with selected values
                PopperProps={{
                  sx: {
                    color: 'white',
                    mt: 2,
                  },
                }}
                sx={{
                  '& .MuiAutocomplete-inputRoot': {
                    backgroundColor: '#4a4a4a',
                    borderRadius: '4px',
                  },
                  '& .MuiAutocomplete-option': {
                    color: 'white',
                    backgroundColor: '#4a4a4a',
                  },
                  '& .MuiAutocomplete-option.Mui-focused': {
                    backgroundColor: '#F16222',
                    color: 'black',
                  },
                  '& .MuiChip-root': {
                    backgroundColor: '#221F1F',
                    color: 'white',
                    borderRadius: '16px',
                    margin: '2px',
                  },
                  '& .MuiChip-root.MuiChip-outlined': {
                    borderColor: 'black',
                    color: '#F16222',
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Your Favorites"
                    placeholder="Favorites"
                    sx={{ 
                      '& .MuiInputLabel-root': { color: 'white' },
                      '& .MuiInputBase-input': { color: 'white' },
                      '& .MuiOutlinedInput-root': { 
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: '#F16222' },
                        '&.Mui-focused fieldset': { borderColor: '#F16222' },
                      },
                    }}
                  />
                )}
                renderTags={(values, getTagProps) =>
                  values.map((value, index) => (
                    <Chip
                      key={index}
                      label={value.title}
                      {...getTagProps({ index })}
                      sx={{
                        backgroundColor: '#F16222',
                        color: 'white',
                        borderRadius: '16px',
                        margin: '2px',
                      }}
                    />
                  ))
                }
              />
            </div>
          </div>
          {console.log(favourite)}
          <button onClick={postdata} className='siginbutton'>Create Profile</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

const topgenre = [
    { title: 'Romance' },
    { title: 'Action'  },
    { title: 'Adventure'  },
    { title: 'Animation' },
    { title: 'Comedy'},
    { title: "Crime" },
    { title: 'Drama' },
    { title: 'Horror'  },
    { title: 'Sci-fi' },
    { title: 'Thriller' },
];

export default NewUserDetail;
