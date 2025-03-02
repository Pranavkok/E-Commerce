import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
      <footer className='border-t'>
        <div className="container mx-auto p-4 text-center flex flex-col gap-2 lg:flex-row lg:justify-between">
            <p>All Rights reserved 2024 @CopyRight</p>
            <div className='flex items-center gap-4 justify-center text-2xl'>
                <a href="" className='hover:text-primary-200'>
                <FaFacebook />
                </a>
                <a href="" className='hover:text-primary-200'>
                <BsInstagram />
                </a>
                <a href="" className='hover:text-primary-200'>
                <CiLinkedin />
                </a>
            </div>
        </div>
      </footer>
  )
}

export default Footer
