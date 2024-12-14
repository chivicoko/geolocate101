
export interface Coordinates {
    lat: number;
    lon: number;
  }
  
export interface AddressFormProps {
    onAddressSubmit: (coords: Coordinates) => void;
}

export interface UserListProps {
  users: { id: number; name: string; lat: number; lon: number }[];
  radius: number;
}

export interface MapWrapperProps {
  currentLocation: [number, number];
  nearbyUsers: { id: number; name: string; lat: number; lon: number }[];
  onMarkerDragEnd: (event: L.DragEndEvent) => void;
}

export interface UserMarkerProps {
  users: { id: number; name: string; lat: number; lon: number }[];
  currentLocation: [number, number];
}
