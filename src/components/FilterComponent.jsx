import { useState } from "react"
import { Box, Grid, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { cloneDeep } from "lodash"
import { priceConstant } from "../constants"

const filterMenu_o = [
    {
        filterName: "Brand",
        filterItems: ["Bunny Natures", "Kaytees", "Sun Seeds"],
        open: false
    },
    {
        filterName: "Price",
        filterItems: [priceConstant.under35, priceConstant.between35n70, priceConstant.between71n105, priceConstant.above105],
        open: false
    },
    {
        filterName: "Lifestage",
        filterItems: ["Child", "Adult", "Senior"],
        open: false
    }
]

const styles = {
    filterItems: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 20px",
        borderTop: "1px solid rgb(204, 204, 204);",
        "&:last-child": {
            borderBottom: "1px solid rgb(204, 204, 204);",
        }
    },
    filterItem: {
        padding: "15px 8px"
    }
}


export default function FilterComponent({ sx, handleCheckboxChange }) {
    const [filterMenu, setFilterMenu] = useState(filterMenu_o)
    const [checkedItem, setCheckedItem] = useState([])

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
            newCheckedItem = newCheckedItem.filter(item => item.filterName != filterName)
        }
        setCheckedItem(newCheckedItem)
        handleCheckboxChange && handleCheckboxChange(newCheckedItem)
    }

    return (
        <>
            <Box sx={sx}>
                {filterMenu.length > 0 && filterMenu.map((item, index) => (
                    <Box key={`${item}-${index}`}>
                        <Grid sx={styles.filterItems} onClick={() => toggleFilterItem(item.filterName)}>
                            {item.filterName}
                            <ExpandMoreIcon />
                        </Grid>
                        {item.open && item.filterItems.length > 0 && item.filterItems.map((filterItem, filterItemIndex) => (
                            <Grid key={`${filterItem}-${filterItemIndex}`} sx={styles.filterItem}>
                                <Checkbox onChange={(e) => onCheckboxChange(e.target.checked, item.filterName, filterItem)} />
                                {filterItem}
                            </Grid>
                        ))}
                    </Box>
                ))}
            </Box>
        </>
    )
}