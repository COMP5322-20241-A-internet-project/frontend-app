import { useState } from 'react'
import FilterComponent from "../components/FilterComponent"
import { Box, Grid, Link, Typography, Button } from '@mui/material'
import Breadcrumb from "../components/Breadcrumb"
import RabbitFood from "../assets/rabbitFood.jpg"
import Product1 from "../assets/products/product1.jpeg"

const foodItems = [
    {
        title: "Mature Rabbit Food",
        category: "food",
        price: "40",
        brand: "Bunny Natures",
        lifeStage: "adult",
        img: Product1
    },
    {
        title: "Senior Rabbit Food",
        category: "food",
        price: "100",
        brand: "Bunny Natures",
        lifeStage: "senior",
        img: Product1
    },
    {
        title: "Mature Rabbit Food",
        category: "food",
        price: "100",
        brand: "Kaytees",
        lifeStage: "adult",
        img: Product1
    },
    {
        title: "Old Rabbit Food",
        category: "food",
        price: "200",
        brand: "Kaytees",
        lifeStage: "senior",
        img: Product1
    },
    {
        title: "Young Rabbit Food",
        category: "food",
        price: "50",
        brand: "Kaytees",
        lifeStage: "child",
        img: Product1
    },
    {
        title: "Mature Rabbit Food",
        category: "food",
        price: "100",
        brand: "Sun Seeds",
        lifeStage: "adult",
        img: Product1
    },
    {
        title: "Senior Rabbit Food",
        category: "food",
        price: "300",
        brand: "Sun Seeds",
        lifeStage: "senior",
        img: Product1
    },
]

const breadcrumbs = [
    <Typography key="1" sx={{ color: 'black', fontSize: "1rem" }}>
        Food & Treats
    </Typography>,
    <Typography key="2" sx={{ color: 'black', fontSize: "1rem", fontWeight: "bold" }}>
        Food
    </Typography>
];

const styles = {
    container: {
        padding: "30px"
    },
    rabbitPhotoDiv: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "50px",
        display: { xs: "none", md: "flex" }
    },
    filterComponentStyle: {
        display: { xs: "none", md: "block" }
    },
    mobileFilterComponentStyle: {
        display: { xs: "block", md: "none" },
        "& button": {
            border: "1px solid black",
            transition: "unset"
        }
    },
    mobileFilterButton: {
        width: "100%",
        marginBottom: "20px"
    },
    productCategoryText: {
        color: 'black',
        fontSize: "2rem",
        fontWeight: "bold",
        display: { xs: "none", md: "block" }
    },
    addToCartButton: {
        width: "100%",
        background: "#00205b",
        color: "white",
        cursor: "pointer"
    }
}

export default function Food() {
    const [mobileFilerOpen, setMobileFilterOpen] = useState(false)
    const [itemList, setItemList] = useState(foodItems)
    const handleCheckboxChange = (checkedItem) => {

    }

    return (
            <Box sx={styles.container}>
                <Breadcrumb breadcrumbsContent={breadcrumbs} />
                <Grid container sx={{ display: { md: "flex", xs: "block" } }}>
                    <Grid item md={3} >
                        <Box sx={{ marginRight: { md: "30px", xs: "0px" } }}>
                            <Box sx={styles.rabbitPhotoDiv}><img src={RabbitFood} height="300px" width="350px" /></Box>
                            <FilterComponent sx={styles.filterComponentStyle} handleCheckboxChange={handleCheckboxChange} />
                            <Box sx={styles.mobileFilterComponentStyle}>
                                <Button sx={styles.mobileFilterButton} variant="contained" onClick={() => setMobileFilterOpen(!mobileFilerOpen)}>Filter</Button>
                                {mobileFilerOpen && <FilterComponent handleCheckboxChange={handleCheckboxChange} />}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={9}>
                        <Typography key="2" sx={styles.productCategoryText}>
                            Food
                        </Typography>
                        <Grid container direction={"row"} spacing={2} sx={{ padding: "10px" }}>
                            {itemList.length > 0 && itemList.map((item, index) => (
                                <Grid key={`${item}-${index}`} item md={3} xs={12} sx={{ display: "flex", flexDirection: { md: "column", xs: "row" }, alignItems: { xs: "center", md: "flex-start" }, borderBottom: { xs: "1px solid rgb(204, 204, 204)", md: "none" }, paddingBottom: { xs: "15px", md: "unset" } }}>
                                    <Box sx={{ width: { md: "100%" }, justifyContent: "center", display: "flex" }}>
                                        <Box sx={{
                                            width: "200px", height: "250px",
                                            "&.MuiBox-root": {
                                                backgroundImage: 'url(/src/assets/products/product1.jpeg)', backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center"
                                            }
                                        }}>
                                        </Box>
                                    </Box>
                                    <Box sx={{ borderTop: { md: "1px solid rgb(204, 204, 204)" }, marginTop: { md: "30px" }, paddingTop: "10px", marginBottom: "20px", flex: { xs: 1 }, width: { md: "100%" } }}>
                                        <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>{item.brand}</Typography>
                                        <Typography sx={{ marginBottom: "5px" }}>{item.title}</Typography>
                                        <Typography sx={{ marginBottom: "5px" }}>{`HKD ${item.price}`}</Typography>
                                        <button style={styles.addToCartButton}>Add to Cart</button>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
    )
}