import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { styled, alpha } from '@mui/material/styles';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '23ch',
      },
    },
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [search , setSearch] = React.useState(null)
  const [openDialog, setOpenDialog] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);
  const token = localStorage.getItem('jwt')
 
  const navigate = useNavigate()
  React.useEffect(()=>{
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmRiYmUyMTM3NGUxMjdmOTEyMGMwODU0MGZkZWUxYiIsIm5iZiI6MTcyMTQ5NDg5MC43MDU2MDgsInN1YiI6IjY2OWJhYjg4OWUzMzVjODIwNzA5OWM1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DZVN5f2Qhswj5iYkhD-oGl-9AHlnPB2S8DdDTnsvTMM'
  }
};
if(search!==null){

  setTimeout(() => {
    fetch(url, options)
    .then(res => res.json())
    .then(json => 
      {
        setSearchResults(json.results);
        
        setOpenDialog(true)
        console.log(json)
        
      })
      .catch(err => console.error('error:' + err));
    
  
 
  
}, 2000);
}

},[search])
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
const handleListClick=(e)=>{
 navigate(`/moviesdetails/${e}`)
 setOpenDialog(false)
}

  const handleCloseUserMenu = () => {
    setAnchorElNav(null);
    };
  const handledashboard = () => {
    navigate('/dashboard')
    setAnchorElUser(null);
  };

  const handleInput=(e)=>{
    setSearch(e.target.value)
    
  }
  const handlelogout = () => {
    localStorage.clear()
    navigate('/')
    



  };
  return (
    <AppBar position="static" style={{backgroundColor:'black'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
         <img src="/1.png" height={70}width={70} style={{cursor:'pointer'}}  onClick={()=>navigate('/')}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
           onClick={()=>navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            
                <MenuItem key={1} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Popular</Typography>
                </MenuItem>
                <MenuItem key={1} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Trending</Typography>
                </MenuItem>
                <MenuItem key={1} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Top Rated</Typography>
                </MenuItem>
            
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          
             
          <Button
                key={1}
                onClick={()=>navigate('/movies/popular')}
                sx={{ my: 2, color: '#F16222', display: 'block' }}
              >
                Popular
              </Button>
              <Button
                key={2}
                onClick={()=>navigate('/movies/trending')}
                sx={{ my: 2, color: '#F16222', display: 'block' }}
              >
              Trending
              </Button>
              <Button
                key={3}
                onClick={()=>navigate('/movies/toprated')}
                sx={{ my: 2, color: '#F16222', display: 'block' }}
              >
                Top Rated
              </Button>
         
          </Box>
          <Box display={"flex"}  gap={10} marginRight={2}>

          <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={handleInput}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                
              />
            </Search>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" >
              <List>
                {searchResults.slice(0,8).map(movie => (
                  <ListItem key={movie.id} button onClick={()=>handleListClick(movie.id)}>
                    <ListItemAvatar>
                      <Avatar alt={movie.title} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
                    </ListItemAvatar>
                    <ListItemText primary={movie.title} />
                  </ListItem>
                ))}
              </List>
            </Dialog>
{ token ?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
             
                <MenuItem key='1' onClick={handledashboard}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <MenuItem key='2' onClick={handlelogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
          :<Link to='/auth/signin'> <Button>Login</Button></Link>
}
              </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;