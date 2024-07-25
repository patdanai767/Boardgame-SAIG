import config from '../config';
import axios from 'axios';
import {useState,useEffect} from 'react'

const GameList = () => {

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async() => {
      try {
        await axios.get(config.api_path + '/game/list')
      } catch (error) {
        console.log({ message: error.message });
      }
  }

  return (
    <div>
      hello!
    </div>
  )
}

export default GameList
