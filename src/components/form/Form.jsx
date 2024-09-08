import React, { useEffect, useState } from "react";

const Form = () => {
  const initialvalues = { name: "", email: "", password: "" };
  const [formdata, setformdata] = useState(initialvalues);
  const [formerrors, setformErrors] = useState({});
  const [issubmit, setIssubmit] = useState(false);

  const handelchange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    setformErrors(validate(formdata));
    setIssubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formerrors).length === 0 && issubmit) {
     alert("Form submitted successfully!");
    }
  }, [formerrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is not valid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handelsubmit}
        className="bg-white p-8 shadow-md rounded-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formdata.name}
            onChange={handelchange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formerrors.name && <p className="text-red-500 text-sm">{formerrors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formdata.email}
            onChange={handelchange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formerrors.email && <p className="text-red-500 text-sm">{formerrors.email}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formdata.password}
            onChange={handelchange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formerrors.password && <p className="text-red-500 text-sm">{formerrors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
