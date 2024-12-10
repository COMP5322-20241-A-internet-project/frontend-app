import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { decodeJwt } from '../utils/utils';
import { httpStatus } from '../constants';

const styles = {
    container: {
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 135px)",
        flexDirection: "column"
    },
}

export default function Favourite() {
    const [fav, setFav] = useState([])
    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken")
        const result = decodeJwt(jwtToken)
        fetch(`http://localhost:3000/user/${result.id}/favorite`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': ` Bearer ${jwtToken}` }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setFav(data)
                }
            })
    }, [])

    function handleDelete(productId){
        const jwtToken = localStorage.getItem("jwtToken")
        const result = decodeJwt(jwtToken)
        fetch(`http://localhost:3000/user/${result.id}/favorite/${productId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': ` Bearer ${jwtToken}` }
        })
            .then(response => response.status)
            .then(data => {
                if (data === httpStatus.success) {
                    fetch(`http://localhost:3000/user/${result.id}/favorite`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json', 'Authorization': ` Bearer ${jwtToken}` }
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data) {
                                setFav(data)
                            }
                        })
                }
            })
    }

    return (<>
        <Box sx={styles.container}>
            {fav.length === 0 &&
                <Box>
                    <Typography variant='h3'>It is Empty</Typography>
                </Box>}
            {fav.length > 0 && fav.map((favourite, index) => (
                <>
                    <Box key={`favourite-${index}`} style={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{
                            width: "100px", height: "150px",
                            "&.MuiBox-root": {
                                backgroundImage: `url(/src/assets/products/${favourite.img})`, backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }
                        }}>
                        </Box>
                        <Box>
                            <Typography>{`Brand: ${favourite.brand}`}</Typography>
                            <Typography>{`Product: ${favourite.title}`}</Typography>
                            <button style={{width:"100%", background:"#00205b", color:"white"}}onClick={() => handleDelete(favourite.id)}>Delete</button>
                        </Box>
                    </Box>
                </>
            ))}
        </Box>
    </>)
}