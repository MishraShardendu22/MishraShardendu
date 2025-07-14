/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { UserPlus, User, Mail, Phone } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-hot-toast';

export default function AddClientModal() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const { name, email, phone } = formData;

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
    onCompleted() {
      toast.success('Client added!');
      resetForm();
      closeModal();
    },
    onError() {
      toast.error('Error. Try again.');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '' });
  };

  const closeModal = () => {
    document.getElementById('addClientModal').classList.add('hidden');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      return toast.error('Fill in all fields');
    }
    addClient();
  };

  return (
    <>
      <button
        type="button"
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
        onClick={() => document.getElementById('addClientModal').classList.remove('hidden')}
      >
        <UserPlus className="w-5 h-5 mr-2" />
        Add Client
      </button>

      <div id="addClientModal" className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-800">
          <div className="mt-3 text-center">
            <h3 className="text-2xl font-semibold text-purple-300 mb-4">Add Client</h3>
            <form onSubmit={onSubmit} className="mt-2">
              <InputField
                icon={<User className="w-5 h-5 text-purple-500" />}
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChange}
              />
              <InputField
                icon={<Mail className="w-5 h-5 text-purple-500" />}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
              <InputField
                icon={<Phone className="w-5 h-5 text-purple-500" />}
                type="text"
                name="phone"
                placeholder="Phone"
                value={phone}
                onChange={handleChange}
              />
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import PropTypes from 'prop-types';

const InputField = ({ icon, type, name, placeholder, value, onChange }) => (
  <div className="mb-4 relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      className="pl-10 w-full py-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

InputField.propTypes = {
  icon: PropTypes.element.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
