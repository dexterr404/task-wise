import HomeIcon from "@mui/icons-material/HomeOutlined";
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined";
import CelebrationIcon from "@mui/icons-material/Celebration";
import DocumentIcon from "@mui/icons-material/DescriptionOutlined";
import BoxIcon from "@mui/icons-material/Inventory2Outlined";
import VolleyballIcon from "@mui/icons-material/SportsVolleyballOutlined";
import GiftIcon from "@mui/icons-material/CardGiftcardOutlined";
import FlightIcon from "@mui/icons-material/FlightOutlined";

function Recommended() {
    return<div className="flex flex-col gap-x-2 gap-y-6 bg-white lg:ml-[100px] p-4 mx-10">
            <h1 className="font-semibold">Recommended Categories</h1>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-x-4 gap-y-4">
                <div className="border-1 border-gray-400 rounded-md p-4 cursor-pointer hover:bg-gray-50 text-sm items-center flex">
                    <HomeIcon className="text-yellow-400 mr-2" sx={{ fontSize: 20 }}/>Home Help
                </div>
                <div className="border-1 border-gray-400 rounded-md p-4 cursor-pointer hover:bg-gray-50  text-sm items-center flex">
                    <CelebrationIcon className="text-pink-400 mr-2" sx={{ fontSize: 20 }}/>Plan an event
                </div>
                <div className="border-1 border-gray-400 rounded-md p-4 cursor-pointer hover:bg-gray-50  text-sm items-center flex">
                    <BoxIcon className="text-amber-700 mr-2" sx={{ fontSize: 20 }}/>Return a package
                </div>
                <div className="border-1 border-gray-400 rounded-md p-4 cursor-pointer hover:bg-gray-50  text-sm items-center flex">
                    <GiftIcon className="text-red-400 mr-2" sx={{ fontSize: 20 }}/>Send a gift
                </div>
                <div className="border-1 border-gray-400 rounded-md p-4 cursor-pointer hover:bg-gray-50  text-sm items-center flex">
                    <CalendarIcon className="text-green-400 mr-2" sx={{ fontSize: 20 }}/>Schedule an appointment
                </div>
                <div className="border-1 border-gray-400 rounded-md p-4 cursor-pointer hover:bg-gray-50  text-sm items-center flex">
                    <DocumentIcon className="text-cyan-400 mr-2" sx={{ fontSize: 20 }}/>Get a passport
                </div>
                <div className="border-1 border-gray-400 rounded-md p-4 cursor-pointer hover:bg-gray-50  text-sm items-center flex">
                    <VolleyballIcon className="text-violet-400 mr-2" sx={{ fontSize: 20 }}/>Find a kids activity
                </div>
                <div className="border-1 border-gray-400 rounded-md p-4 cursor-pointer hover:bg-gray-50  text-sm items-center flex">
                    <FlightIcon className="text-blue-400 mr-2" sx={{ fontSize: 20 }}/>Plan a trip
                </div>
            </div>
        </div>
}
export default Recommended