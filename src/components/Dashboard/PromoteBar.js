import Box from '@mui/material/Box';

const styles = {
    promoteBarDiv: (theme) => {return{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
        background: "#b9d3f3",
        padding: "10px",
    }},
    badge: (theme) => {
        return {
            width: "auto",
            background: theme.palette.primary.main,
            border: "20px",
            color: "white",
            padding: "6px 15px",
            borderRadius: "30px",
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            marginRight: { md: "10px" },
            marginBottom: { xs: "5px" },
            textWrap: "nowrap"
        }
    },
    promoteText: {
        fontSize: "1.3rem"
    }
};


export default function PromoteBar({ badgeTitle, promoteText }) {

    return (
        <>
            <Box component="div" sx={styles.promoteBarDiv} >
                {badgeTitle &&
                    <Box component="div" sx={styles.badge}>
                        {`${badgeTitle}`}
                    </Box>}
                <Box component="div" sx={styles.promoteText}>
                    {promoteText}
                </Box>
            </Box>
        </>
    )
}