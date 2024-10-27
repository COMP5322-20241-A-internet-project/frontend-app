import PromoteBar from "./PromoteBar";
import Header from "./Header";
import { Box, Grid } from '@mui/material';

export default function Dashboard({ children }) {
    return (
        <>
            <Box
                sx={(theme) => {
                    return {
                        [theme.breakpoints.up('sm')]: {
                            position: "fixed",
                            top: "0px",
                            right: "0px",
                            left: "0px"
                        },
                    }
                }}
            >
                <PromoteBar
                    badgeTitle="Pre-Christmas Sale"
                    promoteText="15% off | Use code: CHRIS2024"
                />
                <Header
                    companyName="Bunny Bunny"
                />
            </Box>
            <Box
                sx={(theme) => {
                    return {
                        [theme.breakpoints.up('sm')]: {
                           marginTop:"135px"
                        },
                    }
                }}
            >
                {children}
            </Box>
        </>
    )
}