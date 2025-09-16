// src/pages/ContactUs.jsx

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactUs = () => (
  <>
    <Header />
    <Navbar />
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <p className="mt-4">
        For any inquiries, please contact us at <a href="mailto:example@example.com">example@example.com</a> or call us at 123-456-7890.
      </p>
    </div>
    <Footer />
  </>
);

export default ContactUs;
