import { useState } from "react"
import { Box, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { cloneDeep } from "lodash"
import { priceConstant } from "../constants"
import CheckBox from "./common/CheckBox";
const filterMenu_o = [
    {
        filterName: "brand",
        filterItems: ["Bunny Natures", "Kaytees", "Sun Seeds"],
        open: false
    },
    {
        filterName: "price",
        filterItems: [priceConstant.under35, priceConstant.between35n70, priceConstant.between71n105, priceConstant.above105],
        open: false
    },
    {
        filterName: "lifestage",
        filterItems: ["child", "adult", "senior"],
        open: false
    }
]

const styles = {
    filterItems: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 20px",
        borderTop: "1px solid rgb(204, 204, 204)",
        "&:last-child": {
            borderBottom: "1px solid rgb(204, 204, 204)",
        }
    },
    filterItem: {
        padding: "15px 8px",
        display:"flex",
        alignItems:"center"
    },
    resetButton:{
        width:"100%",
        marginTop:"15px",
        background:"#3da193",
        color:"white",
        height:"35px",
        border:"none"
    }
}


export default function FilterComponent({ sx, handleCheckboxChange }) {
    const [filterMenu, setFilterMenu] = useState(filterMenu_o)
    const [checkedItem, setCheckedItem] = useState([])
    const [resetFilter, setResetFilter] = useState(false)

    const toggleFilterItem = (filterName) => {
        const foundIndex = filterMenu.findIndex(item => item.filterName === filterName)

        if (foundIndex >= 0) {
            const newMenu = cloneDeep(filterMenu)
            newMenu[foundIndex].open = !newMenu[foundIndex].open
            setFilterMenu(newMenu)
        }
    }

    const onCheckboxChange = (checked, filterName, filterItem) => {
        let newCheckedItem = cloneDeep(checkedItem)
        if (checked) {
            newCheckedItem.push({ filterName, filterItem })
        } else {
            newCheckedItem = newCheckedItem.filter(item => item.filterItem !== filterItem)
        }
        setCheckedItem(newCheckedItem)
        handleCheckboxChange && handleCheckboxChange(newCheckedItem)
    }

    const handleReset = () => {
        setResetFilter(!resetFilter)
        setCheckedItem([])
        handleCheckboxChange && handleCheckboxChange([])
    }
    return (
        <>
            <Box sx={sx}>
                {filterMenu.length > 0 && filterMenu.map((item, index) => (
                    <Box key={`${item}-${index}`}>
                        <Grid sx={styles.filterItems} onClick={() => toggleFilterItem(item.filterName)}>
                            {item.filterName.charAt(0).toUpperCase() + item.filterName.slice(1)}
                            <ExpandMoreIcon />
                        </Grid>
                        {item.open && item.filterItems.length > 0 && item.filterItems.map((filterItem, filterItemIndex) => (
                            <Grid key={`${filterItem}-${filterItemIndex}`} sx={styles.filterItem}>
                                    <CheckBox reset={resetFilter} onCheckboxChange={(e) => onCheckboxChange(e.target.checked, item.filterName, filterItem)}/>
                                {filterItem.charAt(0).toUpperCase() + filterItem.slice(1)}
                            </Grid>
                        ))}
                    </Box>
                ))}
                 <button style={styles.resetButton} onClick={handleReset}>Reset</button>
            </Box>
        </>
    )
}