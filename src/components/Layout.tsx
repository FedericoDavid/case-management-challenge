import { NextUIProvider } from "@nextui-org/react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <NextUIProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-16">
            <Outlet />
          </main>
        </div>
      </div>
    </NextUIProvider>
  );
};

export default Layout;
