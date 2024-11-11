import { useLocation, Link } from "react-router-dom";
import { useState, useRef, useEffect } from 'react'
import { Box, Grid, Typography, Button, TextField } from '@mui/material'
import Breadcrumb from "../components/Breadcrumb"
import { cloneDeep } from "lodash"

export const breadcrumbs = [
    <Typography key="1" sx={{ color: 'black', fontSize: "1rem" }}>
        Shopping Cart
    </Typography>,
];

const styles = {
    container: {
        padding: "30px"
    },
    productDiv: (theme) => {
        return {
            display: "flex",
            flexDirection: "column",
            padding: "15px"
        }
    },
    specificationBox: {
        background: "lightgrey",
        height: "80px",
        alignItems: "center",
        display: "flex",
        padding: "10px 10px 10px 20px",
        "&:nth-of-type(odd)": {
            background: "#f2f0ef",
        }
    },
    addToCartButton: {
        width: "100%",
        background: "#00205b",
        color: "white",
        cursor: "pointer",
        marginTop: "15px",
        height: "50px"
    },
    addToFavBtn: {
        width: "100%",
        cursor: "pointer",
        marginTop: "15px",
        height: "50px",
        background: "rgb(185, 211, 243)",
        border: "none",
        color: "#00205b",
    },
    submitBtn: (theme) => {
        return {
            background: theme.palette.primary.main,
            border: "none",
            color: "white",
            marginTop: "20px",
            width: "150px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    }
}

export default function ShoppingCart() {
    const [geoAddress, setGeoAddress] = useState("")
    const [cartItems, setCartItem] = useState([])
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        alert("Geolocation is not supported by this browser.")
    }

    function showPosition(position) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=false&language=en&key=${""}`)
            .then(response => response.json())
            .then(json => {
                setGeoAddress(json?.results?.[0].formatted_address)
                console.log(json?.results?.[0].formatted_address)
            })
            .catch(err => console.log('Request Failed', err));
    }

    useEffect(() => {
        const bunnybunnycart = JSON.parse(localStorage.getItem("bunnybunnycart"))
        setCartItem(bunnybunnycart)
    }, [])

    function changeQuantity(value, id) {
        if (value < 1) return
        const newCartItems = cloneDeep(cartItems)
        for (const item of newCartItems) {
            if (item.id === id) {
                item.quantity = value
            }
        }
        setCartItem(newCartItems)
    }

    return (
        <Box sx={styles.container}>
            <Grid container>
                {/* <Grid item md={12} lg={12}><Breadcrumb breadcrumbsContent={breadcrumbs} /></Grid> */}

                {(!cartItems || cartItems.length === 0) ? <div style={{ height: "78vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", background: "#D3D3D3" }}>
                    No Items
                </div> :
                    <Grid item xs={12} md={12} lg={12} sx={{ display: "flex", justifyContent: "center", flexDirection: "row", maxWidth: "1800px", flexDirection: { xs:"column", md: "column", lg: "row" } }}>
                        <Grid item lg={4} md={12} xs={12} sx={styles.productDiv}>
                            <Typography variant="h5" gutterBottom>Items</Typography>
                            <div style={{ overflowY: "scroll", height: "60vh" }}>
                                {cartItems?.length > 0 && cartItems.map((cartItem, index) => (
                                    <div style={{ display: "flex", marginRight: "15px" }}>
                                        <Box sx={{
                                            width: "200px", height: "250px",
                                            "&.MuiBox-root": {
                                                backgroundImage: `url(/src/assets/products/${cartItem.img})`, backgroundSize: "contain",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center"
                                            }
                                        }}>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                                            <Typography sx={{ fontWeight: "bold" }} gutterBottom>{cartItem.brand}</Typography>
                                            <Typography gutterBottom>{cartItem.title}</Typography>
                                            <Typography gutterBottom>{`HKD ${cartItem.price}`}</Typography>
                                            <Typography gutterBottom>{`Quantity: `}<input type="number" style={{ width: "80px" }} value={cartItem.quantity} onChange={(e) => changeQuantity(e.target.value, cartItem.id)} /></Typography>
                                            <button style={{ background: "#de0a26", color: "white", border: 0, height: "35px", cursor: "pointer" }}>Delete</button>
                                        </Box>
                                    </div>
                                ))}
                            </div>
                            <button style={{ marginTop: "20px", background: "#00205b", color: "white", height: "50px", width: "100%", cursor: "pointer" }}>Update Cart</button>
                        </Grid>
                        <Grid item lg={4} md={12} xs={12}>
                            <Box>
                                <Typography variant="h5" gutterBottom>Specifications</Typography>



                            </Box>
                        </Grid>
                    </Grid>}
            </Grid>
        </Box>
    )
}