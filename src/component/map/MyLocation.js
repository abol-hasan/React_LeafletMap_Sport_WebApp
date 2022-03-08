import { useMap, Marker, Popup } from "react-leaflet";

function MyLocation(props) {
  const map = useMap();

  const { lat, lng } = props.position;
  const coords = [lat, lng];
  map.setView(coords);

  return (
    <Marker position={coords}>
      <Popup autoClose={false}>Your Position</Popup>
    </Marker>
  );
}

export default MyLocation;
