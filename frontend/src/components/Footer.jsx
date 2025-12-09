import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="judicial-footer text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src="/assets/ashoka-chakra.png" alt="" className="h-10 mr-3" onError={(e) => e.target.style.display = 'none'} />
              <span className="text-2xl font-semibold whitespace-nowrap uppercase tracking-wider">NyayEase</span>
            </Link>
            <p className="mt-2 text-sm text-gray-300">
              Digital e-portal for case management and online legal hearings in India
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-white border-b border-judicial-accent pb-2">Resources</h2>
              <ul className="text-gray-300">
                <li className="mb-2">
                  <Link to="/about" className="hover:text-judicial-accent">About Us</Link>
                </li>
                <li className="mb-2">
                  <Link to="/contact" className="hover:text-judicial-accent">Contact</Link>
                </li>
                <li className="mb-2">
                  <Link to="/faqs" className="hover:text-judicial-accent">FAQs</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-white border-b border-judicial-accent pb-2">Legal</h2>
              <ul className="text-gray-300">
                <li className="mb-2">
                  <Link to="/privacy-policy" className="hover:text-judicial-accent">Privacy Policy</Link>
                </li>
                <li className="mb-2">
                  <Link to="/terms-conditions" className="hover:text-judicial-accent">Terms &amp; Conditions</Link>
                </li>
                <li className="mb-2">
                  <Link to="/disclaimer" className="hover:text-judicial-accent">Disclaimer</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-white border-b border-judicial-accent pb-2">User Portal</h2>
              <ul className="text-gray-300">
                <li className="mb-2">
                  <Link to="/login" className="hover:underline">Login</Link>
                </li>
                <li className="mb-2">
                  <Link to="/register" className="hover:underline">Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <hr className="my-6 border-judicial-accent opacity-30 sm:mx-auto lg:my-8" />
        
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-300 sm:text-center">
            &copy; {currentYear} <Link to="/" className="hover:text-judicial-accent">NyayEase</Link>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            {/* Government emblem */}
            <div className="flex items-center">
              <span className="text-sm text-gray-300 mr-2">Government of India</span>
              <img src="/assets/emblem.png" alt="Government Emblem" className="h-8" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 