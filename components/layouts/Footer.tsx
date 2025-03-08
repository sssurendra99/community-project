import Link from "next/link";
import React from "react";
import EmailSubmission from "../ui-tools/EmailSubmission";

const Footer = () => {
  return (
    <div className="bg-[#2a2424] text-white p-4">
      <div className="w-[1200px] m-auto">
        <div className="flex flex-row justify-around mb-6">
          <div className="flex flex-col mr-2">
            <h3 className="font-extrabold text-l my-4">SHOP</h3>
            <Link href="/" className="text-xs my-1 text-slate-300 hover:text-slate-50 hover:underline">
              HOME
            </Link>
            <Link href="/collections/new-arrivals" className="text-xs my-1 text-slate-300 hover:text-slate-50 hover:underline">
              NEW ARRIVALS
            </Link>
            <Link href="/collections" className="text-xs my-1 text-slate-300 hover:text-slate-50 hover:underline">
              VIEW COLLECTIONS
            </Link>
            <Link href="/collections/kelly-felder" className="text-xs my-1 text-slate-300 hover:text-slate-50 hover:underline">
              KELLY FELDER
            </Link>
            <Link href="#" className="text-xs my-1 text-slate-300 hover:text-slate-50 hover:underline">
              REDVERS BULLER
            </Link>
            <Link href="#" className="text-xs my-1 text-slate-300 hover:text-slate-50 hover:underline">
              SCYLLA ZELUS
            </Link>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-l my-4">INFORMATION</h3>
            <Link href="/pages/aboutus" className="text-xs my-1 text-slate-300 hover:text-slate-50 hover:underline">
              ABOUT US
            </Link>
            <Link href="/pages/contactus" className="text-xs my-1 text-slate-300 hover:text-slate-50 hover:underline">
              CONTACT US
            </Link>
            <Link href="#" className="text-xs my-1 text-slate-300 hover:text-slate-50 hover:underline">
              ANGEL CLUB
            </Link>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-l my-4">TERMS OF USE</h3>
            <Link href="/pages/terms-conditions/" className="text-xs my-1 text-slate-300 hover:text-slate-50 hover:underline">
              TERMS & CONDITIONS
            </Link>
            <Link href="/pages/privacy-policy" className="text-xs my-1 text-slate-300 hover:text-slate-50 hover:underline">
              PRIVACY POLICY
            </Link>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-l my-4">NEWSLETTER SIGN UP</h3>
            <p className="text-xs my-1 text-slate-300 ">
              Sign up for exclusive updates, new arrivals & insider only
              discounts
            </p>
            <EmailSubmission />
          </div>
        </div>
        <div className="text-center p-5 text-xs divide-y">
          <p>&copy; 2025 WHEREME</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
