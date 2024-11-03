import React from 'react'
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';

const Login = () => {

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const loginWithGitHub = () => {
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user read:org repo project`)
      }

  return (
    <>
    <Grid container justifyContent="center" alignItems="center" style={{height: "100vh", display:"flex", flexDirection:"column"}}>
      <Typography variant='h5'>The Hong Kong Polytechnic University</Typography>
      <Typography variant='h5'>COMP5241</Typography>
      <Typography variant='h5' style={{marginBottom:"60px"}}>Project Metric Portal</Typography>
      <Button onClick={loginWithGitHub} variant="contained">login with github</Button>
    </Grid>
    </>
  )
}

export default Login