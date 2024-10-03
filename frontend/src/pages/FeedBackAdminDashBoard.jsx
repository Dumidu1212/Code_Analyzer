import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import { jsPDF } from "jspdf";

const FeedBackAdminDashBoard = () => {
  const [feedBacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState({});
  const [selectedFeedbacks, setSelectedFeedbacks] = useState([]); // New state for selected feedbacks

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:5000/API/feedbacks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setFeedbacks(jsonData);

        const userIds = [
          ...new Set(
            jsonData
              .map((fb) => (fb.userId ? fb.userId : null))
              .filter((id) => id !== null)
          ),
        ];

        const validUserIds = userIds.filter(
          (id) => typeof id === "string" || typeof id === "number"
        );

        const userResponses = await Promise.all(
          validUserIds.map(async (id) => {
            try {
              const response = await fetch(
                `http://localhost:5000/auth/getuserbyid/${id}`
              );
              if (!response.ok) {
                throw new Error(`Error fetching user with ID: ${id}`);
              }
              return response.json();
            } catch (error) {
              return null;
            }
          })
        );

        const userJsonData = userResponses.filter((res) => res !== null);
        const userMap = userJsonData.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {});

        setUsers(userMap);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (feedbackId) => {
    setSelectedFeedbacks((prevSelected) =>
      prevSelected.includes(feedbackId)
        ? prevSelected.filter((id) => id !== feedbackId)
        : [...prevSelected, feedbackId]
    );
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Selected Feedback Report", 14, 22);
    doc.setFontSize(12);
    let y = 30;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    const maxLineWidth = pageWidth - margin * 2;

    selectedFeedbacks.forEach((feedbackId, index) => {
      const feedBack = feedBacks.find((fb) => fb._id === feedbackId); // Use _id for unique ID
      if (!feedBack) return; // Guard against null feedback
      const user = users[feedBack.userId];

      const title = `Feedback ${index + 1}: ${feedBack.title || "No Title"}`;
      const wrappedTitle = doc.splitTextToSize(title, maxLineWidth);

      const message = `Message: ${feedBack.description || "No Description"}`;
      const wrappedMessage = doc.splitTextToSize(message, maxLineWidth);

      const uploadedBy = `Uploaded By: ${user?.userName || "Unknown User"}`;
      const wrappedUploader = doc.splitTextToSize(uploadedBy, maxLineWidth);

      const sectionHeight =
        wrappedTitle.length * 6 +
        wrappedMessage.length * 6 +
        wrappedUploader.length * 6 +
        4;

      if (index % 2 === 0) {
        doc.setFillColor(173, 216, 230);
      } else {
        doc.setFillColor(255, 218, 185);
      }

      doc.rect(margin, y - 4, pageWidth - margin * 2, sectionHeight, "F");

      doc.text(wrappedTitle, margin, y);
      y += wrappedTitle.length * 6;

      doc.text(wrappedMessage, margin, y);
      y += wrappedMessage.length * 6;

      doc.text(wrappedUploader, margin, y);
      y += wrappedUploader.length * 6 + 4;

      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("Selected_Feedback_Report.pdf");
  };

  return (
    <>
      <Header />
      <NavbarAdmin />
      <div className="mt-10">
        <div className="flex items-center justify-center">
          <h2 className="text-3xl font-bold">All Feedbacks</h2>
        </div>
        {feedBacks.map((feedBack) =>
          users[feedBack.userId] ? (
            <div
              key={feedBack._id} // Ensure key is unique here using _id
              className="mx-20 my-10 max-w-7xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="p-5 flex flex-row">
                {/* Add Checkbox */}
                <input
                  type="checkbox"
                  className="mr-4 w-6 h-6"
                  checked={selectedFeedbacks.includes(feedBack._id)} // Each checkbox keeps track of the correct state
                  onChange={() => handleCheckboxChange(feedBack._id)} // Use _id for unique reference
                />

                {users[feedBack.userId]?.profileImg ? (
                  <div className="">
                    <img
                      src={users[feedBack.userId].profileImg}
                      alt="Profile"
                      className="h-11 w-11 rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    <span className="flex-grow text-center text-xl">
                      {users[feedBack.userId]?.userName &&
                        users[feedBack.userId]?.userName
                          .substring(0, 1)
                          .toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="flex-1 mx-5">
                  <h5 className="mb-3 text-xl tracking-tight text-gray-900 dark:text-white">
                    <span className="font-bold"> Feedback For : </span>{" "}
                    {feedBack.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <span className="font-bold"> Message :</span>{" "}
                    {feedBack.description}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 italic">
                    <span className="font-bold  italic"> Feedback Uploaded By:</span>{" "}
                    {users[feedBack.userId]?.userName}
                  </p>
                  <p className="font-normal text-gray-400 text-sm dark:text-gray-400 italic text-right ml-auto">
  {new Date(feedBack.createdAt).toISOString().split('T')[0]}{" "}
  {new Date(feedBack.createdAt).toLocaleTimeString()}
</p>

                </div>
              </div>
            </div>
          ) : null
        )}

        <div className="flex justify-end mx-10">
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={generatePDF}
            disabled={selectedFeedbacks.length === 0} // Disable button if no feedback is selected
          >
            Download PDF
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedBackAdminDashBoard;
