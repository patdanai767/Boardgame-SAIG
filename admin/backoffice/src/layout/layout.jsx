import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar.jsx';
import Template from "../components/Template.jsx";
const Layout = () => {
    
    return (
        <div>
            {/* <Navbar /> */}
            <Template/>
            <Outlet />
        </div>
    )
}

export default Layout