import Content from "../../components/club-owner/dashboard/Content";
import Sidebar from "../../components/club-owner/dashboard/SideBar";

function ClubOwnerDashboard() {
  return (
    <div className="flex min-h-screen h-full ">
      <Sidebar></Sidebar>
      <Content></Content>
    </div>
  );
}

export default ClubOwnerDashboard;
