import { useState } from 'react'
import { Box, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImgFoodNTreat from "../../assets/foodNtreat.jpg"
import ImgCleanRabbit from "../../assets/cleanRabbit.jpg"
import { useNavigate } from "react-router-dom";

const styles = {
    menuDiv: {
        background: "white",//"red",
        width: "280px",
        height: "100vh",
        position: "absolute",
        display: "flex",
        flexDirection: "column"

    },
    menuItem: {
        padding: "20px",
        background: "white",//"purple",
        '&.selected': {
            background: { md: "lightgrey" }
        },
        width: "100%",
        cursor: { xs: "pointer", md: "unset" },
        zIndex:999
    },
    subItemDiv: {
        height: "100vh",
        background: "white",//"blue",
        position: "absolute",
        left: "280px",
        zIndex: 9999,
        display: { xs: "none", md: "flex" },


    },
    subItem: {
        fontSize: "1.2rem",
        padding: "10px 20px",
        minWidth: "280px",
        cursor: "pointer"
    },
    itemTitle:{
        minWidth: "280px",
        fontSize: "1.4rem",
        padding: "10px 20px",
        paddingTop: "10px",
    },
    subItemMobile: {
        fontSize: "1.1rem",
        padding: "10px 20px",
    },
    overlay: {
        height: "100vh",
        background: "black",
        position: "absolute",
        left: "280px",
        right: 0,
        opacity: 0.5,
        zIndex:998
    }
}

const menuData = [
    {
        name: "Food & Treats",
        subItems: [{ name: "Food", link: "/food" }, { name: "Hay & Grass", link: "" }, { name: "Treats & Chews", link: "" }],
        image: {
            img: ImgFoodNTreat,
            style: {
                height: "300px",
                width: "400px",
                margin: "20px",
                marginRight: "30px"
            },
            href: "https://bunnylady.com/rabbit-treats/",
            alt: "Rabbit food and treat"
        }
    },
    {
        name: "Health & Wellness",
        subItems: [{ name: "Pharmacy", link: "" }, { name: "Grooming & Bathing", link: "" }, { name: "Cleanup & Odor Control", link: "" }],
        image: {
            img: ImgCleanRabbit,
            href: "https://rabbitcareexpert.com/how-to-clean-rabbit-cage/",
            alt: "Rabbit cleaning",
            style: {
                height: "300px",
                width: "400px",
                margin: "20px",
                marginRight: "30px"
            },
        }
    },
    {
        name: "Supplies",
        subItems: [{ name: "Cages & Habitat", link: "" }, { name: "Carriers", link: "" }, { name: "Clothes", link: "" }]
    }
]

export default function Menu({ setOpenMenu }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [subItems, setSubItems] = useState({});
    const [selectedSubItemMobile, setSelectedSubItemMobile] = useState([]);
    const navigate = useNavigate();

    return (
        <>
            <Box
                sx={styles.menuDiv}
                onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
            >
                {menuData.map((item, index) => (
                    <Box
                        className={selectedItem === index && "selected"}
                        sx={styles.menuItem}
                        key={`${item}-${index}`}
                        onMouseEnter={() => {
                            setSubItems(item);
                            setSelectedItem(index)
                        }}
                        onClick={() => setSelectedSubItemMobile((prev) => {
                            if (prev == null || prev !== item.name) return item.name
                            return null
                        })}
                    >
                        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem" }}>
                            {item.name}
                            <NavigateNextIcon sx={{ display: { xs: "none", md: "inline-block" } }} />
                            <ExpandMoreIcon sx={{ display: { xs: "inline-block", md: "none" } }} />
                        </Box>
                        {/* mobile */}
                        <Box sx={{ display: { md: "none" }, marginTop: "10px" }}>
                            {item.subItems.length > 0 && selectedSubItemMobile === item.name && item.subItems.map((subItem, index) => {

                                return (
                                    <Box
                                        sx={styles.subItemMobile}
                                        key={`${subItem.name}-${index}`}
                                        onClick={() => {
                                            setOpenMenu(false);
                                            setSelectedSubItemMobile(null)
                                            navigate(subItem.link)
                                        }}
                                    >
                                        {subItem.name}
                                    </Box>
                                )

                            })}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box sx={styles.subItemDiv} onMouseLeave={() => {
                setSubItems({})
                setSelectedItem(null)
            }}>
                {subItems?.subItems?.length > 0 &&
                    <>
                        <Box sx={{ display: "flex", flexDirection: "column", }}>
                            <Typography sx={styles.itemTitle}>{subItems.name}</Typography>
                            {subItems.subItems.map((subItem, index) => (
                                <Box
                                    sx={styles.subItem}
                                    key={`${subItem.name}-${index}`}
                                    onClick={() => {
                                        setOpenMenu(false)
                                        navigate(subItem.link)
                                    }}
                                >
                                    {subItem.name}
                                </Box>
                            ))}
                        </Box>
                        <Box>
                            {subItems.image && <a href={subItems.image.href} target="_blank">
                                <img
                                    src={subItems.image.img}
                                    alt={subItems.image.alt}
                                    style={subItems.image.style}
                                />
                            </a>}
                        </Box>
                    </>}

            </Box>
            <Box
                sx={styles.overlay}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenMenu(false);
                }}
            >
            </Box>

        </>
    )
}