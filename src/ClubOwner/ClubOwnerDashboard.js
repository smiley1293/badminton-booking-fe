import Content from "./Content";
import Sidebar from "./SideBar";

function ClubOwnerDashboard() {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <Content></Content>
    </div>
  );
}

export default ClubOwnerDashboard;
