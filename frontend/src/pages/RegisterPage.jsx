import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { 
  JudicialFormGroup, 
  JudicialLabel, 
  JudicialInput, 
  JudicialSelect,
  JudicialPrimaryButton,
  JudicialSecondaryButton
} from '../components/JudicialFormComponents';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error: authError } = useAuth();
  
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('litigant');
  const [formData, setFormData] = useState({
    // Common fields
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Advocate specific fields
    barRegistrationNumber: '',
    specialization: '',
    experience: '',
    
    // Court Officer specific fields
    courtName: '',
    designation: '',
    employeeId: '',
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
  
  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };
  
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    }
    
    // Validate role-specific fields
    if (userType === 'advocate') {
      if (!formData.barRegistrationNumber) {
        newErrors.barRegistrationNumber = 'Bar registration number is required';
      }
      
      if (!formData.specialization) {
        newErrors.specialization = 'Specialization is required';
      }
      
      if (!formData.experience) {
        newErrors.experience = 'Experience is required';
      }
    } else if (userType === 'court-officer') {
      if (!formData.courtName) {
        newErrors.courtName = 'Court name is required';
      }
      
      if (!formData.designation) {
        newErrors.designation = 'Designation is required';
      }
      
      if (!formData.employeeId) {
        newErrors.employeeId = 'Employee ID is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleSubmit();
    }
  };
  
  const handlePrevStep = () => {
    setStep(1);
  };
  
  const handleSubmit = async () => {
    try {
      // Use the selected user type for registration
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone || '1234567890', // Default phone if empty
        role: userType, // Use the selected user type
        address: {
          street: formData.address || 'Test Street', // Default values for testing
          city: formData.city || 'Test City',
          state: formData.state || 'Test State',
          postalCode: formData.pincode || '110001',
          country: 'India'
        }
      };
      
      // Add role-specific fields
      if (userType === 'advocate') {
        userData.barCouncilId = formData.barRegistrationNumber;
        userData.specialization = [formData.specialization];
        userData.experience = formData.experience;
      } else if (userType === 'court-officer') {
        userData.courtId = formData.employeeId;
        userData.designation = formData.designation;
      }
      
      // Log the data being sent for debugging
      console.log('Sending registration data:', userData);
      
      // Call register from AuthContext
      const response = await register(userData);
      console.log('Registration response:', response);
      
      // Redirect to dashboard on successful registration
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Registration error details:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      // Try to extract detailed error message if available
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      }
      
      setErrors({ form: errorMessage });
    }
  };

  // Define the renderFormError function
  const renderFormError = () => {
    return (errors.form || authError) && (
      <div className="bg-judicial-danger bg-opacity-10 border border-judicial-danger text-judicial-danger px-4 py-3 mb-4" role="alert">
        <p className="text-sm">{errors.form || authError}</p>
      </div>
    );
  };
  
  // Define the renderFormActions function
  const renderFormActions = () => {
    return (
      <div className="flex justify-between mt-8">
        {step === 2 && (
          <JudicialSecondaryButton
            type="button"
            onClick={handlePrevStep}
          >
            Back
          </JudicialSecondaryButton>
        )}
        
        <JudicialPrimaryButton
          type="button"
          onClick={handleNextStep}
          disabled={loading}
          className="ml-auto"
        >
          {loading ? 'Processing...' : step === 1 ? 'Next' : 'Register'}
        </JudicialPrimaryButton>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-judicial-bg-primary flex flex-col">
      
      
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img 
                src="/assets/emblem.png" 
                alt="Indian Emblem" 
                className="h-20" 
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
            <h1 className="text-3xl font-serif font-bold text-judicial-primary sm:text-4xl">
              Create your account
            </h1>
            <p className="mt-3 text-xl text-judicial-text-secondary">
              Join NyayEase and digitize your legal journey
            </p>
          </div>
          
          {/* User Type Selection */}
          <div className="bg-white border border-judicial-border shadow-sm mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-serif font-medium text-judicial-primary">Select User Type</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  className={`px-4 py-3 border shadow-sm text-sm font-medium focus:outline-none ${
                    userType === 'litigant'
                      ? 'bg-judicial-bg-accent text-judicial-primary border-2 border-judicial-primary font-bold'
                      : 'bg-white text-judicial-text-primary border-judicial-border hover:bg-judicial-bg-accent'
                  }`}
                  onClick={() => handleUserTypeSelect('litigant')}
                >
                  Litigant
                </button>
                
                <button
                  type="button"
                  className={`px-4 py-3 border shadow-sm text-sm font-medium focus:outline-none ${
                    userType === 'advocate'
                      ? 'bg-judicial-bg-accent text-judicial-primary border-2 border-judicial-primary font-bold'
                      : 'bg-white text-judicial-text-primary border-judicial-border hover:bg-judicial-bg-accent'
                  }`}
                  onClick={() => handleUserTypeSelect('advocate')}
                >
                  Advocate
                </button>
                
                <button
                  type="button"
                  className={`px-4 py-3 border shadow-sm text-sm font-medium focus:outline-none ${
                    userType === 'court-officer'
                      ? 'bg-judicial-bg-accent text-judicial-primary border-2 border-judicial-primary font-bold'
                      : 'bg-white text-judicial-text-primary border-judicial-border hover:bg-judicial-bg-accent'
                  }`}
                  onClick={() => handleUserTypeSelect('court-officer')}
                >
                  Court Officer
                </button>
              </div>
            </div>
          </div>
          
          {/* Registration Form */}
          <div className="bg-white border border-judicial-border shadow-sm">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-serif font-medium text-judicial-primary">
                  {step === 1 ? 'Account Information' : 'Personal Information'}
                </h3>
                <span className="text-sm text-judicial-text-secondary">Step {step} of 2</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-judicial-bg-secondary h-2.5 mb-6">
                <div 
                  className="bg-judicial-primary h-2.5" 
                  style={{ width: step === 1 ? '50%' : '100%' }}
                ></div>
              </div>
              
              {/* Form Error Message */}
              {renderFormError()}
              
              {/* Step 1: Account Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <JudicialFormGroup>
                      <JudicialLabel htmlFor="firstName">First Name</JudicialLabel>
                      <JudicialInput
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                      />
                      {errors.firstName && (
                        <p className="mt-2 text-sm text-judicial-danger">{errors.firstName}</p>
                      )}
                    </JudicialFormGroup>
                    
                    <JudicialFormGroup>
                      <JudicialLabel htmlFor="lastName">Last Name</JudicialLabel>
                      <JudicialInput
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                      />
                      {errors.lastName && (
                        <p className="mt-2 text-sm text-judicial-danger">{errors.lastName}</p>
                      )}
                    </JudicialFormGroup>
                  </div>
                  
                  <JudicialFormGroup>
                    <JudicialLabel htmlFor="email">Email Address</JudicialLabel>
                    <JudicialInput
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-judicial-danger">{errors.email}</p>
                    )}
                  </JudicialFormGroup>
                  
                  <JudicialFormGroup>
                    <JudicialLabel htmlFor="password">Password</JudicialLabel>
                    <JudicialInput
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-judicial-danger">{errors.password}</p>
                    )}
                  </JudicialFormGroup>
                  
                  <JudicialFormGroup>
                    <JudicialLabel htmlFor="confirmPassword">Confirm Password</JudicialLabel>
                    <JudicialInput
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-judicial-danger">{errors.confirmPassword}</p>
                    )}
                  </JudicialFormGroup>
                </div>
              )}
              
              {/* Step 2: Personal Information */}
              {step === 2 && (
                <div className="space-y-4">
                  <JudicialFormGroup>
                    <JudicialLabel htmlFor="phone">Phone Number</JudicialLabel>
                    <JudicialInput
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-judicial-danger">{errors.phone}</p>
                    )}
                  </JudicialFormGroup>
                  
                  <JudicialFormGroup>
                    <JudicialLabel htmlFor="address">Address</JudicialLabel>
                    <JudicialInput
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                    />
                    {errors.address && (
                      <p className="mt-2 text-sm text-judicial-danger">{errors.address}</p>
                    )}
                  </JudicialFormGroup>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <JudicialFormGroup>
                      <JudicialLabel htmlFor="city">City</JudicialLabel>
                      <JudicialInput
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                      />
                      {errors.city && (
                        <p className="mt-2 text-sm text-judicial-danger">{errors.city}</p>
                      )}
                    </JudicialFormGroup>
                    
                    <JudicialFormGroup>
                      <JudicialLabel htmlFor="state">State</JudicialLabel>
                      <JudicialInput
                        type="text"
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                        isInvalid={!!errors.state}
                      />
                      {errors.state && (
                        <p className="mt-2 text-sm text-judicial-danger">{errors.state}</p>
                      )}
                    </JudicialFormGroup>
                    
                    <JudicialFormGroup>
                      <JudicialLabel htmlFor="pincode">Pincode</JudicialLabel>
                      <JudicialInput
                        type="text"
                        name="pincode"
                        id="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        isInvalid={!!errors.pincode}
                      />
                      {errors.pincode && (
                        <p className="mt-2 text-sm text-judicial-danger">{errors.pincode}</p>
                      )}
                    </JudicialFormGroup>
                  </div>
                  
                  {/* Role-specific fields */}
                  {userType === 'advocate' && (
                    <div className="pt-4 border-t border-judicial-border">
                      <h4 className="text-md font-serif font-medium text-judicial-primary mb-4">Advocate Information</h4>
                      
                      <div className="space-y-4">
                        <JudicialFormGroup>
                          <JudicialLabel htmlFor="barRegistrationNumber">Bar Registration Number</JudicialLabel>
                          <JudicialInput
                            type="text"
                            name="barRegistrationNumber"
                            id="barRegistrationNumber"
                            value={formData.barRegistrationNumber}
                            onChange={handleChange}
                            isInvalid={!!errors.barRegistrationNumber}
                          />
                          {errors.barRegistrationNumber && (
                            <p className="mt-2 text-sm text-judicial-danger">{errors.barRegistrationNumber}</p>
                          )}
                        </JudicialFormGroup>
                        
                        <JudicialFormGroup>
                          <JudicialLabel htmlFor="specialization">Specialization</JudicialLabel>
                          <JudicialSelect
                            name="specialization"
                            id="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            isInvalid={!!errors.specialization}
                          >
                            <option value="">Select Specialization</option>
                            <option value="Criminal Law">Criminal Law</option>
                            <option value="Civil Law">Civil Law</option>
                            <option value="Family Law">Family Law</option>
                            <option value="Corporate Law">Corporate Law</option>
                            <option value="Tax Law">Tax Law</option>
                            <option value="Property Law">Property Law</option>
                            <option value="Constitutional Law">Constitutional Law</option>
                            <option value="Other">Other</option>
                          </JudicialSelect>
                          {errors.specialization && (
                            <p className="mt-2 text-sm text-judicial-danger">{errors.specialization}</p>
                          )}
                        </JudicialFormGroup>
                        
                        <JudicialFormGroup>
                          <JudicialLabel htmlFor="experience">Years of Experience</JudicialLabel>
                          <JudicialInput
                            type="number"
                            name="experience"
                            id="experience"
                            min="0"
                            max="50"
                            value={formData.experience}
                            onChange={handleChange}
                            isInvalid={!!errors.experience}
                          />
                          {errors.experience && (
                            <p className="mt-2 text-sm text-judicial-danger">{errors.experience}</p>
                          )}
                        </JudicialFormGroup>
                      </div>
                    </div>
                  )}
                  
                  {userType === 'court-officer' && (
                    <div className="pt-4 border-t border-judicial-border">
                      <h4 className="text-md font-serif font-medium text-judicial-primary mb-4">Court Officer Information</h4>
                      
                      <div className="space-y-4">
                        <JudicialFormGroup>
                          <JudicialLabel htmlFor="courtName">Court Name</JudicialLabel>
                          <JudicialInput
                            type="text"
                            name="courtName"
                            id="courtName"
                            value={formData.courtName}
                            onChange={handleChange}
                            isInvalid={!!errors.courtName}
                          />
                          {errors.courtName && (
                            <p className="mt-2 text-sm text-judicial-danger">{errors.courtName}</p>
                          )}
                        </JudicialFormGroup>
                        
                        <JudicialFormGroup>
                          <JudicialLabel htmlFor="designation">Designation</JudicialLabel>
                          <JudicialInput
                            type="text"
                            name="designation"
                            id="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            isInvalid={!!errors.designation}
                          />
                          {errors.designation && (
                            <p className="mt-2 text-sm text-judicial-danger">{errors.designation}</p>
                          )}
                        </JudicialFormGroup>
                        
                        <JudicialFormGroup>
                          <JudicialLabel htmlFor="employeeId">Employee ID</JudicialLabel>
                          <JudicialInput
                            type="text"
                            name="employeeId"
                            id="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            isInvalid={!!errors.employeeId}
                          />
                          {errors.employeeId && (
                            <p className="mt-2 text-sm text-judicial-danger">{errors.employeeId}</p>
                          )}
                        </JudicialFormGroup>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Navigation Buttons */}
              {renderFormActions()}
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-judicial-text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-judicial-primary hover:text-judicial-secondary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default RegisterPage;
