import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import useFetch from "../hooks/useFetch"

const GameList = () => {

  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/api/game`)
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)

  console.log({ p: firstIndex, c: currentPage, l: lastIndex, numbers: numbers })

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

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className=" text-lg text-center mb-3">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {records.length > 0 ? records.map((item, index) => (
            <a className="group border p-3" key={item[index]}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt="yehh"
                  src={"http://localhost:8081/" + item.img}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 "
                />
              </div>
              <h3 className="mt-4 text-sm"
              >
                {item.gamename}</h3>
                <h5 className="mt-1 text-sm text-gray-500">
                  {item.genre}</h5>
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
  )
}

export default GameList
