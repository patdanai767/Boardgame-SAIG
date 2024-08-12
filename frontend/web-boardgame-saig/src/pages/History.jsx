import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, formatISO } from "date-fns";

const History = () => {

  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const userid = { userid: user._id };
      await axios.post("/api/booking/getBookingbyuserId", userid).then(res => {
        setBookings(res.data);
      })
    } catch (err) {
    }
  }

  return (
    <div>
      <div className='text-center font-bold mb-3'>History of booking</div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Boardgame</th>
              <th>Table</th>
              <th>Amount</th>
              <th>Time interval</th>
            </tr>
          </thead>
          {bookings.length > 0 ? bookings.map((item, index) => (
            <tbody>
              <tr>
                <th>{index + 1}</th>
                <td>{item.game}</td>
                <td>{item.table}</td>
                <td>{item.totalAmount}</td>
                <td>{`${format((item.end), "dd/MM/yyyy") + "|" + format((item.start), "p") + "-" + format((item.end), "p")}`}</td>
              </tr>
            </tbody>
          )) : ""}
        </table>
      </div>
    </div>
  )
}

export default History
