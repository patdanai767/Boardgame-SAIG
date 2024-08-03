import config from '../config';
import axios from 'axios';
import { useState, useEffect } from 'react'

const GameList = () => {

  const [datas, setDatas] = useState({
    gamename: '',
    genre: '',
    img: '',
    year: '',
  })

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      await axios.get(config.api_path + '/game/list').then(res => {
        setDatas(res.data.result);
      })
    } catch (error) {
      console.log({ message: error.message });
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className=" text-lg">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {datas.length > 0 ? datas.map(item => (
            <a className="group border p-3">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt="yehh"
                  src={"http://localhost:8081/" + item.img}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 "
                />
              </div>
              <h3 className="mt-4 text-sm">{item.gamename}</h3>
              <h5 className="mt-1 text-sm text-gray-500">{item.genre}</h5>
              
            </a>
          )): ''}
        </div>
      </div>
    </div>
  )
}

export default GameList
