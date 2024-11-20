import { Box, Typography } from '@mui/material'

export default function FinishOrder() {
    return (<>
        <Box sx={styles.container}>
            <Typography variant="h5">Thank you for your order</Typography>
            <Typography variant="h5">Your order number is: {parseInt(Math.random() * 10000000)}</Typography>
        </Box>
    </>)
}