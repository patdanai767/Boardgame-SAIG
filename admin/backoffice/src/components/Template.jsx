import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar/Navbar.css";

function Template(props) {
    const { user } = useContext(AuthContext);
    const navi = useNavigate();

    useEffect(() => {
        if (!user) {
            navi('/login')
        }
    })

    const handleSignOut = (e) => {
        try {
            localStorage.removeItem("user"); //broken
            setIsLoggedIn(prev => !prev);
        } catch (e) {
            console.log({ message: e.message })
        }
        window.location.reload();
    }

    return (
        <div className="flex">
            <div className="bg-black ps-2 pe-3" style={{ height: '100dvh', width: '270px', position: 'fixed', top: 0, left: 0 }}>
                <div className='text-white'>
                    <Link to='/' className="logo-navbar flex justify-center">BoardGame-SAIG</Link>
                    <div className='mt-3 ms-2'>
                        <button onClick={handleSignOut} className='btn btn-outline me-2'>
                            <i className='fa fa-sign-out-alt me-2' />
                            Sign out
                        </button>
                    </div>
                    <hr className='mt-4' />
                </div>
                <div className='d-grid gap-3 mt-2'>
                    <Link to='/boardgame' className='btn btn-info btn-outline flex'>
                        <i className='fa-solid fa-gamepad me-2' />
                        CRUD Boardgame
                    </Link>
                </div>
                <div className='d-grid gap-3 mt-2'>
                    <Link to='/category' className='btn btn-info btn-outline flex'>
                        <i className='fa-solid fa-list me-2' />
                        CRUD Category
                    </Link>
                </div>
                <div className='d-grid gap-3 mt-2'>
                    <Link to='/roomandtable' className='btn btn-info btn-outline flex'>
                        <i className='fa-solid fa-chair me-2' />
                        CRUD Room & Table
                    </Link>
                </div>
                <div className='d-grid gap-3 mt-2'>
                    <Link to='/userReport' className='btn btn-info btn-outline flex'>
                        <i className='fa fa-user me-2' />
                        Users
                    </Link>
                </div>
            </div>
            <div className="p-3" style={{ width: "100%", overflowY: 'auto', marginLeft: '270px' }}>
                {props.children}
            </div>
        </div>
    )
}

export default Template
