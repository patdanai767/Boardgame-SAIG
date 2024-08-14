import axios from "axios";
import Template from "../components/Template";
import { useEffect } from "react";
import { useState } from "react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import Modal from "../components/Modal";

function boardgame() {
  const [users, setUsers] = useState([]);
  const [cats, setCats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedit, setSelectedit] = useState({});
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
      axios.get("/api/game").then(res => {
        setUsers(res.data);
      })
      axios.get("/api/cat").then(res => {
        setCats(res.data);
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
      title: `Delete ${item.gamename}?`,
      text: 'Are u sure ?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then(async res => {
      if (res.isConfirmed) {
        try {
          await axios.delete("/api/game/" + item._id).then(() => {
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

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedCats(checked ? [...selectedCats, value] : selectedCats.filter(item => item !== value))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqevqj0cc/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const newGame = {
        ...info,
        cats: selectedCats,
        img: url,
      };

      await axios.post("api/game", newGame).then(() => {
        window.location.reload();
      })
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqevqj0cc/image/upload",
        data
      );
      const { url } = uploadRes.data;
      
      const newGame = {
        ...selectedit,
        cats: selectedCats,
        img: url,
      };
      
      await axios.put("api/game/" + selectedit._id, newGame).then(() => {
        window.location.reload();
      })
    } catch (err) {
      console.log(err);
    }
  }
  const showCats = (item) => {
    // ERROR child
    return (
      <>
        {item.cats.map((cat) => (
          <>
            {cats.map((itemcats) => (
              cat === itemcats._id ? <span key={itemcats._id}>{itemcats.title} </span> : ""
            ))}
          </>
        ))}
      </>
    )
  }
  
  console.log(selectedit)
  
  return (
    <>
      <Template>
        <div className="flex w-full flex-col">
          <div className="divider divider-success font-bold">Boardgame</div>
        </div>
        <div className="overflow-x-auto">
          <table className="table glass border">
            <thead>
              <tr>
                <th></th>
                <th className="text-lg">ID</th>
                <th className="text-lg">Gamename</th>
                <th className="text-lg">Category</th>
                <th className="text-lg">CreateAt</th>
                <th className="text-lg">UpdateAt</th>
                <th className="text-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr className="hover" key={index}>
                  <th>{index + 1}</th>
                  <td>{item._id}</td>
                  <td>{item.gamename}</td>
                  <td>{showCats(item)}</td>
                  <td>{format((item.createdAt), "Pp")}</td>
                  <td>{format((item.updatedAt), "Pp")}</td>
                  <td className="btn btn-outline btn-warning content-center btn-sm mt-1 mr-2" onClick={(e) => setShowModal2(true) || setSelectedit(item)}>Edit</td>
                  <td className="btn btn-outline btn-error content-center btn-sm mt-1" onClick={() => handleDelete(item)}>Delete</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end">
            <div className="btn btn-success btn-outline mt-5 flex" onClick={(e) => setShowModal(true)}>
              <i className="fa-solid fa-plus" />
              ADD</div>
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
            <div className="flex">
              <div>
                <div className="m-5">
                  <img
                    className="rounded-xl"
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://www.pngall.com/wp-content/uploads/2/Upload-PNG-Image-File.png"
                    }
                    alt=""
                  />
                </div>
              </div>
              <div>
                <div className="mb-4 mt-2">
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="file-input file-input-bordered file-input-info w-full max-w-xs"
                  />
                </div>
                <div>
                  <div className="mb-4">
                    <label className="input input-bordered flex items-center gap-2">
                      GameName
                      <input type="text font-light" id="gamename" className="grow" placeholder="Type..." onChange={handleChange} />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="items-center input font-bold">
                      Category
                    </label>
                    <div className="flex grid grid-cols-2 gap-2">
                      {cats.map((item) => (
                        <div key={item._id}>
                          <input type="checkbox" className="hidden peer" id={item._id} value={item._id} onChange={handleSelect} />
                          <label htmlFor={item._id} className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-info-content dark:hover:bg-gray-700">
                            <div className="box" >{item.title}</div>
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <label className="items-center input font-bold">
                        Details
                      </label>
                      <label className="form-control">
                        <textarea className="textarea textarea-bordered h-24" placeholder="Type..." id="desc" onChange={handleChange}></textarea>
                      </label>
                    </div>
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
            <div className="flex">
              <div>
                <div className="m-5">
                  <img
                    className="rounded-xl"
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : selectedit.img
                    }
                    alt=""
                  />
                </div>
              </div>
              <div>
                <div className="mb-4 mt-2">
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="file-input file-input-bordered file-input-info w-full max-w-xs"
                  />
                </div>
                <div>
                  <div className="mb-4">
                    <label className="input input-bordered flex items-center gap-2">
                      GameName
                      <input type="text font-light" id="gamename" className="grow" value={selectedit.gamename} onChange={e => setSelectedit({ ...selectedit, gamename: e.target.value })} />
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="items-center input font-bold">
                      Category
                    </label>
                    <div className="flex grid grid-cols-2 gap-2">
                      {cats.map((item) => (
                        <div key={item._id}>
                          <input type="checkbox" className="hidden peer" id={item._id} value={item._id} onChange={handleSelect} />
                          <label htmlFor={item._id} className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-info-content dark:hover:bg-gray-700">
                            <div className="box" >{item.title}</div>
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <label className="items-center input font-bold">
                        Details
                      </label>
                      <label className="form-control">
                        <textarea className="textarea textarea-bordered h-24" placeholder="Type..." id="desc" value={selectedit.desc} onChange={e => setSelectedit({ ...selectedit, desc: e.target.value })}></textarea>
                      </label>
                    </div>
                  </div>
                  <div className="btn btn-outline btn-secondary flex" onClick={handleUpdate}>Update</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal >
    </>
  )
}

export default boardgame
