import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import * as Toggle from "@radix-ui/react-toggle";
import { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { createBooking } from "../../services/BookingApi";
import { toast } from "react-toastify";

const BookingDialogButton = (prop) => {
  const [date, setDate] = useState(new Date());
  const [dtpStartHour, setDtpStartHour] = useState(7);
  const [dtpEndHour, setDtpEndHour] = useState(7);
  const [numberOfCourts, setNumberOfCourts] = useState(1);
  const [toggleDayState, setToggleDayState] = useState(
    new Array(7).fill(false)
  );
  const [isChecked, setIsChecked] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    startTime: "",
    endTime: "",
    numberOfCourts: 0,
    isPrepaid: true,
    clubId: parseInt(prop.id),
    type: "",
    recurringType: {
      id: 0,
      daysOfWeek: [],
    },
  });
  const handleCall = async () => {
    if (bookingForm.startTime !== "" && bookingForm.endTime !== "") {
      try {
        const response = await createBooking(bookingForm);
        console.log(response);
        if (response.status !== 200) {
          if (response.data) {
            toast.error(response.data);
          }
          else if (response.status == 400) {
            toast.error("Failed to create booking");
          }
        }
        if (response.id) {
          toast.success("Booking successfully created");
        }

      } catch (error) {
        toast.error("Error creating booking");
        console.error("Error creating booking:", error);
      }
    }
  };

  useEffect(() => {
    console.log(bookingForm);
  }, [bookingForm]);

  const onSubmit = async () => {
    if (dtpStartHour <= 0 || dtpEndHour <= 0) return
    let startHour = dtpStartHour.toString()
    if (dtpStartHour.length === 1) {
      startHour = '0' + startHour.toString();
    }
    let endHour = dtpEndHour.toString()
    if (dtpEndHour.length === 1) {
      endHour = '0' + endHour.toString();
    }
    console.log(startHour)
    console.log(endHour)
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
      month = '0' + month;
    }

    let day = date.getDate().toString();
    if (day.length === 1) {
      day = '0' + day;
    }

    const startDate = `${year}-${month}-${day}T${startHour}:00:00.981Z`
    const endDate = `${year}-${month}-${day}T${endHour}:00:00.981Z`
    let selectedDays = [];
    selectedDays = toggleDayState
      .map((day, index) => {
        if (day) {
          return [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ][index];
        }
        return "";
      })
      .filter((day) => day !== "");
    if (selectedDays.length == 0) {
      toast.error("Please select days in a week")
      return
    }
    setBookingForm((prevForm) => ({
      ...prevForm,
      startTime: startDate,
      endTime: endDate,
      numberOfCourts: numberOfCourts,
      type: isChecked ? "WEEKLY" : "ONCE",
      recurringType: {
        id: 0,
        daysOfWeek: selectedDays,
      },
    }));
    console.log(bookingForm)
    handleCall();
  };

  // toggle days
  const handleDaysToggle = (index) => {
    setToggleDayState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="bg-[#DF6951] rounded-lg shadow-lg p-2 hover:shadow-2xl text-white">
          Create Booking
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 " />
        <Dialog.Content className="space-y-2 fixed left-1/2 top-1/2 w-[800px]  p-8 bg-slate-100 -translate-x-1/2 -translate-y-1/2 rounded-md shadow">
          <Dialog.DialogTitle className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Create Booking</h1>
            <Dialog.DialogClose className="text-2xl font-semibold">
              X
            </Dialog.DialogClose>
          </Dialog.DialogTitle>

          {/* check if user want to book once or monthly */}
          <div className="flex items-center">
            <label className="text-black leading-none pr-[15px]">
              Weekly Booking
            </label>
            <Switch.Root
              className={`w-[42px] h-[25px] rounded-full relative outline cursor-default outline-1 ${isChecked ? "bg-green-500" : "bg-blackA6"
                }`}
              checked={isChecked}
              onCheckedChange={setIsChecked}
              style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
            >
              <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          </div>

          <div className="flex items-center space-x-5 ">
            <label className="text-black leading-none">Select a day of that week</label>
            <div className="">
              <DateTimePicker
                minDate={new Date()}
                format="yyyy-MM-dd"
                onChange={setDate}
                value={date}
              />
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <label className="text-black leading-none">Start Hour</label>
            <div className="">
              <input
                type="number"
                max={24}
                min={0}
                value={dtpStartHour}
                onChange={(e) => {
                  if (e.target.value < 24 && e.target.value > 0) setDtpStartHour(e.target.value);
                }} />
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <label className="text-black leading-none">End Hour</label>
            <div className="">
              <input
                type="number"
                max={24}
                min={0}
                value={dtpEndHour}
                onChange={(e) => {

                  if (e.target.value < 24 && e.target.value > 0) setDtpEndHour(e.target.value);
                }} />
            </div>
          </div>
          <div className="flex items-center space-x-5 ">
            <label className="block ">Number of courts</label>
            <input
              type="number"
              max={8}
              min={1}
              value={numberOfCourts}
              onChange={(e) => {
                setNumberOfCourts(e.target.value);
                setBookingForm({
                  ...bookingForm,
                  numberOfCourts: e.target.value,
                });
              }}
              onKeyDown={(e) => e.preventDefault()}
              className="block w-14 px-3  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block ">Days</label>

            <div className="flex justify-center items-center space-x-4">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day, index) => (
                <Toggle.Root
                  onClick={() => handleDaysToggle(index)}
                  key={index}
                  className="p-1 bg-gray-300 rounded-full w-fit focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                data-[state=on]:bg-[#DF6951] data-[state=on]:text-white"
                >
                  {day}
                </Toggle.Root>
              ))}
            </div>
          </div>
          <div className="flex">
            <label className="block mr-5">Total</label>
            <label className="block text-green-500">
              {prop.pricerPerHour * (dtpEndHour - dtpStartHour)}đ
            </label>
          </div>
          <Dialog.DialogClose
            disabled={isChecked && toggleDayState.every((day) => !day)}
            className="bg-[#DF6951] translate-y-2 text-white px-2 py-1 rounded-md text-xl flex ml-auto"
            onClick={onSubmit}
          >
            Submit
          </Dialog.DialogClose>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BookingDialogButton;

