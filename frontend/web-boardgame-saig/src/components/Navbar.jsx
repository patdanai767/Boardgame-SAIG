import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./Navbar.css";

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const { user } = useContext(AuthContext);

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
        <>
            <div className="Navbar">
                <div className="">
                    <Link to='/home' className="btn btn-ghost text-xl">BoardGame-SAIG</Link>
                </div>
                <div className="relative flex-none grow ">
                    <div className="absolute right-0 grid grid-cols-3 gap-3 text-center ">
                        <li><Link to='/gamelist'>Gamelist</Link></li>
                        <li><Link to='/table'>Table</Link></li>
                        <li><Link to='history'>History</Link></li>
                    </div>
                </div>
                {user !== null && (
                    <div className="flex-none gap-2 ml-4">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="profile"
                                    src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                                    onClick={(e) => setShowModal(true)} />
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    {isLoggedIn && user === null ? (
                        <Link className="btn btn-outline btn-success ml-4" to='/login'>Login</Link>
                    ) : (
                        <a className="btn btn-outline btn-warning ml-4" onClick={handleSignOut}>Log out</a>
                    )}
                </div>
            </div>

            <Modal isVisble={showModal} onClose={e => setShowModal(false)}>
                <div className="bg-gray-800 rounded-lg py-3 border">
                    <div className="p-2">
                        <h3 className="text-center text-xl text-white font-medium leading-8 border-b pb-2">Profile</h3>
                        <table className="mt-2">
                            {user !== null ? (
                                <tbody>
                                    <tr>
                                        <td class="px-2 py-2 text-gray-500 font-bold">Name</td>
                                        <td class="px-2 py-2 text-white ">{user.username}</td>
                                    </tr>
                                    <tr>
                                        <td class="px-2 py-2 text-gray-500 font-bold">Email</td>
                                        <td class="px-2 py-2 text-white">{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td class="px-2 py-2 text-gray-500 font-bold">Role</td>
                                        <td class="px-2 py-2 text-white">{user.role}</td>
                                    </tr>
                                </tbody>
                            ) : (null)}
                        </table>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Navbar
