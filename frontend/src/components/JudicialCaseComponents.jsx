import React from 'react';
import { Card, Badge } from 'react-bootstrap';

/**
 * Judicial-themed case components for consistent styling across the application
 */

export const JudicialCaseHeader = ({ title, caseNumber, status, filingDate, children }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending-approval':
        return 'bg-judicial-warning text-white';
      case 'approved':
        return 'bg-judicial-success text-white';
      case 'rejected':
        return 'bg-judicial-danger text-white';
      case 'in-progress':
        return 'bg-judicial-info text-white';
      case 'resolved':
        return 'bg-judicial-success text-white';
      case 'closed':
        return 'bg-judicial-secondary text-white';
      default:
        return 'bg-judicial-secondary text-white';
    }
  };

  const formatStatus = (status) => {
    return status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="judicial-document mb-6">
      <div className="border-b-4 border-judicial-primary p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-serif font-bold text-judicial-primary mb-2">{title}</h1>
            <div className="flex flex-wrap gap-3 mb-2">
              <div className="text-sm">
                <span className="font-medium text-judicial-text-secondary">Case Number:</span> 
                <span className="ml-1 font-serif">{caseNumber}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-judicial-text-secondary">Filed On:</span> 
                <span className="ml-1">{new Date(filingDate).toLocaleDateString('en-IN')}</span>
              </div>
            </div>
          </div>
          <div className="mt-2 md:mt-0">
            <span className={`px-3 py-1 text-sm font-medium ${getStatusColor(status)}`}>
              {formatStatus(status)}
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export const JudicialTabNav = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="mb-6 border-b border-judicial-border">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-b-2 border-judicial-primary text-judicial-primary'
                : 'text-judicial-text-secondary hover:text-judicial-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export const JudicialPartyCard = ({ title, party, onContact }) => {
  return (
    <Card className="mb-4 border border-judicial-border shadow-sm">
      <Card.Header className="bg-judicial-bg-secondary border-b border-judicial-border py-3">
        <h3 className="text-lg font-serif font-medium text-judicial-primary m-0">{title}</h3>
      </Card.Header>
      <Card.Body className="p-4">
        {party ? (
          <div>
            <div className="mb-3">
              <span className="font-medium text-judicial-text-secondary">Name:</span> 
              <span className="ml-1">{party.name}</span>
            </div>
            {party.email && (
              <div className="mb-3">
                <span className="font-medium text-judicial-text-secondary">Email:</span> 
                <span className="ml-1">{party.email}</span>
              </div>
            )}
            {party.phone && (
              <div className="mb-3">
                <span className="font-medium text-judicial-text-secondary">Phone:</span> 
                <span className="ml-1">{party.phone}</span>
              </div>
            )}
            {onContact && (
              <button
                onClick={() => onContact(party)}
                className="mt-2 px-4 py-2 bg-judicial-primary text-white hover:bg-judicial-secondary"
              >
                Contact
              </button>
            )}
          </div>
        ) : (
          <p className="text-judicial-text-secondary italic">Not assigned yet</p>
        )}
      </Card.Body>
    </Card>
  );
};

export const JudicialDocumentList = ({ documents, onDownload, onUpload, canUpload }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-serif font-medium text-judicial-primary mb-4 pb-2 border-b border-judicial-border">
        Case Documents
      </h3>
      
      {documents && documents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-judicial min-w-full">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left">Document Name</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Uploaded By</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={doc._id || index} className={index % 2 === 0 ? 'bg-judicial-bg-secondary' : 'bg-white'}>
                  <td className="py-3 px-4">{doc.name}</td>
                  <td className="py-3 px-4">
                    <Badge bg={doc.type === 'evidence' ? 'info' : doc.type === 'petition' ? 'primary' : 'secondary'}>
                      {doc.type}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{doc.uploadedBy?.name || 'System'}</td>
                  <td className="py-3 px-4">{new Date(doc.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onDownload(doc)}
                      className="text-judicial-primary hover:text-judicial-secondary mr-2"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-judicial-text-secondary italic">No documents uploaded yet</p>
      )}
      
      {canUpload && (
        <div className="mt-4">
          <button
            onClick={onUpload}
            className="px-4 py-2 bg-judicial-primary text-white hover:bg-judicial-secondary"
          >
            Upload Document
          </button>
        </div>
      )}
    </div>
  );
};

export const JudicialCaseTimeline = ({ events }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-serif font-medium text-judicial-primary mb-4 pb-2 border-b border-judicial-border">
        Case Timeline
      </h3>
      
      {events && events.length > 0 ? (
        <div className="relative pl-8 border-l-2 border-judicial-border">
          {events.map((event, index) => (
            <div key={index} className="mb-6 relative">
              <div className="absolute -left-10 w-5 h-5 rounded-full bg-judicial-primary"></div>
              <div className="bg-white p-4 border border-judicial-border shadow-sm">
                <div className="text-sm text-judicial-text-secondary mb-1">
                  {new Date(event.date).toLocaleDateString('en-IN')}
                </div>
                <h4 className="text-md font-medium text-judicial-primary mb-2">{event.title}</h4>
                <p className="text-judicial-text-primary">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-judicial-text-secondary italic">No timeline events available</p>
      )}
    </div>
  );
};

export const JudicialHearingCard = ({ hearing, isUpcoming }) => {
  return (
    <div className={`mb-4 border ${isUpcoming ? 'border-judicial-primary' : 'border-judicial-border'} shadow-sm`}>
      <div className={`p-4 ${isUpcoming ? 'bg-judicial-bg-accent' : 'bg-white'}`}>
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-lg font-medium text-judicial-primary">
            {hearing.title || 'Hearing'}
          </h4>
          <span className="text-sm px-2 py-1 bg-judicial-primary text-white">
            {new Date(hearing.scheduledDate).toLocaleDateString('en-IN')}
          </span>
        </div>
        
        <div className="mb-3">
          <span className="font-medium text-judicial-text-secondary">Time:</span>
          <span className="ml-2">
            {new Date(hearing.scheduledDate).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </span>
        </div>
        
        {hearing.location && (
          <div className="mb-3">
            <span className="font-medium text-judicial-text-secondary">Location:</span>
            <span className="ml-2">{hearing.location}</span>
          </div>
        )}
        
        {hearing.meetingLink && (
          <div className="mb-3">
            <span className="font-medium text-judicial-text-secondary">Virtual Meeting:</span>
            <a 
              href={hearing.meetingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 text-judicial-primary hover:text-judicial-secondary"
            >
              Join Meeting
            </a>
          </div>
        )}
        
        {hearing.notes && (
          <div className="mt-3 p-3 bg-judicial-bg-secondary border-l-4 border-judicial-secondary">
            <p className="text-judicial-text-primary m-0">{hearing.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};
