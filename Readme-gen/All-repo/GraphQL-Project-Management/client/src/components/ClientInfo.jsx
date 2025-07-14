/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Mail, Phone, User } from 'lucide-react';

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 mr-3">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-gray-100">{value}</p>
      </div>
    </div>
  );
};

InfoItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const ClientInfo = ({ client }) => {
    return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-purple-300">Client Information</h2>
      <div className="space-y-4">
        <InfoItem icon={<User className="w-5 h-5 text-purple-500" />} label="Name" value={client.name} />
        <InfoItem icon={<Mail className="w-5 h-5 text-purple-500" />} label="Email" value={client.email} />
        <InfoItem icon={<Phone className="w-5 h-5 text-purple-500" />} label="Phone" value={client.phone} />
      </div>
    </div>
  );
};

// Add PropTypes validation for the 'client' object
ClientInfo.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ClientInfo;
