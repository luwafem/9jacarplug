import React, { useState, useEffect, useRef, useCallback } from 'react';

// Define the car data globally or within App component
// Each model now includes its common body style
const carData = {
  Toyota: {
    Camry: "Sedan", Corolla: "Sedan", RAV4: "SUV", Highlander: "SUV", Sienna: "Minivan",
    Tacoma: "Truck", Tundra: "Truck", Prado: "SUV", "Land Cruiser": "SUV"
  },
  Honda: {
    Civic: "Sedan", Accord: "Sedan", "CR-V": "SUV", Pilot: "SUV", Odyssey: "Minivan",
    Ridgelin: "Truck"
  },
  'Mercedes-Benz': {
    "C-Class": "Sedan", "E-Class": "Sedan", "S-Class": "Sedan", GLC: "SUV", GLE: "SUV",
    "G-Class": "SUV", "A-Class": "Sedan"
  },
  BMW: {
    "3 Series": "Sedan", "5 Series": "Sedan", "7 Series": "Sedan", X1: "SUV", X3: "SUV",
    X5: "SUV", X7: "SUV"
  },
  Ford: {
    "F-150": "Truck", Explorer: "SUV", Escape: "SUV", Mustang: "Coupe", Focus: "Hatchback",
    Edge: "SUV", Ranger: "Truck"
  },
  Nissan: {
    Altima: "Sedan", Maxima: "Sedan", Rogue: "SUV", Titan: "Truck", Sentra: "Sedan",
    Pathfinder: "SUV", Murano: "SUV"
  },
  Hyundai: {
    Elantra: "Sedan", Sonata: "Sedan", Tucson: "SUV", "Santa Fe": "SUV", Kona: "SUV",
    Palisade: "SUV"
  },
  Kia: {
    Forte: "Sedan", K5: "Sedan", Sportage: "SUV", Sorento: "SUV", Telluride: "SUV",
    Rio: "Hatchback"
  },
  Volkswagen: {
    Jetta: "Sedan", Passat: "Sedan", Tiguan: "SUV", Atlas: "SUV", Golf: "Hatchback"
  },
  Audi: {
    A3: "Sedan", A4: "Sedan", A6: "Sedan", Q3: "SUV", Q5: "SUV", Q7: "SUV"
  },
  Lexus: {
    ES: "Sedan", RX: "SUV", GX: "SUV", LS: "Sedan", NX: "SUV", LX: "SUV"
  },
  Chevrolet: {
    Silverado: "Truck", Equinox: "SUV", Malibu: "Sedan", Traverse: "SUV", Tahoe: "SUV",
    Camaro: "Coupe"
  },
  Porsche: {
    "911": "Coupe", Cayenne: "SUV", Panamera: "Sedan", Macan: "SUV", Taycan: "Sedan"
  },
  'Land Rover': {
    "Range Rover": "SUV", Discovery: "SUV", Defender: "SUV", Evoque: "SUV", Velar: "SUV"
  },
  Jeep: {
    Wrangler: "SUV", "Grand Cherokee": "SUV", Cherokee: "SUV", Renegade: "SUV", Compass: "SUV"
  },
  Subaru: {
    Outback: "SUV", Forester: "SUV", Impreza: "Sedan", Crosstrek: "SUV", Legacy: "Sedan"
  },
  Mazda: {
    Mazda3: "Sedan", Mazda6: "Sedan", "CX-5": "SUV", "CX-9": "SUV", "MX-5 Miata": "Convertible"
  },
  Volvo: {
    S60: "Sedan", S90: "Sedan", XC40: "SUV", XC60: "SUV", XC90: "SUV"
  },
  Tesla: {
    "Model 3": "Sedan", "Model S": "Sedan", "Model X": "SUV", "Model Y": "SUV", Cybertruck: "Truck"
  },
  Peugeot: {
    "308": "Hatchback", "508": "Sedan", "2008": "SUV", "3008": "SUV", "5008": "SUV"
  },
  'Mercedes-Benz Trucks': {
    Actros: "Truck", Arocs: "Truck", Atego: "Truck"
  },
  Man: {
    TGX: "Truck", TGS: "Truck", TGM: "Truck"
  },
  DAF: {
    XF: "Truck", CF: "Truck", LF: "Truck"
  },
  Scania: {
    "R-series": "Truck", "S-series": "Truck", "G-series": "Truck"
  },
  'Volvo Trucks': {
    FH: "Truck", FM: "Truck", FMX: "Truck"
  },
  'Renault Trucks': {
    "T-range": "Truck", "C-range": "Truck", "K-range": "Truck"
  },
  Iveco: {
    Daily: "Truck", Eurocargo: "Truck", Stralis: "Truck"
  },
  Hino: {
    "300 Series": "Truck", "500 Series": "Truck", "700 Series": "Truck"
  },
  Isuzu: {
    "D-Max": "Truck", "N-Series": "Truck", "F-Series": "Truck"
  },
  'Ford Trucks': {
    Cargo: "Truck", Transit: "Van"
  },
};


