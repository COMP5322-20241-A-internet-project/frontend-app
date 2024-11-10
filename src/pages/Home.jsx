import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Link, Typography, Button } from '@mui/material'
import "./home.css"
const styles = {
  container: {
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    height: "auto"
  }
}

export default function Home() {
  const navigate = useNavigate()
  return (
    <Grid container sx={styles.container} className="homeContainer">
      <Grid item xs={12} md={12} sx={{ display: "flex", justifyContent: "center", height: "100px", marginTop: { md: "10px" }, alignItems: "center" }}>
        <Grid item md={8} xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={(theme) => {
              return {
                [theme.breakpoints.up('lg')]: {
                  fontSize: "2.8rem"
                },
                [theme.breakpoints.down('lg')]: {
                  fontSize: "1.5rem"
                },
                fontSize: { lg: "2.8rem" },
                background: "white"

              }
            }}
            className='alerts'>30% off | Use code: CHRIS2024</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item md={8} xs={12} sx={{ display: "flex", alignItems: { xs: "center", md: "start" }, height: { xs: "200px", md: "300px" }, justifyContent: "center", paddingTop:"20px" }}>
          <Box sx={{
            width: "812px", height: "100%",
            "&.MuiBox-root": {
              backgroundImage: `url(/src/assets/xmasSalee.png)`, backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }
          }}>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item md={8} xs={12} sx={{ display: "flex", alignItems: { xs: "center", md: "start" }, height: { xs: "250px", md: "300px" }, justifyContent: "center", marginTop: { md: "20px", xs: "30px", sm:"60px" }, marginBottom: "20px", }}>
          <Box
            sx={{
              width: "1000px", height: "320px",
              "&.MuiBox-root": {
                backgroundImage: `url(/src/assets/newFood.jpg)`, backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                cursor: "pointer"
              }
            }}
            onClick={() => navigate("/food")}
          >
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}