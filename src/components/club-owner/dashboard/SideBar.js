import homeIcon from "./img/house.png";
import statisticIcon from "./img/statistic.png";
import transactionIcon from "./img/transaction.png";
import accountIcon from "./img/account.png";
import faqIcon from "./img/faq.png";

function Sidebar() {
  return (
    <div className="w-1/5  bg-[#222222]">
      <div className="m-6 ">
        <h1 className="text-[#878787] mb-4">Menu</h1>
        <div className="text-white">
          <div className="rounded-lg bg-[#DF6951] flex h-12 mb-2 cursor-pointer">
            <img src={homeIcon} className="m-3"></img>
            <span className="my-3">Dashboard</span>
          </div>
          <div className="rounded-lg flex h-12 mb-2 cursor-pointer">
            <img src={statisticIcon} className="m-3"></img>
            <span className="my-3">Statistic</span>
          </div>
          <div className="rounded-lg flex h-12 mb-2 cursor-pointer">
            <img src={transactionIcon} className="m-3"></img>
            <span className="my-3">Transaction</span>
          </div>
        </div>
      </div>
      <div className="m-6 ">
        <h1 className="text-[#878787] mb-4">Other</h1>
        <div className="text-white">
          <div className="rounded-lg flex h-12 mb-2 cursor-pointer">
            <img src={accountIcon} className="m-3"></img>
            <span className="my-3">Account</span>
          </div>
          <div className="rounded-lg flex h-12 mb-2 cursor-pointer">
            <img src={faqIcon} className="m-3"></img>
            <span className="my-3">FAQ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
