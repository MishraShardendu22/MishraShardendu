/* eslint-disable no-unused-vars */
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UserPlus, FolderPlus } from 'lucide-react';
import Client from '../components/Client';
import Projects from '../components/Projects';
import AddClientModel from '../components/AddClientModel';
import AddProjectModel from '../components/AddProjectModel';

export default function Home() {
  const notifySuccess = () => {
    toast.success('Client or Project added successfully!');
  };

  return (
    <div className="container bg-indigo-900 min-w-full mx-auto px-4 py-8">
      <ToastContainer />
      <div className='flex ml-40 flex-wrap gap-4 mb-8'>
        <AddClientModel notifySuccess={notifySuccess}>
          {({ openModal }) => (
            <button
              onClick={openModal}
              className=" bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
            >
              <UserPlus className="mr-2" size={16} />
              Add Client
            </button>
          )}
        </AddClientModel>
        <AddProjectModel notifySuccess={notifySuccess}>
          {({ openModal }) => (
            <button
              onClick={openModal}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
            >
              <FolderPlus className="mr-2" size={16} />
              Add Project
            </button>
          )}
        </AddProjectModel>
      </div>
      <Projects />
      <hr className='my-12 border-purple-700' />
      <Client />
    </div>
  );
}