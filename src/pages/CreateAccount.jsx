import { Box, Grid, Typography, Button, TextField } from '@mui/material'
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { httpStatus } from "../constants"
import { StateContext } from '../StateProvider';
import { decodeJwt } from '../utils/utils';

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
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [address, setAddress] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate();

    const { setUserName } = useContext(StateContext)

    function handleCreate() {
        fetch("http://localhost:3000/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, address, firstName, lastName, email, phone })
        }).then((response => response.status))
            .then(data => {
                if (data == httpStatus.created) {
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
                                navigate("/")
                            }
                        })
                }
            })
    }
    return (
        <Grid sx={styles.container}>
            <Box style={{ display: "flex" }}>
                <Box style={{ marginRight: "10px" }}>
                    <Typography variant='h6'>First Name</Typography>
                    <input
                        type="text"
                        placeholder="First Name"
                        style={{ marginBottom: "30px", height: "60px", width: "400px" }}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                </Box>
                <Box>
                    <Typography variant='h6'>Last Name</Typography>
                    <input
                        type="text"
                        placeholder="Last Name"
                        style={{ marginBottom: "30px", height: "60px", width: "400px" }}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Box>
            </Box>
            <Box>
                <Typography variant='h6'>Address</Typography>
                <input
                    type="text"
                    placeholder="Address"
                    style={{ marginBottom: "30px", height: "60px", width: "810px" }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </Box>
            <Box style={{ display: "flex" }}>
                <Box>
                    <Typography variant='h6'>Email</Typography>
                    <input
                        type="email"
                        placeholder="Email"
                        style={{ marginBottom: "30px", height: "60px", width: "400px", marginRight: "10px" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography variant='h6'>Phone</Typography>
                    <input
                        type="tel"
                        placeholder="Phone"
                        style={{ marginBottom: "30px", height: "60px", width: "400px" }}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Box>
            </Box>
            <Box style={{ display: "flex" }}>
                <Box>
                    <Typography variant='h6'>Username</Typography>
                    <input
                        type="text"
                        placeholder="Username"
                        style={{ marginBottom: "30px", height: "60px", width: "400px", marginRight: "10px" }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography variant='h6'>Password</Typography>
                    <input
                        type="password"
                        placeholder="Password"
                        style={{ marginBottom: "30px", height: "60px", width: "400px" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>
            </Box>
            <Box><button style={styles.button} onClick={() => handleCreate()}>Create Account</button></Box>
        </Grid>
    )
}