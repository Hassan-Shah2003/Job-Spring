import React from 'react';
import images from "../../../assets/images/images.png";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div>
            <div className="flex flex-col items-start space-y-5 mb-5">
              <div className="w-48 h-32 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={images}
                  alt="CareerConnect Logo"
                  className="object-contain w-full h-full rounded-xl transition-transform duration-300 hover:scale-105"
                />
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                Empowering professionals by bridging the gap between talent and opportunity worldwide.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 text-xl mt-3">
              {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-[#00df81] transition-colors duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-[#00df81] transition duration-300">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-[#00df81] transition duration-300">Find Jobs</Link></li>
              <li><Link to="/about" className="hover:text-[#00df81] transition duration-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#00df81] transition duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={`/blogs?category=Career%20Advice`} className="hover:text-[#00df81] transition duration-300">Career Advice</Link></li>
              <li><Link to={`/blogs?category=Job%20Tips`} className="hover:text-[#00df81] transition duration-300">Resume Tips</Link></li>
              <li><Link to={`/blogs?category=Resume%20Guide`} className="hover:text-[#00df81] transition duration-300">Interview Guide</Link></li>
              <li><Link to="/blogs" className="hover:text-[#00df81] transition duration-300">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><span className="text-white">Email:</span> contact@careerspring.com</li>
              <li><span className="text-white">Phone:</span> +92 21 3894 7765</li>
              <li><span className="text-white">Address:</span> TechnoHub Building, Shahrah-e-Faisal, Karachi, Pakistann</li>
              <li><span className="text-white">RC No:</span> 0923456789</li>
            </ul>
          </div>

        </div>

        {/* Divider + Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-white font-semibold">CareerSpring</span>. 
            All rights reserved. | 
            <Link to="/privacy-policy" className="hover:text-[#00df81] transition duration-300 mx-1">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-[#00df81] transition duration-300 mx-1">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
