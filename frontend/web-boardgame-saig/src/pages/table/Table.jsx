import "./Table.css";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { formatISO, setHours, setMinutes, subDays, addDays, setSeconds, setMilliseconds } from "date-fns";

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
  }, [])

// SELECT HERE
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedTables(checked ? [...selectedTables, value] : selectedTables.filter(item => item !== value))
  }


  const getDatesInRange = () => {

    const end = endTime.getTime();
    var date = startTime.getTime();

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

  const handleClick = async () => {
    try {
      await Promise.all(selectedTables.map((tableId) => {
        const res = axios.put(`api/table/availability/${tableId}`, {
          dates: alldates,
        })
        return res.data;
      })
      );
      navigator("/table");
    } catch (err) {
    }
  }

  console.log(selectedTables);
  console.log(alldates)

  const calulatePrice = () => {
    if (selectedTables.length !== 0 && alldates.length !== 0) {
      setPrice(15 * selectedTables.length * alldates.length);
    }else{
      setPrice(0);
    }
  }
  return (
    <div className="background">
      <div className="flex">
        <div className="room">
          <div className="grid grid-rows-3 grid-flow-col gap-10 p-4">
            {rooms.length > 0 ? rooms.map((items, index) => (
              <div className="text-center border p-3">{items.title} ({items.desc})
                {tables.length > 0 ? tables.map((table) => (
                  <div>
                    {rooms[index].tables ? items.tables.map((e, ing) => (
                      <div className="grid grid-rows-2 grid-flow-col gap-2">
                        {table.tableNumbers.length > 0 && items.tables[ing] === table._id ? table.tableNumbers.map((num) => (
                          <div>
                            <input type="checkbox" className="hidden peer" id={num._id} value={num._id} onChange={handleSelect} disabled={!isAvailable(num)} />
                            <label htmlFor={num._id} className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                              <div className="block">{num.number}</div>
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
          <div className="block text-center">Reservation</div>
          <div className="card-body gap-10">
            <div>
              <div className="font-bold text-gray-400 ml-8 mb-2">Time Interval</div>
              <div className="flex text-center items-center">
                <DatePicker
                  className="time"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  includeDateIntervals={[
                    { start: subDays(new Date(), 1), end: addDays(new Date(), 7) },
                  ]}
                />
                <DatePicker
                  className="time"
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="Time"
                  minTime={setHours(setMinutes(new Date(), 30), 12)}
                  maxTime={setHours(setMinutes(new Date(), 30), 20)}
                  dateFormat="h:mm aa"
                />
                <div>To</div>
                <DatePicker
                  className="time"
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="Time"
                  minTime={setHours(setMinutes(new Date(), 30), 12)}
                  maxTime={setHours(setMinutes(new Date(), 30), 20)}
                  dateFormat="h:mm aa"
                />
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-400 ml-8 mb-2">BoardGame</div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div>
              <div className="font-bold text-gray-400 ml-8 mb-2">Select Room</div>
              <input type="click" readOnly placeholder="Select room and table" className="input input-bordered w-full max-w-xs" />
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
