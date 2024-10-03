import React from 'react'

const NavbarAdmin = () => {






  return (
    <>
    <div>
  <nav className="bg-blue-900 border-b-200 dark:bg-gray-900 mb-10">
    <div className="mx-5 max-w-screen-xl flex flex-wrap items-center gap-30 justify-start  p-4">
      <div
        className="hidden w-full md:block md:w-auto"
        id="navbar-default"
      >
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-blue-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-blue dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a
              href="/admindashboard"
              className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
              aria-current="page"
            >
              Users
            </a>
          </li>
          <li>
            <a
              href="/registerdetails"
              className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
              aria-current="page"
            >
              Result
            </a>
          </li>
          <li>
            <a
              href="/feedback-admin"
              className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
              aria-current="page"
            >
              Feedback
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>

    </>
  );
};

export default NavbarAdmin
