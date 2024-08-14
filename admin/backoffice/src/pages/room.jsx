import axios from "axios";
import Template from "../components/Template";
import { useEffect } from "react";
import { useState } from "react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import Modal from "../components/Modal";

function category() {
  const [rooms, setRooms] = useState([]);
  const [tables, setTables] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [selectedit, setSelectedit] = useState({});
  const [tableNum, setTableNum] = useState({});
  const [roomId, setRoomId] = useState(undefined);
  const [addRooms, setAddRooms] = useState("");
  const [info, setInfo] = useState({});
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = rooms.slice(firstIndex, lastIndex);
  const npage = Math.ceil(rooms.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async (req, res) => {
    try {
      await axios.get("/api/room").then(res => {
        setRooms(res.data);
      })
      await axios.get("/api/table").then(res => {
        setTables(res.data);
      })
    } catch (error) {
      res.status(400).json(error)
    }
  }

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

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
      title: `Delete ${item.title}?`,
      text: 'Are u sure ?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then(async res => {
      if (res.isConfirmed) {
        try {
          await axios.delete("/api/room/" + item._id).then(() => {
            fetchData();
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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newRoom = {
        ...info,
      };

      await axios.post("api/room/createRoom", newRoom).then(() => {
        Swal.fire({
          title: "Success",
          text: 'Already created',
          icon: 'success',
          timer: 2000
        }).then(() => {
          setShowModal2(false)
          fetchData();
        })
      })
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    Swal.fire({
      title: `Delete ${item.title}?`,
      text: 'Are u sure ?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then(async res => {
      if (res.isConfirmed) {
        try {
          await axios.delete("/api/cat/" + item._id).then(() => {
            fetchData();
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
  };

  const showTables = (item) => {
    // ERROR child
    return (
      <span key={item._id}>
        {item.tables.map((cat) => (
          <>
            {tables.map((itemcats) => (
              cat === itemcats._id ? <span onClick={(e) => setTableNum(e.target.value)} key={itemcats._id}>{itemcats.tableNumbers.length} </span> : ""
            ))}
          </>
        ))}
      </span>
    )
  }

  const handleAddTable = async (e) => {
    e.preventDefault();
    const tableNumbers = addRooms.split(",").map((table) => ({ number: table }));
    try {
      await axios.post(`api/table/${roomId}`, { ...info, tableNumbers }).then(() => {
        Swal.fire({
          title: "Success",
          text: 'Already created',
          icon: 'success',
          timer: 2000
        }).then(() => {
          setShowModal2(false)
          fetchData();
        })
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Template>
        <div className="flex w-full flex-col">
          <div className="divider divider-success font-bold">Room & Table</div>
        </div>
        <div className="overflow-x-auto">
          <table className="table glass border">
            <thead>
              <tr>
                <th></th>
                <th className="text-lg">ID</th>
                <th className="text-lg">Title</th>
                <th className="text-lg">Placement</th>
                <th className="text-lg">Tables</th>
                <th className="text-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr className="hover" key={index}>
                  <th>{index + 1}</th>
                  <td>{item._id}</td>
                  <td>{item.title}</td>
                  <td>{item.desc}</td>
                  <td>{showTables(item)}</td>
                  <td className="btn btn-outline btn-warning content-center btn-sm mt-1 mr-2" onClick={(e) => setShowModal2(true) || setSelectedit(item)}>Edit</td>
                  <td className="btn btn-outline btn-error content-center btn-sm mt-1" onClick={() => handleDelete(item)}>Delete</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end">
            <div className="btn btn-success btn-outline mt-5 flex" onClick={(e) => setShowModal(true)}>
              <i className="fa-solid fa-plus" />
              Room</div>
          </div>
          <div className="text-end">
            <div className="btn btn-success btn-outline mt-5 flex" onClick={(e) => setShowModal3(true)}>
              <i className="fa-solid fa-plus" />
              Table</div>
          </div>
          <div className="text-center mt-5">
            <div className="join grid-5 border">
              <button className="join-item btn" onClick={prevPage}>⇐</button>
              <button className="join-item btn">Page {currentPage}</button>
              <button className="join-item btn" onClick={nextPage}>⇒</button>
            </div>
          </div>
        </div>
      </Template>

      <Modal isVisble={showModal} onClose={e => setShowModal(false)}>
        <div className="bg-gray-800 rounded-lg py-3 border">
          <div className="p-2">
            <h3 className="text-center text-xl text-white font-medium leading-8 border-b pb-2">Create</h3>
            <div className="text-center">
              <div>
                <div>
                  <div className="mb-4">
                    <div className="font-bold text-gray-400 mb-2 mt-4">Title</div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs grow" id="title" onChange={handleChange} />
                  </div>
                  <div className="mb-4">
                    <div className="font-bold text-gray-400 mb-2 mt-4">Placement</div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs grow" id="desc" onChange={handleChange} />
                  </div>
                  <div className="btn btn-outline btn-secondary flex" onClick={handleClick}>Save</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal >

      <Modal isVisble={showModal2} onClose={e => setShowModal2(false) || setSelectedit({})}>
        <div className="bg-gray-800 rounded-lg py-3 border">
          <div className="p-2">
            <h3 className="text-center text-xl text-white font-medium leading-8 border-b pb-2">Edit</h3>
            <div className="text-center">
              <div className="mb-4">
                <div className="font-bold text-gray-400 mb-2 mt-4">Category name</div>
                <input type="text" placeholder="Type here..." className="input input-bordered w-full max-w-xs grow" id="title" value={selectedit.title} onChange={e => setSelectedit({ ...selectedit, title: e.target.value })} />
              </div>
              <div className="mb-4">
                <div className="font-bold text-gray-400 mb-2 mt-4">Placement</div>
                <input type="text" placeholder="Type here..." className="input input-bordered w-full max-w-xs grow" id="desc" value={selectedit.desc} onChange={e => setSelectedit({ ...selectedit, desc: e.target.value })} />
              </div>
              <div className="btn btn-outline btn-secondary flex" onClick={handleUpdate}>Update</div>
            </div>
          </div>
        </div>
      </Modal >

      <Modal isVisble={showModal3} onClose={e => setShowModal3(false)}>
        <div className="bg-gray-800 rounded-lg py-3 border">
          <div className="p-2">
            <h3 className="text-center text-xl text-white font-medium leading-8 border-b pb-2">Create</h3>
            <div className="text-center">
              <div>
                <div className="mb-4">
                  <div className="font-bold text-gray-400 mb-2 mt-4">Choose a room</div>
                  <select id="roomId" className="select select-bordered w-full max-w-xs" onChange={(e) => setRoomId(e.target.value)}>
                    <option selected disabled></option>
                    {rooms.map((room) => (
                      <option key={room._id} value={room._id}>{room.title}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <div className="font-bold text-gray-400 mb-2 mt-4">Title</div>
                  <input type="text" placeholder="Alphabet same as room's zone..." className="input input-bordered w-full max-w-xs grow text-gray-400" id="title" onChange={handleChange} />
                </div>
                <div className="mb-4">
                  <div className="font-bold text-gray-400 mb-2 mt-4">Table Number</div>
                  <input type="text" placeholder="Give comma between table numbers..." className="input input-bordered w-full max-w-xs grow text-gray-400" onChange={(e) => setAddRooms(e.target.value)} />
                </div>
                <div className="btn btn-outline btn-secondary flex" onClick={handleAddTable}>Save</div>
              </div>
            </div>
          </div>
        </div>
      </Modal >
    </>
  )
}

export default category
