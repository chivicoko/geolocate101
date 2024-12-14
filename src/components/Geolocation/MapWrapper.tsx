import { MapContainer, TileLayer } from 'react-leaflet';
import RecenterMap from '../Map/RecenterMap';
import CurrentLocationMarker from '../Map/CurrentLocationMarker';
import UserMarkers from '../Map/UserMarkers';
import { MapWrapperProps } from '../../utils/types';

const MapWrapper: React.FC<MapWrapperProps> = ({ currentLocation, nearbyUsers, onMarkerDragEnd }) => {
  // console.log(nearbyUsers)
  return (
    <MapContainer center={currentLocation} zoom={13} scrollWheelZoom={false} className='w-full md:w-2/3 h-[373.5px] sm:h-[370px] md:h-full md:min-h-screen m-0'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Recenter the map whenever current location is updated */}
      <RecenterMap center={currentLocation} />
      
      {/* Marker for the current location */}
      <CurrentLocationMarker currentLocation={currentLocation} onMarkerDragEnd={onMarkerDragEnd} />

      {/* Render markers for nearby users */}
      <UserMarkers users={nearbyUsers} currentLocation={currentLocation}  />
    </MapContainer>
  );
};

export default MapWrapper;
