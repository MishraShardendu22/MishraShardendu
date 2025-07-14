/* eslint-disable no-unused-vars */
import React from 'react';
import { Trash2, UserCircle, Mail, Phone } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';
import PropTypes from 'prop-types';

export default function ClientRow({ client, onDelete, isDeleting }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    });

    const handleDelete = () => {
        deleteClient();
        onDelete(client.id);
    };

    return (
        <tr className={`transition-all duration-500 ease-in-out ${isDeleting ? 'opacity-0 transform -translate-y-4' : 'opacity-100'}`}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <UserCircle className="w-5 h-5 text-purple-400 mr-2" />
                    <span className="font-medium text-gray-200">{client.name}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <Mail className="w-5 h-5 text-purple-400 mr-2" />
                    <span className="text-gray-300">{client.email}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <Phone className="w-5 h-5 text-purple-400 mr-2" />
                    <span className="text-gray-300">{client.phone}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <button
                    className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 
                    ${isDeleting 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-red-400 text-white hover:bg-red-500'}`}
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                </button>
            </td>
        </tr>
    );
}

ClientRow.propTypes = {
    client: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    isDeleting: PropTypes.bool.isRequired,
};