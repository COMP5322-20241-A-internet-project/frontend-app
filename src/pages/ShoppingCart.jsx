import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { cloneDeep } from "lodash"
import { useNavigate } from "react-router-dom";
import { httpStatus, locationStateConstant } from "../constants";
import { decodeJwt } from '../utils/utils';

export const breadcrumbs = [
    <Typography key="1" sx={{ color: 'black', fontSize: "1rem" }}>
        Shopping Cart
    </Typography>,
];

const styles = {
    container: {
        padding: { md: "30px", xs: 0 },
        paddingBottom: { xs: "50px" }
    },
    productDiv: (theme) => {
        return {
            display: "flex",
            flexDirection: "column"
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
    },
    startShoppingBtn: {
        background: "#00205b",
        color: "white",
        height: "50px",
        width: "270px",
        marginTop: "20px",
        cursor: "pointer"
    }
}

export default function ShoppingCart() {
    const location = useLocation()
    const navigate = useNavigate()
    const [geoAddress, setGeoAddress] = useState("")
    const [cartItems, setCartItem] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [address1, setAddress1] = useState("Hong Kong Polytechnic University, Hung Hom, Kowloon, Hong Kong")
    const [nameOnCreditCard, setNameOnCreditCard] = useState("")
    const [creditCardNum, setCreditCardNum] = useState("")
    const [expiryMonth, setExpiryMonth] = useState("")
    const [expiryYear, setExpiryYear] = useState("")
    const [cvc, setCvc] = useState(null)
    const [error, setError] = useState({})
    const [readyForSubmit, setReadyForSubmit] = useState(false)
    const [discountCode, setDiscountCode] = useState()

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
        if (bunnybunnycart) {
            setCartItem(bunnybunnycart)
            const total = bunnybunnycart.reduce((prev, curr) => {
                if (curr.quantity === 0 || curr.quantity === "" || curr.quantity == null || curr.quantity === undefined) {
                    return totalPrice
                }
                return prev += parseFloat(curr.price) * parseFloat(curr.quantity)
            }, 0)
            setTotalPrice(total)
        }
    }, [])

    function changeQuantity(value, id) {
        setError({ ...error, cart: null })
        const newCartItems = cloneDeep(cartItems)
        for (const item of newCartItems) {
            if (item.id === id) {
                item.quantity = value
            }
        }
        setCartItem(newCartItems)
    }

    function handleDelete(id) {
        setError({ ...error, cart: null })
        const filteredCartItem = cartItems.filter(item => item.id !== id)
        setCartItem(filteredCartItem)
        localStorage.setItem("bunnybunnycart", JSON.stringify(filteredCartItem))
    }

    function handleUpdateCart() {
        const foundNullQuantity = cartItems.filter(item => item.quantity === "" || item.quantity == null)

        if (foundNullQuantity.length > 0) {
            setError({ cart: "Cannot update as it contains items with 0 quantity" })
        } else {
            setError({ ...error, cart: null })
            const total = cartItems.reduce((prev, curr) => {
                return prev += parseFloat(curr.price) * parseFloat(curr.quantity)
            }, 0)
            setTotalPrice(total)

            localStorage.setItem("bunnybunnycart", JSON.stringify(cartItems))
        }
    }

    function validateCreditCard(cardNumber) {

        cardNumber = cardNumber.replace(/\D/g, '');

        if (cardNumber.length < 13 || cardNumber.length > 19) {
            return false;
        }

        let sum = 0;
        let alternate = false;

        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let n = parseInt(cardNumber.charAt(i), 10);

            if (alternate) {
                n *= 2;
                if (n > 9) {
                    n -= 9;
                }
            }

            sum += n;
            alternate = !alternate;
        }
        return (sum % 10 === 0);
    }

    function validateForm() {
        let newError = {}
        if (!validateCreditCard(creditCardNum)) {
            newError = { ...newError, creditCardNum: "error" }
        }
        if (!firstname) {
            newError = { ...newError, firstname: "error" }
        }
        if (!lastname) {
            newError = { ...newError, lastname: "error" }
        }
        if (!address1) {
            newError = { ...newError, address1: "error" }
        }
        if (!nameOnCreditCard) {
            newError = { ...newError, nameOnCreditCard: "error" }
        }
        if (!creditCardNum) {
            newError = { ...newError, creditCardNum: "error" }
        }
        if (!expiryMonth) {
            newError = { ...newError, expiryMonth: "error" }
        }
        if (!expiryYear) {
            newError = { ...newError, expiryYear: "error" }
        }
        if (!cvc) {
            newError = { ...newError, cvc: "error" }
        }
        setError(newError)
        if (JSON.stringify(newError) !== "{}") {
            return false
        } else {
            return true
        }
    }

    function handleSubmit() {
        const validated = validateForm()
        if (validated) {
            const jwtToken = localStorage.getItem("jwtToken")
            if (!jwtToken) {
                localStorage.setItem("orderInfo", JSON.stringify({
                    firstname,
                    lastname,
                    address1,
                    nameOnCreditCard,
                    creditCardNum,
                    expiryMonth,
                    expiryYear,
                    cvc
                }))
                navigate("/signIn", { state: locationStateConstant.fromSubmitCart })
            } else {
                const result = decodeJwt(jwtToken)
                let bunnybunnycart = localStorage.getItem("bunnybunnycart")
                bunnybunnycart = JSON.parse(bunnybunnycart)
                const productOrders = {}
                bunnybunnycart.forEach((order) => {
                    return productOrders[order.id] = order.quantity
                })
                fetch("http://localhost:3000/orders", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': ` Bearer ${jwtToken}` },
                    body: JSON.stringify({
                        userID: result.id,
                        productOrders: JSON.stringify(productOrders),
                        totalPrice: totalPrice,
                        address: address1,
                        firstname: firstname,
                        lastname: lastname
                    })
                })
                    .then(response => response.status)
                    .then(data => {
                        if (data === httpStatus.created) {
                            localStorage.removeItem("bunnybunnycart")
                            localStorage.removeItem("orderInfo")
                            navigate("/finishOrder")
                        }
                    })
            }
        }
    }

    useEffect(() => {
        if (location.state === locationStateConstant.returnFromSignIn) {
            let orderInfo = localStorage.getItem("orderInfo")
            if (orderInfo) {
                orderInfo = JSON.parse(orderInfo)
                setFirstname(orderInfo.firstname)
                setLastname(orderInfo.lastname)
                setAddress1(orderInfo.address1)
                setNameOnCreditCard(orderInfo.nameOnCreditCard)
                setCreditCardNum(orderInfo.creditCardNum)
                setExpiryMonth(orderInfo.expiryMonth)
                setExpiryYear(orderInfo.expiryYear)
                setCvc(orderInfo.cvc)
                setReadyForSubmit(true)
            }
        }
    }, [])

    useEffect(() => {
        if (readyForSubmit) {
            handleSubmit()
        }
    }, [readyForSubmit])

    function handleDiscountCode() {
        if (totalPrice > 0 && discountCode === "CHRIS2024") {
            setTotalPrice((totalPrice * 0.7).toFixed(1))
        }
    }
    return (
        <Box sx={styles.container}>
            <Grid container>
                {/* <Grid item md={12} lg={12}><Breadcrumb breadcrumbsContent={breadcrumbs} /></Grid> */}

                {(!cartItems || cartItems.length === 0) ?
                    <div style={{ height: "78vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", background: "#eceaea", flexDirection: "column" }}>
                        <Typography variant="h5">Shopping Cart is empty</Typography>
                        <button
                            style={styles.startShoppingBtn}
                            onClick={() => navigate("/home")}
                        >
                            Start Shopping
                        </button>

                    </div> :
                    <Grid item xs={12} md={12} lg={12} sx={{ display: "flex", justifyContent: "center", maxWidth: "1800px", flexDirection: { xs: "column", md: "column", lg: "row" } }}>
                        <Grid item lg={4} md={12} xs={12} sx={styles.productDiv}>
                            <Box style={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="h5" gutterBottom>Items</Typography>
                                <Typography style={{ color: "red", fontSize: "1rem", marginLeft: "20px" }} gutterBottom>{error.cart}</Typography>
                            </Box>
                            <div style={{ overflowY: "scroll", height: "508px" }}>
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
                                            <Typography gutterBottom>{`Quantity: `}<input type="number" style={{ width: "80px" }} value={cartItem.quantity}
                                                onKeyDown={(evt) => (evt.key === 'e' || evt.key === '-') && evt.preventDefault()}
                                                onChange={(e) => {
                                                    const valueString = e.target.value.toString()
                                                    if (valueString.length === 1 && valueString === "0") return
                                                    changeQuantity(e.target.value, cartItem.id)
                                                }} /></Typography>
                                            <button
                                                style={{ background: "#de0a26", color: "white", border: 0, height: "35px", cursor: "pointer" }}
                                                onClick={() => handleDelete(cartItem.id)}
                                            >
                                                Delete
                                            </button>
                                        </Box>
                                    </div>
                                ))}
                            </div>
                            <button
                                style={{ marginTop: "20px", background: "#00205b", color: "white", height: "50px", width: "100%", cursor: "pointer" }}
                                onClick={() => handleUpdateCart()}
                            >
                                Update Cart
                            </button>
                        </Grid>
                        <Grid item lg={4} md={12} xs={12}>
                            <Box></Box>
                            <Box style={{ marginLeft: "10px" }}>
                                <Typography variant="h5" gutterBottom>{`Order Total: HKD ${totalPrice}`}</Typography>
                                <Typography variant="h6" style={{ marginBottom: "8px" }}>Delivery Infoamtion</Typography>
                                <Box style={{ border: "1px solid black", padding: "15px", background: "#b9d3f3" }}>
                                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Box style={{ display: "flex", flexDirection: "column", width: "49%" }}>
                                            <label htmlFor="firstname">First Name</label>
                                            <input
                                                style={error.firstname && { border: "2px solid red" }}
                                                type="text"
                                                value={firstname}
                                                onChange={(e) => { setError({ ...error, firstname: null }); setFirstname(e.target.value.trim()) }}
                                            />
                                        </Box>
                                        <Box style={{ display: "flex", flexDirection: "column", width: "49%" }}>
                                            <label htmlFor="lastname">Last Name</label>
                                            <input
                                                style={error.lastname && { border: "2px solid red" }}
                                                type="text"
                                                value={lastname}
                                                onChange={(e) => { setError({ ...error, lastname: null }); setLastname(e.target.value.trim()) }}
                                            />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
                                            <label htmlFor="address1">Address</label>
                                            <input
                                                style={error.address1 && { border: "2px solid red" }}
                                                type="text"
                                                value={address1}
                                                onChange={(e) => { setError({ ...error, address1: null }); setAddress1(e.target.value.trim()) }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box>
                                    <Box style={{ display: "flex", flexDirection: "row", marginTop: "20px", alignItems: "center" }}>
                                        <label htmlFor="discount" style={{ marginRight: "10px", fontSize: "22px" }}>Discount Code</label>
                                        <input
                                            type="text"
                                            value={discountCode}
                                            onChange={(e) => { setDiscountCode(e.target.value.trim()) }}
                                        />
                                        <button style={{ marginLeft: "10px", background: "#00205B", color: "white" }} onClick={() => handleDiscountCode()}>Apply</button>
                                    </Box>
                                </Box>
                                <Typography variant="h6" style={{ marginBottom: "10px", marginTop: "3px" }}>Credit Card Infoamtion</Typography>
                                <Box style={{ border: "1px solid black", padding: "15px", background: "#b9d3f3" }}>
                                    <Box>
                                        <Box style={{ display: "flex", flexDirection: "column" }}>
                                            <label htmlFor="creditCard">Name on Credit Card</label>
                                            <input
                                                style={error.nameOnCreditCard && { border: "2px solid red" }}
                                                type="text"
                                                value={nameOnCreditCard}
                                                onChange={(e) => { setError({ ...error, nameOnCreditCard: null }); setNameOnCreditCard(e.target.value) }}
                                            />
                                        </Box>
                                        <Box style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
                                            <label htmlFor="creditCard">Credit Card</label>
                                            <input
                                                style={error.creditCardNum && { border: "2px solid red" }}
                                                type="number"
                                                value={creditCardNum}
                                                onKeyDown={(evt) => (evt.key === 'e' || evt.key === '-') && evt.preventDefault()}
                                                onChange={(e) => { setError({ ...error, creditCardNum: null }); setCreditCardNum(e.target.value); }} />
                                        </Box>
                                        <Box style={{ display: "flex" }}>
                                            <Box style={{ display: "flex", flexDirection: "column", marginTop: "20px", marginRight: "3px" }}>
                                                <label htmlFor="creditCard">Expiry Date</label>
                                                <Box style={{ display: "flex" }}>
                                                    <input
                                                        style={{ width: "40px", marginRight: "5px", border: error.expiryMonth && "2px solid red" }}
                                                        type="number"
                                                        value={expiryMonth}
                                                        min={1}
                                                        max={12}
                                                        onKeyDown={(evt) => (evt.key === 'e' || evt.key === '-') && evt.preventDefault()}
                                                        onChange={(e) => {
                                                            setError({ ...error, expiryMonth: null })
                                                            const valueString = e.target.value.toString()
                                                            if (valueString.length > 2) {
                                                                return
                                                            } else if (valueString.length === 2 && valueString.startsWith("0") && valueString.endsWith("0")) {
                                                                return
                                                            } else if (e.target.value > 12) {
                                                                return
                                                            }
                                                            setExpiryMonth(e.target.value)
                                                        }}
                                                    />{`/ `}
                                                    <input
                                                        style={{ width: "40px", marginLeft: "5px", border: error.expiryYear && "2px solid red" }}
                                                        type="number"
                                                        value={expiryYear}
                                                        onKeyDown={(evt) => (evt.key === 'e' || evt.key === '-') && evt.preventDefault()}
                                                        onChange={(e) => {
                                                            setError({ ...error, expiryYear: null })
                                                            const valueString = e.target.value.toString()
                                                            if (valueString.length > 2) {
                                                                return
                                                            } else if (valueString.length > 1 && e.target.value < 24 || valueString.length > 1 && e.target.value > 29) {
                                                                return
                                                            }
                                                            setExpiryYear(e.target.value)
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box style={{ display: "flex", flexDirection: "column", marginTop: "20px", marginLeft: "20px" }}>
                                                <label htmlFor="creditCard">CVC</label>
                                                <Box style={{ display: "flex" }}>
                                                    <input
                                                        style={{ width: "40px", border: error.cvc && "2px solid red" }}
                                                        type="number"
                                                        value={cvc}
                                                        max={999}
                                                        onKeyDown={(evt) => (evt.key === 'e' || evt.key === '-') && evt.preventDefault()}
                                                        onChange={(e) => {
                                                            setError({ ...error, cvc: null })
                                                            const valueString = e.target.value.toString()
                                                            if (valueString.length > 3) {
                                                                return
                                                            }
                                                            setCvc(e.target.value)
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <button
                                    style={{ marginTop: "6px", background: "#00205b", color: "white", height: "50px", width: "100%", cursor: "pointer" }}
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                >
                                    Submit
                                </button>
                            </Box>
                        </Grid>
                    </Grid>}
            </Grid>
        </Box>
    )
}