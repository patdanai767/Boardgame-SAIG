import "./Table.css";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";

const Table = () => {
  const { data, loading, error } = useFetch(`api/room`)
  const [tables, setTables] = useState([]);

  const fetchData = async (req, res) => {
    try {
      await axios.get("api/table").then(res => {
        setTables(res.data);
      })
    } catch (error) {
      res.status(404).json("error");
    }
  }

  // console.log(tables)
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="background">
      <div className="flex">
        <div className="room">
          <div className="grid grid-rows-3 grid-flow-col gap-10 p-4">
            {data.length > 0 ? data.map((items, index) => (
              <div className="text-center border " key={items[index]}>{items.title} ({items.desc})
                {tables.length > 0 ? tables.map((table, i) => (
                  <>
                    {data[index].tables ? items.tables.map((e, ing) => (
                      <div className="grid grid-rows-2 grid-flow-col gap-2 pr-3 pl-3">
                        {table.tableNumbers.length > 0 && items.tables[ing] === table._id ? table.tableNumbers.map((num) => (
                          <div className="btn btn-sm btn-danger-outline">{num.number}</div>
                        )) : ""}
                      </div>
                    )) : ""}
                  </>
                )) : ""}
              </div>
            )) : ""}
          </div>
        </div>
        <div className="sidebar">456</div>
      </div>
    </div>
  )
}

export default Table
