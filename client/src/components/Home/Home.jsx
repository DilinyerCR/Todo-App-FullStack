import React from 'react'
import { useSelector } from 'react-redux'


const Home = () => {
  const access = useSelector((state) => state.loginAccess)

  const state = () => {
    console.log(access)
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={state}>access status</button>
    </div>


  )
}

export default Home