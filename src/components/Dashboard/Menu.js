import { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImgFoodNTreat from "../../assets/foodNtreat.jpg"
import ImgCleanRabbit from "../../assets/cleanRabbit.jpg"

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
    },
    subItemDiv: {
        height: "100vh",
        background: "white",//"blue",
        position: "absolute",
        left: "280px",
        zIndex: 2,
        display: { xs: "none", md: "flex" }

    },
    subItem: {
        fontSize: "1.2rem",
        padding: "10px 20px",
        minWidth: "280px",
        cursor:"pointer",
        '&.index0': {
            fontSize: "1.4rem",
            paddingTop: "10px",
            cursor:"default"
        },
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
        opacity: 0.5
    }
}

const menuData = [
    {
        name: "Food & Treats",
        subItems: ["Food", "Hay & Grass", "Treats & Chews"],
        image: {
            img: ImgFoodNTreat,
            style: {
                height:"300px",
                width:"400px",
                margin: "20px", 
                marginRight:"30px"
            },
            href: "https://bunnylady.com/rabbit-treats/",
            alt: "Rabbit food and treat"
        }
    },
    {
        name: "Health & Wellness",
        subItems: ["Pharmacy", "Grooming & Bathing", "Cleanup & Odor Control"],
        image: {
            img: ImgCleanRabbit,
            href: "https://rabbitcareexpert.com/how-to-clean-rabbit-cage/",
            alt: "Rabbit cleaning",
            style: {
                height:"300px",
                width:"400px",
                margin: "20px", 
                marginRight:"30px"
            },
        }
    },
    {
        name: "Supplies",
        subItems: ["Cages & Habitat", "Carriers", "Clothes"]
    }
]

export default function Menu({ setOpenMenu }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [subItems, setSubItems] = useState({});
    const [selectedSubItemMobile, setSelectedSubItemMobile] = useState([]);
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
                            setSubItems({...item, subItems: [item.name, ...item.subItems]});
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
                                if (index !== 0) {
                                    return (
                                        <Box
                                            sx={styles.subItemMobile}
                                            key={`${subItem}-${index}`}
                                            onClick={() => {
                                                setOpenMenu(false);
                                                setSelectedSubItemMobile(null)
                                            }}
                                        >
                                            {subItem}
                                        </Box>
                                    )
                                }
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
                            {subItems.subItems.map((subItem, index) => (
                                <Box
                                    className={index === 0 && "index0"}
                                    sx={styles.subItem}
                                    key={`${subItem}-${index}`}
                                    onClick={() => index !== 0 && setOpenMenu(false)}
                                >
                                    {subItem}
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