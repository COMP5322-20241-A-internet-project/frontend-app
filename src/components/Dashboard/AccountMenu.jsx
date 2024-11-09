import { Box, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
const styles = {
    accountMenuPopup: (theme) => {
        return {
            position: "absolute",
            height: "auto",
            width: "300px",
            background: "white",
            right: 0,
            zIndex: 9999,
            border: `3px solid ${theme.palette.primary.main}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px"
        }
    },
    signInBtn: {
        width: "100%",
        background: "#00205b",
        color: "white",
        height: "40px",
        borderRadius: "5px",
        marginBottom: "15px",
        cursor: "pointer"
    },
    createAccountBtn: {
        width: "100%",
        background: "white",
        color: "#00205b",
        height: "40px",
        borderRadius: "5px",
        border: "1px solid #00205b",
        cursor: "pointer"
    }
}

export default function AccountMenu({ setOpenAccountMenu }) {
    const navigate = useNavigate()
    return (
        <Box sx={styles.accountMenuPopup}>
            <button style={styles.signInBtn} onClick={() => { setOpenAccountMenu(false); navigate("/signIn"); }}>Sign in </button>
            <button style={styles.createAccountBtn} onClick={() => { setOpenAccountMenu(false); navigate("/createAccount"); }}>Create Account</button>
        </Box>
    )
}