import HomeIcon from "@mui/icons-material/HomeOutlined";
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined";
import CelebrationIcon from "@mui/icons-material/Celebration";
import DocumentIcon from "@mui/icons-material/DescriptionOutlined";
import BoxIcon from "@mui/icons-material/Inventory2Outlined";
import GiftIcon from "@mui/icons-material/CardGiftcardOutlined";
import FlightIcon from "@mui/icons-material/FlightOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";

function Recommended({ setIsCreateTaskOpen, setSelectedCategory }) {
  const categories = [
    { icon: <HomeIcon className="text-yellow-400 mr-2" sx={{ fontSize: 20 }} />, name: "Home Help" },
    { icon: <CelebrationIcon className="text-pink-400 mr-2" sx={{ fontSize: 20 }} />, name: "Plan an event" },
    { icon: <BoxIcon className="text-amber-700 mr-2" sx={{ fontSize: 20 }} />, name: "Return a package" },
    { icon: <GiftIcon className="text-red-400 mr-2" sx={{ fontSize: 20 }} />, name: "Send a gift" },
    { icon: <CalendarIcon className="text-green-400 mr-2" sx={{ fontSize: 20 }} />, name: "Schedule an appointment" },
    { icon: <DocumentIcon className="text-cyan-400 mr-2" sx={{ fontSize: 20 }} />, name: "Get a passport" },
    { icon: <AssignmentIcon className="text-violet-400 mr-2" sx={{ fontSize: 20 }} />, name: "Prepare for an exam" },
    { icon: <FlightIcon className="text-blue-400 mr-2" sx={{ fontSize: 20 }} />, name: "Plan a trip" },
  ];

  return (
    <div className="flex flex-col gap-x-2 gap-y-6 bg-surface lg:ml-[100px] p-4 sm:mx-10 border-x-1 border-border">
      <h1 className="font-semibold text-text-primary">Recommended Categories</h1>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-x-4 gap-y-4">
        {categories.map((category, index) => (
          <div
            to={"create"}
            key={index}
            className="border-1 border-border bg-surface rounded-md p-4 cursor-pointer hover:bg-border text-xs items-center flex"
            onClick={() => {
              setSelectedCategory(category.name);
              setIsCreateTaskOpen(true);
            }}
          >
            {category.icon}
            <span className="text-text-primary">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommended;