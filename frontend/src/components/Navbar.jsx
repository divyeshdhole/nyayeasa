import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, loading } = useAuth();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar-judicial shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <img 
                src="/logo.jpg" 
                alt="NyayEase Logo" 
                className="h-8 w-8 rounded-full object-cover border-2 border-judicial-accent"
              />
              <span className="text-white text-xl font-bold uppercase tracking-wider">NyayEase</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`text-white px-3 py-2 text-sm font-medium uppercase tracking-wide ${
                location.pathname === '/' ? 'border-b-2 border-judicial-accent' : 'hover:text-judicial-accent'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/about" 
              className={`text-white px-3 py-2 text-sm font-medium uppercase tracking-wide ${
                location.pathname === '/about' ? 'border-b-2 border-judicial-accent' : 'hover:text-judicial-accent'
              }`}
            >
              About
            </Link>
            
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className={`text-white px-3 py-2 text-sm font-medium uppercase tracking-wide ${
                    location.pathname === '/login' ? 'border-b-2 border-judicial-accent' : 'hover:text-judicial-accent'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`text-white px-3 py-2 text-sm font-medium uppercase tracking-wide ${
                    location.pathname === '/register' ? 'border-b-2 border-judicial-accent' : 'hover:text-judicial-accent'
                  }`}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-white px-3 py-2 text-sm font-medium uppercase tracking-wide ${
                    location.pathname.startsWith('/dashboard') ? 'border-b-2 border-judicial-accent' : 'hover:text-judicial-accent'
                  }`}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-white px-3 py-2 text-sm font-medium uppercase tracking-wide hover:text-judicial-accent"
                >
                  {loading ? 'Logging out...' : 'Logout'}
                </button>
                {user && (
                  <span className="text-white px-3 py-2 text-sm font-medium">
                    {user.firstName || user.email}
                  </span>
                )}
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-white hover:text-judicial-accent focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-judicial-primary border-t border-judicial-accent">
          <Link 
            to="/" 
            className={`block text-white px-3 py-2 text-base font-medium uppercase tracking-wide ${
              location.pathname === '/' ? 'text-judicial-accent' : 'hover:text-judicial-accent'
            }`}
            onClick={toggleMenu}
          >
            Home
          </Link>
          
          <Link 
            to="/about" 
            className={`block text-white px-3 py-2 text-base font-medium uppercase tracking-wide ${
              location.pathname === '/about' ? 'text-judicial-accent' : 'hover:text-judicial-accent'
            }`}
            onClick={toggleMenu}
          >
            About
          </Link>
          
          {!isAuthenticated ? (
            <>
              <Link 
                to="/login" 
                className={`block text-white px-3 py-2 text-base font-medium uppercase tracking-wide ${
                  location.pathname === '/login' ? 'text-judicial-accent' : 'hover:text-judicial-accent'
                }`}
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`block text-white px-3 py-2 text-base font-medium uppercase tracking-wide ${
                  location.pathname === '/register' ? 'text-judicial-accent' : 'hover:text-judicial-accent'
                }`}
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/dashboard" 
                className={`block text-white px-3 py-2 text-base font-medium uppercase tracking-wide ${
                  location.pathname.startsWith('/dashboard') ? 'text-judicial-accent' : 'hover:text-judicial-accent'
                }`}
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block text-white px-3 py-2 text-base font-medium uppercase tracking-wide w-full text-left hover:text-judicial-accent"
                disabled={loading}
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 