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
      <Grid item xs={12} md={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item md={8} xs={12} sx={{ display: "flex", alignItems: { xs: "center", md: "start" }, height: { xs: "200px", } }}>
          <Box sx={{
            width: "452px", height: "437px",
            "&.MuiBox-root": {
              backgroundImage: `url(/src/assets/xmasRabbit.png)`, backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }
          }}>
          </Box>
          <Box sx={{
            width: "812px", height: "437px",
            "&.MuiBox-root": {
              backgroundImage: `url(/src/assets/xmasSale.png)`, backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }
          }}>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} sx={{ display: "flex", justifyContent: "center", height: "100px", marginTop: { md: "250px", xs: "20px" }, alignItems: "center" }}>
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
      <Grid item xs={12} md={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "100px", marginTop: { xs: "60px", md: "unset" } }}>
        <Grid item md={8} xs={12} sx={{ display: "flex", alignItems: { xs: "center", md: "start" }, height: { xs: "200px", md: "300px" }, justifyContent: "center", marginTop: "20px" }}>
          <Box
            sx={{
              width: "1000px", height: "400px",
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