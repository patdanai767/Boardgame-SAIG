import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import Layout from './layout/layout';
import Home from "./pages/home.jsx";
import Login from './pages/login.jsx';
import UserPage from "./pages/userReport.jsx";
import GamePage from "./pages/boardgame.jsx";
import RoomPage from "./pages/room.jsx";
import CatPage from "./pages/category.jsx";

function App() {

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/userReport' element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
          <Route path='/category' element={<ProtectedRoute><CatPage /></ProtectedRoute>} />
          <Route path='/roomandtable' element={<ProtectedRoute><RoomPage /></ProtectedRoute>} />
          <Route path='/boardgame' element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
