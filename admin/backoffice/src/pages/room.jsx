import axios from "axios";
import Template from "../components/Template";
import { useEffect } from "react";
import { useState } from "react";
import { format } from "date-fns";
import Swal from "sweetalert2";

function room() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async (req, res) => {
    try {
      axios.get("/api/auth").then(res => {
        setUsers(res.data);
      })
    } catch (error) {
      res.status(400).json(error)
    }
  }

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const nextPage = () => {
    if (currentPage !== numbers.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handleDelete = (item) => {
    Swal.fire({
      title: `Delete ${item.username}?`,
      text: 'Are u sure ?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then(async res => {
      if (res.isConfirmed) {
        try {
          await axios.delete("/api/auth/" + item._id).then(() => {
            fetchUsers();
            Swal.fire({
              title: 'Delete Data',
              text: 'Already deleted',
              icon: 'success',
              timer: 2000
            })
          })
        } catch (err) {
          Swal.fire({
            title: 'error',
            text: err.message,
            icon: 'error'
          })
        }
      }
    })
  }

  return (
    <Template>
      <div className="flex w-full flex-col">
        <div className="divider divider-success font-bold">USERS</div>
      </div>
      <div className="overflow-x-auto">
        <table className="table glass border">
          <thead>
            <tr>
              <th></th>
              <th className="text-lg">Email</th>
              <th className="text-lg">Name</th>
              <th className="text-lg">CreateAt</th>
              <th className="text-lg">isAdmin</th>
              <th className="text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => (
              <tr className="hover" key={index}>
                <th>{index + 1}</th>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{format((item.createdAt), "Pp")}</td>
                <td>{item.isAdmin ? "Yes" : "No"}</td>
                <td className="btn btn-outline btn-info" onClick={() => handleDelete(item)}>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-5">
          <div className="join grid-5 border">
            <button className="join-item btn" onClick={prevPage}>⇐</button>
            <button className="join-item btn">Page {currentPage}</button>
            <button className="join-item btn" onClick={nextPage}>⇒</button>
          </div>
        </div>
      </div>
    </Template>
  )
}

export default room
