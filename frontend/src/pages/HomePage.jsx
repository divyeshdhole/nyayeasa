import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-judicial-bg-primary">
      {/* Hero Section */}
      <div className="relative bg-judicial-primary">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-judicial-secondary to-judicial-primary opacity-80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
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
              <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-shadow-sm">NyayEase</h1>
              <p className="mt-6 max-w-3xl text-xl text-white font-medium text-shadow-sm">
                A digital e-portal for case management and online legal hearings in India.
                Streamline legal processes, connect with advocates, and attend hearings online.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/register" className="inline-block bg-white py-3 px-6 border-2 border-judicial-accent text-base font-bold text-judicial-primary hover:bg-judicial-bg-accent">
                  Get Started
                </Link>
                <Link to="/about" className="inline-block bg-judicial-bg-accent py-3 px-6 border-2 border-judicial-primary text-base font-bold text-judicial-primary hover:bg-white">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-judicial-bg-primary overflow-hidden lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-serif font-semibold text-judicial-primary tracking-wide uppercase">Features</h2>
            <p className="mt-1 text-4xl font-serif font-bold text-judicial-text-primary sm:text-5xl sm:tracking-tight">
              Everything you need in one place
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-judicial-text-secondary">
              NyayEase brings together litigants, advocates, and court officials on a single platform.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="p-6 bg-white border border-judicial-border shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-judicial-primary text-white border border-judicial-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-serif font-medium text-judicial-primary">Case Management</h3>
                <p className="mt-2 text-base text-judicial-text-secondary">
                  File cases, track progress, and manage all your legal matters in one place.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="p-6 bg-white border border-judicial-border shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-judicial-primary text-white border border-judicial-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-serif font-medium text-judicial-primary">Connect with Advocates</h3>
                <p className="mt-2 text-base text-judicial-text-secondary">
                  Find and connect with qualified legal professionals specializing in your case type.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="p-6 bg-white border border-judicial-border shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-judicial-primary text-white border border-judicial-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-serif font-medium text-judicial-primary">Virtual Hearings</h3>
                <p className="mt-2 text-base text-judicial-text-secondary">
                  Attend court hearings online from anywhere. Save time and travel expenses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-judicial-secondary border-t-4 border-judicial-accent">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-white sm:text-4xl text-shadow-sm">
            <span className="block">Ready to get started?</span>
            <span className="block text-judicial-bg-accent">Create your account today.</span>
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex">
              <Link to="/register" className="inline-flex items-center justify-center px-5 py-3 border-2 border-judicial-accent text-base font-bold text-judicial-secondary bg-white hover:bg-judicial-bg-accent">
                Register Now
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3 inline-flex">
              <Link to="/login" className="inline-flex items-center justify-center px-5 py-3 border-2 border-judicial-bg-accent text-base font-bold text-judicial-bg-accent bg-transparent hover:bg-judicial-primary hover:text-white">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;