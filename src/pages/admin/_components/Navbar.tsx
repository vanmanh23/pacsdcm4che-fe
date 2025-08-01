import {
  ChartColumn,
  FileUser,
  Info,
  Layers,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../store/store";
import { setOption } from "../../../features/navbarsection/navbarSection";
import type { NavbarProps } from "../_layout";

const menuItems = [
  {
    name: "Dashboard",
    link: "/admin",
    icon: <LayoutDashboard />,
  },
  {
    name: "Patients",
    link: "/admin/patients",
    icon: <FileUser />,
  },
  {
    name: "Studies",
    link: "/admin/studies",
    icon: <Layers />,
  },
  {
    name: "User management",
    link: "/admin/usermanagement",
    icon: <ChartColumn />,
  },
];
const bottom_navbar = [
  {
    name: "Help & Support",
    link: "/help",
    icons: <Info />,
  },
  {
    name: "Setting",
    link: "/settings",
    icons: <Settings />,
  },
  {
    name: "About us",
    link: "/aboutus",
    icons: <Users />,
  },
];
export default function Navbar({ isOpenNavbar }: NavbarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const roles = useSelector((state: RootState) => state.roles.value);
  const handleOption = (nameOption: string): void => {
    dispatch(setOption(nameOption));
  };
  const filteredItems = menuItems.filter(
    (item) => item.name !== "User management" || roles.includes("ROLE_ADMIN")
  );
  const stateOption = useSelector(
    (state: RootState) => state.option.valueOption
  );
  useEffect(() => {}, [stateOption]);
  return (
    <div
      className={`flex flex-col justify-between space-y-4 p-5 overflow-hidden transition-all duration-500 ease-in-out ${
        isOpenNavbar ? "w-full" : "w-24"
      }`}
    >
      <div>
        <div className="outline-none">
          <Link to="/" className="outline-none">
            <img
              src="/src/assets/logo_img.png"
              alt="logo"
              className={`outline-none ${
                isOpenNavbar ? "w-1/3 h-1/3" : "w-full h-full"
              }`}
            />
          </Link>
        </div>
        <div className="flex flex-col mt-3">
          {filteredItems
            .filter(
              (item) =>
                item.name !== "Dashboard" || roles.includes("ROLE_ADMIN")
            )
            .map((item, key) => (
              <Link
                key={key}
                to={item.link}
                className="font-medium"
                onClick={() => handleOption(item.name)}
              >
                <p
                  className={`p-3 hover:bg-gray-200 rounded-md flex flex-row items-center gap-2 ${
                    stateOption === item.name
                      ? "bg-gray-200 text-menu-items"
                      : "text-secondary"
                  }`}
                >
                  {/* {item.icon}
                {isOpenNavbar ? item.name : ""} */}
                  <p>{item.icon}</p>
                  <span
                    className={`
                  transition-all duration-300 
                  ease-in-out 
                  ${
                    isOpenNavbar
                      ? "opacity-100 visible  ml-2"
                      : "opacity-0 invisible ml-0"
                  }
                `}
                  >
                    {item.name}
                  </span>
                </p>
              </Link>
            ))}
        </div>
      </div>
      <div>
        {bottom_navbar.map((item, key) => (
          <Link
            key={key}
            to={item.link}
            className="text-menu-items font-medium"
          >
            <p className="p-3 hover:bg-gray-200 rounded-md flex flex-row items-center gap-2 text-secondary">
              {item.icons}
              {isOpenNavbar ? item.name : ""}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
