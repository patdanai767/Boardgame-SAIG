import "./Table.css";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { format, setHours, setMinutes } from "date-fns";

const Table = () => {
  const { data, loading, error } = useFetch(`api/room`)
  const [tables, setTables] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 13),
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 30), 20),
  );

  console.log(startDate)

  const fetchData = async (req, res) => {
    try {
      await axios.get("api/table").then(res => {
        setTables(res.data);
      })
    } catch (error) {
      res.status(404).json(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedTables(checked ? [...selectedTables, value] : selectedTables.filter(item => item !== value))
  }

  // console.log(selectedTables)

  return (
    <div className="background">
      <div className="flex">
        <div className="room">
          <div className="grid grid-rows-3 grid-flow-col gap-10 p-4">
            {data.length > 0 ? data.map((items, index) => (
              <div className="text-center border p-3" key={items._id}>{items.title} ({items.desc})
                {tables.length > 0 ? tables.map((table) => (
                  <div key={table._id}>
                    {data[index].tables ? items.tables.map((e, ing) => (
                      <div className="grid grid-rows-2 grid-flow-col gap-2" key={e._id}>
                        {table.tableNumbers.length > 0 && items.tables[ing] === table._id ? table.tableNumbers.map((num) => (
                          <div>
                            <input type="checkbox" className="hidden peer" id={num._id} value={num._id} onChange={handleSelect} />
                            <label htmlFor={num._id} className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                              <div className="block" key={num._id}>{num.number}</div>
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

        <div className="sidebar">
          <div class="block text-center mt-4">Reservation</div>
          <div className="mt-3 font-bold text-gray-400 ml-8">Time Interval</div>
          <div className="flex grid grid-cols-2 text-center mt-2">
            <DatePicker
              className="btn btn-outline btn-info"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="Time"
              minTime={setHours(setMinutes(new Date(), 30), 12)}
              maxTime={setHours(setMinutes(new Date(), 30), 20)}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <DatePicker
              className="btn btn-outline btn-info"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="Time"
              minTime={setHours(setMinutes(new Date(), 30), 12)}
              maxTime={setHours(setMinutes(new Date(), 30), 20)}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
