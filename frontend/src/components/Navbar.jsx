import React from 'react'

const Navbar = () => {
  return (
   <>
    <div>
        <nav className="bg-blue-900 border-b-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center gap-10 justify-end mx-auto p-4">
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-blue-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-blue  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="/home"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                    Result
                  </a>
                </li>

                <li>
                  <a
                    href="/userProfile"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                    Profile
                  </a>
                </li>
               
                <li>
                  <a
                    href="/feedback"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                    Feedback
                  </a>
                </li>
                <li>
                  <a
                    href="/aboutUs"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                    About Us 
                  </a>
                </li>
                <li>
                  <a
                    href="/contactUs"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                    Contact Us 
                  </a>
                </li>
               
              </ul>
            </div>
          </div>
        </nav>
      </div>
   
   
   </>
  )
}

export default Navbar