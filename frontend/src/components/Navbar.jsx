import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo or Branding */}
        {/* <div className="text-white text-2xl">Brand</div> */}

        {/* Hamburger menu for small screens */}
        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg md:hidden hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            ></path>
          </svg>
        </button>

        {/* Links */}
        <div className={`w-full md:block md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="font-medium flex flex-col p-4 md:flex-row md:space-x-8 md:p-0 bg-blue-900 md:bg-transparent">
            <li>
              <Link to="/home" className="block py-2 px-3 text-white hover:underline">
                Home
              </Link>
            </li>
            {/* <li>
              <Link to="/report" className="block py-2 px-3 text-white hover:underline">
                Report
              </Link>
            </li> */}
            <li>
              <Link to="/feedback" className="block py-2 px-3 text-white hover:underline">
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/aboutUs" className="block py-2 px-3 text-white hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contactUs" className="block py-2 px-3 text-white hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/userProfile" className="block py-2 px-3 text-white hover:underline">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
