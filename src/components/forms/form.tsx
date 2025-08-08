import React, { useState, useEffect, useRef } from 'react';
// usestate->Manages form fields and submission list
//useeffect->Handles focus behavior on mount
//useref->Accesses and focuses input element

type FormData = { // here the structure of the formData is defined
  name: string;
  email: string;
};

const MyForm: React.FC = () => { //Here the Functional component is defined
  const [formData, setFormData] = useState<FormData>({ //formData stores the current input values
    name: '',                                          //setData is the function to update formData 
    email: '',
  });

  const [submissions, setSubmissions] = useState<FormData[]>([]); //submissions is the array which store submitted values
  const [showSuccess, setShowSuccess] = useState(false); //control display of a msg after submission

  const nameInputRef = useRef<HTMLInputElement>(null); //create ref to input fields

  useEffect(() => { //run after component mounts, automatically focus on input fields
    nameInputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { //Triggered every time a user types in the input.
    // Get the name and only update that specific field in the FormData
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev, //...prev keeps the other field unchanged.
      [name as keyof FormData]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //stops the page from refreshing.

    setSubmissions(prev => [...prev, formData]); //adds current form data to the submissions array.
    setFormData({ name: '', email: '' }); //clears the form.

    setShowSuccess(true); // shows success message
    setTimeout(() => setShowSuccess(false), 2000); // Hide after 2s
  };

  const handleReset = () => {
    setFormData({ name: '', email: '' });//Resets the form inputs to empty strings.
    nameInputRef.current?.focus(); //Focuses the name field again using nameInputRef.
  };
  const handleDelete = (indexToDelete: number) => { //it will represent the row which we want to delete
  setSubmissions(prev => prev.filter((_, index) => index !== indexToDelete));
};
return (
  
  <div className="w-full flex flex-col items-center justify-start min-h-screen bg-gray-100 py-10">
    
    {/* FORM stays same size always */}
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[450px] bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center text-blue-700">User Form</h2>

      <div className="h-8">
        {showSuccess && (
          <p className="text-green-600 text-center font-semibold bg-green-100 py-1 px-3 rounded">
             Submitted successfully!
          </p>
        )}
      </div>

      {/* Name Field */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          ref={nameInputRef}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          Reset
        </button>
      </div>
    </form>

    {/* TABLE will appear BELOW and NOT affect the form width */}
    {submissions.length > 0 && (
      <div className="w-full max-w-4xl mt-8 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Submitted Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-200">
  <thead className="bg-gray-100">
    <tr>
      <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Name</th>
      <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Email</th>
      <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>

    {submissions.map((item, index) => (
      <tr key={index} className="hover:bg-gray-50 transition">
        <td className="border border-gray-200 px-4 py-2 text-gray-800">{item.name}</td>
        <td className="border border-gray-200 px-4 py-2 text-gray-800">{item.email}</td>
        <td className="border border-gray-200 px-4 py-2 text-center">
          <button
            onClick={() => handleDelete(index)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
      </div>
    )}
  </div>
);


};

export default MyForm;
