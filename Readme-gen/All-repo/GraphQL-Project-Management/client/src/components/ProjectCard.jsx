import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { Eye, Clock } from 'lucide-react';

export default function ProjectCard({ project }) {
  const handleViewClick = () => {
    toast.info(`Navigating to project: ${project.name}`);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress': return 'bg-yellow-400 text-yellow-900';
      case 'completed': return 'bg-green-400 text-green-900';
      case 'not started': return 'bg-red-400 text-red-900';
      default: return 'bg-gray-400 text-gray-900';
    }
  };

  return (
    <div className="w-full mb-4">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 flex-grow mr-2">
              <Clock className="text-purple-300 flex-shrink-0" size={20} />
              <h3 className="text-lg font-semibold text-white truncate">{project.name}</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
          <a
            href={`/projects/${project.id}`}
            onClick={handleViewClick}
            className="mt-2 w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
          >
            <Eye className="mr-2" size={16} />
            View Project
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};