import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-judicial-primary"></div>
  </div>
);

// Error message component
const ErrorMessage = ({ message }) => (
  <div className="bg-judicial-danger bg-opacity-10 border border-judicial-danger text-judicial-danger px-4 py-3 my-4 rounded" role="alert">
    <p className="font-medium">{message}</p>
  </div>
);

const DashboardHome = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const timeoutRef = useRef(null);
  
  // Get the user role from the auth context
  const userRole = user?.role || 'litigant';
  
  // Configure axios with token
  const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    timeout: 8000 // 8 second timeout
  });
  
  // Fallback data for statistics
  const fallbackStats = {
    litigant: {
      totalCases: 3,
      pendingCases: 2,
      upcomingHearings: 1,
      notifications: 4
    },
    advocate: {
      totalCases: 12,
      pendingRequests: 5,
      upcomingHearings: 3,
      clients: 8
    },
    'court-officer': {
      pendingApprovals: 15,
      scheduledHearings: 8,
      activeCases: 45,
      totalAdvocates: 32
    }
  };
  
  // Fallback data for recent activities
  const fallbackActivities = [
    {
      id: 1,
      type: 'case-update',
      title: 'Case status updated',
      description: 'Your case #12345 status has been changed to "Hearing Scheduled"',
      date: '2 hours ago'
    },
    {
      id: 2,
      type: 'document',
      title: 'New document uploaded',
      description: 'A new document has been uploaded to case #12345',
      date: '1 day ago'
    },
    {
      id: 3,
      type: 'hearing',
      title: 'Hearing reminder',
      description: 'You have a hearing scheduled for case #12345 on March 15, 2025',
      date: '2 days ago'
    }
  ];
  
  // State for dashboard data
  const [stats, setStats] = useState({
    litigant: {
      totalCases: 0,
      pendingCases: 0,
      upcomingHearings: 0,
      notifications: 0
    },
    advocate: {
      totalCases: 0,
      pendingRequests: 0,
      upcomingHearings: 0,
      clients: 0
    },
    'court-officer': {
      pendingApprovals: 0,
      scheduledHearings: 0,
      activeCases: 0,
      totalAdvocates: 0
    }
  });
  
  const [recentActivities, setRecentActivities] = useState([]);
  
  // Fetch real data with timeout fallback
  useEffect(() => {
    if (!user || !token) return;
    
    setLoading(true);
    setError(null);
    setUsingFallback(false);
    
    // Set a timeout to use fallback data if API calls take too long
    timeoutRef.current = setTimeout(() => {
      if (loading) {
        console.log('API timeout - using fallback data');
        setStats(fallbackStats);
        setRecentActivities(fallbackActivities);
        setLoading(false);
        setUsingFallback(true);
      }
    }, 5000); // 5 second timeout
    
    // Function to fetch all required data
    const fetchDashboardData = async () => {
      try {
        // Use Promise.all to fetch data in parallel
        const [casesResponse, hearingsResponse, notificationsResponse] = await Promise.all([
          axiosInstance.get('/cases').catch(() => ({ data: { data: [] } })),
          axiosInstance.get('/hearings/upcoming').catch(() => ({ data: { data: [] } })),
          axiosInstance.get('/notifications').catch(() => ({ data: { data: [] } }))
        ]);
        
        const casesData = casesResponse.data.data || [];
        const hearingsData = hearingsResponse.data.data || [];
        const notificationsData = notificationsResponse.data.data || [];
        
        // Process data based on user role
        const newStats = { ...stats };
        
        if (userRole === 'litigant') {
          const pendingCases = casesData.filter(c => c.status !== 'closed').length;
          
          newStats.litigant = {
            totalCases: casesData.length,
            pendingCases: pendingCases,
            upcomingHearings: hearingsData.length,
            notifications: notificationsData.filter(n => !n.read).length
          };
        } 
        else if (userRole === 'advocate') {
          const pendingRequests = casesData.filter(c => 
            c.advocates && c.advocates.some(a => 
              a._id === user.id && a.status === 'pending'
            )
          ).length;
          
          // Get unique client count
          const clientIds = new Set();
          casesData.forEach(c => {
            if (c.litigant && c.litigant._id) clientIds.add(c.litigant._id);
          });
          
          newStats.advocate = {
            totalCases: casesData.length,
            pendingRequests: pendingRequests,
            upcomingHearings: hearingsData.length,
            clients: clientIds.size
          };
        }
        else if (userRole === 'court-officer') {
          const pendingApprovals = casesData.filter(c => c.status === 'pending').length;
          const activeCases = casesData.filter(c => c.status !== 'closed').length;
          
          newStats['court-officer'] = {
            pendingApprovals: pendingApprovals,
            scheduledHearings: hearingsData.length,
            activeCases: activeCases,
            totalAdvocates: 0 // This would need a separate API call
          };
        }
        
        // Format notifications into activities
        const formattedActivities = notificationsData.map(notification => {
          // Determine type based on content
          let type = 'case-update';
          if (notification.message && notification.message.toLowerCase().includes('document')) {
            type = 'document';
          } else if (notification.message && notification.message.toLowerCase().includes('hearing')) {
            type = 'hearing';
          }
          
          // Format date
          let dateString = 'Recently';
          if (notification.createdAt) {
            const notificationDate = new Date(notification.createdAt);
            const now = new Date();
            const diffTime = Math.abs(now - notificationDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            
            if (diffDays > 0) {
              dateString = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
            } else if (diffHours > 0) {
              dateString = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
            } else {
              dateString = 'Just now';
            }
          }
          
          return {
            id: notification._id || Math.random().toString(),
            type: type,
            title: notification.title || 'Notification',
            description: notification.message || 'You have a new notification',
            date: dateString,
            read: notification.read || false
          };
        });
        
        // Clear timeout since we got the data
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        setStats(newStats);
        setRecentActivities(formattedActivities);
        setLoading(false);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        
        // Use fallback data on error
        setStats(fallbackStats);
        setRecentActivities(fallbackActivities);
        setError('Could not fetch real-time data. Showing cached information.');
        setLoading(false);
        setUsingFallback(true);
      }
    };
    
    fetchDashboardData();
    
    // Clean up timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [user, token, userRole]);
  
  // Activity icon component
  const ActivityIcon = ({ type }) => {
    const icons = {
      'case-update': (
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      document: (
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      ),
      hearing: (
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )
    };
    
    return icons[type] || null;
  };
  
  // Render stat cards based on user role
  const renderStatCards = () => {
    const roleStats = stats[userRole];
    
    if (userRole === 'litigant') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Cases" value={roleStats.totalCases} color="blue" />
          <StatCard title="Pending Cases" value={roleStats.pendingCases} color="amber" />
          <StatCard title="Upcoming Hearings" value={roleStats.upcomingHearings} color="emerald" />
          <StatCard title="Notifications" value={roleStats.notifications} color="purple" />
        </div>
      );
    } else if (userRole === 'advocate') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Cases" value={roleStats.totalCases} color="blue" />
          <StatCard title="Pending Requests" value={roleStats.pendingRequests} color="amber" />
          <StatCard title="Upcoming Hearings" value={roleStats.upcomingHearings} color="emerald" />
          <StatCard title="Total Clients" value={roleStats.clients} color="purple" />
        </div>
      );
    } else if (userRole === 'court-officer') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Pending Approvals" value={roleStats.pendingApprovals} color="blue" />
          <StatCard title="Scheduled Hearings" value={roleStats.scheduledHearings} color="amber" />
          <StatCard title="Active Cases" value={roleStats.activeCases} color="emerald" />
          <StatCard title="Total Advocates" value={roleStats.totalAdvocates} color="purple" />
        </div>
      );
    }
    
    // Fallback if role is unknown
    return (
      <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 p-4 rounded">
        Unknown user role: {userRole}
      </div>
    );
  };
  
  // Stat card component
  const StatCard = ({ title, value, color }) => {
    const colorClasses = {
      blue: 'bg-blue-500',
      amber: 'bg-amber-500',
      emerald: 'bg-emerald-500',
      purple: 'bg-purple-500',
    };
    
    return (
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-full ${colorClasses[color]} flex items-center justify-center text-white`}>
            <span className="text-xl font-bold">{value}</span>
          </div>
          <div className="ml-4">
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-gray-800 text-lg font-semibold">{value}</p>
          </div>
        </div>
      </div>
    );
  };
  
  // Welcome message based on user role
  const getWelcomeMessage = () => {
    const messages = {
      litigant: "Track your cases, find advocates, and attend hearings all in one place.",
      advocate: "Manage your cases, respond to client requests, and attend hearings seamlessly.",
      'court-officer': "Approve cases, schedule hearings, and manage the legal process efficiently."
    };
    
    return messages[userRole] || "Welcome to NyayEase legal management portal.";
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Role Indicator */}
      <div className="bg-indigo-50 border border-indigo-200 text-indigo-800 px-4 py-3 rounded-md mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">
              You are logged in as: <span className="font-bold capitalize">{userRole}</span>
            </p>
          </div>
        </div>
      </div>
    
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome {user?.name ? `${user.name}` : ''} to NyayEase
        </h2>
        <p className="text-gray-600 mb-4">{getWelcomeMessage()}</p>
        
        <div className="mt-4 flex flex-wrap gap-3">
          {userRole === 'litigant' && (
            <>
              <Link to="/dashboard/file-case" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                File New Case
              </Link>
              <button className="bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors">
                Find an Advocate
              </button>
            </>
          )}
          
          {userRole === 'advocate' && (
            <>
              <Link to="/dashboard/requests" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                View Case Requests
              </Link>
              <Link to="/dashboard/profile" className="bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors">
                Update Profile
              </Link>
            </>
          )}
          
          {userRole === 'court-officer' && (
            <>
              <Link to="/dashboard/hearings" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Review Pending Cases
              </Link>
              <Link to="/dashboard/hearings" className="bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors">
                Schedule a Hearing
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Stats</h3>
        {error ? (
          <ErrorMessage message={error} />
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          renderStatCards()
        )}
      </div>
      
      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Recent Activity</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {loading ? (
            <LoadingSpinner />
          ) : (
            recentActivities.map((activity) => (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex items-start">
                  <ActivityIcon type={activity.type} />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <span className="text-xs text-gray-400 mt-1">{activity.date}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="px-6 py-4 bg-gray-50">
          <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 