import logo from "./img/Logo.png";
import masking from "./img/masking.png";
import ClubCard from "./ClubCard";
import { useEffect, useState } from "react";
import { getOwnerClubs } from "../../../services/ClubApi";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../avatar/Avatar";
import * as Dialog from "@radix-ui/react-dialog";
import CreateClubDialog from "./CreateClubDialog";
import { getOwnerBooking } from "../../../services/BookingApi";
import { React } from "react";
import { format } from "date-fns";
import { checkSubscriptionApi } from "../../../services/UserApi";

const token = localStorage.getItem("token");

function Content() {
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [club, setClub] = useState([]);
  const [booking, setBooking] = useState([]);
  const [bookingLength, setBookingLength] = useState(6);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    getAllClubs();
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    checkSubscription();
    getAllClubs();
    getAllBookings();
  }, []);

  const checkSubscription = async () => {
    let res = await checkSubscriptionApi();
    if (res.statusCode != 200) {
      navigate("/");
    }
    console.log(res);
  };

  const getAllBookings = async () => {
    let res = await getOwnerBooking();

    setBooking(res);
  };

  const getAllClubs = async () => {
    let res = await getOwnerClubs();
    //catch error
    if (res.status === 400) {
      console.log(res.data);
      return;
    }

    setClub(res);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd HH:mm");
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
                      <button
                        onClick={handleCloseDialog}
                        className="text-2xl font-semibold"
                      >
                        X
                      </button>
                    </Dialog.DialogTitle>

                    <CreateClubDialog onClose={handleCloseDialog} />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          )}
        </div>

        <div className="w-full mt-[35px] ">
          <div className="flex">
            <h1 className="text-2xl font-semibold">Booking Management</h1>
          </div>
          <div className="mt-10 overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
            <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-3 sticky top-0 border-b border-gray-200 ">
                    FullName
                  </th>
                  <th className="py-2 px-3 sticky top-0 border-b border-gray-200 ">
                    Email
                  </th>
                  <th className="py-2 px-3 sticky top-0 border-b border-gray-200 ">
                    phoneNumber
                  </th>
                  <th className="py-2 px-3 sticky top-0 border-b border-gray-200 ">
                    Start Time
                  </th>
                  <th className="py-2 px-3 sticky top-0 border-b border-gray-200 ">
                    End Time
                  </th>
                  <th className="py-2 px-3 sticky top-0 border-b border-gray-200 ">
                    Amount
                  </th>
                  <th className="py-2 px-3 sticky top-0 border-b border-gray-200 ">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {booking.slice(0, bookingLength).map((booking) => (
                  <tr key={booking.id} className="border-t border-gray-200">
                    <td className="px-4 py-3">{booking.account.fullName}</td>
                    <td className="px-4 py-3">{booking.account.email}</td>
                    <td className="px-4 py-3">{booking.account.phoneNumber}</td>
                    <td className="px-4 py-3">
                      {formatDate(booking.startTime)}
                    </td>
                    <td className="px-4 py-3">{formatDate(booking.endTime)}</td>
                    <td className="px-4 py-3 text-green-500">
                      {booking.amount}
                    </td>
                    <td className="px-4 py-3">{booking.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setBookingLength(bookingLength + 6)}
              className="px-4 py-2 bg-[#DF6951] text-white rounded-lg"
            >
              Show more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
