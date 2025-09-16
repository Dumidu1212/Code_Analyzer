import React from "react";
import facebookicon from "../assets/facebookicon.webp";
import youtubeicon from "../assets/youtubeicon.webp";
import instaicon from "../assets/instaicon.webp";
import linkedinicon from "../assets/linkdinicon.webp";

const Footer = () => {
  return (
    <footer className="bg-blue-900 dark:bg-gray-900 mt-10">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {/* Navigation Links */}
          <div>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="/home" className="hover:underline text-white">
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

          {/* More Links */}
          <div>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="/feedback" className="hover:underline text-white">
                  Feedback
                </a>
              </li>
              <li className="mb-4">
                <a href="/aboutUs" className="hover:underline text-white">
                  About Us
                </a>
              </li>
              <li className="mb-4">
                <a href="contactUs" className="hover:underline text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
              Contact Information
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-normal">
              <li className="mb-4">
                <div className="flex mt-6 justify-start items-center">
                  <a href="mailto:IT22557292@my.sliit.lk" className="text-white">
                    IT22557292@my.sliit.lk
                  </a>
                </div>
                <div className="flex justify-start items-center text-white">
                  0770-380981
                </div>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-white font-semibold">Follow Us on:</h4>
            <div className="flex mt-6 justify-start items-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img
                  src={facebookicon}
                  alt="Facebook"
                  className="h-16 w-16 rounded-full"
                />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img
                  src={youtubeicon}
                  alt="YouTube"
                  className="h-16 w-16 rounded-full"
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img
                  src={instaicon}
                  alt="Instagram"
                  className="h-16 w-16 rounded-full"
                />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img
                  src={linkedinicon}
                  alt="LinkedIn"
                  className="h-16 w-16 rounded-full"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
