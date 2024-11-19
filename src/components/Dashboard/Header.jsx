import { useState, useEffect, useContext } from 'react'
import { Box, Grid } from '@mui/material';
import RabbitLogo from "../../assets/rabbit-logo.svg"
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import SvgIcon from '@mui/material/SvgIcon';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from "./Menu"
import AccountMenu from './AccountMenu';
import { useNavigate } from "react-router-dom";
import { StateContext } from '../../StateProvider';
import { decodeJwt } from '../../utils/utils';

const styles = {
    headerDiv: (theme) => {
        return {
            alignItems: "center",
            background: theme.palette.primary.main,
            padding: "10px",
            flexGrow: 1,
            justifyContent: { xs: "space-between" },
            ZIndex: 9999
        }
    },
    menuIcon: {
        color: "white",
        fontSize: { md: "3rem", xs: "2rem" },
        marginLeft: { xs: 0, md: "6px" },
        marginRight: "15px",
        cursor: "pointer",
    },
    logo: {
        color: "white",
        fontSize: "1.8rem",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        textWrap: "no-wrap",
        cursor: "pointer"
    },
    rabbit: (theme) => {
        return {
            alignSelf: "bottom",
            fontSize: "40px",
            marginLeft: { md: "12px" },
            [theme.breakpoints.down('sm')]: {
                display: "none"
            }
        }
    },
    search: (theme) => {
        return {
            position: 'relative',
            backgroundColor: "white",
            '&:hover': {
                backgroundColor: "white",
            },
            // marginLeft: { xs: "20px" },
            // marginRight: { sm: "20px" }
        }
    },
    searchIconWrapper: (theme) => {
        return {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    },
    searchInput: (theme) => {
        return {
            color: 'inherit',
            '& .MuiInputBase-input': {
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            },
            width: "100%"
        }
    },
    generalIcon: {
        color: "white",
        fontSize: "2rem",
        marginLeft: "15px",
        cursor: "pointer"
    }
};


export default function Header({ companyName, logoClick }) {
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false)
    const [openAccountMenu, setOpenAccountMenu] = useState(false)
    const body = document.querySelector('body');
    const { setUserName } = useContext(StateContext)
    useEffect(() => {
        if (openMenu && body) {

            body.style.overflowY = 'hidden';
        } else {
            body.style.overflowY = 'auto';
        }
    }, [openMenu])

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken")
        if (jwtToken) {
            const result = decodeJwt(jwtToken)
            if (result) {
                setUserName(result.username)
            }
        }
    }, [])
    return (
        <>
            <Grid container sx={styles.headerDiv}>
                <Grid item md={3} xs={9} sx={{ display: "flex", alignItems: "center", marginBottom: { xs: "12px", md: 0 } }}>
                    <MenuIcon
                        sx={styles.menuIcon}
                        onClick={() => setOpenMenu(!openMenu)}
                    />
                    <Box component="div" sx={styles.logo} onClick={logoClick}>
                        {companyName}
                        <Box sx={styles.rabbit}>{<img src={RabbitLogo} alt="rabbit-logo" />}</Box>
                    </Box>
                </Grid>
                <Grid item md={8} xs={12} sx={{ order: { xs: 3, md: 2 } }} onClick={() => setOpenMenu(false)}>
                    <Box component="div" sx={styles.search}>
                        <Box component="div" sx={styles.searchIconWrapper}>
                            <SearchIcon />
                        </Box>
                        <InputBase
                            sx={styles.searchInput}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Box>
                </Grid>
                <Grid item md={1} sx={{ display: "flex", justifyContent: "center", order: { xs: 2, md: 3 }, width: "80px" }} onClick={() => setOpenMenu(false)}>
                    <AccountCircleIcon sx={{ ...styles.generalIcon, marginLeft: { xs: "0px", md: "15px" } }} onClick={() => { setOpenAccountMenu(!openAccountMenu) }} />
                    <ShoppingCartIcon sx={styles.generalIcon} onClick={() => navigate("/shoppingCart")} />
                </Grid>
            </Grid>
            {openAccountMenu && <AccountMenu setOpenAccountMenu={setOpenAccountMenu} />}
            {openMenu && <Menu id="menu" setOpenMenu={setOpenMenu} />}
        </>
    )
}