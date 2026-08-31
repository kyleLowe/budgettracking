import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import type NavBarButtonProps from "../interfaces/NavbarButtonInterface";

export default function NavBarButton({ icon, title, to }: NavBarButtonProps) {
  return (
    <div>
      <ListItemButton component={Link} to={to}>
        {icon}
        <ListItemText primary={title} />
      </ListItemButton>
    </div>
  );
}
