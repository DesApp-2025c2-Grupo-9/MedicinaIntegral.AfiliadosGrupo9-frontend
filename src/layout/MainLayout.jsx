import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Topbar className="mb-5" />


      <div className='flex lg:gap-5 w-dvw lg:pr-10'>
        <div>
          <Sidebar className='min-h-[calc(100dvh-81px)] h-full hidden lg:flex' />
        </div>
        <div className='px-4 lg:px-0 w-full'>
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default MainLayout;
