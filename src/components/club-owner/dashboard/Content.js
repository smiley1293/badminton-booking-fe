import logo from "./img/Logo.png";
import placeHolder from "./img/placeholder.png";
import masking from "./img/masking.png";
import ClubCard from "./ClubCard";
import { useState } from "react";
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
  {
    id: 5,
    image:
      "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288883.jpg?t=st=1721294846~exp=1721298446~hmac=fe51e1cdb9ab97ed7e31bd7e865714ad63f59590dda3c767ef985a008018f321&w=740",
    title: "Club 4",
    subtitle: "Black Noir",
  },
  {
    id: 6,
    image:
      "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288883.jpg?t=st=1721294846~exp=1721298446~hmac=fe51e1cdb9ab97ed7e31bd7e865714ad63f59590dda3c767ef985a008018f321&w=740",
    title: "Club 4",
    subtitle: "Black Noir",
  },
];

function Content() {
  const [visibleClubs, setVisibleClubs] = useState(4);

  const showMoreClubs = () => {
    setVisibleClubs(visibleClubs + 4);
  };
  return (
    <div className="w-full h-full  bg-[#F4F1E4]">
      <div className="flex w-full">
        <img src={logo} className="mt-[13px] ml-[34px]"></img>
        <img
          src={placeHolder}
          className="size-12 mt-[13px] ml-auto mr-10"
        ></img>
      </div>
      <div className="m-6 ">
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
              Back to home
            </button>
          </div>
        </div>

        <h1 className="flex justify-center font-semibold text-2xl mt-4 mb-6">
          All clubs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clubs.slice(0, visibleClubs).map((club) => (
            <ClubCard
              key={club.id}
              image={club.image}
              title={club.title}
              subtitle={club.subtitle}
            />
          ))}
        </div>
        {visibleClubs < clubs.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={showMoreClubs}
              className="px-4 py-2 bg-[#DF6951] text-white rounded-lg"
            >
              Get More
            </button>
          </div>
        )}

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
                {clubs.slice(0, visibleClubs).map((club) => (
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
