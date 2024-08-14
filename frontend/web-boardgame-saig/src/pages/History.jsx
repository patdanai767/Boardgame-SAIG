import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, formatISO } from "date-fns";
import Swal from 'sweetalert2';

const History = () => {

  const [bookings, setBookings] = useState([]);
  const [tables, setTables] = useState([]);
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
      await axios.get("/api/table").then(res => {
        setTables(res.data);
      })
    } catch (err) {
    }
  }
  
  // const showTables = (item) => {
  //   // ERROR child
  //   return (
  //     <span key={item._id}>
  //       {item.tables.map((cat) => (
  //         <>
  //           {tables.map((itemcats) => (
  //             cat === itemcats._id ? <span key={itemcats._id}>{itemcats.tableNumbers.length} </span> : ""
  //           ))}
  //         </>
  //       ))}
  //     </span>
  //   )
  // }

  const handleCancel = (item) => {
    try {
      Swal.fire({
        title: "Cancel booking?",
        text: "Are u sure?",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true
      }).then(async res => {
        await axios.delete("/api/booking/" + item._id).then(() => {
          fetchData();
            Swal.fire({
              title: 'Delete Data',
              text: 'Already deleted',
              icon: 'success',
              timer: 1500
            })
        })
      })
    } catch (error) {}
  }

  console.log(bookings)

  return (
    <div>
      <div className="divider divider-info font-bold">History of booking</div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th className='font-bold'>Boardgame</th>
              <th className='font-bold'>Table</th>
              <th className='font-bold'>Amount</th>
              <th className='font-bold'>Time interval</th>
              <th className='font-bold'>Action</th>
            </tr>
          </thead>
          {bookings.length > 0 ? bookings.map((item, index) => (
            <tbody>
              <tr className='hover'>
                <th>{index + 1}</th>
                <td>{item.game}</td>
                <td>{item._id}</td>
                <td>{item.totalAmount}</td>
                <td>{`${format((item.end), "dd/MM/yyyy") + ", " + format((item.start), "p") + "-" + format((item.end), "p")}`}</td>
                <td className='btn btn-outline btn-error' onClick={() => handleCancel(item)}>Cancel</td>
              </tr>
            </tbody>
          )) : ""}
        </table>
      </div>
    </div>
  )
}

export default History
