import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const RecenterMap = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(center);
    // map.setView(center);
  }, [center, map]);

  return null;
};

export default RecenterMap;
