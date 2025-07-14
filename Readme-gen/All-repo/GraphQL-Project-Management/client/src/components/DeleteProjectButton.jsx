/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      navigate('/home');
      toast.success('Project deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: '🗑️',
      });
    },
    onError: (error) => {
      toast.error('Error deleting project: ' + error.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
      aria-label="Delete Project"
    >
      <Trash2 className="w-5 h-5 mr-2" />
      Delete Project
    </button>
  );
}

DeleteProjectButton.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default DeleteProjectButton;