// Component for Step 1: Contact Information
const StepOne = ({ formData, handleChange, nextStep, errors, hasErrorsForCurrentStep, setIsWhatsappSameAsPhone, isWhatsappSameAsPhone }) => {

  const handlePhoneInputChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    // Ensure it always starts with +234
    if (!value.startsWith('+234')) {
      value = '+234' + value.replace(/[^0-9]/g, '').substring(3); // Keep only numbers after +234, limit to original length
    } else {
      value = '+234' + value.substring(4).replace(/[^0-9]/g, ''); // Ensure only numbers after prefix
    }

    // If the value becomes just '+234' and it's not the initial load, allow it to be just '+234'
    if (value === '+234' && e.target.value.length < 4) {
      value = '+234';
    }

    handleChange({ target: { name, value } });

    // If WhatsApp is set to be same as phone, update it too
    if (isWhatsappSameAsPhone && name === 'phone') {
      handleChange({ target: { name: 'whatsappNumber', value } });
    }
  };

  const handleWhatsappCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsWhatsappSameAsPhone(checked);
    if (checked) {
      handleChange({ target: { name: 'whatsappNumber', value: formData.phone } });
    } else {
      handleChange({ target: { name: 'whatsappNumber', value: '+234' } }); // Reset or clear
    }
  };

  return (
    <div className="space-y-6">
      {hasErrorsForCurrentStep() && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
          <strong className="font-bold">Oops!</strong>
          <span className="block sm:inline ml-2">Please correct the errors below to proceed.</span>
        </div>
      )}
      <h3 className="text-2xl font-semibold text-gray-800">Step 1: Your Contact Information</h3>
      <p className="text-gray-600">Let us know how to reach you.</p>
      <div>
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          placeholder="Your Name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          placeholder="Your-Mail@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handlePhoneInputChange}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          placeholder="+234..."
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="whatsappNumber" className="block text-gray-700 font-medium mb-2">WhatsApp Number</label>
        <input
          type="tel"
          id="whatsappNumber"
          name="whatsappNumber"
          value={formData.whatsappNumber}
          onChange={handlePhoneInputChange} // Use the same handler for consistency
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          placeholder="+234..."
          disabled={isWhatsappSameAsPhone} // Disable if checkbox is checked
        />
        {errors.whatsappNumber && <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber}</p>}
        <div className="mt-2 flex items-center">
          <input
            type="checkbox"
            id="sameAsPhone"
            checked={isWhatsappSameAsPhone}
            onChange={handleWhatsappCheckboxChange}
            className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="sameAsPhone" className="ml-2 text-gray-700 text-sm">Same as Phone Number</label>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Component for a single car preference entry
