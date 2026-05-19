import { ListItemButton, ListItemText } from "@mui/material";
import {Link} from 'react-router-dom';

interface NavBarButtonProps {
    icon: any;
    title: string;
    to: string;
}

export default function NavBarButton({ icon, title, to }: NavBarButtonProps) {
    return(
        <div>
            <ListItemButton component={Link} to={to}>
                {icon}
                <ListItemText primary={title} />
            </ListItemButton>
        </div>
    )
}