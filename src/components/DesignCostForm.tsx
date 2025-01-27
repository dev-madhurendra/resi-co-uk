import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

interface FormData {
  propertyType: string;
  extensionType: string;
  bedrooms: string;
  timeline: string;
  services: string[];
  firstName: string;
  lastName: string;
  address: string;
  postcode: string;
  email: string;
  phone: string;
  source: string;
  acceptTerms: boolean;
  newsletter: boolean;
  groundFloorType: string;
}

const DesignCostCalculator: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    propertyType: '',
    extensionType: '',
    bedrooms: '',
    timeline: '',
    services: [],
    firstName: '',
    lastName: '',
    address: '',
    postcode: '',
    email: '',
    phone: '',
    source: '',
    acceptTerms: false,
    newsletter: false,
    groundFloorType:''
  });

  const [showGroundFloorOptions, setShowGroundFloorOptions] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const propertyTypes = [
    { id: 'detached', label: 'Detached' },
    { id: 'semi-detached', label: 'Semi Detached' },
    { id: 'terrace', label: 'Terrace' },
    { id: 'flat', label: 'Flat' },
    { id: 'bungalow', label: 'Bungalow' },
  ];

  const extensionTypes = [
    { id: 'ground-floor', label: 'Ground Floor' },
    { id: 'loft', label: 'Loft' },
    { id: 'first-floor', label: 'First Floor' },
    { id: 'other', label: 'Other' },
  ];

  const bedroomOptions = ['1', '2', '3', '4', '5+'];
  const timelineOptions = ['ASAP', '3 Months', '6 Months', '12 Months +', "I'm not sure"];

  const services = [
    'Architectural drawings',
    'Design and planning advice',
    'Help with financing my build',
    'Help finding a builder',
    'Help finding other professionals',
  ];

  const groundFloorTypes = [
    { id: 'rear', label: 'Rear' },
    { id: 'side-infill', label: 'Side Infill' },
    { id: 'side', label: 'Side' },
    { id: 'wraparound', label: 'Wraparound' },
    { id: 'side-and-rear', label: 'Side And Rear' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && 
          buttonRef.current && 
          !tooltipRef.current.contains(event.target as Node) && 
          !buttonRef.current.contains(event.target as Node)) {
        setShowGroundFloorOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSelectGroundFloorType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      extensionType: 'ground-floor',
      groundFloorType: type
    }));
  };

  

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const GroundFloorTooltip = () => (
    <div 
      ref={tooltipRef}
      className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
      style={{
        top: '100%',
        left: '0',
        width: '320px',
        marginTop: '8px'
      }}
    >
      <div className="space-y-3 grid grid-cols-2 gap-4 ">
        {groundFloorTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => handleSelectGroundFloorType(type.id)}
            className={`w-full p-3 border rounded-lg text-left hover:border-purple-500 transition-colors flex items-center gap-3
              ${formData.groundFloorType === type.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-purple-200 rounded" />
            </div>
            <span className="text-sm font-medium">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-purple-50 py-8 px-4 ">
      <div className="mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            Calculate your design costs
          </h1>
          <p className="text-gray-600 mb-4">
            Get an instant price estimate on architectural drawings and planning support from the
            highest-rated practice on Trustpilot. Don't worry, it's free.
          </p>
          <div className="flex items-center justify-center gap-4">
            <p className="text-sm text-gray-500 italic">
              "Resi solves so many pain points for home renovators" — Sheena Amin, ITV
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Excellent</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                ))}
              </div>
              <span className="text-sm">Trustpilot</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-8">
            {/* Property Type */}
            <div>
              <h2 className="text-2xl font-semibold text-purple-900 mb-4 text-left">
                What sort of property is this?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, propertyType: type.id }));
                  }}
                  className={`p-4 border rounded-lg text-center hover:border-purple-500 transition-colors ${
                    formData.propertyType === type.id ? 'border-purple-500' : 'border-gray-200'
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-2 bg-purple-100 rounded-lg"></div>
                  <span className="text-sm font-medium">{type.label}</span>
                  
                </button>
              ))}
            </div>
            </div>

            {/* Extension Type */}
            <div>
              <h2 className="text-2xl font-semibold text-purple-900 mb-4">
                And which bit do you want to extend?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {extensionTypes.map((type) => (
                  <div key={type.id} className="relative">
                    <button
                      ref={type.id === 'ground-floor' ? buttonRef : undefined}
                      type="button"
                      onClick={() => {
                        if (type.id === 'ground-floor') {
                          setShowGroundFloorOptions(!showGroundFloorOptions);
                        } else {
                          setFormData(prev => ({ 
                            ...prev, 
                            extensionType: type.id,
                            groundFloorType: '' 
                          }));
                          setShowGroundFloorOptions(false);
                        }
                      }}
                      className={`w-full p-4 border rounded-lg text-center hover:border-purple-500 transition-colors
                        ${formData.extensionType === type.id ? 'border-purple-500' : 'border-gray-200'}`}
                    >
                      <div className="w-16 h-16 mx-auto mb-2 bg-purple-100 rounded-lg" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                    {type.id === 'ground-floor' && showGroundFloorOptions && <GroundFloorTooltip />}
                  </div>
                ))}
              </div>
            </div>


            {/* Bedrooms */}
            <div>
              <h2 className="text-2xl font-semibold text-purple-900 mb-1 text-left">
                How many bedrooms does this property have?
              </h2>
              <p className="text-sm text-gray-500 mb-4 text-left">
                This will give us an idea of the property's size
              </p>
              <div className="grid grid-cols-5 gap-4">
                {bedroomOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, bedrooms: option }))}
                    className={`p-4 border rounded-lg text-center hover:border-purple-500 transition-colors
                      ${formData.bedrooms === option ? 'border-purple-500' : 'border-gray-200'}`}
                  >
                    <span className="text-sm font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-2xl font-semibold text-purple-900 mb-4 text-left">
                When are you hoping to start the design process?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {timelineOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, timeline: option }))}
                    className={`p-4 border rounded-lg text-center hover:border-purple-500 transition-colors
                      ${formData.timeline === option ? 'border-purple-500' : 'border-gray-200'}`}
                  >
                    <span className="text-sm font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-2xl font-semibold text-purple-900 mb-4 text-left">
                Are you interested in any of these services?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <label
                    key={service}
                    className={`p-4 border rounded-lg hover:border-purple-500 transition-colors cursor-pointer
                      ${formData.services.includes(service) ? 'border-purple-500' : 'border-gray-200'}`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                    />
                    <span className="text-sm font-medium">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Personal Details */}
            <div>
              <h2 className="text-2xl font-semibold text-purple-900 mb-4 text-left">
                A few details from you, please...
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last name*
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First line of project address*
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project postcode*
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    value={formData.postcode}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone*
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Where did you hear about us?
              </label>
              <select
                name="source"
                className="w-2xl p-3 border border-gray-200 rounded-lg flex"
                value={formData.source}
                onChange={handleInputChange}
              >
                <option value="">None selected</option>
                <option value="google">Google</option>
                <option value="friend">Friend</option>
                <option value="social">Social Media</option>
              </select>
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-4">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  className="mt-1"
                  checked={formData.acceptTerms}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm">
                  I accept the{' '}
                  <a href="#" className="text-purple-600 underline">
                    terms and conditions
                  </a>
                  *
                </span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="newsletter"
                  className="mt-1"
                  checked={formData.newsletter}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm">
                  Keep me updated on Resi news, events and offers.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Reveal my quick quote →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DesignCostCalculator;
