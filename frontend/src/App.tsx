import { useContext, useState } from 'react';
import { Route, Routes, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Login from './pages/LoginPage';


function App() {
  // const { user } = useContext(AppContext);
  // const navigate = useNavigate();
  // const currentLocation = useLocation().pathname;

  // // Navigates to dashboard if new tab is open and user exists
  // useEffect(() => {
  //   if (user && currentLocation === '/') {
  //     navigate('/dashboard');
  //   }
  // }, []);



// [ '127.0.0.53' ]
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;