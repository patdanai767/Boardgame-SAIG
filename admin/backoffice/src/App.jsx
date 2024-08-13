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
          <Route path='/userReport' element={<UserPage/>}/>
          <Route path='/category' element={<CatPage/>}/>
          <Route path='/roomandtable' element={<RoomPage/>}/>
          <Route path='/boardgame' element={<GamePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
