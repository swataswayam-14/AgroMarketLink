import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Agro-Tech Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CropDetails() {
  const navigate = useNavigate()
  const [nameOfcrop, setnameOfcrop] = useState("")
  const [startMonth , setstartMonth] = useState("")
  const [endMonth, setendMonth] = useState("")
  const {id} = useParams()
  const handleSubmit = async(event) => {
    event.preventDefault();
    const requestBody = {
      nameOfcrop,
      startMonth,
      endMonth
    }
    try {
      const response = await fetch(`http://localhost:3000/api/v1/farmer/cropdetails/${id}`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body:JSON.stringify(requestBody)
      })
      if(!response.ok){
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log(data);
      navigate(`/farmercrop/${id}`)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter Crop Details
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e)=>{
                    setnameOfcrop(e.target.value)
                  }}
                  required
                  fullWidth
                  id="CropName"
                  label="Crop Name"
                  name="CropName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e)=>{
                    setstartMonth(e.target.value)
                  }}
                  required
                  fullWidth
                  id="startmonth"
                  label="Start Month"
                  name="startmonth"
                  autoComplete="startmonth"
                />
                 <TextField
                 onChange={(e)=>{
                  setendMonth(e.target.value)
                 }}
                  required
                  fullWidth
                  id="endmonth"
                  label="End Month"
                  name="endmonth"
                  autoComplete="endmonth"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to recieve messages from potential buyers and retailers."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
        
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}