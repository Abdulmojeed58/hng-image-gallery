import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useSearchContext } from "../context/useSearchContext";
import { useAuthContext } from "../context/useAuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { handleChange } = useSearchContext();
  const { handleLogout } = useAuthContext();

  return (
    <div className="flex items-center justify-between bg-[#0000006c] p-[1rem] md:p-[1.5rem] text-white relative">
      <h2 className="text-[1.4rem] font-bold">Image Gallery</h2>
      <div className="hidden md:flex border-[2px] border-[#D1D5DB] rounded-[6px] py-[6px] px-[10px] justify-between items-center w-[525px]">
        <input
          type="search"
          placeholder="Enter image title"
          className="bg-transparent border-none outline-none w-[80%] text-black"
          onChange={(e) => handleChange(e.currentTarget.value)}
        />
        <SearchIcon />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <SearchIcon className="text-white" />
        </button>
        {isOpen && (
          <div className="absolute top-[110%] left-3 right-3 z-20 flex border-[2px] border-[#D1D5DB] rounded-[6px] py-[6px] px-[10px] justify-between items-center bg-white text-white h-[5rem]">
            <input
              type="search"
              placeholder="Enter image title"
              className="bg-transparent border-none outline-none w-[80%] text-black"
              onChange={(e) => handleChange(e.currentTarget.value)}
            />
          </div>
        )}
      </div>

      <Button
        variant="contained"
        endIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
