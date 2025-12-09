import React from 'react';
import { Form, Button } from 'react-bootstrap';

/**
 * Judicial-themed form components for consistent styling across the application
 */

export const JudicialFormGroup = ({ children, className = '', ...props }) => {
  return (
    <Form.Group className={`mb-4 ${className}`} {...props}>
      {children}
    </Form.Group>
  );
};

export const JudicialLabel = ({ children, className = '', ...props }) => {
  return (
    <Form.Label 
      className={`block text-sm font-medium text-judicial-text-primary mb-2 ${className}`} 
      {...props}
    >
      {children}
    </Form.Label>
  );
};

export const JudicialInput = ({ className = '', ...props }) => {
  return (
    <Form.Control
      className={`w-full px-3 py-2 border border-judicial-border focus:ring-judicial-primary focus:border-judicial-primary ${className}`}
      style={{ borderRadius: 0 }}
      {...props}
    />
  );
};

export const JudicialSelect = ({ className = '', children, ...props }) => {
  return (
    <Form.Select
      className={`w-full px-3 py-2 border border-judicial-border focus:ring-judicial-primary focus:border-judicial-primary ${className}`}
      style={{ borderRadius: 0 }}
      {...props}
    >
      {children}
    </Form.Select>
  );
};

export const JudicialTextarea = ({ className = '', ...props }) => {
  return (
    <Form.Control
      as="textarea"
      className={`w-full px-3 py-2 border border-judicial-border focus:ring-judicial-primary focus:border-judicial-primary ${className}`}
      style={{ borderRadius: 0 }}
      {...props}
    />
  );
};

export const JudicialCheckbox = ({ className = '', id, label, ...props }) => {
  return (
    <Form.Check
      type="checkbox"
      id={id}
      label={label}
      className={`${className}`}
      {...props}
    />
  );
};

export const JudicialPrimaryButton = ({ children, className = '', ...props }) => {
  return (
    <Button
      variant="primary"
      className={`bg-judicial-bg-accent border-2 border-judicial-primary text-judicial-primary font-bold hover:bg-judicial-bg-primary hover:border-judicial-secondary ${className}`}
      style={{ borderRadius: 0 }}
      {...props}
    >
      {children}
    </Button>
  );
};

export const JudicialSecondaryButton = ({ children, className = '', ...props }) => {
  return (
    <Button
      variant="outline-primary"
      className={`border-2 border-judicial-secondary text-judicial-secondary hover:bg-judicial-bg-accent hover:text-judicial-primary hover:border-judicial-primary ${className}`}
      style={{ borderRadius: 0 }}
      {...props}
    >
      {children}
    </Button>
  );
};

export const JudicialDangerButton = ({ children, className = '', ...props }) => {
  return (
    <Button
      variant="danger"
      className={`bg-white border-2 border-judicial-danger text-judicial-danger font-medium hover:bg-judicial-danger hover:bg-opacity-10 ${className}`}
      style={{ borderRadius: 0 }}
      {...props}
    >
      {children}
    </Button>
  );
};

export const JudicialCard = ({ children, className = '', title, ...props }) => {
  return (
    <div 
      className={`judicial-document bg-white border border-judicial-border mb-4 ${className}`}
      {...props}
    >
      {title && (
        <div className="border-b border-judicial-border p-4 bg-judicial-bg-secondary">
          <h3 className="text-lg font-serif font-medium text-judicial-primary m-0">{title}</h3>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export const JudicialTable = ({ children, className = '', ...props }) => {
  return (
    <div className="overflow-x-auto">
      <table 
        className={`table-judicial min-w-full border border-judicial-border ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

export const JudicialTableHead = ({ children, className = '', ...props }) => {
  return (
    <thead 
      className={`bg-judicial-primary text-white ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
};

export const JudicialBadge = ({ children, variant = 'primary', className = '', ...props }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-judicial-primary text-white';
      case 'secondary':
        return 'bg-judicial-secondary text-white';
      case 'accent':
        return 'bg-judicial-accent text-white';
      case 'success':
        return 'bg-judicial-success text-white';
      case 'warning':
        return 'bg-judicial-warning text-white';
      case 'danger':
        return 'bg-judicial-danger text-white';
      case 'info':
        return 'bg-judicial-info text-white';
      default:
        return 'bg-judicial-primary text-white';
    }
  };

  return (
    <span 
      className={`inline-block px-2 py-1 text-xs font-medium ${getVariantClass()} ${className}`}
      style={{ borderRadius: 0 }}
      {...props}
    >
      {children}
    </span>
  );
};

export const JudicialAlert = ({ children, variant = 'info', className = '', ...props }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-50 border-judicial-success text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-judicial-warning text-yellow-800';
      case 'danger':
        return 'bg-red-50 border-judicial-danger text-red-800';
      case 'info':
      default:
        return 'bg-blue-50 border-judicial-info text-blue-800';
    }
  };

  return (
    <div 
      className={`border-l-4 p-4 mb-4 ${getVariantClass()} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
