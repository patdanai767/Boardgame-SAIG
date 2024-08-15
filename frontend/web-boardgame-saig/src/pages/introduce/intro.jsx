import React from 'react'
import "./intro.css"
import Navbar from "../../components/Navbar"
import { Link } from 'react-router-dom'

function intro() {
    return (
        <div className='banner'>
            <div className="Content">
                <h1>BOOKING BROADGAME</h1>
                <p>Hi, you guys can use my website for booking SAIG-boardgame by click it here.</p>
                <p>And you'll begin your choice now.</p>
                <div>
                    <Link to="/home"><button className="button mt-4"><span></span>Get Started</button></Link>
                </div>
            </div>
        </div>
    )
}

export default intro
