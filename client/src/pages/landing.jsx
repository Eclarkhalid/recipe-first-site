import React from 'react'
import { BsArrowUpRight } from 'react-icons/bs'

export default function landing() {
  return <>
  <div className="flex text-center p-10 ">
    <h1 className='flex text-center items-center'>To be able to view posted recipes, an account is required. Create an account or sign Up. &nbsp; <BsArrowUpRight className='text-2xl text-red-600'/></h1>
  </div>
  </>
}
