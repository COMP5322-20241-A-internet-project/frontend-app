import PromoteBar from "./PromoteBar";
import Header from "./Header";
import { Box, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function Dashboard({ children }) {
    const navigate = useNavigate()
    return (
        <>
            <Box
                sx={(theme) => {
                    return {
                        [theme.breakpoints.up('md')]: {
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
                    logoClick={() => navigate("/home")}
                />
            </Box>
            <Box
                sx={(theme) => {
                    return {
                        [theme.breakpoints.up('md')]: {
                            marginTop: "140px"
                        },
                    }
                }}
            >
                {children}
            </Box>
        </>
    )
}