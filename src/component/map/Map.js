import classes from "./map.module.css";
import "leaflet/dist/leaflet.css";
import useGeolocation from "../hooks/useGeolocation";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import MyLocation from "./MyLocation";

import FormMapData from "./FormMapData";
import DisplayWorkout from "./DisplayWorkout";
import { useState, useContext } from "react";
import MapContext from "../../store/map-context";
import LatlngFinder from "./LatlngFinder";
import MarkOnMap from "./MarkOnMap";
import FlyToMarker from "./FlyToMarker";
import CalculateDistance from "./CalculateDistance";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;
L.Map.prototype.options.closePopupOnClick = false;

function Map() {
  const position = useGeolocation();
  const [help, setHelp] = useState(true);
  const [latFly, setLatFly] = useState();
  const [desOrAce, setDesOrAce] = useState(false);
  const [desOrAceCycle, setDesOrAceCycle] = useState(false);

  const mapCtx = useContext(MapContext);

  const onFlyHandler = (data) => {
    setLatFly(data);
  };

  const hideHelp = () => {
    setHelp(false);
  };

  const sortDataRun = () => {
    console.log("clicked");
    if (!desOrAce) {
      const newRun = mapCtx.formState.runn.sort(function (a, b) {
        return b.latlng.disToUser - a.latlng.disToUser;
      });
      console.log(newRun);
      mapCtx.dispatch({ type: "desendRun", payload: newRun });
      setDesOrAce(true);
    }
    if (desOrAce) {
      const newRun = mapCtx.formState.runn.sort(function (a, b) {
        return a.latlng.disToUser - b.latlng.disToUser;
      });
      console.log(newRun);
      mapCtx.dispatch({ type: "desendRun", payload: newRun });
      setDesOrAce(false);
    }
  };

  const sortDataCycle = () => {
    console.log("clicked");
    if (!desOrAceCycle) {
      const newcycle = mapCtx.formState.cycle.sort(function (a, b) {
        return b.latlng.disToUser - a.latlng.disToUser;
      });
      console.log(newcycle);
      mapCtx.dispatch({ type: "desendcycle", payload: newcycle });
      setDesOrAceCycle(true);
    }
    if (desOrAceCycle) {
      const newcycle = mapCtx.formState.cycle.sort(function (a, b) {
        return a.latlng.disToUser - b.latlng.disToUser;
      });
      console.log(newcycle);
      mapCtx.dispatch({ type: "desendcycle", payload: newcycle });
      setDesOrAceCycle(false);
    }
  };

  return (
    <div className={classes.first}>
      <div className={classes.sidebar}>
        {!help && (
          <div>
            <button
              className={classes.sortrun}
              type="button"
              onClick={sortDataRun}
            >
              Sort Running: {desOrAce ? "Acending " : "Desending"}
            </button>
            <button
              className={classes.sortrun}
              type="button"
              onClick={sortDataCycle}
            >
              Sort Cycling: {desOrAce ? "Acending " : "Desending"}
            </button>
          </div>
        )}
        {help && (
          <div className={classes.title}>
            <h1>Please before using, read all Instruction!</h1>
            <h2>
              Instruction 1: Click on the map, enter your Data, and then hit
              Enter Key !
            </h2>

            <p>Instruction 2: Click on the printed Item to center on Map !</p>
            <p>Instruction 3: Choose two Points for Measuring Distance !</p>
            <p>Note: Sorting is based on Distance from User Location!</p>
          </div>
        )}
        <ul className={classes.ull}>
          <FormMapData onHide={hideHelp} />
          {!mapCtx.openForm && <DisplayWorkout onFly={onFlyHandler} />}
          {mapCtx.showFly && (
            <p className={classes.calculate}>
              Measured Distance: {mapCtx.measuredDis} Km
            </p>
          )}
        </ul>

        <div className={classes.abel}>
          <p>Abolhasan Zaman</p>
          <p>abolhasanzaman@gmail.com</p>
        </div>
      </div>
      <MapContainer
        className={classes["leaflet-container"]}
        center={[51.505, -0.09]}
        zoom={13}
        closePopupOnClick={false}
      >
        <MyLocation position={position} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {!mapCtx.openForm && <LatlngFinder myPosition={position} />}
        <MarkOnMap />
        <CalculateDistance />
        <FlyToMarker onFlyLast={latFly} />
      </MapContainer>
    </div>
  );
}

export default Map;
