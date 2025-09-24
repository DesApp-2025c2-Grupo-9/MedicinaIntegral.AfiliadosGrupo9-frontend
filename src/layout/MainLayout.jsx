import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Topbar className="mb-5" />


      <div className="flex gap-5 w-full">
        <Sidebar className="h-[calc(100dvh-81px)] hidden lg:flex" />
        <div className="flex-1 px-4 lg:px-0">

          <Outlet />
        </div>
      </div>
    </>
  );
}
export default MainLayout;
