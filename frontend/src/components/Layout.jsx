import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--judicial-bg-primary)' }}>
      <div className="judicial-header">
        <div className="container mx-auto flex items-center justify-center">
          <img src="/assets/ashoka-chakra.png" alt="Ashoka Chakra" className="h-16 mr-4" onError={(e) => e.target.style.display = 'none'} />
          <h1 className="text-2xl md:text-3xl font-bold">NyayEasa - Digital Justice Platform</h1>
        </div>
      </div>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;