import React from "react";
import { useLocation } from "react-router-dom";
import PieChart from "../components/PieChart"; // Import your new PieChart component
import BarChart from "../components/BarChart"; // Import your BarChart component
import Header from "../components/Header";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";



const AnalysisDetailPage = () => {
  const location = useLocation();
  const { analysisResult } = location.state || { analysisResult: null };
  const navigate = useNavigate(); 

  // Initialize pieChartData
  let pieChartData = { labels: [], values: [] };
  let barChartData = { labels: [], values: [] };

  // Check if analysisResult and metrics are valid
  if (analysisResult && analysisResult.metrics && typeof analysisResult.metrics === 'object') {
    pieChartData = {
      labels: Object.keys(analysisResult.metrics).map(key => key.replace(/([A-Z])/g, ' $1')),
      values: Object.values(analysisResult.metrics).map(value => value !== undefined && value !== null ? value : 0),
    };

    // Set bar chart data similarly
    barChartData = {
      labels: pieChartData.labels,
      values: pieChartData.values,
    };
  }

  // Function to download the analysis result as a PDF
  const downloadPDF = async () => {
    const pdf = new jsPDF();
    
    // Capture the content of the component as a canvas
    const element = document.getElementById("analysisContent");
    const canvas = await html2canvas(element, { scale: 2 }); // Increase scale for better resolution
    const imgData = canvas.toDataURL("image/png");

    // Add image to PDF
    const imgWidth = 190; // PDF width in mm
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft; // Adjust position for remaining pages
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save("analysis_report.pdf");
  };

  const goBack =()=>{
        navigate("/home")
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex justify-end mt-5">


<button 
  onClick={goBack} 
  className="bg-yellow-300 text-white px-4 py-2 rounded hover:bg-yellow-600 mx-5"
>
  Back
</button>
</div>


      <div className="max-w-7xl mx-auto p-5 flex flex-col md:flex-row justify-between" id="analysisContent">
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-xl font-semibold">Metrics (Pie Chart)</h2>
          {pieChartData.labels.length > 0 && pieChartData.values.length > 0 ? (
            <div className="w-64 h-64 mx-auto">
              <PieChart data={pieChartData} />
            </div>
          ) : (
            <p>No valid metrics available for the pie chart.</p>
          )}
        </div>

        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-xl font-semibold">Metrics (Bar Chart)</h2>
          {barChartData.labels.length > 0 && barChartData.values.length > 0 ? (
            <div className="w-full h-64 mx-auto">
              <BarChart data={barChartData} />
            </div>
          ) : (
            <p>No valid metrics available for the bar chart.</p>
          )}
        </div>
      </div>

      {/* Table to display analysis results */}
      <div className="mx-10 overflow-x-auto">
        <h2 className="text-xl font-semibold mt-5">Analysis Results</h2>
        <table className="min-w-full border-collapse border border-gray-300 mt-2" id="metricsTable">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Metric</th>
              <th className="border border-gray-300 px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {pieChartData.labels.map((label, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{label}</td>
                <td className="border border-gray-300 px-4 py-2">{barChartData.values[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download PDF Button */}
      <div className="flex justify-center mt-5">

        <p>Do you want to download analysis result </p>
        <button 
          onClick={downloadPDF} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-5"
        >
          Download as PDF
        </button>
      </div>

      <Footer />
    </>
  );
};

export default AnalysisDetailPage;
