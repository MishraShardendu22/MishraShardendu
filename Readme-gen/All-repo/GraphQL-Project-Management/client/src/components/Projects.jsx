import { useQuery } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import { Loader, AlertCircle, FolderOpen } from 'lucide-react';
import { GET_PROJECTS } from '../queries/projectQueries';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader className="animate-spin text-purple-500" size={48} />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-64 text-red-500">
      <AlertCircle className="mr-2" size={24} />
      <p>Something Went Wrong</p>
    </div>
  );

  if (data.projects.length === 0) {
    toast.warn('No projects found!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
<div className="container mx-auto px-4 z-10"> {/* Add z-10 for the project cards */}
  <ToastContainer />
  <h1 className="text-2xl font-bold text-purple-100 mb-6 flex items-center">
    <FolderOpen className="mr-2" size={24} />
    Projects
  </h1>
  {data.projects.length > 0 ? (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
      {data.projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  ) : (
    <div className="bg-purple-800 rounded-lg shadow-md p-6 text-center">
      <p className='text-purple-200 text-lg'>No Projects Available</p>
      <p className='text-purple-300 mt-2 text-sm'>Start by creating a new project!</p>
    </div>
  )}
</div>

  );
} 