import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type NavBarButtonProps from "../interfaces/NavbarButtonInterface";
import {Link, useNavigate} from 'react-router-dom';
import { AppContext } from "../providers/AppContextProvider";
import { useContext } from "react";



export default function NavBarButton({ icon, title, to }: NavBarButtonProps) {
    const { logoutUser } = useContext(AppContext);
    const navigate = useNavigate();
    
    async function handleLogout() {
        const response = await logoutUser();
        response && navigate('/');
    };

    return(
        <div>
            <ListItemButton component={Link} to={to} onClick={handleLogout}>
                {icon}
                <ListItemText primary={title} />
            </ListItemButton>
        </div>
    )
}