import { useContext, useEffect, type JSX } from 'react';
import { Route, Routes, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import CssBaseLine from '@mui/material/CssBaseline';
import { AppContext } from './providers/AppContextProvider';
import Layout from './components/Layout';
import PurchasePage from './pages/PurchasePage';
import SubscriptionPage from './pages/SubscriptionPage';


function App() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const currentLocation = useLocation().pathname;

  // Navigates to dashboard if new tab is open and user exists
  useEffect(() => {
    if (user && currentLocation === '/') {
      navigate('/dashboard');
    }
  }, []);



// [ '127.0.0.53' ]
  return (
    <>
      <CssBaseLine />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
        </Route>
      </Routes>
    </>
  );
}

function ProtectedRoute(): JSX.Element {
  const { user } = useContext(AppContext);

  return user ? (
    <Layout>
      <Outlet />{' '}
    </Layout>
  ) : (
    <Navigate to='/' />
  );
}

export default App;