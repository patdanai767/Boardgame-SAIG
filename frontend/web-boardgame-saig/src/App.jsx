import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Table from './pages/Table';
import History from './pages/History';
import GameList from './pages/GameList';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/table" element={<Table />} />
          <Route path="/history" element={<History />} />
          <Route path="/gamelist" element={<GameList />} />
        </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App