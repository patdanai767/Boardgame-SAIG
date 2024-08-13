import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/layout';
import Home from "./pages/home.jsx";
import Login from './pages/login.jsx';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';

function App() {

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user){
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
