import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='bg-black text-white flex flex-col gap-8 px-24 py-12'>
        <h1 className='text-4xl'>BOOK MY PITCH</h1>
        <div className='flex justify-between text-xl'>
            <div className='flex flex-col gap-2'>
                <Link >BOOK TURf</Link>
                <Link >WHY US</Link>
            </div>
            <div className='flex flex-col gap-2'>
                <Link>LOGIN</Link>
                <Link>SIGNUP</Link>
                <Link>REGISTER TURF</Link>
            </div>
            <div className='flex flex-col gap-2'>
                <h4>Phone : 9876543210</h4>
                <h4>Email : bookMyPitch@gmail.com</h4>
            </div>
        </div>
    </footer>
  )
}

export default Footer