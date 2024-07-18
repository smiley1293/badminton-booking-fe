import logo from "./img/Logo.png";
import placeHolder from "./img/placeholder.png";

function Content() {
  return (
    <div className="w-full h-svh bg-[#F4F1E4]">
      <div className="flex w-full">
        <img src={logo} className="mt-[13px] ml-[34px]"></img>
        <img
          src={placeHolder}
          className="size-12 mt-[13px] ml-auto mr-10"
        ></img>
      </div>
      <div className="m-6"></div>
    </div>
  );
}

export default Content;
