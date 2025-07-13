import Link from "next/link";
import React from "react";

const MainNavBar = () => {
  return (
    <div className="flex flex-row bg-black text-white font-semibold justify-center p-3 text-l">
      <Link href="/" className="px-4">
        HOME
      </Link>
      <Link href="/collections/new-arrivals" className="px-4">
        NEW ARRIVALS
      </Link>
      <Link href="/collections" className="px-4">
        COLLECTIONS
      </Link>
      <Link href="/collections/workwear" className="px-4">
        WORKWEAR
      </Link>
      <Link href="/collections/denim" className="px-4">
        DENIM
      </Link>
      <Link href="/collections/scylla-zelus" className="px-4">
        SCYLLA ZELUS
      </Link>
      <Link href="/collections/men" className="px-4">
        SHOP MEN
      </Link>
      <Link href="/collections/50-80" className="px-4">
        50% -70% OFF
      </Link>
      <Link href="/pages/angel-club" className="px-4">
        ANGEL CLUB
      </Link>
    </div>
  );
};

export default MainNavBar;
