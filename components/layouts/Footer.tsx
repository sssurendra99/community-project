import Link from "next/link";
import React from "react";
import EmailSubmission from "../ui-tools/EmailSubmission";

const Footer = () => {
  return (
    <div className="bg-[#232323] text-white p-4">
      <div className="w-[1200px] m-auto">
        <div className="flex flex-row justify-around mb-6">
          <div className="flex flex-col">
            <h3 className="font-extrabold text-l my-4">SHOP</h3>
            <Link href="/" className="text-sm my-1">
              HOME
            </Link>
            <Link href="/collections/new-arrivals" className="text-sm my-1">
              NEW ARRIVALS
            </Link>
            <Link href="/collections" className="text-sm my-1">
              VIEW COLLECTIONS
            </Link>
            <Link href="/collections/kelly-felder" className="text-sm my-1">
              KELLY FELDER
            </Link>
            <Link href="#" className="text-sm my-1">
              REDVERS BULLER
            </Link>
            <Link href="#" className="text-sm my-1">
              SCYLLA ZELUS
            </Link>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-l my-4">INFORMATION</h3>
            <Link href="/pages/aboutus" className="text-sm my-1">
              ABOUT US
            </Link>
            <Link href="/pages/contactus" className="text-sm my-1">
              CONTACT US
            </Link>
            <Link href="#" className="text-sm my-1">
              ANGEL CLUB
            </Link>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-l my-4">TERMS OF USE</h3>
            <Link href="/pages/terms-conditions/" className="text-sm my-1">
              TERMS & CONDITIONS
            </Link>
            <Link href="/pages/privacy-policy" className="text-sm my-1">
              PRIVACY POLICY
            </Link>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-l my-4">NEWSLETTER SIGN UP</h3>
            <p className="text-sm my-1">
              Sign up for exclusive updates, new arrivals & insider only
              discounts
            </p>
            <EmailSubmission />
          </div>
        </div>
        <div className="text-center p-5 text-sm divide-y">
          <p>&copy; 2025 WITHME</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
