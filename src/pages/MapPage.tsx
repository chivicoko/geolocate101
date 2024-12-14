import { useState } from 'react';
import { getDistance } from 'geolib';
import AddressForm from '../components/AddressForm';
import MapWrapper from '../components/Geolocation/MapWrapper';
import UserList from '../components/UserList';
import { Coordinates } from '../utils/types';
import { users } from '../utils/data';

const MapPage = () => {
  const [nearbyUsers, setNearbyUsers] = useState<{ id: number; name: string; lat: number; lon: number }[]>([]);
  const [currentLocation, setCurrentLocation] = useState<[number, number]>([9.05785, 7.49508]);
  const [radius, setRadius] = useState<number>(500);  // 5 km default radius

  const findNearbyUsers = (currentLat: number, currentLon: number) => {
    const nearby = users.filter((user) => {
      const distance = getDistance(
        { latitude: currentLat, longitude: currentLon },
        { latitude: user.lat, longitude: user.lon }
      );
      // console.log(distance);

      return distance <= radius;
    });
    setNearbyUsers(nearby);
  };

  const handleAddressSubmit = (coords: Coordinates) => {
    setCurrentLocation([coords.lat, coords.lon]);
    findNearbyUsers(coords.lat, coords.lon);
  };

  const handleMarkerDragEnd = (event: L.DragEndEvent) => {
    const latlng = event.target.getLatLng();
    const newLocation: [number, number] = [latlng.lat, latlng.lng];
    setCurrentLocation(newLocation);
    findNearbyUsers(latlng.lat, latlng.lng);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(parseInt(e.target.value));
    findNearbyUsers(currentLocation[0], currentLocation[1]);
  }


  return (
    <div className="App flex h-screen">

      <div className="w-1/3 py-6 border-r-2 border-gray-600 border-dashed px-4">
        <h1 className="text-center text-3xl">Proximity-Based User Locator</h1>

        <div className="w-full flex items-center justify-center">
          <div className="w-full border-2 border-gray-700 border-dashed rounded-md my-4 px-6">
            {/* Address Form */}
            <AddressForm onAddressSubmit={handleAddressSubmit} />

            {/* Radius Toggling Area */}
            <div className="flex w-full flex-col items-center space-y-2 border-t-2 py-2 border-dashed">
              <label htmlFor="radius-range" className="md:text-md font-medium text-gray-700">
                Adjust Search Radius: <span className="font-bold text-blue-600">{radius} meters</span>
              </label>

              <input
                id="radius-range"
                type="range"
                min={500}
                max={5000}
                step={100}
                title={`Radius: ${radius}`}
                value={radius}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-sm text-center text-gray-600">
                Drag the slider to adjust the search radius (500m to 5000m).
              </p>
            </div>
          </div>
        </div>
        
        {/* Nearby Users List */}
        <UserList users={nearbyUsers} radius={radius} />
      </div>

      <div className="w-2/3">
        {/* Map Container */}
        <MapWrapper currentLocation={currentLocation} nearbyUsers={nearbyUsers} onMarkerDragEnd={handleMarkerDragEnd} />
      </div>

    </div>
  );
};

export default MapPage;
