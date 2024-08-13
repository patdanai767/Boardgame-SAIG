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
                    {user !== null ? (
                        <span className='mt-3 ms-2 text-warning h5'>{user.username} : {user.role}</span>
                    ) : (null)}
                    <div className='mt-3 ms-2'>
                        <button onClick={handleSignOut} className='btn btn-outline-danger'>
                            <i className='fa fa-sign-out-alt me-2' />
                            Sign out
                        </button>
                        <button>
                            <i className='fa fa-pencil me-2' />
                            Profile
                        </button>
                    </div>
                    <hr className='mt-4' />
                </div>
                <div className='d-grid gap-3 mt-2'>
                    <Link to='/admin' className='btn btn-info btn-outline  menu'>
                        <i className='fa fa-user me-2' />
                        User Admin
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