// import * as Dialog from "@radix-ui/react-dialog";
// import * as Switch from "@radix-ui/react-switch";
// import * as Toggle from "@radix-ui/react-toggle";
// import { useState, useEffect } from "react";
// import DateTimePicker from "react-datetime-picker";
// import "react-datetime-picker/dist/DateTimePicker.css";
// import "react-calendar/dist/Calendar.css";
// import "react-clock/dist/Clock.css";
// import { createBooking } from "../../services/BookingApi";
// import { toast } from "react-toastify";

// const BookingDialogButton = (prop) => {
//   const [date, setDate] = useState(new Date());
//   const [dtpEndDate, setDtpEndDate] = useState(new Date());
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [numberOfHours, setNumberOfHours] = useState(1);
//   const [numberOfCourts, setNumberOfCourts] = useState(1);
//   const [toggleDayState, setToggleDayState] = useState(
//     new Array(7).fill(false)
//   );
//   const [days, setDays] = useState([]);
//   const [isChecked, setIsChecked] = useState(false);

//   const [bookingForm, setBookingForm] = useState({
//     startTime: "",
//     endTime: "",
//     numberOfCourts: 0,
//     isPrepaid: true,
//     clubId: prop.id,
//     type: "",
//     recurringType: {
//       id: 0,
//       daysOfWeek: [],
//     },
//   });

//   useEffect(() => {
//     console.log(bookingForm);
//     if (bookingForm.startTime !== "" && bookingForm.endTime !== "") {
//       try {
//         const response = createBooking(bookingForm);
//         if (response.status === 200) {
//           toast.success("Booking created successfully");
//         }
//         if (response.status === 400) {
//           toast.error(response.message);
//         }
//       } catch (error) {
//         toast.error("Error creating booking");
//         console.error("Error creating booking:", error);
//       }
//     }
//   }, [bookingForm]);

//   const onSubmit = async () => {
//     // change the date to DateTimeOffset type for api call
//     const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
//     const isoString = utcDate.toISOString();
//     // setStartDate(isoString);

//     let endIsoString;
//     // add hour to end date
//     if (!isChecked) {
//       const endDate = new Date(
//         utcDate.getTime() + numberOfHours * 60 * 60 * 1000
//       );
//       endIsoString = endDate.toISOString();
//       // setEndDate(endIsoString);
//     } else {
//       const utcEndDate = new Date(
//         dtpEndDate.getTime() - dtpEndDate.getTimezoneOffset() * 60000
//       );
//       endIsoString = utcEndDate.toISOString();
//       // setEndDate(endIsoString);
//     }

//     // get the days that are toggled
//     let selectedDays = [];
//     if (isChecked) {
//       selectedDays = toggleDayState
//         .map((day, index) => {
//           if (day) {
//             return [
//               "Monday",
//               "Tuesday",
//               "Wednesday",
//               "Thursday",
//               "Friday",
//               "Saturday",
//               "Sunday",
//             ][index];
//           }
//           return "";
//         })
//         .filter((day) => day !== "");

//       // setDays(selectedDays);
//     } else {
//       const daysOfWeek = utcDate.getDay();
//       const dayNames = [
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//       ];
//       selectedDays = dayNames[daysOfWeek];
//     }

