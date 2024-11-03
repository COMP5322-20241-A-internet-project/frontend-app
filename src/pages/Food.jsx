import { useState } from 'react'
import FilterComponent from "../components/FilterComponent"
import { Box, Grid, Link, Typography, Button } from '@mui/material';
import Breadcrumb from "../components/Breadcrumb";
import RabbitFood from "../assets/rabbitFood.jpg"

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
    }
}

export default function Food() {
    const [mobileFilerOpen, setMobileFilterOpen] = useState(false)
    const handleCheckboxChange = (checkedItem) => {

    }

    return (
        <>
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
                        <Grid container direction={"row"} spacing={2} sx={{padding:"10px"}}>
                            <Grid item md={3}>asas1</Grid>
                            <Grid item md={3}>asas2</Grid>
                            <Grid item md={3}>asas1</Grid>
                            <Grid item md={3}>asas1</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>

    )
}