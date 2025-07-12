import { PhoneCallIcon, PhoneIcon } from "lucide-react";
import React from "react";
import SearchBar from "../ui-tools/SearchBar";
import MainNavBar from "../navigation/MainNavBar";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between p-4 items-center">
        <div className="text-3xl font-extrabold tracking-wider">WearMe</div>
        <div>
          <p className="flex flex-row p-1 items-center">
            Customer Service{" "}
            <span className="m-1 flex flex-row">
              <PhoneIcon className="w-4 ml-1 mr-2" />
              +94 77 23 44 555
            </span>
          </p>
          <SearchBar />
        </div>
      </div>
      <div>
        <MainNavBar />
      </div>
    </div>
  );
};

export default Header;
