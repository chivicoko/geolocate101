import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import LocationMarkerImage from '../../assets/location-marker2.png';
import { UserMarkerProps } from '../../utils/types';
import { getDistance } from 'geolib';


// Custom icon for users
const userIcon = new L.Icon({
  iconUrl: LocationMarkerImage,
  iconSize: [40, 50],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const UserMarkers: React.FC<UserMarkerProps> = ({ users, currentLocation }) => {
// console.log(currentLocation);
    return (
      <>
      {users.map((user) => { 
          const distance = getDistance(  
            { latitude: currentLocation[0], longitude: currentLocation[1] },  
            { latitude: user.lat, longitude: user.lon }  
          );  
          // console.log(distance);

        return (
          <Marker key={user.id} position={[user.lat, user.lon]} icon={userIcon}>
            <Popup>
              <strong>{user.name}</strong> <br /> <hr />
              <p className='flex flex-col gap-2'>
                <span><strong>Coordinates: </strong> {user.lat}, {user.lon}</span>
                <span><strong>Distance from you: {distance.toFixed(2)} km</strong></span>
              </p>
            </Popup>
          </Marker>
        )
      })}
      </>
    );
  }

export default UserMarkers;
