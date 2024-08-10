import "./Table.css";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";

const Table = () => {
  const { data, loading, error } = useFetch(`api/room`)
  const [tables, setTables] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);

  const fetchData = async (req, res) => {
    try {
      await axios.get("api/table").then(res => {
        setTables(res.data);
      })
    } catch (error) {
      res.status(404).json("error");
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

  console.log(selectedTables)

  return (
    <div className="background">
      <div className="flex">
        <div className="room">
        <div className="time-pick grid grid-rows grid-flow-col gap-3 m-2">
          <div className="flex justify-context btn"> 13:00</div>
          <div className="flex justify-context btn"> 14:00</div>
          <div className="flex justify-context btn"> 15:00</div>
          <div className="flex justify-context btn"> 16:00</div>
          <div className="flex justify-context btn"> 17:00</div>
          <div className="flex justify-context btn"> 18:00</div>
        </div>
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
          <form class="max-w-sm mx-auto mt-5">
            <label for="email-address-icon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Table</label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input type="text" id="email-address-icon" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Table
