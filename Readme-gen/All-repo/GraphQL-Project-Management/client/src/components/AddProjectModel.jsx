/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { List, Briefcase, FileText, GitBranch, Users } from 'lucide-react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import { toast } from 'react-hot-toast';
import CenteredSpinner from './Spinner';
import { useNavigate } from 'react-router-dom';

export default function AddProjectModel() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');
  const navigate = useNavigate();

  const [addProject] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading: clientsLoading, error: clientsError, data } = useQuery(GET_CLIENTS);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || description === '' || clientId === '' || status === '') {
      return toast.error('Please fill in all fields', {
        position: 'top-right',
        duration: 3000,
      });
    }
  
    try {
      await addProject({
        variables: { name, description, clientId, status },
      });
  
      toast.success('Project added successfully!', {
        position: 'top-right',
        duration: 3000,
        icon: '🚀',
      });
  
      setName('');
      setDescription('');
      setClientId('');
      setStatus('new');
  
      document.getElementById('addProjectModel').classList.add('hidden');
  
      setTimeout(() => {
        navigate('/home');
      }, 5000);
      
    } catch (error) {
      console.error(error);
      toast.error('Error adding project. Please try again.', {
        position: 'top-right',
        duration: 3000,
      });
    }
  };
  

  if (clientsLoading) return <CenteredSpinner />;
  if (clientsError) return 'Something Went Wrong';

  return (
    <>
      <button
        type="button"
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
        onClick={() => document.getElementById('addProjectModel').classList.remove('hidden')}
      >
        <List className="w-5 h-5 mr-2" />
        New Project
      </button>

      <div id="addProjectModel" className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden">
        <div className="relative top-20 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-gray-800">
          <div className="mt-3 text-center">
            <h3 className="text-2xl font-semibold text-purple-300 mb-4">New Project</h3>
            <form onSubmit={onSubmit} className="mt-2">
              <InputField
                icon={<Briefcase className="w-5 h-5 text-purple-500" />}
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                icon={<FileText className="w-5 h-5 text-purple-500" />}
                type="textarea"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isTextarea={true}
              />
              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GitBranch className="w-5 h-5 text-purple-500" />
                </div>
                <select
                  className="pl-10 w-full py-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="new">Not Started</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <select
                  className="pl-10 w-full py-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                >
                  <option value="">Select Client</option>
                  {data.clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => document.getElementById('addProjectModel').classList.add('hidden')}
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

const InputField = ({ icon, type, placeholder, value, onChange, isTextarea }) => (
  <div className="mb-4 relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    {isTextarea ? (
      <textarea
        className="pl-10 w-full py-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y min-h-[7rem]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    ) : (
      <input
        type={type}
        className="pl-10 w-full py-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    )}
  </div>
);

InputField.propTypes = {
  icon: PropTypes.element.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isTextarea: PropTypes.bool,
};
