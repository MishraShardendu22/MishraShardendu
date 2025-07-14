/* eslint-disable @typescript-eslint/no-explicit-any */
interface FormFieldsProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export const FormFields = ({ formData, handleChange }: FormFieldsProps) => {
  return (
    <>
      <div className="md:col-span-2">
        <label className="block text-gray-700 font-medium mb-2">
          Event Name
        </label>
        <input
          type="text"
          name="name"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
          placeholder="Enter event name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          name="description"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
          placeholder="Describe your event"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="relative">
        <label className="block text-gray-700 font-medium mb-2">Date</label>
        <input
          type="date"
          name="date"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300 pl-10"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <svg
          className="absolute left-3 top-10 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <div className="relative">
        <label className="block text-gray-700 font-medium mb-2">Location</label>
        <input
          type="text"
          name="location"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300 pl-10"
          placeholder="Virtual or physical location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <svg
          className="absolute left-3 top-10 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>

      <div className="relative">
        <label className="block text-gray-700 font-medium mb-2">
          Ticket Price (ETH)
        </label>
        <input
          type="text"
          name="price"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300 pl-10"
          placeholder="0.05"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <svg
          className="absolute left-3 top-10 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Total Tickets
        </label>
        <input
          type="number"
          name="totalTickets"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
          placeholder="100"
          value={formData.totalTickets}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Category</label>
        <select
          name="category"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Tech">Tech</option>
          <option value="Music">Music</option>
          <option value="Art">Art</option>
          <option value="Sports">Sports</option>
          <option value="Business">Business</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Event Image URL
        </label>
        <input
          type="text"
          name="imageUrl"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
          placeholder="https://..."
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Can Be Resold
        </label>
        <input
          type="checkbox"
          name="canBeResold"
          checked={formData.canBeResold}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Royalty Percent
        </label>
        <input
          type="number"
          name="royaltyPercent"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
          placeholder="10"
          value={formData.royaltyPercent}
          onChange={handleChange}
          min="0"
          max="100"
          required
        />
      </div>
    </>
  );
};
