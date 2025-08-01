import { Outlet } from "react-router-dom"
import Navbar from "./_components/Navbar"
import Header from "./_components/Header"
import { useState } from "react";

export interface NavbarProps {
  isOpenNavbar?: boolean;
  handleOpenNavbar?: () => void
}

export default function Component() {
  const [hidenNavbar, setHidenNavbar] = useState<boolean>(false);
  const handleHidenNavbar = () => {
    setHidenNavbar(!hidenNavbar);
  }
  console.log("hidenNavbar==========: ",hidenNavbar);
  return (
    <>
    <div className='relative w-screen min-h-screen flex flex-row'>
      <div className="flex shadow-right">
        <Navbar isOpenNavbar={hidenNavbar} />
      </div>
      <div className="flex flex-col w-full">
        <Header handleOpenNavbar={handleHidenNavbar}/>
        <Outlet />
      </div>
    </div>
    </>
  )
}

