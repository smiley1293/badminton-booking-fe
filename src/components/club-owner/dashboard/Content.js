import logo from "./img/Logo.png";
import masking from "./img/masking.png";
import ClubCard from "./ClubCard";
import { useEffect, useState } from "react";
import { getOwnerClubs } from "../../../services/ClubApi";
import { Link } from "react-router-dom";
import Avatar from "../../avatar/Avatar";
import * as Dialog from "@radix-ui/react-dialog";
import CreateClubDialog from "./CreateClubDialog";

const token = localStorage.getItem("token");

const clubs = [
  {
    id: 1,
    image:
      "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288883.jpg?t=st=1721294846~exp=1721298446~hmac=fe51e1cdb9ab97ed7e31bd7e865714ad63f59590dda3c767ef985a008018f321&w=740",
    title: "Club 1",
    subtitle: "Homelander",
  },
  {
    id: 2,
    image:
      "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288883.jpg?t=st=1721294846~exp=1721298446~hmac=fe51e1cdb9ab97ed7e31bd7e865714ad63f59590dda3c767ef985a008018f321&w=740",
    title: "Club 2",
    subtitle: "Starlight",
  },
  {
    id: 3,
    image:
      "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288883.jpg?t=st=1721294846~exp=1721298446~hmac=fe51e1cdb9ab97ed7e31bd7e865714ad63f59590dda3c767ef985a008018f321&w=740",
    title: "Club 3",
    subtitle: "A Train",
  },
  {
    id: 4,
    image:
      "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288883.jpg?t=st=1721294846~exp=1721298446~hmac=fe51e1cdb9ab97ed7e31bd7e865714ad63f59590dda3c767ef985a008018f321&w=740",
    title: "Club 4",
    subtitle: "Black Noir",
  },
];

function Content() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [club, setClub] = useState([]);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    getAllClubs();
  };

  useEffect(() => {
    getAllClubs();
  }, []);

  const getAllClubs = async () => {
    let res = await getOwnerClubs(2);
    //catch error
    if (res.status === 400) {
      console.log(res.data);
      return;
    }
    console.log(res);

    setClub(res);
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#F4F1E4]">
      <div className="flex w-full">
        <img src={logo} className="mt-[13px] ml-[34px]"></img>

        {/* avatar */}
        <div className="mt-[13px] ml-auto mr-10">
          {token ? (
            <div>
              <Avatar />
            </div>
          ) : (
            <div className="text-white flex items-center justify-center gap-[40px]">
              <button className="px-[28px] py-[17px] bg-[#DF6951] rounded-[10px] hover:bg-transparent hover:border-white hover:border-solid hover:border-[1px] hover:transition hover:ease-in-out hover:outline-white ">
                <Link to={"/register"}>Sign up</Link>
              </button>
              <button className="hover:text-[#DF6951] transition-all">
                <Link to={"/login"}>Sign in</Link>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="m-6 ">
        {/* Banner */}
        <div className="relative ">
          <img
            src={masking}
            className="object-cover w-auto h-[200px] rounded-lg"
            alt="Background"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-6">
            <h1 className="font-semibold text-3xl w-[469px] text-black mb-4">
              Manage all your clubs and booking everyday
            </h1>
            <button className="px-[14px] py-[11.5px] bg-[#DF6951] text-white rounded-lg">
              <Link to={"/"}> Back to home</Link>
            </button>
          </div>
        </div>

        <h1 className="flex justify-center font-semibold text-2xl mt-4 mb-6">
          All clubs
        </h1>

        {/* Club cards  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {club.map((club) => (
            <ClubCard
              key={club.id}
              image={club.imageLink}
              title={club.name}
              subtitle={club.address}
            />
          ))}
          {club.length < 3 && (
            <div>
              <Dialog.Root open={isDialogOpen} onOpenChange={handleOpenDialog}>
                <Dialog.Trigger>
                  <button className="bg-[#DF6951] rounded-lg shadow-lg p-2 hover:shadow-2xl text-white">
                    Add new club
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                  <Dialog.Content className="fixed left-1/2 top-1/2 w-[800px]  p-8 bg-slate-100 -translate-x-1/2 -translate-y-1/2 rounded-md shadow">
                    <Dialog.DialogTitle className="flex justify-between items-center mb-8">
                      <h1 className="text-2xl font-semibold">Add new club</h1>
                      <Dialog.DialogClose className="text-2xl font-semibold">
                        X
                      </Dialog.DialogClose>
                    </Dialog.DialogTitle>

                    <CreateClubDialog onClose={handleCloseDialog} />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          )}
        </div>

        <div className="w-2/3 mt-[35px]">
          <div className="flex">
            <h1 className="text-2xl font-semibold">Booking Management</h1>
            <p className="ml-auto">View All</p>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
            <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-3 sticky top-0 border-b border-gray-200 ">
                    Customer Name
                  </th>
                  <th className="py-2 px-3 sticky top-0 border-b border-gray-200 ">
                    Started Time
                  </th>
                  <th className="py-2 px-3 sticky top-0 border-b border-gray-200 ">
                    Ended Time
                  </th>
                  <th className="py-2 px-3 sticky top-0 border-b border-gray-200 ">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {clubs.slice(0, 4).map((club) => (
                  <tr key={club.id} className="border-t border-gray-200">
                    <td className="px-4 py-3">{club.id}</td>
                    <td className="px-4 py-3">{club.title}</td>
                    <td className="px-4 py-3">{club.subtitle}</td>
                    <td className="px-4 py-3 text-[#16B364]">
                      {club.subtitle}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
