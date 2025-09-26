import { Outlet } from "react-router-dom";

function SectionLayoutTemplate({ sectionTitle, navButtonA, navButtonB }) {
  return (
    <div className='flex flex-col items-start gap-5 mb-5'>
      <div className='flex flex-col items-start gap-2 w-full'>
        {sectionTitle}
        <div className='flex items-center gap-2'>
          {navButtonA}
          {navButtonB}
        </div>
      </div>
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
  );
}
export default SectionLayoutTemplate;
