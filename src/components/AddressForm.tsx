import { useState } from 'react';
import axios from 'axios';
import { AddressFormProps } from '../utils/types';

const AddressForm: React.FC<AddressFormProps> = ({ onAddressSubmit }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  
  // console.log(import.meta.env.VITE_OPENCAGE_GEOCODING_API_KEY);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address) {
      setError('Please enter an address');
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_OPENCAGE_GEOCODING_API_KEY;
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
          key: apiKey,
          q: address,
          limit: 1,
        },
      });

      const result = response.data.results[0];
      // console.log(response.data)
      console.log("You have used up ", 2500 - response.data.rate.remaining, " requests. Remaining: ", response.data.rate.remaining);
      
      if (result) {
        const { lat, lng } = result.geometry;
        // console.log(lat, lng);
        onAddressSubmit({ lat, lon: lng });
        setError('');
      } else {
        setError('Address not found');
      }
    } catch (err) {
      setError('Failed to fetch location. Try again.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='py-4 w-full flex flex-col items-center justify-center'>
      <div className='flex justify-center w-full'>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          className='py-2 px-3 rounded-l-md w-full'
        />
        <button type="submit" className='py-2 px-3 rounded-r-md whitespace-nowrap bg-blue-700 hover:bg-blue-800 text-white block'>
          Find users
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </form>
  );
};

export default AddressForm;
