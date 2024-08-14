import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import Home from './pages/home/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Table from './pages/table/Table';
import History from './pages/History';
import Intro from './pages/introduce/intro';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/table" element={<Table />} />
          <Route path="/history" element={<History />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App