//     // setBookingForm((prevForm) => {
//     //   const updatedForm = {
//     //     ...prevForm,
//     //     startTime: startDate,
//     //     endTime: endDate,
//     //     numberOfCourts: numberOfCourts,
//     //     type: isChecked ? "WEEKLY" : "ONCE",
//     //     recurringType: { id: 0, daysOfWeek: days },
//     //   };
//     //   return updatedForm;
//     // });

//     setBookingForm((prevForm) => ({
//       ...prevForm,
//       startTime: isoString,
//       endTime: endIsoString,
//       numberOfCourts: numberOfCourts,
//       type: isChecked ? "WEEKLY" : "ONCE",
//       recurringType: {
//         id: 0,
//         daysOfWeek: !isChecked ? [selectedDays] : selectedDays,
//       },
//     }));
//   };

//   // toggle days
//   const handleDaysToggle = (index) => {
//     setToggleDayState((prevState) => {
//       const newState = [...prevState];
//       newState[index] = !newState[index];
//       return newState;
//     });
//   };

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger>
//         <button className="bg-[#DF6951] rounded-lg shadow-lg p-2 hover:shadow-2xl text-white">
//           Create Booking
//         </button>
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 " />
//         <Dialog.Content className="space-y-2 fixed left-1/2 top-1/2 w-[800px]  p-8 bg-slate-100 -translate-x-1/2 -translate-y-1/2 rounded-md shadow">
//           <Dialog.DialogTitle className="flex justify-between items-center mb-8">
//             <h1 className="text-2xl font-semibold">Create Booking</h1>
//             <Dialog.DialogClose className="text-2xl font-semibold">
//               X
//             </Dialog.DialogClose>
//           </Dialog.DialogTitle>

//           {/* check if user want to book once or monthly */}
//           <div className="flex items-center">
//             <label className="text-black leading-none pr-[15px]">
//               Weekly Booking
//             </label>
//             <Switch.Root
//               className={`w-[42px] h-[25px] rounded-full relative outline cursor-default outline-1 ${isChecked ? "bg-green-500" : "bg-blackA6"
//                 }`}
//               checked={isChecked}
//               onCheckedChange={setIsChecked}
//               style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
//             >
//               <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
//             </Switch.Root>
//           </div>

//           <div className="flex items-center space-x-5 ">
//             <label className="text-black leading-none">Select Date</label>
//             <div className="">
//               <DateTimePicker onChange={setDate} value={date} />
//             </div>
//             {!isChecked && (
//               <div className="flex items-center space-x-5 ">
//                 <label className="block text-gray-700">Number of hours</label>
//                 <input
//                   id="numberOfHours"
//                   type="number"
//                   max={8}
//                   min={1}
//                   value={numberOfHours}
//                   onChange={(e) => setNumberOfHours(e.target.value)}
//                   onKeyDown={(e) => e.preventDefault()}
//                   className="block w-14 px-3  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             )}
//           </div>
//           {isChecked && (
//             <div className="flex items-center space-x-5">
//               <label className="text-black leading-none">End date</label>
//               <div className="">
//                 <DateTimePicker onChange={setDtpEndDate} value={dtpEndDate} />
//               </div>
//             </div>
//           )}

//           <div className="flex items-center space-x-5 ">
//             <label className="block ">Number of courts</label>
//             <input
//               type="number"
//               max={8}
//               min={1}
//               value={numberOfCourts}
//               onChange={(e) => {
//                 setNumberOfCourts(e.target.value);
//                 setBookingForm({
//                   ...bookingForm,
//                   numberOfCourts: e.target.value,
//                 });
//               }}
//               onKeyDown={(e) => e.preventDefault()}
//               className="block w-14 px-3  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           {isChecked && (
//             <div>
//               <label className="block ">Days</label>

//               <div className="flex justify-center items-center space-x-4">
//                 {[
//                   "Monday",
//                   "Tuesday",
//                   "Wednesday",
//                   "Thursday",
//                   "Friday",
//                   "Saturday",
//                   "Sunday",
//                 ].map((day, index) => (
//                   <Toggle.Root
//                     onClick={() => handleDaysToggle(index)}
//                     key={index}
//                     className="p-1 bg-gray-300 rounded-full w-fit focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
//                 data-[state=on]:bg-[#DF6951] data-[state=on]:text-white"
//                   >
//                     {day}
//                   </Toggle.Root>
//                 ))}
//               </div>
//             </div>
//           )}
//           <Dialog.DialogClose
//             disabled={isChecked && toggleDayState.every((day) => !day)}
//             className="bg-[#DF6951] translate-y-2 text-white px-2 py-1 rounded-md text-xl flex ml-auto"
//             onClick={onSubmit}
//           >
//             Submit
//           </Dialog.DialogClose>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// };

// export default BookingDialogButton;
