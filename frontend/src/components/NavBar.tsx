import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import NavBarButton from "./NavBarButton";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PaymentIcon from "@mui/icons-material/Payment";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutButton from "./LogoutButton";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* <Box sx={{ position: "fixed", top: 8, left: 8, zIndex: 1301 }}>
        <MenuIcon />
      </Box> */}
      <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          <NavBarButton
            icon={<AnalyticsIcon />}
            title="Dashboard"
            to="/dashboard"
          />
          <NavBarButton
            icon={<PaymentIcon />}
            title="Transactions"
            to="/transaction"
          />
          <NavBarButton
            icon={<CurrencyExchangeIcon />}
            title="Subscriptions"
            to="/subscription"
          />
          <NavBarButton
            icon={<CategoryIcon />}
            title="Categories"
            to="/category"
          />
        </List>
        <Divider />
        <List>
          <NavBarButton
            icon={<AccountCircleIcon />}
            title="Profile"
            to="/profile"
          />
          <LogoutButton icon={<LogoutIcon />} title="Logout" to="/logout" />
        </List>
      </Drawer>
    </div>
  );
}
