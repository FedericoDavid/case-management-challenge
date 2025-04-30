import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiFolder,
  FiUsers,
  FiPieChart,
  FiCalendar,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FiHome size={20} /> },
    { name: "Clients", path: "/cases", icon: <FiFolder size={20} /> },
    { name: "Calendar", path: "/calendar", icon: <FiCalendar size={20} /> },
    { name: "Team", path: "/team", icon: <FiUsers size={20} /> },
    { name: "Reports", path: "/reports", icon: <FiPieChart size={20} /> },
    { name: "Settings", path: "/settings", icon: <FiSettings size={20} /> },
    { name: "Help", path: "/help", icon: <FiHelpCircle size={20} /> },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] w-16 fixed left-0 top-16 bg-white shadow-sm z-10 flex flex-col items-center py-4">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center justify-center w-10 h-10 my-2 rounded transition-colors ${
              isActive
                ? "bg-indigo-100 text-indigo-600"
                : "text-gray-500 hover:bg-gray-100 hover:text-indigo-500"
            }`
          }
          title={item.name}
        >
          {item.icon}
        </NavLink>
      ))}

      <div className="mt-auto">
        <button
          className="flex items-center justify-center w-10 h-10 rounded text-gray-500 hover:bg-gray-100 hover:text-indigo-500"
          title="Logout"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
