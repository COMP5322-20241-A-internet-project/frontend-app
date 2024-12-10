import { useState, useEffect } from 'react'
import FilterComponent from "../components/FilterComponent"
import { Box, Grid,Typography, Button } from '@mui/material'
import Breadcrumb from "../components/Breadcrumb"
import RabbitFood from "../assets/rabbitFood.jpg"
import { priceConstant } from '../constants'
import { useNavigate } from "react-router-dom";
import { decodeJwt } from '../utils/utils';

const foodItems = [
    {
        id: 1,
        title: "Mature Rabbit Food",
        category: "food",
        price: "40",
        brand: "Bunny Natures",
        lifestage: "adult",
        img: "product1.jpeg",
        weight: "2.5 LBS",
        description: "This food loaded with natural goodness for rabbit;- Made in the USA;- No artificial colors or preservatives;- Enriched with DHA as well as digestive probiotics;- Contains fruits, vegetables, wholesome seeds, grains, nuts, legumes and much more",
        ingredients: "Pumpkin Seeds, Coconut, Raisins, White Millet, Oats, Sun-Cured Timothy Hay, Wheat Millet, Pyridoxine Hydrochloride, Riboflavin Supplement, Zinc Proteinate, Manganese Proteinate, Copper Proteinate, Calcium Iodate, Yucca Schidigera Extract, Sodium Selenite, Cobalt Carbonate, Vitamin B12 Supplement.",
        reviews: [{ id: 1, username: "Mandy", comment: "it is nice!!!", date: "2015-03-25T12:00:00-06:30" }, { id: 2, username: "Michael", comment: "I will buy it again", date: "2015-03-25T12:00:00-06:30" }]

    },
    {
        id: 2,
        title: "Senior Rabbit Food",
        category: "food",
        price: "100",
        brand: "Bunny Natures",
        lifestage: "senior",
        img: "product1.jpeg"
    },
    {
        id: 3,
        title: "Mature Rabbit Food",
        category: "food",
        price: "100",
        brand: "Kaytees",
        lifestage: "adult",
        img: "product1.jpeg"
    },
    {
        id: 4,
        title: "Old Rabbit Food",
        category: "food",
        price: "200",
        brand: "Kaytees",
        lifestage: "senior",
        img: "product1.jpeg"
    },
    {
        id: 5,
        title: "Young Rabbit Food",
        category: "food",
        price: "50",
        brand: "Kaytees",
        lifestage: "child",
        img: "product1.jpeg"
    },
    {
        id: 6,
        title: "Mature Rabbit Food",
        category: "food",
        price: "100",
        brand: "Sun Seeds",
        lifestage: "adult",
        img: "product1.jpeg"
    },
    {
        id: 7,
        title: "Senior Rabbit Food",
        category: "food",
        price: "300",
        brand: "Sun Seeds",
        lifestage: "senior",
        img: "product1.jpeg"
    },
]

export const breadcrumbs = [
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
    },
    addToFavButton: {
        width: "100%",
        background: "#b9d3f3",
        color: "#00205b",
        cursor: "pointer",
        marginTop: "5px",
        border: "none"
    }
}

