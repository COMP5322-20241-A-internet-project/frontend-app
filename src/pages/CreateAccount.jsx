import { Box, Grid, Typography, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

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

export default function CreateAccount() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();
    return (
        <Grid sx={styles.container}>
            <Box>
                <Typography variant='h6'>Username</Typography>
                <input
                    type="text"
                    placeholder="username"
                    style={{ marginBottom: "30px", height:"60px", width:"400px" }}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Typography variant='h6'>Password</Typography>
                <input
                    type="password"
                    placeholder="username"
                    style={{ marginBottom: "30px", height:"60px", width:"400px" }}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Box><button style={styles.button} onClick={() => navigate("/home")}>Create Account</button></Box>
        </Grid>
    )
}