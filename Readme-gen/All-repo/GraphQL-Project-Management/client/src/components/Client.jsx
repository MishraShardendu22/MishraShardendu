/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { Users, AlertTriangle } from 'lucide-react';
import { GET_CLIENTS } from "../queries/clientQueries";
import { DELETE_PROJECTS_BY_CLIENT } from "../mutations/projectMutations"; // Import your mutation
import ClientRow from './ClientRow';
import CenteredSpinner from "../components/Spinner";
import { toast } from "react-toastify";

export default function Client() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [clients, setClients] = useState([]);
  const [deletingIds, setDeletingIds] = useState(new Set());
  
  const [deleteProjectsByClient] = useMutation(DELETE_PROJECTS_BY_CLIENT);

  useEffect(() => {
    if (data) {
      setClients(data.clients);
    }
  }, [data]);

  const handleDeleteClient = async (id) => {
    try {
      setDeletingIds(prev => new Set(prev).add(id));

      // Delete all projects associated with the client first
      await deleteProjectsByClient({ variables: { clientId: id } });

      // Update local state after deleting projects and client
      setClients(prev => prev.filter(client => client.id !== id));
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });

      toast.success('Client and their projects deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error deleting client and their projects:", error);
      toast.error('Error deleting client and their projects.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (loading) return <CenteredSpinner />;
  if (error) return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-center text-red-500">
        <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
        <p className="text-xl font-semibold">Something Went Wrong</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-purple-400 text-center">Students Information</h1>
        
        {!loading && !error && (
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-500 mr-4" />
                <h2 className="text-2xl font-semibold text-purple-300">Clients</h2>
              </div>
              <p className="text-gray-400">{clients.length} total</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {clients.map((client) => (
                    <ClientRow 
                      key={client.id} 
                      client={client} 
                      onDelete={handleDeleteClient}
                      isDeleting={deletingIds.has(client.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
