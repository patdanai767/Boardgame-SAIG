import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import useFetch from "../hooks/useFetch"

const GameList = () => {

  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/api/game`)

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className=" text-lg">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.length > 0 ? data.map((item,index) => (
            <a className="group border p-3">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt="yehh"
                  key={item[index]}
                  src={"http://localhost:8081/" + item.img}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 "
                />
              </div>
              <h3 className="mt-4 text-sm"
                key={item[index]}
                >
                  {item.gamename}</h3>
              <h5 className="mt-1 text-sm text-gray-500"
                key={item[index]}
                >
                  {item.genre}</h5>

            </a>
          )) : ''}
        </div>
      </div>
    </div>
  )
}

export default GameList
