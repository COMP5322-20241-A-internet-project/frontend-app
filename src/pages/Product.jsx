import { useLocation, Link } from "react-router-dom";
import { useState, useRef, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { breadcrumbs } from "./Food";
import Breadcrumb from "../components/Breadcrumb"
import { httpStatus } from "../constants";
const styles = {
    container: {
        padding: "30px"
    },
    productDiv: (theme) => {
        return {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            [theme.breakpoints.down('md')]: {
                width: "unset",
                marginTop: "20px"
            },
            [theme.breakpoints.up('md')]: {
                width: "900px"
            }
        }
    },
    reviewsDiv: (theme) => {
        return {
            width: "100%",
            marginTop: "20px"
        }
    },
    reviews: (theme) => {
        return {
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "20px"
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
    reviewsText: {
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline"
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
    },
    reviewsTextarea: {
        resize: "none",
        width: "100%",
        border: "1px solid #00205b",
        height: "100px"
    }
}

export default function Product() {
    const { state } = useLocation()
    const reviewsRef = useRef(null)
    const [reviews, setReviews] = useState([])
    const [reviewInput, setReviewInput] = useState("")

    useEffect(() => {
        fetch(`http://localhost:3000/product/${state.id}/review`)
            .then(response => response.json())
            .then(data => {
                if(data){
                    setReviews(data[0].reviews)
                }
            })
    }, [])

    function handleSubmitReview() {
        const jwtToken = localStorage.getItem("jwtToken")
        fetch(`http://localhost:3000/product/${state.id}/review`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': ` Bearer ${jwtToken}` },
            body: JSON.stringify({
                userID: state.id,
                comment: reviewInput
            })
        }).then(response => response.status)
            .then(data => {
                if (data === httpStatus.created) {
                    fetch(`http://localhost:3000/product/${state.id}/review`)
                        .then(response => response.json())
                        .then(data => {
                            setReviews(data[0].reviews)
                        })
                }
            })
            setReviewInput("")
    }

    return (
        <Box sx={styles.container}>
            <Grid container sx={{ maxWidth: "1800px" }}>
                <Grid item md={12} lg={12}><Breadcrumb breadcrumbsContent={breadcrumbs} /></Grid>
                <Grid item md={8} xs={12} sx={styles.productDiv} order={{ md: 2, sm: 3 }}>
                    <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Box sx={{
                            width: "400px", height: "450px",
                            display: { md: "block", sm: "none" },
                            "&.MuiBox-root": {
                                backgroundImage: `url(/src/assets/products/${state.img})`, backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }
                        }}>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{ marginBottom: "20px" }}>
                            <Typography variant="h5" gutterBottom >Description</Typography>
                            {state.description.split(";").map((item, index) => (
                                <Typography key={`description-${index}`} variant="body1" gutterBottom>{item}</Typography>
                            ))}
                        </Box>
                        <Typography variant="h5" gutterBottom>Ingredients</Typography>
                        <Typography variant="body1" gutterBottom>{state.ingredients}</Typography>
                    </Box>
                    <Box ref={reviewsRef} sx={styles.reviewsDiv}>
                        <Typography variant="h5" gutterBottom>{"Reviews"}</Typography>
                        {reviews?.length > 0 && reviews?.map((item, index) => (
                            <Box key={`reviews-comment-${index}`} sx={styles.reviews}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="h5">{item.username}</Typography>
                                    <Typography variant="body1">{item.date}</Typography>
                                </Box>
                                <Box><Typography variant="body1" gutterBottom>{item.comment}</Typography></Box>
                            </Box>
                        ))}
                        {localStorage.getItem("jwtToken") && <>
                            <textarea
                                placeholder="Type in reviews here..."
                                style={styles.reviewsTextarea}
                                onChange={(e) => setReviewInput(e.target.value)}
                                value={reviewInput}
                            />
                            <Box sx={styles.submitBtn}>
                                <button style={{ border: "none", background: "none", color: "white" }} onClick={() => handleSubmitReview()}>Submit</button>
                            </Box>
                        </>}

                    </Box>
                </Grid>
                <Grid item md={4} xs={12} order={{ md: 3, sm: 2 }}>
                    <Box sx={{ width: "100%", alignItems: "center", justifyContent: "center", display: {md:"flex", xs:"none"} }}>
                        <Box sx={{
                            width: "400px", height: "450px",
                            display: { md: "none", sm: "block" },
                            "&.MuiBox-root": {
                                backgroundImage: `url(/src/assets/products/${state.img})`, backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }
                        }}>
                        </Box>
                    </Box>
                    <Box sx={{ marginBottom: "30px" }}>
                        <button
                            style={{ background: "none", border: "none", margin: 0, padding: 0 }}
                            onClick={() => reviewsRef.current.scrollIntoView({ behavior: 'smooth', block: "start" })}>
                            <Typography sx={styles.reviewsText} variant="h5">{`${reviews.length} Reviews`}</Typography></button>
                    </Box>
                    <Box>
                        <Typography variant="h5" gutterBottom>Specifications</Typography>
                        <Box sx={styles.specificationBox}>
                            <Typography variant="h6" sx={{ width: "200px" }}>{"Product"}</Typography>
                            <Typography variant="h6">{state.title}</Typography>
                        </Box>
                        <Box sx={styles.specificationBox}>
                            <Typography variant="h6" sx={{ width: "200px" }}>{"Brand"}</Typography>
                            <Typography variant="h6">{state.brand}</Typography>
                        </Box>
                        <Box sx={styles.specificationBox}>
                            <Typography variant="h6" sx={{ width: "200px" }}>{"Price"}</Typography>
                            <Typography variant="h6">{state.price}</Typography>
                        </Box>
                        <Box sx={styles.specificationBox}>
                            <Typography variant="h6" sx={{ width: "200px" }}>{"Weight"}</Typography>
                            <Typography variant="h6" gutterBottom>{state.weight}</Typography>
                        </Box>
                        <button style={styles.addToCartButton}>Add to Cart</button>
                        {localStorage.getItem("jwtToken") && <button style={styles.addToFavBtn}>Add to Favourite</button>}
                    </Box>

                </Grid>
            </Grid>
        </Box>
    )
}