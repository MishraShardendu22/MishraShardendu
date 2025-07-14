/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import { Loader, AlertCircle, ArrowLeft, Info, Edit3, Trash2 } from 'lucide-react';
import { GET_PROJECT } from '../queries/projectQueries';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader className="animate-spin text-purple-500" size={48} />
    </div>
  );

  if (error) {
    toast.error('Something went wrong!');
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <AlertCircle className="mr-2" size={24} />
        <p>Something Went Wrong</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4 p-6 bg-purple-900 rounded-lg shadow-md">
      <ToastContainer />
      <Link to='/home' className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 mb-4 inline-flex items-center'>
        <ArrowLeft className="mr-2" size={16} />
        Back
      </Link>

      <h1 className='text-3xl font-bold text-purple-300 mt-4'>{data.project.name}</h1>
      <p className='text-gray-300 mt-2'>{data.project.description}</p>

      <div className="mt-6 bg-purple-800 p-4 rounded-lg">
        <h5 className='text-xl font-semibold text-purple-300 flex items-center'>
          <Info className="mr-2" size={20} />
          Project Status
        </h5>
        <p className='text-gray-300 mt-2'>{data.project.status}</p>
      </div>

      <ClientInfo client={data.project.client} />

      <div className="mt-8 space-y-4">
        <EditProjectForm project={data.project} />
        <DeleteProjectButton projectId={data.project.id} />
      </div>
    </div>
  );
}