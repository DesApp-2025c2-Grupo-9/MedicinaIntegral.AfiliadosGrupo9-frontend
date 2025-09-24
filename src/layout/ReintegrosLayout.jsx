import SectionTitle from "../components/SectionTitle";
import NavButton from "../components/NavButton";
import { icons } from "../utils/icons";
import { Outlet } from "react-router-dom";

function ReintegrosLayout() {
  return (
    <div className="flex flex-col items-start gap-5">
      <Outlet />
    </div>
  );
}
export default ReintegrosLayout;
