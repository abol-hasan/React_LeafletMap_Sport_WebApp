import MapContext from "../../store/map-context";
import { useContext } from "react";
import MyMarker from "./MyMarker";
import { Popup } from "react-leaflet";

import "./popup.css";
const MarkOnMap = () => {
  const mapCtx = useContext(MapContext);
  const { formState } = mapCtx;
  const { runn, cycle } = formState;

  return (
    <div>
      {runn.length === 0
        ? null
        : runn.map((pos, index) => {
            return (
              <MyMarker position={[pos.latlng.lat, pos.latlng.lng]} key={index}>
                <Popup
                  className="popup popuprun"
                  position={[pos.latlng.lat, pos.latlng.lng]}
                  autoClose={false}
                >
                  <div className="description">
                    <p>{pos.description}</p>
                  </div>
                </Popup>
              </MyMarker>
            );
          })}
      {cycle.length === 0
        ? null
        : cycle.map((pos, index) => {
            return (
              <MyMarker position={[pos.latlng.lat, pos.latlng.lng]} key={index}>
                <Popup
                  className="popup popupcycle"
                  position={[pos.latlng.lat, pos.latlng.lng]}
                  autoClose={false}
                >
                  <div className="description">
                    <p>{pos.description}</p>
                  </div>
                </Popup>
              </MyMarker>
            );
          })}
    </div>
  );
};
export default MarkOnMap;
