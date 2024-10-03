import React from "react";
import facebookicon from "../assets/facebookicon.webp";
import youtubeicon from "../assets/youtubeicon.webp";
import instaicon from "../assets/instaicon.webp";
import linkdin from "../assets/linkdinicon.webp";
import callimg from "../assets/call.png"
import mailimg from "../assets/mail.png"

const Footer = () => {
  return (
    <footer className="bg-blue-900 dark:bg-gray-900 mt-10">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="/home" className=" hover:underline text-white">
                  Home
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-white">
                  Result
                </a>
              </li>
             
              <li className="mb-4">
                <a href="/userProfile" className="hover:underline text-white">
                  Profile
                </a>
              </li>
           
            </ul>
          </div>
          <div>
          
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
             
              <li className="mb-4">
                <a href="/feedback" className="hover:underline text-white ">
                  Feed Back
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-white">
                  About Us
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
              Contact Information
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-normal">
              <li className="mb-4">
                <div className="flex mt-6 justify-start items-center ">
                 <a href="IT22557292@my.sliit.lk">IT22557292@my.sliit.lk</a> 
                  
                 
                </div>
                <div className="flex  justify-start items-center ">
                 0770-380981
                  
                 
                </div>
              </li>
              
            </ul>
          </div>
          <div>
            <div>
              <h4 className="text-white font-semibold">Follow Us on :</h4>
            </div>
            <div className="flex mt-6 justify-center items-center space-x-4">
              <div>
                <img
                  src={facebookicon}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
              </div>
              <div>
                <img
                  src={youtubeicon}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
              </div>
              <div>
                <img
                  src={instaicon}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
              </div>
              <div>
                <img
                  src={linkdin}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
