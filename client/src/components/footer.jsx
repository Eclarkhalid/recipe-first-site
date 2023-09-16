import React from 'react'
import { BsGithub, BsYoutube, BsDiscord } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const footer = () => {
  return <>
  <footer className='p-5 shadow bg-gray-300'>
    <div className="container-xl">
      <div className="flex justify-around items-center">
        <h2>Made By <span className="text-blue-600">Eclar Khalid</span> With Pride &copy;2023</h2>
        <div className="links flex space-x-6 text-xl items-center ">
          <Link className='hover:text-blue-400 duration-75' target='_blank'><BsGithub /></Link>
          <Link className='hover:text-blue-400 duration-75' target='_blank'><BsYoutube /></Link>
          <Link className='hover:text-blue-400 duration-75' target='_blank'><BsDiscord /></Link>
        </div>
      </div>
    </div>
  </footer>
  </>
}

export default footer