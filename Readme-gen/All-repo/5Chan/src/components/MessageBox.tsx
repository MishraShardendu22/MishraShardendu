import React from 'react';
import dayjs from 'dayjs';

interface MessageBoxProps {
  message: {
    _id: string;
    content: string;
    createdAt: string;
  };
  onMessageDelete: (id: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`/api/delete-message/${message?._id}`);
  //     onMessageDelete(message._id);
  //   } catch (err) {
  //     console.error(err);
  //     alert('Failed to delete the message. Please try again.');
  //   }
  // };

  return (
    <div className="flex items-start justify-between p-4 bg-gray-100 rounded-md shadow-md">
      <div>
        <p className="text-lg font-medium">{message?.content}</p>
        <p className="text-sm text-gray-500">
          {dayjs(message?.createdAt).format('MMM D, YYYY h:mm A')}
        </p>
      </div>
      {/* <button
        onClick={handleDelete}
        className="ml-4 text-red-500 hover:text-red-700 transition-colors"
      >
        <Delete />
      </button> */}
    </div>
  );
};

export default MessageBox;
