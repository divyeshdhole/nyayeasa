import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  JudicialFormGroup, 
  JudicialLabel, 
  JudicialInput, 
  JudicialPrimaryButton,
  JudicialAlert
} from '../components/JudicialFormComponents';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'litigant', // Default to litigant
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Use the selected role from the form
      await login({
        email: formData.email,
        password: formData.password,
        role: formData.role // Use selected role
      });
      
      // Redirect to dashboard on successful login
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        form: error.response?.data?.message || 'Login failed. Please try again.'
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-judicial-bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <img src="/assets/emblem.png" alt="Indian Emblem" className="h-20 mx-auto mb-4" onError={(e) => e.target.style.display = 'none'} />
        <h2 className="mt-6 text-center text-3xl font-serif font-bold text-judicial-primary">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-judicial-text-secondary">
          Or{' '}
          <Link to="/register" className="font-medium text-judicial-primary hover:text-judicial-secondary">
            register for a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="judicial-document bg-white py-8 px-4 shadow-md border border-judicial-border sm:px-10">
          <JudicialAlert variant="info" className="mb-4">
            <strong>Note:</strong> Role selection only matters during registration. 
            When logging in, the system will authenticate you with the role you registered with,
            regardless of what's selected here.
          </JudicialAlert>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <JudicialFormGroup>
              <JudicialLabel>Login As</JudicialLabel>
              <div className="mt-2 grid grid-cols-3 gap-3">
                <div>
                  <label className={`border p-2 flex items-center justify-center cursor-pointer ${formData.role === 'litigant' ? 'bg-judicial-bg-accent border-judicial-primary' : 'border-judicial-border'}`}>
                    <input 
                      type="radio" 
                      name="role" 
                      value="litigant" 
                      checked={formData.role === 'litigant'} 
                      onChange={handleChange} 
                      className="sr-only"
                    />
                    <span className={`text-sm ${formData.role === 'litigant' ? 'text-judicial-primary font-medium' : 'text-judicial-text-primary'}`}>Litigant</span>
                  </label>
                </div>
                <div>
                  <label className={`border p-2 flex items-center justify-center cursor-pointer ${formData.role === 'advocate' ? 'bg-judicial-bg-accent border-judicial-primary' : 'border-judicial-border'}`}>
                    <input 
                      type="radio" 
                      name="role" 
                      value="advocate" 
                      checked={formData.role === 'advocate'} 
                      onChange={handleChange} 
                      className="sr-only"
                    />
                    <span className={`text-sm ${formData.role === 'advocate' ? 'text-judicial-primary font-medium' : 'text-judicial-text-primary'}`}>Advocate</span>
                  </label>
                </div>
                <div>
                  <label className={`border p-2 flex items-center justify-center cursor-pointer ${formData.role === 'court-officer' ? 'bg-judicial-bg-accent border-judicial-primary' : 'border-judicial-border'}`}>
                    <input 
                      type="radio" 
                      name="role" 
                      value="court-officer" 
                      checked={formData.role === 'court-officer'} 
                      onChange={handleChange} 
                      className="sr-only"
                    />
                    <span className={`text-sm ${formData.role === 'court-officer' ? 'text-judicial-primary font-medium' : 'text-judicial-text-primary'}`}>Court Officer</span>
                  </label>
                </div>
              </div>
            </JudicialFormGroup>
            
            {/* Email Field */}
            <JudicialFormGroup>
              <JudicialLabel htmlFor="email">Email address</JudicialLabel>
              <div className="mt-1">
                <JudicialInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'border-red-500' : ''}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </JudicialFormGroup>
            
            {/* Password Field */}
            <JudicialFormGroup>
              <JudicialLabel htmlFor="password">Password</JudicialLabel>
              <div className="mt-1">
                <JudicialInput
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'border-red-500' : ''}
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </JudicialFormGroup>
            
            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-judicial-primary focus:ring-judicial-primary border-judicial-border"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-judicial-text-primary">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-judicial-primary hover:text-judicial-secondary">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            {/* Form Error Message - combining form validation errors and API errors */}
            {(errors.form || authError) && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <p className="text-sm">{errors.form || authError}</p>
              </div>
            )}
            
            {/* Submit Button */}
            <div>
              <JudicialPrimaryButton
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </JudicialPrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 