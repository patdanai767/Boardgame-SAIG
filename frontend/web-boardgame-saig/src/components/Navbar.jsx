import axios from "axios";
import config from "../config";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useEffect, useState } from "react";

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState({
        username: '',
        email: ''
    });

    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            localStorage.removeItem(config.token_name);
            setIsLoggedIn(prev => !prev);

            setUser({
                username: '',
                email: ''
            })
        } catch (e) {
            console.log({ message: e.message })
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            await axios.get(config.api_path + '/user/info', config.headers()).then(res => {
                if (res.data.message === 'success') {
                    setUser(res.data.result);
                    setIsLoggedIn(false);
                }
            })
        } catch (error) {
            console.log({ message: error.message });
        }
    }

    return (
        <>
            <div className="navbar">
                <div className="flex-1 w-32">
                    <Link to='/' className="btn btn-ghost text-xl">BoardGame-SAIG</Link>
                </div>
                <div className="relative flex-none grow ">
                    <div className="absolute right-0 grid grid-cols-3 gap-3 text-center ">
                    <Link to='/gamelist' className="text-white hover:text-gray-300 transition duration-300">Gamelist</Link>
                    <Link to='/table' className="text-white hover:text-gray-300 transition duration-300">Table</Link>
                    <Link to='history' className="text-white hover:text-gray-300 transition duration-300">History</Link>
                    </div>
                </div>

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

                <div>
                    {isLoggedIn ? (
                        <Link className="btn btn-ghost btn-warning ml-4" to='/login'>Login</Link>
                    ) : (
                        <a className="btn btn-outline btn-warning ml-4" onClick={handleSignOut}>Log out</a>
                    )}
                </div>
            </div>

            <Modal isVisble={showModal} onClose={e => setShowModal(false)}>
                <div class="bg-transparent rounded-lg py-3 border">
                    <div class="p-2">
                        <h3 class="text-center text-xl text-white font-medium leading-8 border-b pb-2">Profile</h3>
                        <table className="mt-2">
                            <tbody>
                                <tr>
                                    <td class="px-2 py-2 text-gray-500 font-bold">Name</td>
                                    <td class="px-2 py-2">{user.username}</td>
                                </tr>
                                <tr>
                                    <td class="px-2 py-2 text-gray-500 font-bold">Email</td>
                                    <td class="px-2 py-2">{user.email}</td>
                                </tr>
                                <tr>
                                    <td class="px-2 py-2 text-gray-500 font-bold">Role</td>
                                    <td class="px-2 py-2">Member</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Navbar
