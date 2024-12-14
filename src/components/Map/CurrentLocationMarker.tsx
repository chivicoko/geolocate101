import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import CurrentLocationIcon from '../../assets/location-marker.png';

// Custom icon for current location
const currentLocationIcon = new L.Icon({
  iconUrl: CurrentLocationIcon,
  iconSize: [40, 50],
  iconAnchor: [20, 60],
  popupAnchor: [0, -40],
});

interface CurrentLocationMarkerProps {
  currentLocation: [number, number];
  onMarkerDragEnd: (event: L.DragEndEvent) => void;
}

const CurrentLocationMarker: React.FC<CurrentLocationMarkerProps> = ({ currentLocation, onMarkerDragEnd }) => (
  <Marker
    position={currentLocation}
    icon={currentLocationIcon}
    draggable
    eventHandlers={{
      dragend: onMarkerDragEnd,
    }}
  >
    <Popup>
      <div className="flex flex-col gap-2">
        <span><strong>Current Location Coordinates</strong></span>
        <span><strong>Lat:</strong> {currentLocation[0]}, <strong>Lon:</strong> {currentLocation[1]}</span>
      </div>
    </Popup>
  </Marker>
);

export default CurrentLocationMarker;
