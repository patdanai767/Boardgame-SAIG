import "./Table.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, subDays, addDays, setSeconds, setMilliseconds } from "date-fns";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Table = () => {
  const [tables, setTables] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [startDate, setStartDate] = useState(setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 0),);
  const [startTime, setStartTime] = useState(
    setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 13),
  );
  const [endTime, setEndTime] = useState(
    setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 30), 13),
  );
  const [price, setPrice] = useState(0);
  const [search, setSearch] = useState('');
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  const Stabledate = setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 0);

  const fetchData = async (req, res) => {
    try {
      await axios.get("api/table").then(res => {
        setTables(res.data);
      })
      await axios.get("api/room").then(res => {
        setRooms(res.data);
      })
      await axios.get("api/game").then(res => {
        setGames(res.data);
      })
    } catch (error) {
      res.status(404).json(error);
    }
  }


  useEffect(() => {
    fetchData();
    if (!user) {
      navigate("/login")
    }
  }, [])

  // SELECT HERE
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedTables(checked ? [...selectedTables, value] : selectedTables.filter(item => item !== value))
  }

  // console.log(selectedTables);

  const getDatesInRange = () => {
    var end = endTime.getTime() - Stabledate.getTime() + startDate.getTime()
    var date = startTime.getTime() - Stabledate.getTime() + startDate.getTime()

    const dates = [];

    while (date <= end) {
      dates.push(date);
      date += 1800000;
    }

    return dates;
  };

  const alldates = getDatesInRange();

  const isAvailable = (num) => {
    const isFound = num.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound
  }

  // console.log(user._id)
  const handleClick = async () => {
    try {
      await Promise.all(selectedTables.map((tableId) => {
        const res = axios.put(`api/table/availability/${tableId}`, {
          dates: alldates,
        })
        return res.data;
      })
      );
      const payload = {
        start: alldates[0],
        end: alldates[alldates.length - 1],
        userId: user._id,
        game: search,
        tables: selectedTables,
        totalAmount: price,
      }
        await axios.post("api/booking", payload).then(() => {
          Swal.fire({
            title:"Success",
            icon:"success",
            timer: 1500
          }).then(() => navigator("/"))
        })
    } catch (err) {
    }
  }


  const calulatePrice = () => {
    if (selectedTables.length !== 0 && alldates.length !== 0) {
      setPrice(15 * selectedTables.length * alldates.length);
    } else {
      setPrice(0);
    }
  }

  const onSearch = (searchTerm) => {
    setSearch(searchTerm)
  }

  return (
    <div className="background">
      <div className="divider divider-accent font-bold">Reservation</div>
      <div className="flex">
        <div className="room">
        <div className="font-bold text-gray-400 mb-2 text-center">Select Room</div>
          <div className="grid grid-rows-3 grid-flow-col gap-10 p-4">
            {rooms.length > 0 ? rooms.map((items, index) => (
              <div className="text-center border p-3" key={items._id}>{items.title} ({items.desc})
                {tables.length > 0 ? tables.map((table, i) => (
                  <div key={i}>
                    {rooms[index].tables ? items.tables.map((e, ing) => (
                      <div className="">
                        {table.tableNumbers.length > 0 && items.tables[ing] === table._id ? table.tableNumbers.map((num) => (
                          <div key={num._id}>
                            <input type="checkbox" className="hidden peer" id={num._id} value={num._id} onChange={handleSelect} disabled={!isAvailable(num)} />
                            <label htmlFor={num._id} className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                              <div className="block" >{table.title + num.number}</div>
                            </label>
                          </div>
                        )) : ""}
                      </div>
                    )) : ""}
                  </div>
                )) : ""}
              </div>
            )) : ""}
          </div>
        </div>

        <div className="card">
          <div className="card-body gap-10">
            <div>
              <div className="font-bold text-gray-400 ml-8 mb-2">Time Interval</div>
              <div className="flex text-center items-center">
                <DatePicker
                  className="btn btn-outline"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  includeDateIntervals={[
                    { start: subDays(new Date(), 1), end: addDays(new Date(), 7) },
                  ]}
                />
                <DatePicker
                  className="btn btn-outline"
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="Time"
                  minTime={setHours(setMinutes(new Date(), 30), 12)}
                  maxTime={setHours(setMinutes(new Date(), 30), 20)}
                  dateFormat="kk:mm"
                />
                <div className="mr-2 ml-2">-</div>
                <DatePicker
                  className="btn btn-outline"
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="Time"
                  minTime={startTime}
                  maxTime={setHours(setMinutes(new Date(), 30), 20)}
                  dateFormat="kk:mm"
                />
              </div>
            </div>
            <div className="dropdown">
              <div className="font-bold text-gray-400 ml-8 mb-2">BoardGame</div>
              <input type="text" placeholder="Type here" value={search} onChange={e => setSearch(e.target.value)} className="input input-bordered w-full max-w-xs text-white" />
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {games.filter(item => {
                  return search.toLowerCase() === '' ?
                    item : item.gamename.toLowerCase().includes(search);
                }).slice(0, 5)
                  .map((item) => (
                    <li><button className="text-white" onClick={() => onSearch(item.gamename)}>{item.gamename}</button></li>
                  ))}
              </ul>
            </div>
            <div>
              <div className="font-bold text-gray-400 ml-8 mb-2">Price</div>
              <input type="click" readOnly placeholder={price} className="input input-bordered" />
              <div className="btn btn-warning" onClick={calulatePrice}>Calulate</div>
            </div>
            <div>
              <button className="btn float-end btn-success" onClick={handleClick}>Reserve Now!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
