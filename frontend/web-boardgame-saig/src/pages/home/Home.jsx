import axios from "axios";
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import "./Home.css";

function Home() {
  const [dataCats, setDataCats] = useState([]);
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [searchCat, setSearchCat] = useState('');
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = games.slice(firstIndex, lastIndex);
  const npage = Math.ceil(games.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async (req, res) => {
    try {
      await axios.get("/api/cat").then(res => {
        setDataCats(res.data);
      })
      await axios.get("/api/game").then(res => {
        setGames(res.data);
      })
    } catch (err) {
      res.status(400).json(err)
    }
  }

  const handleSelect = (e) => {
    setSearchCat(e.target.value)
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

  const handleClick = () => {
    if (user) {
      navigate("/table")
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      <div className="max-w-lg mx-auto text-center">
        <div className="join">
          <input className="input input-bordered join-item" placeholder="Search Boardgame..." onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn-info btn-outline join-item">Search</button>
        </div>
      </div>

      {/* Select Catagory */}
      {/* <select className="select select-bordered join-item" onChange={handleSelect}>
        <option value="">All</option>
        {dataCats.map(item => (
          <option key={item._id} value={item._id}>{item.title}</option>
        ))}
      </select> */}

      {/* BoardGame List */}
      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className=" text-lg text-center mb-3 font-bold">Products</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {records.length > 0 ? records.filter((item) => { return search.toLowerCase() === '' ? item : item.gamename.toLowerCase().includes(search); }).map((item) => (
              <a className="group border p-3" key={item._id}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    alt="yehh"
                    src={"http://localhost:8081/" + item.img}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4">
                  {item.gamename}</h3>
                <button onClick={handleClick} className="btn btn-sm float-end glass btn-accent text-white">Reserve</button>
              </a>
            )) : ''}
          </div>
        </div>

        <div className="text-center">
          <div className="join grid-5 border">
            <button className="join-item btn" onClick={prevPage}>⇐</button>
            {numbers.map((n, i) => (
              <button className={`join-item btn btn-square  ${currentPage === n ? 'active' : ''}`} key={i}>Page {n}</button>
            ))}
            <button className="join-item btn" onClick={nextPage}>⇒</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
