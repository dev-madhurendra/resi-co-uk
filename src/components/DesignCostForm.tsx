import React, { useState } from "react";

export default function DesignCostForm() {
  const [formData, setFormData] = useState({
    propertyType: "",
    extensionType: "",
    bedrooms: "",
    startTime: "",
    services: [],
    firstName: "",
    lastName: "",
    projectAddress: "",
    projectPostcode: "",
    email: "",
    phone: "",
    hearAboutUs: "",
    acceptTerms: false,
    updates: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "services") {
      const updatedServices = checked
        ? [...formData.services, value]
        : formData.services.filter((service) => service !== value);
      setFormData({ ...formData, services: updatedServices });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center p-4">
      <div className="bg-white shadow-lg rounded-xl max-w-4xl w-full p-6">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-4">Calculate your design costs</h1>
        <p className="text-center text-gray-500 mb-8">
          Get an instant price estimate on architectural drawings and planning support from the highest-rated practice on Trustpilot.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Type */}
          <div>
            <p className="text-lg font-medium mb-2">What sort of property is this?</p>
            <div className="grid grid-cols-3 gap-4">
              {["Detached", "Semi Detached", "Terrace", "Flat", "Bungalow"].map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`border rounded-lg py-2 px-4 text-center ${
                    formData.propertyType === type ? "bg-purple-200 border-purple-700" : "bg-gray-100 border-gray-300"
                  }`}
                  onClick={() => setFormData({ ...formData, propertyType: type })}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Extension Type */}
          <div>
            <p className="text-lg font-medium mb-2">And which bit do you want to extend?</p>
            <div className="grid grid-cols-3 gap-4">
              {["Ground Floor", "Loft", "First Floor", "Other"].map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`border rounded-lg py-2 px-4 text-center ${
                    formData.extensionType === type ? "bg-purple-200 border-purple-700" : "bg-gray-100 border-gray-300"
                  }`}
                  onClick={() => setFormData({ ...formData, extensionType: type })}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <p className="text-lg font-medium mb-2">How many bedrooms does this property have?</p>
            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, "5+"].map((count) => (
                <button
                  type="button"
                  key={count}
                  className={`border rounded-lg py-2 px-4 text-center ${
                    formData.bedrooms === count ? "bg-purple-200 border-purple-700" : "bg-gray-100 border-gray-300"
                  }`}
                  onClick={() => setFormData({ ...formData, bedrooms: count })}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Start Time */}
          <div>
            <p className="text-lg font-medium mb-2">When are you hoping to start the design process?</p>
            <div className="grid grid-cols-5 gap-4">
              {["ASAP", "3 Months", "6 Months", "12 Months +", "I'm not sure"].map((time) => (
                <button
                  type="button"
                  key={time}
                  className={`border rounded-lg py-2 px-4 text-center ${
                    formData.startTime === time ? "bg-purple-200 border-purple-700" : "bg-gray-100 border-gray-300"
                  }`}
                  onClick={() => setFormData({ ...formData, startTime: time })}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-lg font-medium mb-2">Are you interested in any of these services?</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Architectural drawings",
                "Design and planning advice",
                "Help with financing my build",
                "Help finding a builder",
                "Help finding other professionals",
              ].map((service) => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={handleChange}
                    className="form-checkbox text-purple-700"
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* User Details */}
          <div>
            <p className="text-lg font-medium mb-2">A few details from you, please...</p>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name*"
                value={formData.firstName}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name*"
                value={formData.lastName}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="projectAddress"
                placeholder="Project address*"
                value={formData.projectAddress}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
              <input
                type="text"
                name="projectPostcode"
                placeholder="Project postcode*"
                value={formData.projectPostcode}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address*"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
              required
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number*"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
              required
            />
          </div>

          <div>
            <p className="text-lg font-medium mb-2">How did you hear about us?</p>
            <input
              type="text"
              name="hearAboutUs"
              value={formData.hearAboutUs}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="form-checkbox text-purple-700"
              required
            />
            <label>I accept the terms and conditions</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="updates"
              checked={formData.updates}
              onChange={handleChange}
              className="form-checkbox text-purple-700"
            />
            <label>I would like to receive updates and promotions</label>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-purple-700 text-white py-2 px-6 rounded-lg hover:bg-purple-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

