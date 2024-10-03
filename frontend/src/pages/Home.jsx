import React, { useState } from "react";
import notificationImg from "../assets/download.jpeg";
import Header from "../components/Header";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import HomePage from "./HomePage";
import javaIcon from "../assets/java.png"
import pythonIcon from "../assets/python.webp"
import cppIcon from "../assets/cpp.png"
import javaScriptIcon from "../assets/javaScript.png"

const Home = () => {


  const [showDemo, setShowDemo] = useState(false); // State to manage demo display

  // Function to handle the click event of the Request Demo button
  const handleRequestDemo = () => {
    setShowDemo(true);
  };
  const features = [
    {
      title: 'Real-time Code Analysis',
      description: 'Get instant feedback on your code as you write. Our tool analyzes code in real-time to catch issues early in the development process.',
      icon: '⚡', // Placeholder for the actual icon
    },
    {
      title: 'Customizable Rulesets',
      description: 'Define and customize your own coding standards and rules to align with your team’s development practices and preferences.',
      icon: '🔧', // Placeholder for the actual icon
    },
    {
      title: 'Comprehensive Reporting',
      description: 'Receive detailed reports on code quality, including metrics on maintainability, complexity, and security vulnerabilities to aid in decision-making.',
      icon: '📑', // Placeholder for the actual icon
    },
    {
      title: 'Multi-language Support',
      description: 'Support for a wide range of programming languages, including Java, C#, JavaScript, Python, and more, ensuring flexibility across projects.',
      icon: '🌐', // Placeholder for the actual icon
    },
    {
      title: 'Integration with CI/CD Pipelines',
      description: 'Seamlessly integrate with your continuous integration and deployment (CI/CD) workflows to automate code quality checks and enforce standards.',
      icon: '🔗', // Placeholder for the actual icon
    },
    {
      title: 'Collaborative Feedback',
      description: 'Allow team members to comment and review code changes, fostering collaboration and improving code quality through collective input.',
      icon: '🤝', // Placeholder for the actual icon
    },
    {
      title: 'Historical Insights',
      description: 'Track changes and improvements over time. Analyze historical data to see how code quality evolves with each iteration.',
      icon: '📊', // Placeholder for the actual icon
    },
    {
      title: 'User-friendly Interface',
      description: 'An intuitive dashboard that provides easy navigation and clear visualizations of code metrics, making it accessible to all team members.',
      icon: '🖥️', // Placeholder for the actual icon
    },
  ];
  

  return (
    <>
      <Header />
      <Navbar />

      <div className="flex items-center justify-center h-screen mt-5">
        <div className="w-full mx-20 my-5 max-w-8xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-row">
          <div className="p-5 flex-1">
            <a href="#">
              <h5 className="mt-10 mb-5 text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome !
              </h5>
            </a>
            <p className="mt-5 mb-3 font-medium text-sm  text-gray-700 dark:text-gray-400">
              The Automated Code Quality Analyzer is a powerful tool designed to
              help developers maintain high standards of code quality across
              their projects. By analyzing various aspects of your code,
              including complexity, readability, and adherence to best
              practices, this tool provides actionable insights that enable you
              to write cleaner, more efficient, and maintainable code. Whether
              you are working on a small project or managing a large codebase,
              the analyzer offers comprehensive metrics and detailed reports
              that highlight areas for improvement, helping you identify
              potential issues early in the development process.
            </p>
            <p className="mb-3 font-medium text-sm text-gray-700 dark:text-gray-400">
              Built to integrate seamlessly into your development workflow, the
              Automated Code Quality Analyzer supports multiple programming
              languages and provides a user-friendly interface for navigating
              through the analysis results. With features like code
              visualization, customizable metrics, and performance optimization,
              the tool is tailored to meet the needs of both individual
              developers and large development teams. By using this analyzer,
              you can ensure that your codebase remains robust, scalable, and
              aligned with industry standards, ultimately leading to a more
              successful and sustainable software product.
            </p>
            <div className="space-x-4 mt-10">
              <button
                type="button"
                onClick={handleRequestDemo}
                className="text-white bg-red-700 border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg px-6 py-3 text-center mb-2 dark:border-red-500 dark:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Request Demo
              </button>
              <button
                type="button"
                className="text-white bg-green-700 border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-6 py-3 text-center mb-2 dark:border-green-500 dark:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
              >
              Get Premium
              </button>
           
            </div>
          </div>
          <div className="flex-1">
            <a href="#">
              <img
                className="my-5  mx-5 rounded-r-lg w-full h-auto object-cover"
                src={notificationImg}
                alt="Reservation Notification"
              />
            </a>
          </div>
        </div>
      </div>
      {showDemo ? (
        <HomePage/>
      ) : (null)}




<div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>

    <div class="bg-white py-16 text-center">
  <h1 class="text-3xl font-bold text-purple-800">Your programming language. <br /> covered.</h1>
  <p class="mt-4 text-gray-600">Coverage for dozens of the most popular languages, frameworks, and IaC platforms</p>
  
  <div class="flex justify-center items-center mt-8 space-x-6">
    <img src={javaIcon} alt="Java" class="h-12 w-12" />

  

    <img src={pythonIcon} alt="C++" class="h-12 w-12" />
    <img src={cppIcon}alt="JavaScript" class="h-12 w-12" />
    <img src={javaScriptIcon} alt="TypeScript" class="h-12 w-12" />

  </div>
</div>
   


      <Footer />
    </>
  );
};

export default Home;
