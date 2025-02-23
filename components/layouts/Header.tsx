import { PhoneIcon, ShoppingBag } from "lucide-react";
import React from "react";
import SearchBar from "../ui-tools/SearchBar";
import MainNavBar from "../navigation/MainNavBar";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between p-4 items-center w-full">
        <div className="text-3xl font-extrabold">WhereMe</div>
        <div className="flex flex-col items-end">
          <div className="flex flex-row items-center">
            <p className="flex flex-row p-1 items-center text-slate-700 text-xs">
              Customer Service{" "}
              <span className="m-1 flex flex-row ">
                <PhoneIcon className="w-4 ml-1 mr-2 hidden" />
                +94 77 23 44 555
              </span>
            </p>
            <SearchBar />
          </div>
          <div className="flex flex-row items-center text-slate-700 text-sm self-end">
            <span className="flex flex-row items-center p-1">
              <ShoppingBag className="w-5 text-slate-700 hover:scale-105" />
              <Link href="#" className="p-2">Shopping Cart</Link>
            </span>
            <span className="">
            <Link href="/auth/login" className="py-2">Sign In or Create an Account</Link>
            </span>
          </div>
        </div>
      </div>
      <div>
        <MainNavBar />
      </div>
    </div>
  );
};

export default Header;
