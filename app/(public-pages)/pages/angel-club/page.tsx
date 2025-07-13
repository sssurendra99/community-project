'use client'

import image from "next/image";
import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

const AngelClubPage = () => {
  return (
    <div className="bg-white">
      <div className="relative w-full h-auto">
        <img
          src="/home_banners/angel-club.jpeg" // Make sure the image exists in public folder
          alt="Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-start justify-center w-[100%] p-20">
          <div className="flex-col">
            <h1 className="justify-center text-white text-4xl font-bold">
              ANGEL CLUB
            </h1>
            <span className="text-white text-bold mt-2">
              Discover the perfect blend of style,
              <br /> comfort, and elegance. Explore our latest collections and{" "}
              <br /> redefine your wardrobe with timeless fashion designed just
              for you.
            </span>
            <div className="flex flex-row gap-3 mt-4">
              <div>
                <button className="bg-gray-800 text-white py-4 w-[8rem] rounded-3xl font-bold hover:bg-black">
                  Join Now
                </button>
              </div>
              <div>
                <button className="bg-white text-black py-4 w-[8rem] rounded-3xl font-bold hover:shadow-2xl">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-gray-100">
        <div className="mt-[6rem]">
          <div>
            <h1 className="text-4xl font-bold text-center">How it Woks</h1>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-20 px-6">
            <div className="flex flex-col p-4">
              <h1 className="flex items-center justify-center font-bold text-[5rem] text-gray-800">
                01
              </h1>
              <span className="flex items-center justify-center mt-2 font-semibold text-2xl text-gray-500">
                Create an Account
              </span>
              <span className="flex items-center justify-center mt-1 text-lg text-center text-gray-500">
                Become a Member to receive rewards
              </span>
            </div>

            <div className="flex flex-col p-4">
              <h1 className="flex items-center justify-center font-bold text-[5rem] text-gray-800">
                02
              </h1>
              <span className="flex items-center justify-center mt-2 font-semibold text-2xl text-gray-500">
                Earn Points
              </span>
              <span className="flex items-center justify-center mt-1 text-lg text-center text-gray-500">
                Complete these Activities to Collect Points
              </span>
            </div>

            <div className="flex flex-col p-4">
              <h1 className="flex items-center justify-center font-bold text-[5rem] text-gray-800">
                03
              </h1>
              <span className="flex items-center justify-center mt-2 font-semibold text-2xl text-gray-500">
                Redeem Points
              </span>
              <span className="flex items-center justify-center mt-1 text-lg text-center text-gray-500">
                Exchange points for exciting discounts
              </span>
            </div>
          </div>
        </div>
        <div className="mt-[8rem]">
          <div>
            <h1 className="text-4xl font-bold text-center">
              Ways to earn Points
            </h1>
          </div>
          <div className="flex justify-start mt-10">
            <div className="grid grid-cols-3 gap-6 px-6 ml-[8%]">
              <div className="flex flex-col items-center bg-white py-8 px-8 rounded-2xl w-[15rem] h-[15rem]">
                <h1>
                  <AccountCircleOutlinedIcon
                    style={{ fontSize: "60px", color: "#B053A5" }}
                  />
                </h1>
                <span className="items-center justify-center mt-2 font-semibold text-lg text-gray-900">
                  Create an Account
                </span>
                <span className="items-center justify-center mt-1 text-lg text-gray-500">
                  1,000 Angel Points
                </span>
              </div>
              <div className="flex flex-col items-center bg-white py-8 px-8 rounded-2xl w-[15rem] h-[15rem]">
                <h1>
                  <CheckCircleOutlineOutlinedIcon
                    style={{ fontSize: "60px", color: "#B053A5" }}
                  />
                </h1>
                <span className="items-center justify-center mt-2 font-semibold text-lg text-gray-900">
                  Complete an Order
                </span>
                <span className="items-center justify-center mt-1 text-lg text-gray-500 text-center">
                  Earn 10% Angel Points from purchase!
                </span>
              </div>
              <div className="flex flex-col items-center bg-white py-8 px-8 rounded-2xl w-[15rem] h-[15rem]">
                <h1>
                  <FeedbackOutlinedIcon
                    style={{ fontSize: "60px", color: "#B053A5" }}
                  />
                </h1>
                <span className="items-center justify-center mt-2 font-semibold text-lg text-gray-900">
                  Leave a Review
                </span>
                <span className="items-center justify-center mt-1 text-lg text-gray-500">
                  10 Angel Points
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[8rem]">
          <div>
            <h1 className="text-4xl font-bold text-center">
              Ways to redeem Points
            </h1>
          </div>
          <div className="flex justify-start mt-10">
            <div className="grid grid-cols-8 gap-6 px-6 ml-[8%]">
              <div className="flex flex-col items-center bg-white py-8 px-8 rounded-2xl w-[15rem] h-[15rem]">
                <h1>
                  <LocalShippingOutlinedIcon
                    style={{ fontSize: "60px", color: "#B053A5" }}
                  />
                </h1>
                <span className="items-center justify-center mt-2 font-semibold text-lg text-gray-900 text-center">
                  Free shipping coupon
                </span>
                <span className="items-center justify-center mt-1 text-lg text-gray-500">
                  400 Angel Points
                </span>
              </div>
              <div className="flex flex-col items-center bg-white py-8 px-8 rounded-2xl w-[15rem] h-[15rem]">
                <h1>
                  <PaidOutlinedIcon
                    style={{ fontSize: "60px", color: "#B053A5" }}
                  />
                </h1>
                <span className="items-center justify-center mt-2 font-semibold text-lg text-gray-900">
                  LKR 500 OFF
                </span>
                <span className="items-center justify-center mt-1 text-lg text-gray-500 text-center">
                  500 Angel Points!
                </span>
              </div>
              <div className="flex flex-col items-center bg-white py-8 px-8 rounded-2xl w-[15rem] h-[15rem]">
                <h1>
                  <PaidOutlinedIcon
                    style={{ fontSize: "60px", color: "#B053A5" }}
                  />
                </h1>
                <span className="items-center justify-center mt-2 font-semibold text-lg text-gray-900">
                  LKR 1000 OFF
                </span>
                <span className="items-center justify-center mt-1 text-lg text-gray-500">
                  1,000 Angel Points
                </span>
              </div>
              <div className="flex flex-col items-center bg-white py-8 px-8 rounded-2xl w-[15rem] h-[15rem]">
                <h1>
                  <PaidOutlinedIcon
                    style={{ fontSize: "60px", color: "#B053A5" }}
                  />
                </h1>
                <span className="items-center justify-center mt-2 font-semibold text-lg text-gray-900">
                  LKR 2000 OFF
                </span>
                <span className="items-center justify-center mt-1 text-lg text-gray-500 text-center">
                  2,000 Angel Points = Rs.2,000.00
                </span>
              </div>
            </div>
          </div>
          <div className="mt-[2rem] mb-[5rem]">
            <div className="flex justify-start mt-10">
              <div className="grid grid-cols-4 gap-6 px-6 ml-[8%]">
                <div className="flex flex-col items-center bg-white py-8 px-8 rounded-2xl w-[15rem] h-[15rem]">
                  <h1>
                    <PaidOutlinedIcon
                      style={{ fontSize: "60px", color: "#B053A5" }}
                    />
                  </h1>
                  <span className="items-center justify-center mt-2 font-semibold text-lg text-gray-900 text-center">
                    LKR 3000 OFF
                  </span>
                  <span className="items-center justify-center mt-1 text-lg text-gray-500">
                    3,000 Angel Points
                  </span>
                </div>
                  <div className="flex flex-col items-center bg-white py-8 px-8 rounded-2xl w-[15rem] h-[15rem]">
                  <h1>
                    <PaidOutlinedIcon
                      style={{ fontSize: "60px", color: "#B053A5" }}
                    />
                  </h1>
                  <span className="items-center justify-center mt-2 font-semibold text-lg text-gray-900 text-center">
                    LKR 4000 OFF
                  </span>
                  <span className="items-center justify-center mt-1 text-lg text-gray-500">
                    4,000 Angel Points
                  </span>
                </div>
                  <div className="flex flex-col items-center bg-white py-8 px-8 rounded-2xl w-[15rem] h-[15rem]">
                  <h1>
                    <PaidOutlinedIcon
                      style={{ fontSize: "60px", color: "#B053A5" }}
                    />
                  </h1>
                  <span className="items-center justify-center mt-2 font-semibold text-lg text-gray-900 text-center">
                    LKR 5000 OFF
                  </span>
                  <span className="items-center justify-center mt-1 text-lg text-gray-500">
                    5,000 Angel Points
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/><br/>
    </div>
  );
};

export default AngelClubPage;