const CarPreferenceFields = ({
  carIndex,
  carPreference,
  handleCarPreferenceChange,
  removeCarPreference,
  errors,
  currentSelectedBrand, // This prop now correctly holds the selected brand for this car
  setCurrentSelectedBrand, // This is the setter from the parent to update the brand in the parent's state
}) => {
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [modelSuggestions, setModelSuggestions] = useState([]);

  const brandInputRef = useRef(null);
  const modelInputRef = useRef(null);

  // Effect to handle clicks outside the suggestion lists to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (brandInputRef.current && !brandInputRef.current.contains(event.target)) {
        setBrandSuggestions([]);
      }
      if (modelInputRef.current && !modelInputRef.current.contains(event.target)) {
        setModelSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle change for vehicleMake input with suggestions
  const handleMakeChange = (e) => {
    const value = e.target.value;
    handleCarPreferenceChange(carIndex, 'vehicleMake', value); // Update specific car's make
    setCurrentSelectedBrand(carIndex, ''); // Reset selected brand in parent when typing
    setModelSuggestions([]); // Clear model suggestions
    handleCarPreferenceChange(carIndex, 'vehicleModel', ''); // Clear model
    handleCarPreferenceChange(carIndex, 'bodyStyle', ''); // Clear body style

    if (value.length > 0) {
      const filtered = Object.keys(carData).filter(brand =>
        brand.toLowerCase().includes(value.toLowerCase())
      );
      setBrandSuggestions(filtered);
    } else {
      setBrandSuggestions([]);
    }
  };

  // Handle selecting a brand from suggestions
  const handleBrandSelect = (brand) => {
    // Wrap in setTimeout to ensure state update happens after the click event fully propagates
    setTimeout(() => {
      handleCarPreferenceChange(carIndex, 'vehicleMake', brand);
      setCurrentSelectedBrand(carIndex, brand); // Update selected brand in parent state
      setBrandSuggestions([]); // Clear brand suggestions after selection
      handleCarPreferenceChange(carIndex, 'vehicleModel', ''); // Clear model when brand changes
      handleCarPreferenceChange(carIndex, 'bodyStyle', ''); // Clear body style when brand changes
    }, 0);
  };

  // Handle change for vehicleModel input with suggestions
  const handleModelChange = (e) => {
    const value = e.target.value;
    handleCarPreferenceChange(carIndex, 'vehicleModel', value);

    if (currentSelectedBrand && value.length > 0) {
      const models = Object.keys(carData[currentSelectedBrand] || {});
      const filtered = models.filter(model =>
        model.toLowerCase().includes(value.toLowerCase())
      );
      setModelSuggestions(filtered);
    } else {
      setModelSuggestions([]);
    }
  };

  // Handle selecting a model from suggestions
  const handleModelSelect = (model) => {
    handleCarPreferenceChange(carIndex, 'vehicleModel', model);
    setModelSuggestions([]);

    // Automatically set body style based on selected model
    if (currentSelectedBrand && carData[currentSelectedBrand] && carData[currentSelectedBrand][model]) {
      handleCarPreferenceChange(carIndex, 'bodyStyle', carData[currentSelectedBrand][model]);
    }
  };

  // Handle changes for checkbox group (Key Features)
  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    let updatedFeatures = [...carPreference.keyFeatures];
    if (checked) {
      updatedFeatures.push(value);
    } else {
      updatedFeatures = updatedFeatures.filter((feature) => feature !== value);
    }
    handleCarPreferenceChange(carIndex, 'keyFeatures', updatedFeatures);
  };

  const minYearAllowed = 2003;
  const currentYear = new Date().getFullYear();

  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold text-gray-800">Car #{carIndex + 1} Preferences</h4>
        {carIndex > 0 && ( // Only show remove button if it's not the first car
          <button
            type="button"
            onClick={() => removeCarPreference(carIndex)}
            className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Remove Car
          </button>
        )}
      </div>

      {/* Vehicle Make with Autocomplete */}
      <div className="relative mb-4" ref={brandInputRef}>
        <label htmlFor={`vehicleMake-${carIndex}`} className="block text-gray-700 font-medium mb-2">Vehicle Make</label>
        <input
          type="text"
          id={`vehicleMake-${carIndex}`}
          name={`vehicleMake-${carIndex}`} // Name can be generic if handled by index
          value={carPreference.vehicleMake}
          onChange={handleMakeChange}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          placeholder="e.g., Toyota, BMW, Ford"
          autoComplete="off"
        />
        {errors[`vehicleMake-${carIndex}`] && <p className="text-red-500 text-sm mt-1">{errors[`vehicleMake-${carIndex}`]}</p>}
        {brandSuggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto">
            {brandSuggestions.map((brand, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                onClick={() => handleBrandSelect(brand)}
              >
                {brand}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Vehicle Model with Autocomplete (conditional based on selected brand) */}
      <div className="relative mb-4" ref={modelInputRef}>
        <label htmlFor={`vehicleModel-${carIndex}`} className="block text-gray-700 font-medium mb-2">Vehicle Model</label>
        <input
          type="text"
          id={`vehicleModel-${carIndex}`}
          name={`vehicleModel-${carIndex}`}
          value={carPreference.vehicleModel}
          onChange={handleModelChange}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          placeholder={currentSelectedBrand ? `e.g., ${Object.keys(carData[currentSelectedBrand] || {})[0] || 'Model'}` : "Select a Make first"}
          disabled={!currentSelectedBrand}
          autoComplete="off"
        />
        {errors[`vehicleModel-${carIndex}`] && <p className="text-red-500 text-sm mt-1">{errors[`vehicleModel-${carIndex}`]}</p>}
        {modelSuggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto">
            {modelSuggestions.map((model, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                onClick={() => handleModelSelect(model)}
              >
                {model}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor={`vehicleYearMin-${carIndex}`} className="block text-gray-700 font-medium mb-2">Model Year Range (2003 onwards)</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              id={`vehicleYearMin-${carIndex}`}
              name={`vehicleYearMin-${carIndex}`}
              value={carPreference.vehicleYearMin}
              onChange={(e) => handleCarPreferenceChange(carIndex, 'vehicleYearMin', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder={`Min Year (e.g., ${minYearAllowed})`}
              min={minYearAllowed}
              max={currentYear + 1}
            />
          </div>
          <div>
            <input
              type="number"
              id={`vehicleYearMax-${carIndex}`}
              name={`vehicleYearMax-${carIndex}`}
              value={carPreference.vehicleYearMax}
              onChange={(e) => handleCarPreferenceChange(carIndex, 'vehicleYearMax', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder={`Max Year (e.g., ${currentYear})`}
              min={minYearAllowed}
              max={currentYear + 1}
            />
          </div>
        </div>
        {errors[`vehicleYear-${carIndex}`] && <p className="text-red-500 text-sm mt-1">{errors[`vehicleYear-${carIndex}`]}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor={`bodyStyle-${carIndex}`} className="block text-gray-700 font-medium mb-2">Body Style</label>
        <select
          id={`bodyStyle-${carIndex}`}
          name={`bodyStyle-${carIndex}`}
          value={carPreference.bodyStyle}
          onChange={(e) => handleCarPreferenceChange(carIndex, 'bodyStyle', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="">Select Body Style</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Truck">Truck</option>
          <option value="Coupe">Coupe</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Minivan">Minivan</option>
          <option value="Convertible">Convertible</option>
          <option value="Van">Van</option>
        </select>
        {errors[`bodyStyle-${carIndex}`] && <p className="text-red-500 text-sm mt-1">{errors[`bodyStyle-${carIndex}`]}</p>}
      </div>

      {/* Fuel Type */}
      <div className="mb-4">
        <label htmlFor={`fuelType-${carIndex}`} className="block text-gray-700 font-medium mb-2">Fuel Type</label>
        <select
          id={`fuelType-${carIndex}`}
          name={`fuelType-${carIndex}`}
          value={carPreference.fuelType}
          onChange={(e) => handleCarPreferenceChange(carIndex, 'fuelType', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        {errors[`fuelType-${carIndex}`] && <p className="text-red-500 text-sm mt-1">{errors[`fuelType-${carIndex}`]}</p>}
      </div>

      {/* Transmission Type */}
      <div className="mb-4">
        <label htmlFor={`transmissionType-${carIndex}`} className="block text-gray-700 font-medium mb-2">Transmission Type</label>
        <select
          id={`transmissionType-${carIndex}`}
          name={`transmissionType-${carIndex}`}
          value={carPreference.transmissionType}
          onChange={(e) => handleCarPreferenceChange(carIndex, 'transmissionType', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="">Select Transmission</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
        {errors[`transmissionType-${carIndex}`] && <p className="text-red-500 text-sm mt-1">{errors[`transmissionType-${carIndex}`]}</p>}
      </div>

      {/* Number of Seats */}
      <div className="mb-4">
        <label htmlFor={`numberOfSeats-${carIndex}`} className="block text-gray-700 font-medium mb-2">Number of Seats (Optional)</label>
        <select
          id={`numberOfSeats-${carIndex}`}
          name={`numberOfSeats-${carIndex}`}
          value={carPreference.numberOfSeats}
          onChange={(e) => handleCarPreferenceChange(carIndex, 'numberOfSeats', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="">Select Number of Seats</option>
          <option value="2">2 Seats</option>
          <option value="4">4 Seats</option>
          <option value="5">5 Seats</option>
          <option value="6">6 Seats</option>
          <option value="7">7 Seats</option>
          <option value="8+">8+ Seats</option>
        </select>
        {errors[`numberOfSeats-${carIndex}`] && <p className="text-red-500 text-sm mt-1">{errors[`numberOfSeats-${carIndex}`]}</p>}
      </div>

      {/* Car Condition */}
      <div className="mb-4">
        <label htmlFor={`carCondition-${carIndex}`} className="block text-gray-700 font-medium mb-2">Car Condition</label>
        <select
          id={`carCondition-${carIndex}`}
          name={`carCondition-${carIndex}`}
          value={carPreference.carCondition}
          onChange={(e) => handleCarPreferenceChange(carIndex, 'carCondition', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="">Select Condition</option>
          <option value="Tokunbo (Imported Used)">Tokunbo (Imported Used)</option>
          <option value="Nigeria Used">Nigeria Used</option>
          <option value="Brand New">Brand New</option>
        </select>
        {errors[`carCondition-${carIndex}`] && <p className="text-red-500 text-sm mt-1">{errors[`carCondition-${carIndex}`]}</p>}
      </div>

      {/* Conditional field for Maximum Desired Mileage */}
      {(carPreference.carCondition === 'Tokunbo (Imported Used)' || carPreference.carCondition === 'Nigeria Used') && (
        <div className="mb-4">
          <label htmlFor={`maxMileage-${carIndex}`} className="block text-gray-700 font-medium mb-2">Maximum Desired Mileage (km) (Optional)</label>
          <input
            type="number"
            id={`maxMileage-${carIndex}`}
            name={`maxMileage-${carIndex}`}
            value={carPreference.maxMileage}
            onChange={(e) => handleCarPreferenceChange(carIndex, 'maxMileage', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="e.g., 100,000"
            min="0"
          />
          {errors[`maxMileage-${carIndex}`] && <p className="text-red-500 text-sm mt-1">{errors[`maxMileage-${carIndex}`]}</p>}
        </div>
      )}

      {/* Key Features/Options */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Key Features/Options</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {['Sunroof/Moonroof', 'Leather Seats', 'Navigation System', 'Backup Camera/Parking Sensors', 'Apple CarPlay/Android Auto', 'All-Wheel Drive (AWD) / 4x4', 'Heated Seats', 'Bluetooth Connectivity'].map((feature) => (
            <div key={feature} className="flex items-center">
              <input
                type="checkbox"
                id={`${feature.replace(/\s|\/|\(|\)/g, '')}-${carIndex}`}
                name={`keyFeatures-${carIndex}`}
                value={feature}
                checked={carPreference.keyFeatures.includes(feature)}
                onChange={handleFeatureChange}
                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor={`${feature.replace(/\s|\/|\(|\)/g, '')}-${carIndex}`} className="ml-2 text-gray-700 text-sm">{feature}</label>
            </div>
          ))}
        </div>
        {errors[`keyFeatures-${carIndex}`] && <p className="text-red-500 text-sm mt-1">{errors[`keyFeatures-${carIndex}`]}</p>}
      </div>

      {/* Car Color */}
      <div>
        <label htmlFor={`carColor-${carIndex}`} className="block text-gray-700 font-medium mb-2">Desired Car Color</label>
        <input
          type="text"
          id={`carColor-${carIndex}`}
          name={`carColor-${carIndex}`}
          value={carPreference.carColor}
          onChange={(e) => handleCarPreferenceChange(carIndex, 'carColor', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          placeholder="e.g., Black, White, Blue, Red"
        />
        {errors[`carColor-${carIndex}`] && <p className="text-red-500 text-sm mt-1">{errors[`carColor-${carIndex}`]}</p>}
      </div>
    </div>
  );
};


// Component for Step 2: Vehicle Preferences (now orchestrates multiple car preferences)
const StepTwo = ({ formData, handleChange, nextStep, prevStep, errors, hasErrorsForCurrentStep, addCarPreference, removeCarPreference, handleCarPreferenceChange }) => {
  // We need a way to manage the selected brand for each individual car preference for autocomplete
  // This will be an array of states, one for each car preference
  const [selectedBrands, setSelectedBrands] = useState(formData.carPreferences.map(car => car.vehicleMake || ''));

  // Function to update a specific selected brand in the array
  const updateSelectedBrand = useCallback((index, brand) => {
    setSelectedBrands(prev => {
      const newBrands = [...prev];
      newBrands[index] = brand;
      return newBrands;
    });
  }, []); // Empty dependency array ensures this function is stable

  return (
    <div className="space-y-6">
      {hasErrorsForCurrentStep() && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
          <strong className="font-bold">Oops!</strong>
          <span className="block sm:inline ml-2">Please correct the errors below to proceed.</span>
        </div>
      )}
      <h3 className="text-2xl font-semibold text-gray-800">Step 2: Vehicle Preferences</h3>
      <p className="text-gray-600 mb-8">Tell us about the car(s) you're looking for.</p>

      {formData.carPreferences.map((carPreference, index) => (
        <CarPreferenceFields
          key={index} // Using index as key is generally okay for stable lists like this
          carIndex={index}
          carPreference={carPreference}
          handleCarPreferenceChange={handleCarPreferenceChange}
          removeCarPreference={removeCarPreference}
          errors={errors}
          currentSelectedBrand={selectedBrands[index]} // Pass the specific selected brand for this car
          setCurrentSelectedBrand={updateSelectedBrand} // Pass the stable setter function
        />
      ))}

      <button
        type="button"
        onClick={addCarPreference}
        className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200"
      >
        Add Another Car
      </button>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};


// Component for Step 3: Budget & Trade-in
const StepThree = ({ formData, handleChange, handleSubmit, prevStep, errors, hasErrorsForCurrentStep }) => (
  <div className="space-y-6">
    {hasErrorsForCurrentStep() && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
          <strong className="font-bold">Oops!</strong>
          <span className="block sm:inline ml-2">Please correct the errors below to proceed.</span>
        </div>
    )}
    <h3 className="text-2xl font-semibold text-gray-800">Step 3: Budget & Additional Details</h3>
    <p className="text-gray-600">Tell us about your budget and any other requirements.</p>
    <div>
      <label htmlFor="minPrice" className="block text-gray-700 font-medium mb-2">Price Range (NGN)</label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="Min Price (e.g., 5,000,000)"
            min="0"
          />
          {errors.minPrice && <p className="text-red-500 text-sm mt-1">{errors.minPrice}</p>}
        </div>
        <div>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="Max Price (e.g., 15,000,000)"
            min="0"
          />
          {errors.maxPrice && <p className="text-red-500 text-sm mt-1">{errors.maxPrice}</p>}
        </div>
      </div>
      {errors.priceRange && <p className="text-red-500 text-sm mt-1">{errors.priceRange}</p>}
    </div>

    {/* Conditional fields for Swap */}
    <div>
      <label htmlFor="swap" className="block text-gray-700 font-medium mb-2">Do you want to swap a vehicle?</label>
      <select
        id="swap"
        name="swap"
        value={formData.swap}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
      >
        <option value="">Select Option</option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
      {errors.swap && <p className="text-red-500 text-sm mt-1">{errors.swap}</p>}
    </div>

    {formData.swap === 'Yes' && (
      <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-white">
        <h4 className="text-lg font-semibold text-gray-700">Swap Vehicle Details</h4>
        <div>
          <label htmlFor="swapMake" className="block text-gray-700 font-medium mb-2">Swap Make</label>
          <input
            type="text"
            id="swapMake"
            name="swapMake"
            value={formData.swapMake}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="e.g., Honda"
          />
          {errors.swapMake && <p className="text-red-500 text-sm mt-1">{errors.swapMake}</p>}
        </div>
        <div>
          <label htmlFor="swapModel" className="block text-gray-700 font-medium mb-2">Swap Model</label>
          <input
            type="text"
            id="swapModel"
            name="swapModel"
            value={formData.swapModel}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="e.g., Civic"
          />
          {errors.swapModel && <p className="text-red-500 text-sm mt-1">{errors.swapModel}</p>}
        </div>
        <div>
          <label htmlFor="swapYear" className="block text-gray-700 font-medium mb-2">Swap Year</label>
          <input
            type="number"
            id="swapYear"
            name="swapYear"
            value={formData.swapYear}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="e.g., 2015"
            min="1900"
            max={new Date().getFullYear()}
          />
          {errors.swapYear && <p className="text-red-500 text-sm mt-1">{errors.swapYear}</p>}
        </div>
        <div>
          <label htmlFor="swapMileage" className="block text-gray-700 font-medium mb-2">Swap Mileage</label>
          <input
            type="number"
            id="swapMileage"
            name="swapMileage"
            value={formData.swapMileage}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="e.g., 80000"
            min="0"
          />
          {errors.swapMileage && <p className="text-red-500 text-sm mt-1">{errors.swapMileage}</p>}
        </div>
      </div>
    )}

    <div>
      <label htmlFor="timeframe" className="block text-gray-700 font-medium mb-2">Desired Timeframe</label>
      <select
        id="timeframe"
        name="timeframe"
        value={formData.timeframe}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
      >
        <option value="">Select Timeframe</option>
        <option value="Urgent (within 1-2 weeks)">Urgent (within 1-2 weeks)</option>
        <option value="Within 1 month">Within 1 month</option>
        <option value="Within 2-3 months">Within 2-3 months</option>
        <option value="Just browsing">Just browsing</option>
      </select>
      {errors.timeframe && <p className="text-red-500 text-sm mt-1">{errors.timeframe}</p>}
    </div>

    <div>
      <label htmlFor="additionalNotes" className="block text-gray-700 font-medium mb-2">Additional Notes / Specific Features</label>
      <textarea
        id="additionalNotes"
        name="additionalNotes"
        value={formData.additionalNotes}
        onChange={handleChange}
        rows="4"
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        placeholder="Any specific colors, features, or details you're looking for?"
      ></textarea>
    </div>

    <div className="flex justify-between">
      <button
        type="button"
        onClick={prevStep}
        className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200"
      >
        Previous
      </button>
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200"
      >
        Submit Request
      </button>
    </div>
  </div>
);

// New Modal Component for Car Details
const CarDetailModal = ({ car, onClose }) => {
  if (!car) return null; // Don't render if no car is selected

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">{car.make} {car.model}</h3>
        <img
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover rounded-lg mb-4"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/E0E7FF/3B82F6?text=Car+Image`; }}
        />
        <div className="text-gray-700 space-y-2 mb-4">
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Price:</strong> {car.price}</p>
          <p><strong>Condition:</strong> {car.condition}</p>
          <p><strong>Mileage:</strong> {car.mileage}</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          <p><strong>Transmission:</strong> {car.transmissionType}</p>
          <p><strong>Body Style:</strong> {car.bodyStyle}</p>
          {car.features && car.features.length > 0 && (
            <div>
              <strong>Features:</strong>
              <ul className="list-disc list-inside ml-4">
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <p className="text-gray-700 mb-4">
          This is an example of a {car.year} {car.make} {car.model} available through our network.
          Contact us for more details!
        </p>
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};


// Main App component
const App = () => {
  // Default structure for a single car preference object
  const initialCarPreference = {
    vehicleMake: '',
    vehicleModel: '',
    vehicleYearMin: '',
    vehicleYearMax: '',
    carCondition: '',
    bodyStyle: '',
    carColor: '',
    fuelType: '',
    transmissionType: '',
    maxMileage: '',
    numberOfSeats: '',
    keyFeatures: [],
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+234', // Pre-fill with +234
    whatsappNumber: '+234', // Pre-fill with +234
    carPreferences: [initialCarPreference], // Initialize with one car preference
    minPrice: '',
    maxPrice: '',
    swap: 'No', // Changed from tradeIn
    swapMake: '', // Changed from tradeInMake
    swapModel: '', // Changed from tradeInModel
    swapYear: '', // Changed from tradeInYear
    swapMileage: '', // Changed from tradeInMileage
    timeframe: '',
    additionalNotes: '',
  });
  const [errors, setErrors] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isWhatsappSameAsPhone, setIsWhatsappSameAsPhone] = useState(false); // New state for checkbox

  // State for modal
  const [showCarDetailModal, setShowCarDetailModal] = useState(false);
  const [selectedCarForModal, setSelectedCarForModal] = useState(null);

  // Function to open the modal with specific car details
  const openCarDetailModal = (car) => {
    setSelectedCarForModal(car);
    setShowCarDetailModal(true);
  };

  // Function to close the modal
  const closeCarDetailModal = () => {
    setShowCarDetailModal(false);
    setSelectedCarForModal(null); // Ensure selected car is cleared
  };


  // Handles changes for top-level form fields (not car preferences)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  // Handles changes for fields within a specific car preference object
  const handleCarPreferenceChange = (index, name, value) => {
    setFormData((prevFormData) => {
      const newCarPreferences = [...prevFormData.carPreferences];
      newCarPreferences[index] = {
        ...newCarPreferences[index],
        [name]: value,
      };
      console.log(`Updating car ${index}, field ${name} to:`, value); // Log for debugging
      return { ...prevFormData, carPreferences: newCarPreferences };
    });
    // Clear error for the specific car field being changed
    if (errors[`${name}-${index}`]) {
      setErrors((prevErrors) => ({ ...prevErrors, [`${name}-${index}`]: '' }));
    }
  };

  // Adds a new empty car preference object to the array
  const addCarPreference = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      carPreferences: [...prevFormData.carPreferences, { ...initialCarPreference }],
    }));
  };

  // Removes a car preference object from the array by index
  const removeCarPreference = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      carPreferences: prevFormData.carPreferences.filter((_, index) => index !== indexToRemove),
    }));
    // Clear any errors associated with the removed car
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      Object.keys(newErrors).forEach(key => {
        if (key.endsWith(`-${indexToRemove}`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  // Validates the current step's fields before proceeding
  const validateStep = () => {
    let newErrors = {};
    let isValid = true;

    // Validation for Step 1: Contact Information
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required.';
        isValid = false;
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required.';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid.';
        isValid = false;
      }
      // Validate phone number: must start with +234 and have at least 10 digits total
      if (!formData.phone.trim() || !formData.phone.startsWith('+234') || formData.phone.length < 10) {
        newErrors.phone = 'Phone number is required and must start with +234 (e.g., +2348012345678).';
        isValid = false;
      }
      // Validate whatsapp number: must start with +234 and have at least 10 digits total
      if (!formData.whatsappNumber.trim() || !formData.whatsappNumber.startsWith('+234') || formData.whatsappNumber.length < 10) {
        newErrors.whatsappNumber = 'WhatsApp number is required and must start with +234 (e.g., +2348012345678).';
        isValid = false;
      }
    }

    // Validation for Step 2: Vehicle Preferences (Iterate through each car)
    const minAllowedYear = 2003;
    const currentYear = new Date().getFullYear();

    if (currentStep === 2) {
      formData.carPreferences.forEach((car, index) => {
        if (!car.vehicleMake.trim()) {
          newErrors[`vehicleMake-${index}`] = 'Vehicle Make is required.';
          isValid = false;
        }
        if (!car.vehicleModel.trim()) {
          newErrors[`vehicleModel-${index}`] = 'Vehicle Model is required.';
          isValid = false;
        }
        if (!car.vehicleYearMin.trim() || !car.vehicleYearMax.trim()) {
          newErrors[`vehicleYear-${index}`] = 'Both min and max year are required.';
          isValid = false;
        } else {
          const minYear = parseInt(car.vehicleYearMin);
          const maxYear = parseInt(car.vehicleYearMax);

          if (minYear < minAllowedYear) {
            newErrors[`vehicleYear-${index}`] = `Min year cannot be earlier than ${minAllowedYear}.`;
            isValid = false;
          }
          if (maxYear > (currentYear + 1)) {
            newErrors[`vehicleYear-${index}`] = `Max year cannot be later than ${currentYear + 1}.`;
            isValid = false;
          }
          if (minYear > maxYear) {
            newErrors[`vehicleYear-${index}`] = 'Min year cannot be greater than max year.';
            isValid = false;
          }
        }
        if (!car.bodyStyle) {
          newErrors[`bodyStyle-${index}`] = 'Body Style is required.';
          isValid = false;
        }
        if (!car.carCondition) {
          newErrors[`carCondition-${index}`] = 'Please specify car condition.';
          isValid = false;
        }
        if (!car.carColor.trim()) {
          newErrors[`carColor-${index}`] = 'Car color is required.';
          isValid = false;
        }
        if (!car.fuelType) {
          newErrors[`fuelType-${index}`] = 'Fuel Type is required.';
          isValid = false;
        }
        if (!car.transmissionType) {
          newErrors[`transmissionType-${index}`] = 'Transmission Type is required.';
          isValid = false;
        }
        // Number of seats is now optional, so no validation here
        // Max mileage is now optional, so no validation here
      });
    }

    // Validation for Step 3: Budget & Swap
    if (currentStep === 3) {
      if (!formData.minPrice.trim()) {
        newErrors.minPrice = 'Min price is required.';
        isValid = false;
      }
      if (!formData.maxPrice.trim()) {
        newErrors.maxPrice = 'Max price is required.';
        isValid = false;
      }
      if (formData.minPrice.trim() && formData.maxPrice.trim() && parseInt(formData.minPrice) > parseInt(formData.maxPrice)) {
        newErrors.priceRange = 'Min price cannot be greater than max price.';
        isValid = false;
      }
      if (formData.swap === 'Yes') { // Changed from tradeIn
        if (!formData.swapMake.trim()) { // Changed from tradeInMake
          newErrors.swapMake = 'Swap Make is required.'; // Changed from tradeInMake
          isValid = false;
        }
        if (!formData.swapModel.trim()) { // Changed from tradeInModel
          newErrors.swapModel = 'Swap Model is required.'; // Changed from tradeInModel
          isValid = false;
        }
        if (!formData.swapYear.trim()) { // Changed from tradeInYear
          newErrors.swapYear = 'Swap Year is required.'; // Changed from tradeInYear
          isValid = false;
        }
        if (!formData.swapMileage.trim()) { // Changed from tradeInMileage
          newErrors.swapMileage = 'Swap Mileage is required.'; // Changed from tradeInMileage
          isValid = false;
        }
      }
      if (!formData.timeframe) {
        newErrors.timeframe = 'Desired timeframe is required.';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Moves to the next step if validation passes
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Moves to the previous step
  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setErrors({});
    window.scrollTo(0, 0);
  };

  // Handles the final form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Show a loading indicator
      // For this example, we'll just log to console, but in a real app, you'd set a loading state
      console.log('Attempting to submit form data to Formspree:', formData);

      try {
        // Replace 'yourformid' with the actual ID you get from Formspree after creating your form
        const formspreeEndpoint = 'https://formspree.io/f/xgvzwray'; // <-- UPDATED THIS LINE

        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json' // Formspree recommends this header
          },
          body: JSON.stringify(formData), // Send the entire form data as JSON
        });

        if (response.ok) {
          setSubmissionSuccess(true);
          // Optionally, clear the form after successful submission
          setFormData({
            name: '', email: '', phone: '+234', whatsappNumber: '+234',
            carPreferences: [{ ...initialCarPreference }],
            minPrice: '', maxPrice: '',
            swap: 'No', swapMake: '', swapModel: '',
            swapYear: '', swapMileage: '', timeframe: '', additionalNotes: '',
          });
          setCurrentStep(1); // Reset to the first step
          setIsWhatsappSameAsPhone(false); // Reset checkbox state
        } else {
          // Handle server-side errors from Formspree
          const errorData = await response.json();
          console.error('Formspree submission failed:', errorData);
          alert('Failed to submit your request. Please try again later.'); // Use a custom modal in a real app
        }
      } catch (error) {
        console.error('Network error or unexpected issue during submission:', error);
        alert('An error occurred. Please check your internet connection and try again.'); // Use a custom modal
      }
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Helper to check if there are any errors for the current step
  const hasErrorsForCurrentStepFunc = (stepNum) => {
    if (stepNum === 1) {
      return errors.name || errors.email || errors.phone || errors.whatsappNumber;
    }
    if (stepNum === 2) {
      // Check for errors in any of the car preference sections
      return formData.carPreferences.some((_, index) => (
        errors[`vehicleMake-${index}`] || errors[`vehicleModel-${index}`] ||
        errors[`vehicleYear-${index}`] || errors[`bodyStyle-${index}`] ||
        errors[`carCondition-${index}`] || errors[`carColor-${index}`] ||
        errors[`fuelType-${index}`] || errors[`transmissionType-${index}`] ||
        errors[`keyFeatures-${index}`]
      ));
    }
    if (stepNum === 3) {
      return errors.minPrice || errors.maxPrice || errors.priceRange || errors.swapMake || errors.swapModel || errors.swapYear || errors.swapMileage || errors.timeframe;
    }
    return false;
  };

  // Sample car data for display
  const availableCars = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      price: '₦12,500,000',
      imageUrl: 'https://pictures-nigeria.jijistatic.net/165457709_MzAwLTIyNS04NjA4ZTQxNTMx.webp',
      condition: 'Tokunbo (Imported Used)',
      mileage: '55,000 km',
      fuelType: 'Petrol',
      transmissionType: 'Automatic',
      bodyStyle: 'Sedan',
      features: ['Backup Camera/Parking Sensors', 'Bluetooth Connectivity'],
    },
    {
      id: 2,
      make: 'Honda',
      model: 'CR-V',
      year: 2018,
      price: '₦10,800,000',
      imageUrl: 'https://pictures-nigeria.jijistatic.net/174879961_MzAwLTIyNS1hMGFkNjcyNDlm.webp',
      condition: 'Nigeria Used',
      mileage: '80,000 km',
      fuelType: 'Petrol',
      transmissionType: 'Automatic',
      bodyStyle: 'SUV',
      features: ['Leather Seats', 'Sunroof/Moonroof'],
    },
    {
      id: 3,
      make: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2021,
      price: '₦25,000,000',
      imageUrl: 'https://pictures-nigeria.jijistatic.net/177637811_MzAwLTIyNS1jZWZlZGUwZTlh.webp',
      condition: 'Brand New',
      mileage: '500 km',
      fuelType: 'Petrol',
      transmissionType: 'Automatic',
      bodyStyle: 'Sedan',
      features: ['Navigation System', 'Apple CarPlay/Android Auto', 'Heated Seats'],
    },
    {
      id: 4,
      make: 'Honda',
      model: 'Accord',
      year: 2013,
      price: '₦15,000,000',
      imageUrl: 'https://pictures-nigeria.jijistatic.net/171636089_OTc3LTEwODAtYjMxMTYxNjMzMS0x.webp',
      condition: 'Tokunbo (Imported Used)',
      mileage: '70,000 km',
      fuelType: 'Petrol',
      transmissionType: 'Automatic',
      bodyStyle: 'Sedan',
      features: ['All-Wheel Drive (AWD) / 4x4', 'Backup Camera/Parking Sensors'],
    },
  ];

  // Function to handle smooth scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render the main application structure
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Tailwind CSS CDN - IMPORTANT: This should be in your HTML head for a real project */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Configure Tailwind to use 'Inter' font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      {/* Header/Navigation Section */}
      <header className="sticky top-0 z-40 bg-black p-4 sm:p-6">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">9ja Carplug</h1>
        </div>
      </header>

      {/* Client Intake Form Section */}
      <section id="client-intake" className="py-10 sm:py-16 bg-white px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">Start Your Car Search</h2>
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-3xl mx-auto">
            {submissionSuccess ? (
              <div className="text-center py-10">
                <svg className="w-20 h-20 sm:w-24 sm:h-24 text-green-500 mx-auto mb-4 sm:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4">Request Submitted Successfully!</h3>
                <p className="text-base sm:text-lg text-gray-600">
                  Thank you for your submission. We will review your request and get back to you shortly with potential matches.
                </p>
                <button
                  onClick={() => { setSubmissionSuccess(false); setCurrentStep(1); setFormData({
                    name: '', email: '', phone: '+234', whatsappNumber: '+234', // Reset with prefix
                    carPreferences: [{ ...initialCarPreference }], // Reset to one empty car preference
                    minPrice: '', maxPrice: '',
                    swap: 'No', swapMake: '', swapModel: '',
                    swapYear: '', swapMileage: '', timeframe: '', additionalNotes: '',
                  }); setIsWhatsappSameAsPhone(false); }} // Reset checkbox state
                  className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200 transform hover:scale-105"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                {/* Progress Indicator */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-500 mb-1 sm:mb-2">
                    <span>Step {currentStep} of 3</span>
                    <span>{currentStep === 1 ? 'Contact Info' : currentStep === 2 ? 'Vehicle Preferences' : 'Budget & Details'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-800 h-2 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Render the current step component */}
                {currentStep === 1 && <StepOne formData={formData} handleChange={handleChange} nextStep={nextStep} errors={errors} hasErrorsForCurrentStep={() => hasErrorsForCurrentStepFunc(1)} setIsWhatsappSameAsPhone={setIsWhatsappSameAsPhone} isWhatsappSameAsPhone={isWhatsappSameAsPhone} />}
                {currentStep === 2 && (
                  <StepTwo
                    formData={formData}
                    handleChange={handleChange}
                    handleCarPreferenceChange={handleCarPreferenceChange}
                    addCarPreference={addCarPreference}
                    removeCarPreference={removeCarPreference}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    errors={errors}
                    hasErrorsForCurrentStep={() => hasErrorsForCurrentStepFunc(2)}
                  />
                )}
                {currentStep === 3 && <StepThree formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} prevStep={prevStep} errors={errors} hasErrorsForCurrentStep={() => hasErrorsForCurrentStepFunc(3)} />}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section id="hero" className="bg-black text-white py-16 sm:py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight">
            Your Dream Car, Sourced Effortlessly.
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto text-gray-300">
            Leveraging our network of dealer to find the perfect vehicle for you, without the hassle of traditional car shopping.
          </p>
          <a
            href="#client-intake"
            onClick={(e) => { e.preventDefault(); scrollToSection('client-intake'); }}
            className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-white  text-black font-bold text-base sm:text-lg rounded-lg hover:bg-gray-900 transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Start Your Search Today!
          </a>
        </div>
      </section>

      {/* Available Cars Section */}
      <section id="available-cars" className="py-16 bg-white rounded-lg mx-4 my-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10 sm:mb-12">Cars Available For Sale</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {availableCars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-black hover:shadow-lg hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1"> {/* Changed rounded-xl to rounded-lg */}
                <img
                  src={car.imageUrl}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-40 sm:h-48 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/E0E7FF/3B82F6?text=Car+Image`; }}
                />
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">{car.make} {car.model}</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-1">Year: {car.year}</p>
                  <p className="text-lg sm:text-xl font-bold text-purple-800 mb-3 sm:mb-4">{car.price}</p>
                  <button
                    onClick={() => openCarDetailModal(car)}
                    className="mt-2 sm:mt-4 w-full px-4 sm:px-6 py-2 sm:py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200 transform hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white rounded-lg mx-4 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10 sm:mb-12">How Our Brokerage Works</h2>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="text-center p-6 bg-white rounded-lg hover:border-purple-300 transition duration-300 transform hover:-translate-y-1">
              <div className="bg-purple-100 text-purple-800 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">Tell Us Your Needs</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Fill out our simple intake form with your desired vehicle, budget, and preferences.
              </p>
            </div>
            {/* Step 2 */}
            <div className="text-center p-6 bg-white rounded-lg hover:border-purple-300 transition duration-300 transform hover:-translate-y-1">
              <div className="bg-purple-100 text-purple-800 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">We Source & Negotiate</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We tap into our extensive dealer network to find the best matches and negotiate on your behalf.
              </p>
            </div>
            {/* Step 3 */}
            <div className="text-center p-6 bg-white rounded-lg hover:border-purple-300 transition duration-300 transform hover:-translate-y-1">
              <div className="bg-purple-100 text-purple-800 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">Drive Away Happy!</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Review the options, make your choice, and finalize the purchase directly with the dealer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-6 sm:py-8 ">
        <div className="container mx-auto text-center px-4">
          <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} CarSource Pro. All rights reserved.</p>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm opacity-80">
            Disclaimer: We are an auto brokerage service connecting buyer with dealers.
          </p>
        </div>
      </footer>

      {/* Car Detail Modal */}
      {showCarDetailModal && (
        <CarDetailModal car={selectedCarForModal} onClose={closeCarDetailModal} />
      )}
    </div>
  );
};

export default App;
