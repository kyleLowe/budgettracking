import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import NavBarButton from "./NavBarButton";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PaymentIcon from '@mui/icons-material/Payment';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export default function NavBar() {
    return(
        <Drawer variant="permanent" anchor="left">
            <Divider />
            <List>
                <NavBarButton icon={<AnalyticsIcon/>} title="Dashboard" to="/dashboard" />
                <NavBarButton icon={<PaymentIcon/>} title="Purchases" to="/purchase" />
                <NavBarButton icon={<CurrencyExchangeIcon/>} title="Subscriptions" to="/subscription" />
            </List>
        </Drawer>
    )
}