import { Box, Grid, Typography, Button, TextField } from '@mui/material'
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

export default function FinishOrder() {
    return (<>
        <Box sx={styles.container}>
            <Typography variant="h5">Thank you for your order</Typography>
            <Typography variant="h5">Your order number is: </Typography>
        </Box>
    </>)
}