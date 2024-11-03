import { Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Breadcrumb({ breadcrumbsContent }) {
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{marginBottom:"30px"}}
        >
            {breadcrumbsContent}
        </Breadcrumbs>
    )
}