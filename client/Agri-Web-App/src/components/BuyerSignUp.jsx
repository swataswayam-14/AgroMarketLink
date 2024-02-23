import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Agri-Tech Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function BuyerSignUp() {
  const [email , setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [phoneno , setPhoneno] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [username, setUsername] = React.useState("")
  const navigate = useNavigate()
  const requestBody = {
    email,
    password,
    phoneno,
    address,
    username
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/buyer/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      if(!response.ok){
        throw new Error('Network issue occurred')
      }
      navigate('/farmers')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="usename"
                label="Enter Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e)=>{
                  setUsername(e.target.value)
                }}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="Address"
                autoComplete="Address"
                autoFocus
                onChange={(e)=>{
                  setAddress(e.target.value)
                }}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                id="PhoneNumber"
                label="Phone Number"
                name="PhoneNumber"
                autoComplete="PhoneNumber"
                autoFocus
                onChange={(e)=>{
                  setPhoneno(e.target.value)
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already Have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}