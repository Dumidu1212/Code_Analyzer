// src/pages/AboutUs.jsx

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => (
  <>
    <Header />
    <Navbar />
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">About Us</h1>
      <p className="mt-4">
        Welcome to our application. We aim to provide the best code analysis tools for developers to improve code quality and security.
      </p>
    </div>
    <Footer />
  </>
);

export default AboutUs;
