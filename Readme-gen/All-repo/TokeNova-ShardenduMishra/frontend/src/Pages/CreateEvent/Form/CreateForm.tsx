/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormFields } from "./FormField";

interface CreateEventFormProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const CreateEventForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
}: CreateEventFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFields formData={formData} handleChange={handleChange} />

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg font-bold hover:bg-indigo-800 hover:shadow-xl transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Event...
              </span>
            ) : (
              "Create Event"
            )}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </form>
  );
};

export default CreateEventForm;
