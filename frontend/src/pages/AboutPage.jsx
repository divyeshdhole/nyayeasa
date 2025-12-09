import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="bg-judicial-bg-primary min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-judicial-primary py-12 border-b-4 border-judicial-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <img 
                  src="/assets/emblem.png" 
                  alt="Indian Emblem" 
                  className="h-24 md:h-32 mx-auto md:mx-0" 
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-serif font-bold text-white">About NyayEase</h1>
                <p className="mt-2 text-xl text-gray-200">
                  Streamlining the judicial process for all stakeholders
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mission Section */}
        <section className="py-12 bg-white border-b border-judicial-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-serif font-bold text-judicial-primary">Our Mission</h2>
              <div className="w-24 h-1 bg-judicial-accent mx-auto my-4"></div>
              <p className="mt-4 text-lg text-judicial-text-secondary max-w-3xl mx-auto">
                NyayEase is dedicated to making the judicial system more accessible, efficient, and transparent 
                for all citizens of India. We aim to bridge the gap between the public and the judicial system 
                through technology and innovation.
              </p>
            </div>
          </div>
        </section>
        
        {/* About Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-serif font-bold text-judicial-primary mb-6">What is NyayEase?</h2>
                <p className="text-judicial-text-secondary mb-4">
                  NyayEase is a comprehensive digital platform designed to streamline the judicial process in India. 
                  Our platform connects litigants, advocates, and court officials, providing tools for case management, 
                  document handling, and virtual hearings.
                </p>
                <p className="text-judicial-text-secondary mb-4">
                  With the increasing backlog of cases in Indian courts, NyayEase aims to reduce administrative 
                  burden, minimize delays, and improve access to justice for all citizens.
                </p>
                <p className="text-judicial-text-secondary">
                  Our platform is designed with the guidance of legal experts and technology professionals to ensure 
                  it meets the specific needs of the Indian judicial system.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-serif font-bold text-judicial-primary mb-6">Key Features</h2>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 bg-judicial-primary text-white border border-judicial-accent">
                        <span>1</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-serif font-medium text-judicial-primary">Case Management</h3>
                      <p className="mt-1 text-judicial-text-secondary">
                        File, track, and manage cases online with real-time updates and notifications.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 bg-judicial-primary text-white border border-judicial-accent">
                        <span>2</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-serif font-medium text-judicial-primary">Advocate Connect</h3>
                      <p className="mt-1 text-judicial-text-secondary">
                        Find and connect with qualified advocates based on specialization and experience.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 bg-judicial-primary text-white border border-judicial-accent">
                        <span>3</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-serif font-medium text-judicial-primary">Virtual Hearings</h3>
                      <p className="mt-1 text-judicial-text-secondary">
                        Attend court hearings online from anywhere, saving time and resources.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 bg-judicial-primary text-white border border-judicial-accent">
                        <span>4</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-serif font-medium text-judicial-primary">Document Management</h3>
                      <p className="mt-1 text-judicial-text-secondary">
                        Securely upload, store, and share legal documents with relevant parties.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 bg-judicial-secondary border-t-4 border-judicial-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Ready to Experience NyayEase?</h2>
            <p className="text-gray-200 mb-8 max-w-3xl mx-auto">
              Join thousands of users who are already benefiting from our digital judicial platform.
              Register today to start your digital legal journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="inline-block bg-white py-3 px-6 border border-transparent text-base font-medium text-judicial-secondary hover:bg-judicial-bg-accent">
                Register Now
              </Link>
              <Link to="/login" className="inline-block bg-transparent py-3 px-6 border border-white text-base font-medium text-white hover:bg-judicial-primary">
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
