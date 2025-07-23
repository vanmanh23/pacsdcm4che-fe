import { menuItems } from "../utils/menuItems";
import { useEffect, useState } from "react";
import logo_img from '@/assets/logo_img.png';
import {
  AlignJustify,
  CircleUser,
  LogIn,
  LogOut,
  Phone,
  UserRoundPlus,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";


export default function Header() {
  const [openNavbar, setOpenNavbar] = useState(false);
//   const [widthScreen, setWidthScreen] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpenNavbar(false);
      } else {
        setOpenNavbar(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="relative ">
      <div className="md:px-16 sm:px-16 xl:px-16 2xl:px-16 px-2 md:py-3 space-y-2">
        <div className="flex flex-row gap-2 items-center justify-end md:flex sm:flex xl:flex 2xl:flex ">
          <Phone size={18} /> <p>Hotline: 0919.9792.####</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="w-1/12">
            <img src={logo_img} alt="logo" className="w-1/2 h-1/2"/>
          </div>
          <div className="md:flex sm:flex xl:flex 2xl:flex hidden flex-row items-start w-full">
            <ul className="flex space-x-11 text-menu-items font-medium">
              {menuItems.map((item, key) => (
                <Link key={key} to={item.link}>
                  <li className="cursor-pointer text-menu-items">
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="md:flex sm:flex xl:flex 2xl:flex hidden flex-row justify-between gap-7 text-menu-items">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CircleUser
                  size={26}
                  color="#333333"
                  className="cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/auth/signin">Sign in</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/auth/signup">Sign up</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>log out</DropdownMenuItem>
                <DropdownMenuItem>Setting</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden sm:hidden xl:hidden 2xl:hidden flex z-50">
            {openNavbar ? (
              <div>
                <X onClick={() => setOpenNavbar(!openNavbar)} />
              </div>
            ) : (
              <div>
                <AlignJustify onClick={() => setOpenNavbar(!openNavbar)} />
              </div>
            )}
          </div>
        </div>
      </div>
      {openNavbar && (
        <div className="absolute flex flex-col justify-start p-3  top-0 left-0 w-full h-screen bg-white z-10">
          <div className="py-4">
            <p>logo</p>
          </div>
          <div>
            <ul className="flex flex-col space-y-1 text-menu-items font-medium">
              {menuItems.map((item, key) => (
                <Link
                  key={key}
                  to={item.link}
                  onClick={() => setOpenNavbar(!openNavbar)}
                >
                  <li className="cursor-pointer text-menu-items">
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="w-full my-3 h-[1px] drop-shadow-md bg-gray-200" />
          <div>
            <ul className="flex flex-col space-y-2 text-menu-items font-extralight">
              <Link to="/auth/signin">
                <li className="flex flex-row gap-2 items-center">
                  <LogIn size={14} /> sign in
                </li>
              </Link>
              <Link to="/auth/signup">
                <li className="flex flex-row gap-2 items-center">
                  <UserRoundPlus size={14} />
                  sign up
                </li>
              </Link>
              <li className="flex flex-row gap-2 items-center">
                <LogOut size={14} />
                sign out
              </li>
              <li>setting</li>
              <li>About us</li>
            </ul>
          </div>
          <div className="w-full my-3 h-[1px] drop-shadow-md bg-gray-200" />
          <div className="flex flex-row gap-1 items-center justify-end text-menu-items text-xs">
            <Phone size={14} /> <p>Hotline: 0919.9792.####</p>
          </div>
        </div>
      )}
    </div>
  );
}
