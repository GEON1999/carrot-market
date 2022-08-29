import { useEffect, useState } from "react";

interface UseCodrdState {
  longitude: number;
  latitude: number;
}

export default function useCoords() {
  const [coords, setCoords] = useState<UseCodrdState>({
    longitude: 0,
    latitude: 0,
  });
  const onSuccess = ({
    coords: { longitude, latitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return coords;
}
