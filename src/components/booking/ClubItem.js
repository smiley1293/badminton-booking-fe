import LocationIcon from "./img/location_icon.png";
import OwnerIcon from "./img/owner_icon.png";
import BookingDialogButton from "./BookingDialogButton";

const ClubItem = (props) => {
  return (
    <div>
      <div className="h-[485px] w-[380px] bg-[#FAF7F3] rounded-[30px]">
        <div className="flex justify-center pt-[15px] ">
          <img
            className="h-[241px] w-[350px] object-cover rounded-[15px]"
            src={props.imageLink}
            alt=""
          />
        </div>
        <h1 className="font-[Lora] font-bold text-[23px] mt-[13px] pl-[15px]">
          {props.name}
        </h1>
        <div className="flex items-center gap-[5px] pl-[15px] mt-[10px]">

          <img className="" src={LocationIcon} alt="" />

          <p className="text-[#a09f9f] text-[15px]">{props.address}</p>
        </div>
        <div className="flex items-center justify-between px-[15px] mt-[30px]">
          <div>
            <p className="font-[poppins] text-[22px] font-bold">
              <span className="font-extrabold font-[comfortaa]">đ</span>{" "}
              {props.pricerPerHour}{" "}
              <span className="text-[#818181] font-normal text-[14px]">
                /hour
              </span>{" "}
            </p>
          </div>
          <div className="flex items-center justify-center gap-[3px] bg-[#E3F6EC] px-[13px] py-[5px]  rounded-[50px]">
            <img className="h-[28px] w-[28px]" src={OwnerIcon} alt="" />
            <p className="text-[#309555] ">{props.ownerName}</p>
          </div>
        </div>
        <button onClick={props.onAddToWishlist} className='mt-[10px] p-[5px] bg-green-500 text-white rounded ml-[15px]'>
          Add to wishlist
        </button>
      </div>

    </div>
  );
};

export default ClubItem;
