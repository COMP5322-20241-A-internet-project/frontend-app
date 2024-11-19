import { Box, Grid, Typography, Button, TextField } from '@mui/material'
import { useState, useContext } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { locationStateConstant } from '../constants';
import { decodeJwt } from '../utils/utils';
import { StateContext } from "../StateProvider"
const styles = {
    container: {
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 135px)",
        flexDirection: "column"
    },
    button: {
        width: "400px",
        height: "50px",
        background: "#00205b",
        color: "white"
    }
}

export default function SignIn() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();
    const location = useLocation()

    const {setUserName} = useContext(StateContext)

    function handleLogin() {
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    const result = decodeJwt(data.token)
                    setUserName(result.username)
                    localStorage.setItem("jwtToken", data.token)
                     if (location.state === locationStateConstant.fromSubmitCart) {
                        navigate("/shoppingCart", { state: locationStateConstant.returnFromSignIn })
                    } else {
                        navigate("/")
                    }
                }
            })
    }
    return (
        <Grid sx={styles.container}>
            {location.state === locationStateConstant.fromSubmitCart && <Typography style={{ marginBottom: "30px" }} variant='h4'>Please Sign In</Typography>}
            <Box>
                <Typography variant='h6'>Username</Typography>
                <input
                    type="text"
                    placeholder="username"
                    style={{ marginBottom: "30px", height: "60px", width: "400px" }}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Typography variant='h6'>Password</Typography>
                <input
                    type="password"
                    placeholder="username"
                    style={{ marginBottom: "30px", height: "60px", width: "400px" }}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Box><button style={styles.button} onClick={() => handleLogin()}>Sign In</button></Box>
        </Grid>
    )
}