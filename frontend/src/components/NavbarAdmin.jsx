import { Link } from 'react-router-dom';

const NavbarAdmin = () => (
  <nav className="bg-blue-900">
    <div className="mx-5 max-w-screen-xl flex flex-wrap items-center gap-30 justify-start p-4">
      <div className="hidden w-full md:block md:w-auto">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-blue-900 md:flex-row md:space-x-8 md:mt-0 md:border-0">
          <li>
            <Link to="/admindashboard" className="block py-2 px-3 text-white hover:underline">
              Users
            </Link>
          </li>
          <li>
            <Link to="/registerdetails" className="block py-2 px-3 text-white hover:underline">
              Result
            </Link>
          </li>
          <li>
            <Link to="/feedback-admin" className="block py-2 px-3 text-white hover:underline">
              Feedback
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavbarAdmin;