export default function Food() {
    const navigate = useNavigate();
    const [mobileFilerOpen, setMobileFilterOpen] = useState(false)
    const [itemList, setItemList] = useState([])
    const [filterItems, setFilterItem] = useState([])
    const handleCheckboxChange = (checkedItem) => {
        const arr = []
        for (const item of checkedItem) {
            const foundIndex = arr.findIndex(arrItem => arrItem.filterName === item.filterName)
            if (foundIndex > -1) {
                arr[foundIndex].filterItems.push(item.filterItem)
            } else {
                arr.push({
                    filterName: item.filterName,
                    filterItems: [item.filterItem]
                })
            }
        }
        setFilterItem(arr)
    }
    const filterItemList = (itemList) => {
        let newItemList = itemList
        for (const filterItem of filterItems) {
            if (filterItem.filterName !== "price") {
                newItemList = newItemList.filter(itemListItem => {
                    return filterItem.filterItems.includes(itemListItem[filterItem.filterName])
                })
            }
        }


        for (const filterItem of filterItems) {
            if (filterItem.filterName === "price") {
                const arr = []
                if (filterItem.filterItems.includes(priceConstant.under35)) {
                    newItemList.forEach(itemListItem => {
                        if (parseFloat(itemListItem.price) < 35) {
                            arr.push(itemListItem)
                        }
                    })
                }
                if (filterItem.filterItems.includes(priceConstant.between35n70)) {
                    newItemList.forEach(itemListItem => {
                        if (parseFloat(itemListItem.price) >= 35 && parseFloat(itemListItem.price) <= 70) {
                            arr.push(itemListItem)
                        }
                    })
                }
                if (filterItem.filterItems.includes(priceConstant.between71n105)) {
                    newItemList.forEach(itemListItem => {
                        if (parseFloat(itemListItem.price) >= 71 && parseFloat(itemListItem.price) <= 105) {
                            arr.push(itemListItem)
                        }
                    })
                }
                if (filterItem.filterItems.includes(priceConstant.above105)) {
                    newItemList.forEach(itemListItem => {
                        if (parseFloat(itemListItem.price) > 105) {
                            arr.push(itemListItem)
                        }
                    })
                }
                newItemList = arr
            }
        }


        return filterItems.length > 0 ? newItemList : itemList
    }

    function addtoCart(item){
        let bunnybunnycart = localStorage.getItem("bunnybunnycart")
        if(!bunnybunnycart){
            localStorage.setItem("bunnybunnycart", JSON.stringify([{...item, quantity: 1}]))
        } else {
            bunnybunnycart = JSON.parse(localStorage.getItem("bunnybunnycart"))
            const foundIndex = bunnybunnycart.findIndex(cartItem=>cartItem.id === item.id)
            if(foundIndex > -1){
                bunnybunnycart[foundIndex].quantity = ++bunnybunnycart[foundIndex].quantity
            } else {
                bunnybunnycart.push({...item, quantity:1})
            }
            
            localStorage.setItem("bunnybunnycart", JSON.stringify(bunnybunnycart))
        }
    }

    function convertKeysToLowerCase(obj) {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }
    
        const newObj = {};
        Object.keys(obj).forEach(key => {
            const newKey = key.toLowerCase();
            newObj[newKey] = obj[key];
        });
    
        return newObj;
    }

    useEffect(()=>{
        fetch("http://localhost:3000/product")
        .then(response=>response.json())
        .then(data=>{
            if(data){
                for(let i = 0; i < data.length; i++){
                    data[i] = convertKeysToLowerCase(data[i])
                }
                setItemList(data)
            }
        })
    },[])

    function handleAddToFav(productId){
        const jwtToken = localStorage.getItem("jwtToken")
        const result = decodeJwt(jwtToken)
        fetch(`http://localhost:3000/user/${result.id}/favorite`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': ` Bearer ${jwtToken}` },
            body: JSON.stringify({
                productID: productId
            })}
        ).then(response => {
            console.log(response.status)
            if (response.status === 201) {
                alert("Added to favourite")
            } else {
                alert("You have added to favourite")
            }
        })
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
                        {itemList.length > 0 && filterItemList(itemList).map((item, index) => (
                            <Grid key={`${item}-${index}`} item md={3} xs={12} sx={{ display: "flex", flexDirection: { md: "column", xs: "row" }, alignItems: { xs: "center", md: "flex-start" }, borderBottom: { xs: "1px solid rgb(204, 204, 204)", md: "none" }, paddingBottom: { xs: "15px", md: "unset" } }}>
                                <Box onClick={() => navigate(`/product/${item.id}`, { state: { ...item, title: item.name } })} sx={{ width: { md: "100%" }, justifyContent: "center", display: "flex", cursor: "pointer" }}>
                                    <Box sx={{
                                        width: "200px", height: "250px",
                                        "&.MuiBox-root": {
                                            backgroundImage: `url(/src/assets/products/${item.img})`, backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center"
                                        }
                                    }}>
                                    </Box>
                                </Box>
                                <Box sx={{ borderTop: { md: "1px solid rgb(204, 204, 204)" }, marginTop: { md: "10px" }, paddingTop: "10px", marginBottom: "20px", flex: { xs: 1 }, width: { md: "100%" } }}>
                                    <Box sx={{ cursor: "pointer" }} onClick={() => navigate(`/product/${item.id}`, { state: { ...item, title: item.name } })}>
                                        <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>{item.brand}</Typography>
                                        <Typography sx={{ marginBottom: "5px" }}>{item.name}</Typography>
                                        <Typography sx={{ marginBottom: "5px" }}>{`HKD ${item.price}`}</Typography>
                                    </Box>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addtoCart({
                                            id: item.id,
                                            title: item.name,
                                            category: item.category,
                                            price: item.price,
                                            brand: item.brand,
                                            img: item.img
                                        });
                                    }} style={styles.addToCartButton}>Add to Cart</button>
                                    {localStorage.getItem("jwtToken") && <button style={styles.addToFavButton} onClick={()=> handleAddToFav(item.id)}>Add to Favourite</button>}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}