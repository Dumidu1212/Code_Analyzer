import React ,{useEffect,useState} from 'react'
import NavbarAdmin from '../components/NavbarAdmin';
import Header from '../components/Header';
import {useNavigate} from "react-router-dom"
import jsPDF from "jspdf";
import "jspdf-autotable";
import Footer from '../components/Footer';

const AdminDashBoard = () => {

    const [users, setUsers] = useState([]);
  const [q,setQ] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setUsers(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("User Report", 10, 10);

    const tableData = users.map((user) => [
      user.userName,
      user.email,
      user.role,
    ]);
    doc.autoTable({
      startY: 20,
      head: [["Username", "Email", "Role"]],
      body: tableData,
    });

    // Calculate total number of admins and users
    let adminCount = 0;
    let userCount = 0;

    users.forEach((user) => {
      if (user.role === "admin") {
        adminCount++;
      } else {
        userCount++;
      }
    });

    // Get height of the table
    const tableHeight = doc.previousAutoTable.finalY;
    doc.setFontSize(8);
    // Add total admins and users after the table
    doc.text(`Total Admins: ${adminCount}`, 10, tableHeight + 20);
    doc.text(`Total Users: ${userCount}`, 10, tableHeight + 30);

    doc.save("user_report.pdf");
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/auth/searchuser?q=${q}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setUsers(jsonData);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
    <Header />
    <NavbarAdmin />`
    <div className=" flex flex-col relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className=" mx-20">
        
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter user name..."
              required
              onChange={(e)=>setQ(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
     
      </div>

      <table className="mx-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Our Users
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              User name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Remove</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id} // Assuming _id is the unique identifier for each user
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.userName}
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">{user.status}</td>
              <td className="px-6 py-4 text-right">
                <a
                  href={`/deleteuser/${user._id}`}
                  className="font-medium text-red-700 dark:text-red-700 hover:underline"
                >
                  Remove
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10 mx-5">
        <p>Total Users : {users.length}</p>
        <p>
          Total Admins: {users.filter((user) => user.role === "admin").length}
        </p>
        <p>
          Total Users: {users.filter((user) => user.role === "user").length}
        </p>
      </div>

      <div className="flex items-center justify-center">
        <p className="mx-7"> Download the users report </p>
        <button
          onClick={generatePDF}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Download as PDF
          </span>
        </button>{" "}
      </div>
    </div>
<Footer/>
  </>
  )
}

export default AdminDashBoard